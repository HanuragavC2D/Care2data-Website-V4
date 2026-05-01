import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CanonicalService } from '../../shared/services/canonical.service';
import { getCanonicalUrl, SITE_CONFIG } from '../../shared/site-config';

@Component({
  selector: 'app-synthetic-gen',
  imports: [MatIconModule, RouterModule, CommonModule],
  templateUrl: './synthetic-gen.html',
  styleUrl: './synthetic-gen.scss',
})
export class SyntheticGen {

  @ViewChild('videoRef') video!: ElementRef<HTMLVideoElement>;

  constructor(private titleService: Title, private metaService: Meta, private canonicalService: CanonicalService) { }

  ngOnInit(): void {

    this.canonicalService.setCanonical(getCanonicalUrl('trialgen'));

    // Change Page Title
    this.titleService.setTitle(
      'TrialGen™ | Synthetic Clinical Data Generation — Care2Data'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'description',
      content: 'TrialGen™ by Care2Data generates protocol-aligned, CDISC-compliant synthetic clinical trial data — privacy-safe, statistically valid, and ready for feasibility studies, validation testing, and submission pipeline preparation.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('trialgen')
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'TrialGen, synthetic clinical data generation, CDISC synthetic data, SDTM synthetic datasets, ADaM synthetic data, protocol-aligned clinical data, privacy-safe clinical data, synthetic clinical trial data, clinical data simulation, GDPR compliant clinical data, HIPAA clinical data, ICH E6 compliance, clinical trial feasibility data, clinical validation testing data, de-identified clinical datasets, Care2Data TrialGen, clinical data pipeline testing, synthetic patient data clinical trials'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'TrialGen™ | Synthetic Clinical Data Generation — Care2Data'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'TrialGen™ by Care2Data generates protocol-aligned, CDISC-compliant synthetic clinical trial data — privacy-safe, statistically valid, and ready for feasibility studies and validation pipeline testing.'
    });

    this.metaService.updateTag({ name: 'twitter:title', content: 'TrialGen™ | Synthetic Clinical Data Generation — Care2Data' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'TrialGen™ by Care2Data generates CDISC-compliant synthetic clinical trial data — protocol-aligned, privacy-safe, and statistically valid for feasibility and validation testing.' });
  }

  isPlaying = true;
  isMuted = true;

  ngAfterViewInit() {
    const vid = this.video.nativeElement;

    vid.muted = true;
    vid.play().catch(() => { });
  }

  togglePlay() {
    const vid = this.video.nativeElement;

    if (vid.paused) {
      vid.play();
      this.isPlaying = true;
    } else {
      vid.pause();
      this.isPlaying = false;
    }
  }

  toggleMute() {
    const vid = this.video.nativeElement;

    vid.muted = !vid.muted;
    this.isMuted = vid.muted;
  }
}
