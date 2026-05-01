import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { getCanonicalUrl } from '../../shared/site-config';
import { CanonicalService } from '../../shared/services/canonical.service';
import { NavTriggerService } from '../../shared/services/nav-trigger.service';

@Component({
  selector: 'app-models-explore',
  imports: [CommonModule, RouterModule],
  templateUrl: './models-explore.html',
  styleUrl: './models-explore.scss',
})
export class ModelsExplore implements AfterViewInit, OnDestroy {

  activeSection = 'solution-consulting';
  private isPopstate = false;
  private observer!: IntersectionObserver;
  private fragSub?: Subscription;

  private readonly sectionIds = [
    'solution-consulting',
    'poc-section',
    'design-development',
    'data-quality',
    'knowledge-model',
    'training-handover',
  ];

  readonly navItems = [
    { id: 'solution-consulting', num: '01', label: 'Solution Consulting' },
    { id: 'poc-section',         num: '02', label: 'Proof of Concepts' },
    { id: 'design-development',  num: '03', label: 'Design & Development' },
    { id: 'data-quality',        num: '04', label: 'Data Quality' },
    { id: 'knowledge-model',     num: '05', label: 'Knowledge Model' },
    { id: 'training-handover',   num: '06', label: 'Training & Handover' },
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute,
    private navTrigger: NavTriggerService,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.isPopstate = this.navTrigger.isPopstate();
    this.canonicalService.setCanonical(getCanonicalUrl('models-explore'));
    this.titleService.setTitle('Engagement Models | Care2Data');
    this.metaService.updateTag({ name: 'description', content: 'Explore Care2Data engagement models including solution consulting, PoCs, design & development, knowledge model implementation, and training.' });
    this.metaService.updateTag({ name: 'og:url', content: getCanonicalUrl('models-explore') });
    this.metaService.updateTag({ property: 'og:title', content: 'Engagement Models | Care2Data' });
    this.metaService.updateTag({ property: 'og:description', content: 'Explore Care2Data engagement models including solution consulting, PoCs, design & development, knowledge model implementation, and training.' });
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
