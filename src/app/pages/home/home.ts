import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { getCanonicalUrl, SITE_CONFIG } from '../../shared/site-config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterModule, CommonModule, MatExpansionModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnDestroy {
  slides = [
    {
      title: 'Kwalify™  ·  Data Quality Platform',
      sub: 'Validation & Verification — Powered by Graph AI',
      // img: 'images/home/white/strategicalignment.png'
    },
    {
      title: 'Data Quality Platform — Powered by Graph AI',
      sub: '',
      img: 'images/whatiskwalify.png'
    },
    {
      title: 'Kwalify Features',
      sub: '',
      img: 'images/kwalifyfuture.png'
    },
    {
      title: 'No other organisation has reached this stage',
      sub: '',
      img: 'images/whatsuniqueaboutkwalify.png'
    },
    {
      title: 'Designed for clarity, speed and clinical context',
      sub: '',
      img: 'images/interfacedesign.png'
    }
  ];
  current = 0;
  animationClass = 'opacity-100 scale-100';
  private intervalId: ReturnType<typeof setInterval> | undefined;

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.animationClass = 'opacity-0 scale-95';

      setTimeout(() => {
        this.current = (this.current + 1) % this.slides.length;
        this.animationClass = 'opacity-100 scale-100';
      }, 800);

    }, 4000);

    // Change Page Title
    this.titleService.setTitle(
      'Care2Data | Home'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'description',
      content: 'Care2Data delivers intelligent clinical data validation software through KWALIFY™, enabling regulatory-compliant, audit-ready and submission-ready clinical trial datasets.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'url',
      content: getCanonicalUrl('home')
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Clinical data validation, Regulatory confidence, Data integrity, Submission readiness, Audit trails, Life sciences software, Semantic Intelligence'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Care2Data | Home'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Care2Data delivers intelligent clinical data validation software through KWALIFY™, enabling regulatory-compliant, audit-ready and submission-ready clinical trial datasets.'
    });

    // Open Graph Image
    this.metaService.updateTag({
      property: 'og:image',
      content: SITE_CONFIG.ogImage
    });
  }

  hoverTimeout: ReturnType<typeof setTimeout> | undefined;

  openPanel(panel: MatExpansionPanel) {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = setTimeout(() => {
      panel.open();
    }, 150);
  }

  closePanel(panel: MatExpansionPanel) {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = setTimeout(() => {
      panel.close();
    }, 150);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }
}
