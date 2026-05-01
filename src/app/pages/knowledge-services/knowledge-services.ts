import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { CarouselPosition, CarouselPositionKey } from '../../shared/carousel/carousel.types';
import { KnowledgeServiceCard } from '../../shared/types/content.types';
import { getCanonicalUrl, SITE_CONFIG } from '../../shared/site-config';
import { CanonicalService } from '../../shared/services/canonical.service';

@Component({
  selector: 'app-knowledge-services',
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './knowledge-services.html',
  styleUrl: './knowledge-services.scss',
})
export class KnowledgeServices implements OnInit, OnDestroy {

  cards: KnowledgeServiceCard[] = [
    {
      link: '/services-explore',
      icon: 'images/home/white/knowledgemodeling.png',
      title: 'Knowledge Modelling',
      fragment: 'knowledge-modelling',
      description: "Define structured semantic representations of clinical entities, regulatory dependencies, workflows, and scientific relationships—establishing the foundation for context-aware validation and reasoning."
    },
    {
      link: '/services-explore',
      icon: 'images/home/white/knowledgerepository.png',
      title: 'Knowledge Repository Creation & Setup',
      fragment: 'knowledge-repository',
      description: "Operationalise knowledge models within scalable knowledge graph infrastructure, creating a unified semantic source of truth across clinical datasets and systems."
    },
    {
      link: '/services-explore',
      icon: 'images/home/white/knowledgediscovery.png',
      title: 'Knowledge Discovery & Reasoning',
      fragment: 'knowledge-discovery',
      description: "Enable contextual discovery, relationship analysis, anomaly detection, and knowledge-driven clinical data validation and verification through reasoning-enabled systems."
    },
    {
      link: '/services-explore',
      icon: 'images/home/white/knowledgemanagement.png',
      title: 'Governance & Lifecycle Management',
      fragment: 'governance',
      description: " Implement governance frameworks, traceability mechanisms, and regulatory compliance controls—ensuring long-term reliability, audit readiness, and alignment with evolving standards."
    },
    {
      link: '/services-explore',
      icon: 'images/home/white/trainingenablement.png',
      title: 'Training & Capability Transfer (BOT Model)',
      fragment: 'training',
      description: "Equip sponsor and partner teams with the knowledge and capabilities to manage, operate, and extend these systems independently—following a Build, Operate, and Transfer (BOT) model. Each service offering layer reinforces the next—transforming fragmented datasets into interlinked, reasoning-enabled clinical intelligence."
    }
  ];

  active = 0;
  timer: ReturnType<typeof setInterval> | undefined;
  isMobile = false;
  isTablet = false;
  positions: Record<CarouselPositionKey, CarouselPosition> = {
    center: { x: 0, z: 0, scale: 1.15, opacity: 1, blur: 0, border: 'rgba(250,204,21,0.6)' },
    left: { x: -220, z: -80, scale: 0.8, opacity: 0.55, blur: 1.5, border: 'rgba(255,255,255,0.1)' },
    right: { x: 220, z: -80, scale: 0.8, opacity: 0.55, blur: 1.5, border: 'rgba(255,255,255,0.1)' },
    hidden: { x: 0, z: -200, scale: 0.5, opacity: 0, blur: 4, border: 'rgba(255,255,255,0.05)' }
  };

  groupedCards: KnowledgeServiceCard[][] = [];
  currentIndex = 0;

  constructor(private titleService: Title, private metaService: Meta, private canonicalService: CanonicalService) { }

  ngOnInit(): void {

    this.canonicalService.setCanonical(getCanonicalUrl('knowledge-services'));

    // Change Page Title
    this.titleService.setTitle(
      'Knowledge Services | Care2Data'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'description',
      content: 'Explore Care2Data knowledge services including knowledge modelling, repository creation, discovery, reasoning, and governance for clinical data intelligence.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('knowledge-services')
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'clinical knowledge services, knowledge modelling clinical data, clinical ontology design, CDISC knowledge repository, semantic clinical data, knowledge graph life sciences, clinical data governance, knowledge discovery clinical trials, AI reasoning clinical data, explainable AI validation, data lifecycle management clinical, BOT model clinical systems, clinical data traceability, regulatory knowledge framework, ontology-driven clinical intelligence, Care2Data knowledge solutions'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Knowledge Services | Care2Data'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Explore Care2Data knowledge services including knowledge modelling, repository creation, discovery, reasoning, and governance for clinical data intelligence.'
    });

    this.metaService.updateTag({ name: 'twitter:title', content: 'Knowledge Services | Care2Data' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Care2Data knowledge services: ontology modelling, semantic repositories, knowledge discovery, reasoning, and governance for clinical data intelligence.' });

    this.injectSchema('ks-page-schema', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://care2data.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Knowledge Services', 'item': 'https://care2data.com/knowledge-services' }
          ]
        },
        {
          '@type': 'WebPage',
          '@id': 'https://care2data.com/knowledge-services',
          'url': 'https://care2data.com/knowledge-services',
          'name': 'Knowledge Services | Care2Data',
          'description': 'Ontology modelling, semantic repositories, knowledge discovery, reasoning, and governance for clinical data intelligence.',
          'isPartOf': { '@id': 'https://care2data.com/#website' },
          'about': { '@id': 'https://care2data.com/#org' }
        },
        {
          '@type': 'Service',
          'provider': { '@id': 'https://care2data.com/#org' },
          'name': 'Clinical Knowledge Services',
          'serviceType': 'Clinical Data Intelligence Consulting',
          'description': 'Care2Data provides knowledge modelling, semantic repository creation, knowledge discovery, governance lifecycle management, and BOT-model training for life sciences organizations.',
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Knowledge Service Offerings',
            'itemListElement': [
              { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Knowledge Modelling' } },
              { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Knowledge Repository Creation & Setup' } },
              { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Knowledge Discovery & Reasoning' } },
              { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Governance & Lifecycle Management' } },
              { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Training & Capability Transfer (BOT Model)' } }
            ]
          }
        }
      ]
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

  openService(link: string, fragment: string) {
    const url = `${window.location.origin}/${link}${fragment ? '#' + fragment : ''}`;
    // Signal any already-open services-explore tab to scroll to the section
    const bc = new BroadcastChannel('se-navigate');
    bc.postMessage({ fragment });
    bc.close();
    // Open or focus the named tab
    window.open(url, 'care2data-services');
  }

  private injectSchema(id: string, schema: object): void {
    const el = document.getElementById(id);
    if (el) el.remove();
    const s = document.createElement('script');
    s.id = id;
    s.type = 'application/ld+json';
    s.text = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  trackByIndex(i: number) { return i; }
}