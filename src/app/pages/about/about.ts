import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Carousel } from '../../shared/carousel/carousel';
import { CarouselCard } from '../../shared/carousel/carousel.types';
import { getCanonicalUrl } from '../../shared/site-config';
import { NavTriggerService } from '../../shared/services/nav-trigger.service';

interface Leader {
  id: string;
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  tagline: string;
  bio: string[];
  expertise: string[];
}

@Component({
  selector: 'app-about',
  imports: [MatIconModule, RouterModule, CommonModule, Carousel],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  private fragSub!: Subscription;
  private isPopstate = false;

  selectedLeader: Leader | null = null;

  leaders: Leader[] = [
    {
      id: 'giri',
      name: 'Giri Balasubramanian',
      role: 'CEO & Co-Founder',
      photo: 'images/leaders/giri.jpg',
      linkedin: 'https://www.linkedin.com/in/giri-balasubramanian-21a31013/',
      tagline: 'Global leader in clinical data standards, automation, and analytics.',
      bio: [
        'Giri Balasubramanian is an experienced innovative technology leader with over 25 years in product development, specializing in the CRO, Pharma, and Biopharma industries. An alumnus of Marquette University (Math, Stat, and Computer Science), he is recognized for rolling out a revolutionary product EXACT, a metadata-driven, regulatory-compliant system for SDTM datasets and TFL generations.',
        'Currently, he is the CEO & Co-founder of CARE2DATA, focusing on AI-enabled Ontology driven data validation, verification, and clinical trial quality assurance.'
      ],
      expertise: ['Ontology-Driven Validation', 'Clinical Data Standards (SDTM/ADaM)', 'Metadata Architecture', 'AI & Knowledge Graphs', 'Regulatory Submissions', 'CDISC & PhUSE']
    },
    {
      id: 'gopinath',
      name: 'Gopinath Viswanathan',
      role: 'CTO & Co-Founder',
      photo: 'images/leaders/gopinath.jpg',
      linkedin: 'https://www.linkedin.com/in/gopinath-viswanathan-1502607a/',
      tagline: 'Two decades of expertise across pharmaceutical, CRO, and life sciences organizations.',
      bio: [
        'Gopinath Viswanathan is a technology-driven leader with over two decades of experience spanning pharmaceutical, CRO, and life sciences organizations. His career bridges deep clinical domain expertise with a forward-looking focus on intelligent platform design — positioning technology as the foundation for clinical data quality, regulatory defensibility, and operational scale.',
        'As CTO & Co-Founder of CARE2DATA, Gopinath leads the architecture of KWALIFY™ — the company\'s ontology-driven clinical data validation engine — and the development of TrialGen™ for synthetic clinical data generation. With expertise across SDTM, ADaM, knowledge graphs, and explainable AI (XAI), he translates complex clinical data standards into scalable, AI-enabled technology solutions that deliver submission-ready, audit-traceable data intelligence at enterprise scale.'
      ],
      expertise: ['Ontology-Driven Knowledge Modelling', 'Semantic Intelligence & Reasoning', 'KWALIFY™ Platform Architecture', 'Explainable AI (XAI) in Clinical Data', 'Governance-First Platform Design', 'Regulatory Submission Workflows', 'Synthetic Data Generation (TrialGen™)', 'SDTM & ADaM Standards']
    }
  ];

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

  openPanel(leader: Leader): void {
    this.selectedLeader = leader;
    document.body.style.overflow = 'hidden';
  }

  closePanel(): void {
    this.selectedLeader = null;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedLeader) this.closePanel();
  }

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
    document.body.style.overflow = '';
  }
}
