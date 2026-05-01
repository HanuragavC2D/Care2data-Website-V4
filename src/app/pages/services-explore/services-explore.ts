import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { getCanonicalUrl } from '../../shared/site-config';
import { CanonicalService } from '../../shared/services/canonical.service';
import { NavTriggerService } from '../../shared/services/nav-trigger.service';

@Component({
  selector: 'app-services-explore',
  imports: [CommonModule],
  templateUrl: './services-explore.html',
  styleUrl: './services-explore.scss',
})
export class ServicesExplore implements AfterViewInit, OnDestroy {

  activeSection = 'knowledge-modelling';
  private isPopstate = false;
  private observer!: IntersectionObserver;
  private fragSub?: Subscription;

  private readonly sectionIds = [
    'knowledge-modelling',
    'knowledge-repository',
    'knowledge-discovery',
    'governance',
    'training'
  ];

  readonly navItems = [
    { id: 'knowledge-modelling', num: '01', label: 'Knowledge Modelling' },
    { id: 'knowledge-repository', num: '02', label: 'Knowledge Repository' },
    { id: 'knowledge-discovery', num: '03', label: 'Discovery & Reasoning' },
    { id: 'governance', num: '04', label: 'Governance & Lifecycle' },
    { id: 'training', num: '05', label: 'Training & Enablement' },
  ];

  private bc = new BroadcastChannel('se-navigate');

  constructor(
    private route: ActivatedRoute,
    private navTrigger: NavTriggerService,
    private titleService: Title,
    private metaService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.isPopstate = this.navTrigger.isPopstate();

    this.canonicalService.setCanonical(getCanonicalUrl('services-explore'));
    this.titleService.setTitle('Knowledge Offerings | Care2Data');

    this.metaService.updateTag({
      name: 'description',
      content: 'Explore Care2Data knowledge offerings: knowledge modelling, semantic repository creation, discovery and reasoning, governance and lifecycle management, and training under the Build-Operate-Transfer model.'
    });

    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('services-explore')
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'clinical knowledge offerings, knowledge modelling CDISC, semantic repository clinical data, clinical ontology framework, knowledge graph life sciences, clinical data governance lifecycle, AI reasoning clinical validation, BOT model clinical systems, knowledge discovery clinical trials, explainable AI life sciences, clinical data traceability, ontology-driven validation services, Care2Data services'
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'Knowledge Offerings | Care2Data'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Explore Care2Data knowledge offerings: knowledge modelling, semantic repository creation, discovery and reasoning, governance and lifecycle management, and BOT-model training enablement.'
    });
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) this.activeSection = visible[0].target.id;
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );

    this.sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });

    this.bc.onmessage = (e: MessageEvent) => {
      if (e.data?.fragment) setTimeout(() => this.scrollToSection(e.data.fragment), 150);
    };

    if (this.isPopstate) return;

    const initFrag = window.location.hash ? window.location.hash.slice(1) : '';

    if (initFrag) {
      setTimeout(() => this.scrollToSection(initFrag), 400);
    }

    this.fragSub = this.route.fragment.subscribe(f => {
      if (f && f !== initFrag) setTimeout(() => this.scrollToSection(f), 200);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.bc.close();
    this.fragSub?.unsubscribe();
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSection = id;
  }

  trackByIndex(i: number) { return i; }
}
