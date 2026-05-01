import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../../shared/services/canonical.service';
import { getCanonicalUrl } from '../../shared/site-config';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.canonicalService.setCanonical(getCanonicalUrl('privacy-policy'));
    this.titleService.setTitle('Privacy Policy | Care2Data');

    this.metaService.updateTag({
      name: 'description',
      content: 'Read Care2Data\'s privacy policy to understand how we collect, use, and protect your data in accordance with GDPR and applicable data protection regulations.'
    });

    this.metaService.updateTag({ name: 'og:url', content: getCanonicalUrl('privacy-policy') });
    this.metaService.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.metaService.updateTag({ property: 'og:title', content: 'Privacy Policy | Care2Data' });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Read Care2Data\'s privacy policy — how we collect, use, and protect your data.'
    });
  }
}
