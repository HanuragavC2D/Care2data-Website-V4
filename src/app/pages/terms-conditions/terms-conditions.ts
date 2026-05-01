import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../../shared/services/canonical.service';
import { getCanonicalUrl } from '../../shared/site-config';

@Component({
  selector: 'app-terms-conditions',
  imports: [],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.scss',
})
export class TermsConditions implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.canonicalService.setCanonical(getCanonicalUrl('terms-conditions'));
    this.titleService.setTitle('Terms of Use | Care2Data');

    this.metaService.updateTag({
      name: 'description',
      content: 'Review Care2Data\'s terms of use governing access to care2data.com and use of KWALIFY™ and TrialGen™ software products and services.'
    });

    this.metaService.updateTag({ name: 'og:url', content: getCanonicalUrl('terms-conditions') });
    this.metaService.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.metaService.updateTag({ property: 'og:title', content: 'Terms of Use | Care2Data' });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Review Care2Data\'s terms of use for care2data.com and the KWALIFY™ and TrialGen™ software products.'
    });
  }
}
