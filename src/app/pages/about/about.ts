import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Carousel } from '../../shared/carousel/carousel';
import { CarouselCard } from '../../shared/carousel/carousel.types';
import { getCanonicalUrl } from '../../shared/site-config';
import { NavTriggerService } from '../../shared/services/nav-trigger.service';

@Component({
  selector: 'app-about',
  imports: [MatIconModule, RouterModule, CommonModule, Carousel],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  private fragSub!: Subscription;
  private isPopstate = false;

  cards = [
    { img: 'images/partners/iiitd_logo.png' },
    { img: 'images/partners/iiitb_logo.png' },
    { img: 'images/partners/bharathiar_logo.png' }
  ];
  approach: CarouselCard[] = [
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

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute,
    private navTrigger: NavTriggerService
  ) { }

  ngOnInit(): void {
    this.isPopstate = this.navTrigger.isPopstate();

    this.titleService.setTitle('About Us | Care2Data');

    this.metaService.updateTag({
      name: 'og:description',
      content: 'Care2Data is a clinical data validation software company that provides intelligent clinical data verification solutions for clinical research.'
    });

    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('about-us')
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'About Care2Data, Clinical data validation software company, Intelligent clinical data verification solutions, Clinical research software provider, Clinical data integrity solutions, Clinical trial data validation experts, Regulatory-compliant clinical data validation, 21 CFR Part 11 compliant software, Clinical data quality assurance, Clinical research technology company'
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'About Us | Care2Data'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Care2Data is a clinical data validation software company that provides intelligent clinical data verification solutions for clinical research.'
    });
  }

  ngAfterViewInit(): void {
    if (this.isPopstate) return;

    const rawHash = window.location.hash;
    const lastHashIdx = rawHash.lastIndexOf('#');
    const initFrag = lastHashIdx > 0 ? rawHash.slice(lastHashIdx + 1) : '';
    if (initFrag) {
      setTimeout(() => {
        const el = document.getElementById(initFrag);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }

    this.fragSub = this.route.fragment.subscribe(frag => {
      if (frag && frag !== initFrag) {
        setTimeout(() => {
          const el = document.getElementById(frag);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  }

  ngOnDestroy(): void {
    this.fragSub?.unsubscribe();
  }
}
