import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-about',
  imports: [MatIconModule, RouterModule, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  cards = [
    { img: 'images/partners/iiitd_logo.png' },
    { img: 'images/partners/iiitb_logo.png' },
    { img: 'images/partners/bharathiar_logo.png' }
  ];
  approch: any = [
    {
      icon: '01',
      title: 'Governance-first design',
      description: "Ensuring validation and verification processes support transparency, traceability, and regulatory compliance—including alignment with global regulatory frameworks and AI governance expectations."
    },
    {
      icon: '02',
      title: 'Semantic intelligence',
      description: "Using ontology frameworks to connect datasets through meaning and relationships rather than isolated rules, enabling context-aware validation."
    },
    {
      icon: '03',
      title: 'Structured validation frameworks',
      description: "Enabling reproducible, explainable (XAI-driven), and audit-ready validation processes across the clinical data lifecycle."
    },
    {
      icon: '04',
      title: 'Integrated validation and verification',
      description: "Combining ontology-driven validation with graph-based verification models to identify inconsistencies, confirm data integrity, and ensure completeness across datasets."
    },
    {
      icon: '05',
      title: 'Operational integration',
      description: "Embedding governed intelligence within existing clinical workflows without replacing established systems."
    }
  ];

  active = 0;
  timer: any;
  isMobile = false;
  isTablet = false;
  positions: any = {
    center: { x: 0, z: 0, scale: 1.15, opacity: 1, blur: 0, border: 'rgba(250,204,21,0.6)' },
    left: { x: -220, z: -80, scale: 0.8, opacity: 0.55, blur: 1.5, border: 'rgba(255,255,255,0.1)' },
    right: { x: 220, z: -80, scale: 0.8, opacity: 0.55, blur: 1.5, border: 'rgba(255,255,255,0.1)' },
    hidden: { x: 0, z: -200, scale: 0.5, opacity: 0, blur: 4, border: 'rgba(255,255,255,0.05)' }
  };

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {

    // Change Page Title
    this.titleService.setTitle(
      'About Us | Care2Data'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'og:description',
      content: 'Care2Data is a clinical data validation software company that provides intelligent clinical data verification solutions for clinical research.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: 'https://gokulgovindharaj.github.io/Care2Data-Website/#/kwalify'
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'About Care2Data, Clinical data validation software company, Intelligent clinical data verification solutions, Clinical research software provider, Clinical data integrity solutions, Clinical trial data validation experts, Regulatory-compliant clinical data validation, 21 CFR Part 11 compliant software, Clinical data quality assurance, Clinical research technology company'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'About Us | Care2Data'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Care2Data is a clinical data validation software company that provides intelligent clinical data verification solutions for clinical research.'
    });

    this.checkDevice();
    fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.checkDevice());
    this.startAutoSlide();
  }

  checkDevice() {
    const w = window.innerWidth;

    this.isMobile = w < 640;       // Tailwind sm
    this.isTablet = w >= 640 && w < 1024; // md
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getPos(i: number) {
    const total = this.approch.length;
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
    const total = this.approch.length;
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
