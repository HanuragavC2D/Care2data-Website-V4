import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Carousel } from '../../shared/carousel/carousel';
import { CarouselCard } from '../../shared/carousel/carousel.types';
import { getCanonicalUrl, SITE_CONFIG } from '../../shared/site-config';

@Component({
  selector: 'app-engagement',
  imports: [MatIconModule, CommonModule, RouterModule, Carousel],
  templateUrl: './engagement.html',
  styleUrl: './engagement.scss',
})
export class Engagement {

  approach: CarouselCard[] = [
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

  activeIndex = 0;
  sub!: Subscription;
  slides = [
    { index: 0 },
    { index: 1 }
  ];

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle('Engagement Architecture | Care2Data');

    this.metaService.updateTag({
      name: 'description',
      content: 'Discover Care2Data engagement architecture and service offerings including solution consulting, PoCs, design & development, and training for clinical data intelligence.'
    });

    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('engagement-models')
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'Engagement architecture, Clinical data consulting, Healthcare solution consulting, Proof of concepts, Clinical data development, Data quality solutions, Healthcare training, Clinical data intelligence services'
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'Engagement Architecture | Care2Data'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Discover Care2Data engagement architecture and service offerings including solution consulting, PoCs, design & development, and training for clinical data intelligence.'
    });

    this.sub = interval(10000).subscribe(() => {
      this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
