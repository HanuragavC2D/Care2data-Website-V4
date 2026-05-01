import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { CanonicalService } from '../../shared/services/canonical.service';
import { getCanonicalUrl } from '../../shared/site-config';

@Component({
  selector: 'app-clinical-intelligence',
  imports: [MatIconModule],
  templateUrl: './clinical-intelligence.html',
  styleUrl: './clinical-intelligence.scss',
})
export class ClinicalIntelligence implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.canonicalService.setCanonical(getCanonicalUrl('clinical-intelligence'));
    this.titleService.setTitle('Clinical Intelligence | Care2Data');

    this.metaService.updateTag({
      name: 'description',
      content: 'Explore Care2Data\'s clinical intelligence solutions — semantic reasoning, cross-domain validation, and knowledge-driven insights that transform clinical trial data into governed, audit-ready evidence.'
    });

    this.metaService.updateTag({ name: 'og:url', content: getCanonicalUrl('clinical-intelligence') });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'clinical intelligence, clinical data insights, semantic clinical reasoning, cross-domain clinical validation, knowledge-driven clinical data, clinical data evidence, ontology clinical intelligence, Care2Data clinical intelligence'
    });

    this.metaService.updateTag({ property: 'og:title', content: 'Clinical Intelligence | Care2Data' });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Care2Data\'s clinical intelligence solutions use semantic reasoning and knowledge graphs to transform clinical trial data into governed, audit-ready evidence.'
    });

    this.metaService.updateTag({ name: 'twitter:title', content: 'Clinical Intelligence | Care2Data' });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: 'Care2Data\'s clinical intelligence solutions use semantic reasoning and knowledge graphs to transform clinical trial data into governed, audit-ready evidence.'
    });
  }
}
