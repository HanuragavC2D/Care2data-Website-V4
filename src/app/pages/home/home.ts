import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CanonicalService } from '../../shared/services/canonical.service';
import { getCanonicalUrl, SITE_CONFIG } from '../../shared/site-config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterModule, CommonModule, MatExpansionModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
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

  constructor(private titleService: Title, private metaService: Meta, private canonicalService: CanonicalService) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.animationClass = 'opacity-0 scale-95';

      setTimeout(() => {
        this.current = (this.current + 1) % this.slides.length;
        this.animationClass = 'opacity-100 scale-100';
      }, 800);

    }, 4000);

    this.canonicalService.setCanonical(getCanonicalUrl('home'));

    // Change Page Title
    this.titleService.setTitle(
      'Care2Data | Home'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'description',
      content: 'Care2Data builds knowledge-driven clinical data validation software for life sciences. KWALIFY™ delivers ontology-based, explainable validation across SDTM, ADaM, and SEND domains — producing audit-ready, FDA submission-ready datasets. TrialGen™ generates privacy-safe synthetic clinical data aligned to CDISC standards.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('home')
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'clinical data validation, CDISC validation software, SDTM validation, ADaM validation, SEND validation, CDASH compliance, 21 CFR Part 11, ALCOA++ data integrity, GAMP5, clinical trial data quality, submission-ready clinical data, audit-ready datasets, FDA regulatory submission, regulatory compliance life sciences, ontology-based validation, knowledge graph clinical data, semantic clinical data validation, explainable AI clinical trials, cross-domain validation, anomaly detection clinical data, synthetic clinical data generation, privacy-safe clinical data, KWALIFY, TrialGen, Care2Data, clinical data intelligence platform, CRO data validation, pharma data submission, clinical data automation'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Care2Data | Home'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Care2Data builds knowledge-driven clinical data validation software for life sciences. KWALIFY™ delivers ontology-based, explainable validation across SDTM, ADaM, and SEND domains — producing audit-ready, FDA submission-ready datasets.'
    });

    // Open Graph Image
    this.metaService.updateTag({
      property: 'og:image',
      content: SITE_CONFIG.ogImage
    });

    this.metaService.updateTag({ name: 'twitter:title', content: 'Care2Data | Home' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Care2Data builds knowledge-driven clinical data validation software for life sciences. KWALIFY™ delivers ontology-based, explainable validation across SDTM, ADaM, and SEND domains.' });
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
