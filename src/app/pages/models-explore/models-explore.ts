import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { getCanonicalUrl } from '../../shared/site-config';
import { NavTriggerService } from '../../shared/services/nav-trigger.service';

@Component({
  selector: 'app-models-explore',
  imports: [RouterModule],
  templateUrl: './models-explore.html',
  styleUrl: './models-explore.scss',
})
export class ModelsExplore implements AfterViewInit, OnDestroy {
  private fragSub!: Subscription;
  private isPopstate = false;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute,
    private navTrigger: NavTriggerService
  ) { }

  ngOnInit(): void {
    this.isPopstate = this.navTrigger.isPopstate();

    this.titleService.setTitle('Engagement Models | Care2Data');

    this.metaService.updateTag({
      name: 'description',
      content: 'Explore Care2Data engagement models including solution consulting, PoCs, design & development, knowledge model implementation, and training.'
    });

    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('models-explore')
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'Engagement Models | Care2Data'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Explore Care2Data engagement models including solution consulting, PoCs, design & development, knowledge model implementation, and training.'
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
