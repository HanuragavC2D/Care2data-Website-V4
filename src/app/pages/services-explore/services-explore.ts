import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private navTrigger: NavTriggerService) {}

  ngOnInit(): void {
    this.isPopstate = this.navTrigger.isPopstate();
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

    const rawHash = window.location.hash;
    const lastHashIdx = rawHash.lastIndexOf('#');
    const initFrag = lastHashIdx > 0 ? rawHash.slice(lastHashIdx + 1) : '';

    if (initFrag) {
      setTimeout(() => this.scrollToSection(initFrag), 400);
    }

    this.route.fragment.subscribe(f => {
      if (f && f !== initFrag) setTimeout(() => this.scrollToSection(f), 200);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.bc.close();
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSection = id;
  }
}
