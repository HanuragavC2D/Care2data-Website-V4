import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Footer } from './shared/footer/footer';
import { Navbar } from './shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CommonModule,
    MatSlideToggleModule, ReactiveFormsModule,
    FormsModule, MatExpansionModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('kwalify-website');
  activePanel: 'essential' | 'targeting' | 'performance' | 'functional' | null = null;
  showBanner = false;
  showSettings = false;
  analyticsEnabled = false;
  targetingEnabled = false;
  performanceEnabled = false;
  functionalEnabled = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
  }

  ngOnInit() {

    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
      this.showBanner = true;
      return;
    }

    try {
      const data = JSON.parse(consent);
      this.analyticsEnabled = data.analytics;
    } catch {
      localStorage.removeItem('cookieConsent');
      this.showBanner = true;
    }

  }

  acceptAll() {

    const consent = {
      analytics: true
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consent));

    this.analyticsEnabled = true;
    this.showBanner = false;

    this.loadAnalytics();
  }

  rejectAll() {

    const consent = {
      analytics: false
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consent));

    this.analyticsEnabled = false;
    this.showBanner = false;
  }

  openSettings() {
    this.showSettings = true;
  }

  savePreferences() {
    const consent = {
      analytics: this.analyticsEnabled,
      targeting: this.targetingEnabled,
      performance: this.performanceEnabled,
      functional: this.functionalEnabled
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    this.showSettings = false;
    this.showBanner = false;

    if (this.analyticsEnabled) this.loadAnalytics();
  }

  loadAnalytics() {

    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-7T4BBVXE8K";
    script.async = true;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];

    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }

    gtag('js', new Date());
    gtag('config', 'G-7T4BBVXE8K');

  }
}
