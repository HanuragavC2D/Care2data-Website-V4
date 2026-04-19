import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { getCanonicalUrl, SITE_CONFIG } from '../../shared/site-config';

@Component({
  selector: 'app-synthetic-gen',
  imports: [MatIconModule, RouterModule, CommonModule],
  templateUrl: './synthetic-gen.html',
  styleUrl: './synthetic-gen.scss',
})
export class SyntheticGen {

  @ViewChild('videoRef') video!: ElementRef<HTMLVideoElement>;

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {

    // Change Page Title
    this.titleService.setTitle(
      'Care2Data | Synthetic Data Generation'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'og:description',
      content: 'Care2Data’s synthetic data generation solution creates realistic, diverse datasets for training and testing machine learning models in healthcare.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('trialgen')
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Synthetic data generation, Healthcare synthetic datasets, AI training data, Machine learning in healthcare, Data privacy, Realistic synthetic data, Clinical data simulation, Healthcare data augmentation, Synthetic patient records, Privacy-preserving data generation'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Care2Data | Synthetic Data Generation'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Care2Data’s synthetic data generation solution creates realistic, diverse datasets for training and testing machine learning models in healthcare.'
    });

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
