import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { debounceTime, fromEvent, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-engagement',
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './engagement.html',
  styleUrl: './engagement.scss',
})
export class Engagement {

  approch: any = [
    {
      link: '/models-explore',
      icon: '01',
      title: 'Solution Consulting',
      fragment: 'solution-consulting',
      description: "Define high-impact knowledge use cases aligned with regulatory defensibility, submission readiness, and clinical data transparency."
    },
    {
      link: '/models-explore',
      icon: '02',
      title: 'Proof of Concepts (PoCs)',
      fragment: 'poc-section',
      description: "Validate feasibility and demonstrate value through targeted pilots across clinical datasets and validation workflows."
    },
    {
      link: '/models-explore',
      icon: '03',
      title: 'Design & Development',
      fragment: 'design-development',
      description: "Engineer semantic models, knowledge architectures, and validation frameworks tailored to clinical programs."
    },
    {
      link: '/models-explore',
      icon: '04',
      title: 'Data Quality Checking — And What Happens Next',
      fragment: 'data-quality',
      description: "Assess data quality, identify gaps, and transition from issue detection to structured validation and verification frameworks."
    },
    {
      link: '/models-explore',
      icon: '05',
      title: 'Knowledge Model Implementation',
      fragment: 'knowledge-model',
      description: "Develop and operationalise ontology-driven knowledge models and interlinked data systems."
    },
    {
      link: '/models-explore',
      icon: '06',
      title: 'Training & Handover (BOT Model)',
      fragment: 'training-handover',
      description: "Enable teams to manage, extend, and scale systems independently through structured training and capability transfer."
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

  activeIndex = 0;
  sub!: Subscription;
  slides = [
    {
      index: 0
    },
    {
      index: 1
    }
  ];
  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {

    // Change Page Title
    this.titleService.setTitle(
      'Engagement Architecture | Care2Data'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'description',
      content: 'Discover Care2Data engagement architecture and service offerings including solution consulting, PoCs, design & development, and training for clinical data intelligence.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: 'https://gokulgovindharaj.github.io/Care2Data-Website/#/engagement'
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Engagement architecture, Clinical data consulting, Healthcare solution consulting, Proof of concepts, Clinical data development, Data quality solutions, Healthcare training, Clinical data intelligence services'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Engagement Architecture | Care2Data'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Discover Care2Data engagement architecture and service offerings including solution consulting, PoCs, design & development, and training for clinical data intelligence.'
    });

    this.sub = interval(10000).subscribe(() => {
      this.activeIndex = (this.activeIndex + 1) % this.slides.length;
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
    this.sub.unsubscribe();
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
