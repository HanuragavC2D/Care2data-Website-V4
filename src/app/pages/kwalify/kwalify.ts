import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-kwalify',
  imports: [MatIconModule, MatExpansionModule, RouterModule, CommonModule],
  templateUrl: './kwalify.html',
  styleUrl: './kwalify.scss',
})
export class Kwalify {

  isAtStart = false;
  isAtEnd = false;
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  constructor(private titleService: Title, private metaService: Meta, private ngZone: NgZone) { }

  ngOnInit(): void {

    // Change Page Title
    this.titleService.setTitle(
      'KWALIFY™ | Intelligent Clinical Data Validation Software'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'og:description',
      content: 'KWALIFY™ by Care2Data is an intelligent clinical data validation platform using semantic inference and contextual rules to deliver audit-ready, submission-ready clinical trial datasets.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: 'https://gokulgovindharaj.github.io/Care2Data-Website/#/kwalify'
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Clinical data validation software, Intelligent clinical data verification, Clinical trial data validation platform,Knowledge graph validation in clinical research, Submission-ready clinical datasets, Regulatory compliant data validation, 21 CFR Part 11 compliant validation software,Clinical data integrity platform,Double programming alternative,Automated QC for clinical trials,CRO validation software,Clinical data discrepancy detection,Audit-ready clinical datasets'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'KWALIFY™ | Intelligent Clinical Data Validation Software'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'KWALIFY™ by Care2Data is an intelligent clinical data validation platform using semantic inference and contextual rules to deliver audit-ready, submission-ready clinical trial datasets.'
    });
    this.checkDevice();
    fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.checkDevice());
  }

  checkDevice() {
    const w = window.innerWidth;

    this.isMobile = w < 640;       // Tailwind sm
    this.isTablet = w >= 640 && w < 1024; // md
  }

  ngAfterViewInit() {
    const el = this.scrollContainer.nativeElement;

    requestAnimationFrame(() => {
      el.scrollLeft = 0;
      this.updateScrollState();

      // ✅ start AFTER layout ready
      setTimeout(() => {
        this.startAutoSlide();
      }, 300);
    });

    this.ngZone.runOutsideAngular(() => {
      fromEvent(el, 'scroll')
        .pipe(debounceTime(50))
        .subscribe(() => {
          this.ngZone.run(() => this.updateScrollState());
        });
    });
  }

  scroll(direction: 'left' | 'right') {
    const el = this.scrollContainer.nativeElement;

    const cards = el.children;
    const scrollLeft = el.scrollLeft;

    let targetIndex = 0;

    // find current visible card index
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;

      if (card.offsetLeft >= scrollLeft - 5) {
        targetIndex = i;
        break;
      }
    }

    // move index
    if (direction === 'right') {
      targetIndex = Math.min(targetIndex + this.getStep(), cards.length - 1);
    } else {
      targetIndex = Math.max(targetIndex - this.getStep(), 0);
    }

    const targetCard = cards[targetIndex] as HTMLElement;

    el.scrollTo({
      left: targetCard.offsetLeft,
      behavior: 'smooth'
    });
  }

  getStep() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  updateScrollState() {
    const el = this.scrollContainer.nativeElement;

    this.isAtStart = el.scrollLeft < 10;

    this.isAtEnd =
      Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 10;
  }

  isMobile = false;
  isTablet = false;
  cards = [
    {
      icon: 'images/home/white/context-aware.png',
      title: 'Context-Aware Validation',
      subtitle: `KWALIFY™ evaluates relationships across domains, variables, and study logic—moving beyond isolated rule checks.`,
      description1: "Validation logic understands study structure, regulatory expectations, and cross-dataset dependencies."
    },
    {
      icon: 'images/about/white/xai.png',
      title: 'Explainable AI',
      subtitle: 'For every validation finding, KWALIFY™ generates:',
      list: [
        'Issue summary',
        'Root cause explanation',
        'Impact analysis',
        'Recommended remediation'
      ],
      footer: 'This transforms validation from manual investigation into guided resolution.'
    },
    {
      icon: 'images/kwalify/white/compliancerules.png',
      title: 'Customizable Compliance Rules',
      subtitle: `Beyond regulatory rule libraries, teams can configure study-specific validation rules to enforce additional compliance requirements—ensuring quality, integrity, and conformance alongside regulatory checks.`,
      description1: "This enables organizations to apply internal governance standards alongside regulatory checks."
    },
    {
      icon: 'images/about/white/traceability.png',
      title: 'Traceable by Design',
      subtitle: `Validation lineage, rule logic, and investigation trails are embedded into the architecture.`,
      description1: "Every validation outcome is traceable—supporting regulatory inspections and internal QA review."
    },
    {
      icon: 'images/home/white/ecosystem.png',
      title: 'Works Within Your Ecosystem',
      subtitle: 'KWALIFY integrates seamlessly with existing clinical systems including:',
      list: [
        'Electronic Data Capture (EDC) platforms',
        'Clinical Data Management Systems (CDMS)',
        'Statistical Analysis Environments'
      ],
      footer: `No rip-and-replace. No disruption.`,
    }
  ];

  active = 0;
  timer: any;

  positions: any = {
    center: { x: 0, z: 0, scale: 1.15, opacity: 1, blur: 0, border: 'rgba(250,204,21,0.6)' },
    left: { x: -420, z: -80, scale: 0.8, opacity: 0.55, blur: 1.5, border: 'rgba(255,255,255,0.1)' },
    right: { x: 420, z: -80, scale: 0.8, opacity: 0.55, blur: 1.5, border: 'rgba(255,255,255,0.1)' },
    hidden: { x: 0, z: -200, scale: 0.5, opacity: 0, blur: 4, border: 'rgba(255,255,255,0.05)' }
  };

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getPos(i: number) {
    const total = this.cards.length;
    const diff = ((i - this.active) % total + total) % total;

    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === total - 1) return 'left';
    return 'hidden';
  }

  getStyles(i: number) {
    const pos = this.positions[this.getPos(i)];
    const type = this.getPos(i);

    let scale = pos.scale;

    // 🔥 Device-based override
    if (this.isMobile) {
      scale = type === 'center' ? 0.9 : 0.8;
    } else if (this.isTablet) {
      scale = type === 'center' ? 1 : 0.85;
    } else {
      scale = type === 'center' ? 1.1 : 0.9;
    }

    return {
      transform: `translateX(${pos.x}px) translateZ(${pos.z}px) scale(${scale})`,
      opacity: pos.opacity,
      filter: `blur(${pos.blur}px)`,
      borderColor: pos.border,
      zIndex: type === 'center' ? 5 : type === 'hidden' ? 0 : 2
    };
  }

  go(dir: number) {
    const total = this.cards.length;
    this.active = ((this.active + dir) % total + total) % total;
    this.resetTimer();
  }

  goTo(i: number) {
    this.active = i;
    this.resetTimer();
  }

  onCardClick(i: number) {
    if (i !== this.active) {
      this.active = i;
      this.resetTimer();
    }
  }

  startAutoSlide() {
    this.timer = setInterval(() => this.go(1), 10000); // 10s per slide
  }

  resetTimer() {
    clearInterval(this.timer);
    this.startAutoSlide();
  }
}
