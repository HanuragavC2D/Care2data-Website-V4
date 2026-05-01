import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Footer } from './shared/footer/footer';
import { Navbar } from './shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CommonModule,
    MatSlideToggleModule, FormsModule, MatExpansionModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('kwalify-website');
  private readonly destroy$ = new Subject<void>();
  activePanel: 'essential' | 'targeting' | 'performance' | 'functional' | null = null;
  showBanner = false;
  showSettings = false;
  analyticsEnabled = false;
  targetingEnabled = false;
  performanceEnabled = false;
  functionalEnabled = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.destroy$))
      .subscribe((e: any) => {
        // Don't reset scroll when navigating to a fragment anchor
        if (!e.urlAfterRedirects?.includes('#')) {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }

        // Fire GA4 page_view on every SPA navigation
        if (this.analyticsEnabled && (window as any).gtag) {
          (window as any).gtag('event', 'page_view', {
            page_path: e.urlAfterRedirects,
            page_title: document.title
          });
        }
      });
  }

  ngOnInit() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase();
      if (['input', 'textarea', 'select'].includes(tag)) return;
      const amount = window.innerHeight * 0.85;
      if (e.key === 'PageDown') {
        e.preventDefault();
        document.documentElement.scrollTop += amount;
        document.body.scrollTop += amount;
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        document.documentElement.scrollTop -= amount;
        document.body.scrollTop -= amount;
      }
    }, { capture: true });

    // Restore saved consent and update GTM consent state
    const stored = localStorage.getItem('cookieConsent');
    if (!stored) {
      this.showBanner = true;
      return;
    }

    try {
      const data = JSON.parse(stored);
      this.analyticsEnabled   = data.analytics   ?? false;
      this.targetingEnabled   = data.targeting   ?? false;
      this.performanceEnabled = data.performance ?? false;
      this.functionalEnabled  = data.functional  ?? false;
      this.updateConsent();
    } catch {
      localStorage.removeItem('cookieConsent');
      this.showBanner = true;
    }
  }

  // ── Push consent update to GTM dataLayer ──────────────────────
  private updateConsent(): void {
    const gtag = (window as any).gtag;
    if (!gtag) return;

    gtag('consent', 'update', {
      analytics_storage:       this.analyticsEnabled   ? 'granted' : 'denied',
      ad_storage:              this.targetingEnabled   ? 'granted' : 'denied',
      ad_user_data:            this.targetingEnabled   ? 'granted' : 'denied',
      ad_personalization:      this.targetingEnabled   ? 'granted' : 'denied',
      functionality_storage:   this.functionalEnabled  ? 'granted' : 'denied',
      personalization_storage: this.functionalEnabled  ? 'granted' : 'denied',
      security_storage:        'granted'
    });

    // Also push to dataLayer for GTM custom triggers
    (window as any).dataLayer?.push({
      event: 'consent_update',
      analytics_storage:       this.analyticsEnabled   ? 'granted' : 'denied',
      ad_storage:              this.targetingEnabled   ? 'granted' : 'denied',
      functionality_storage:   this.functionalEnabled  ? 'granted' : 'denied',
    });
  }

  // ── Save helpers ────────────────────────────────────────────────
  private saveConsent(): void {
    localStorage.setItem('cookieConsent', JSON.stringify({
      analytics:   this.analyticsEnabled,
      targeting:   this.targetingEnabled,
      performance: this.performanceEnabled,
      functional:  this.functionalEnabled
    }));
    this.updateConsent();
  }

  // ── Public actions ──────────────────────────────────────────────
  acceptAll(): void {
    this.analyticsEnabled = this.targetingEnabled =
    this.performanceEnabled = this.functionalEnabled = true;
    this.showBanner = false;
    this.saveConsent();
  }

  rejectAll(): void {
    this.analyticsEnabled = this.targetingEnabled =
    this.performanceEnabled = this.functionalEnabled = false;
    this.showBanner = false;
    this.saveConsent();
  }

  openSettings(): void {
    this.showSettings = true;
  }

  savePreferences(): void {
    this.analyticsEnabled = this.performanceEnabled; // performance toggle drives analytics
    this.showSettings = false;
    this.showBanner  = false;
    this.saveConsent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
