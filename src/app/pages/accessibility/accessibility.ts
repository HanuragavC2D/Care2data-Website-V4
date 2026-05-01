import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../../shared/services/canonical.service';
import { getCanonicalUrl } from '../../shared/site-config';

@Component({
  selector: 'app-accessibility',
  imports: [],
  templateUrl: './accessibility.html',
  styleUrl: './accessibility.scss',
})
export class Accessibility implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.canonicalService.setCanonical(getCanonicalUrl('accessibility'));
    this.titleService.setTitle('Accessibility | Care2Data');

    this.metaService.updateTag({
      name: 'description',
      content: 'Care2Data is committed to digital accessibility. Learn about our accessibility standards, conformance status, and how to request accommodations for care2data.com.'
    });

    this.metaService.updateTag({ name: 'og:url', content: getCanonicalUrl('accessibility') });
    this.metaService.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.metaService.updateTag({ property: 'og:title', content: 'Accessibility | Care2Data' });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Care2Data\'s accessibility commitment — standards, conformance status, and how to request accommodations.'
    });
  }
}
