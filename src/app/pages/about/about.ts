import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Carousel } from '../../shared/carousel/carousel';
import { CarouselCard } from '../../shared/carousel/carousel.types';
import { getCanonicalUrl, SITE_CONFIG } from '../../shared/site-config';

@Component({
  selector: 'app-about',
  imports: [MatIconModule, RouterModule, CommonModule, Carousel],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
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

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    // Change Page Title
    this.titleService.setTitle('About Us | Care2Data');

    // Change Meta Description
    this.metaService.updateTag({
      name: 'og:description',
      content: 'Care2Data is a clinical data validation software company that provides intelligent clinical data verification solutions for clinical research.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('about-us')
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
  }
}
