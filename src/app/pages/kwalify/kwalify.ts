import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { CanonicalService } from '../../shared/services/canonical.service';
import { getCanonicalUrl } from '../../shared/site-config';

@Component({
  selector: 'app-kwalify',
  imports: [MatIconModule, MatExpansionModule, RouterModule, CommonModule],
  templateUrl: './kwalify.html',
  styleUrl: './kwalify.scss',
})
export class Kwalify implements OnInit, OnDestroy {

  isAtStart = false;
  isAtEnd = false;
  private resizeSubscription: Subscription | undefined;
  private scrollSubscription: Subscription | undefined;
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  constructor(private titleService: Title, private metaService: Meta, private ngZone: NgZone, private canonicalService: CanonicalService) { }

  ngOnInit(): void {

    this.canonicalService.setCanonical(getCanonicalUrl('kwalify'));

    // Change Page Title
    this.titleService.setTitle(
      'KWALIFY™ | Intelligent Clinical Data Validation Software'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'description',
      content: 'KWALIFY™ by Care2Data is an ontology-driven clinical data validation platform for CDISC SDTM, ADaM, and SEND domains — delivering explainable AI validation, audit-ready traceability, and FDA submission-ready clinical datasets.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('kwalify')
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'KWALIFY, clinical data validation software, CDISC validation platform, SDTM validation, ADaM validation, SEND validation, 21 CFR Part 11 compliance, ALCOA++ data integrity, explainable AI clinical trials, ontology-based validation, knowledge graph clinical data, cross-domain contextual validation, anomaly detection clinical data, audit-ready clinical datasets, submission-ready clinical data, FDA regulatory submission, clinical data discrepancy detection, CRO validation software, double programming alternative, automated QC clinical trials, root cause analysis clinical data, clinical data integrity platform, GAMP5 validation'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'KWALIFY™ | Intelligent Clinical Data Validation Software'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'KWALIFY™ by Care2Data is an ontology-driven clinical data validation platform for CDISC SDTM, ADaM, and SEND domains — delivering explainable AI validation, audit-ready traceability, and FDA submission-ready clinical datasets.'
    });

    this.metaService.updateTag({ name: 'twitter:title', content: 'KWALIFY™ | Intelligent Clinical Data Validation Software' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'KWALIFY™ by Care2Data — ontology-driven clinical data validation for CDISC SDTM, ADaM, and SEND. Explainable AI, audit-ready traceability, FDA submission-ready datasets.' });

    // BreadcrumbList + WebPage schema
    this.injectSchema('kw-page-schema', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://care2data.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'KWALIFY™', 'item': 'https://care2data.com/kwalify' }
          ]
        },
        {
          '@type': 'WebPage',
          '@id': 'https://care2data.com/kwalify',
          'url': 'https://care2data.com/kwalify',
          'name': 'KWALIFY™ | Intelligent Clinical Data Validation Software',
          'description': 'Ontology-driven clinical data validation platform for CDISC SDTM, ADaM, and SEND domains.',
          'isPartOf': { '@id': 'https://care2data.com/#website' },
          'about': { '@id': 'https://care2data.com/#org' }
        }
      ]
    });

    // FAQ JSON-LD structured data for AIEO
    const existing = document.getElementById('kw-faq-schema');
    if (existing) existing.remove();
    const faqSchema = document.createElement('script');
    faqSchema.id = 'kw-faq-schema';
    faqSchema.type = 'application/ld+json';
    faqSchema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is Kwalify™?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Kwalify™ is an intelligent clinical data validation and verification platform developed by Care2Data to identify discrepancies, inconsistencies, and data integrity issues in clinical trial datasets prior to regulatory submission. It extends beyond submission checks to support the entire clinical trial data lifecycle.' }
        },
        {
          '@type': 'Question',
          'name': 'How does Kwalify™ validate clinical trial data?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Kwalify™ applies semantic relationships, inference techniques, contextual validation, and intelligent rule application to detect both explicit and implicit data inconsistencies. By combining semantic intelligence with explainable AI, the platform evaluates cross-domain relationships, study logic, and regulatory expectations.' }
        },
        {
          '@type': 'Question',
          'name': 'How is Kwalify™ different from double programming?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Traditional double programming relies on duplicate code and manual comparison — time-consuming, resource-intensive, and prone to human variability. Kwalify™ introduces both validation and verification within a unified intelligence layer, detecting inconsistencies and verifying data integrity through anomaly detection and cross-dataset reasoning.' }
        },
        {
          '@type': 'Question',
          'name': 'What does validation and verification mean in Kwalify™?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Validation ensures that clinical data conforms to predefined rules, standards, and regulatory expectations. Verification goes further — identifying hidden inconsistencies, unexpected patterns, and cross-domain conflicts that rules alone may not capture. Together they ensure true data integrity, not just rule compliance.' }
        },
        {
          '@type': 'Question',
          'name': 'Who should use Kwalify™?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Kwalify™ is designed for teams responsible for clinical data quality and submission readiness: Contract Research Organizations (CROs), Pharmaceutical and Biotech Sponsors, Clinical Data Management and Biostatistics Teams, and Quality Assurance and Regulatory Affairs Professionals.' }
        },
        {
          '@type': 'Question',
          'name': 'Is Kwalify™ suitable for regulatory submissions?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Kwalify™ is built to support submission-ready and audit-ready datasets, with embedded traceability, lineage, and explainable validation outputs. The platform aligns with regulatory expectations including 21 CFR Part 11 compliance.' }
        },
        {
          '@type': 'Question',
          'name': 'What types of clinical data does Kwalify™ support?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Kwalify™ supports structured clinical datasets including SDTM, ADaM, derived variables, statistical outputs, and data used for clinical reporting and regulatory submission.' }
        },
        {
          '@type': 'Question',
          'name': 'How does Kwalify™ fit into existing clinical workflows?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Kwalify™ integrates seamlessly with existing clinical systems including EDC platforms, CDMS, and statistical programming environments. It works alongside current workflows, enhancing validation capabilities without requiring system replacement or disruption.' }
        },
        {
          '@type': 'Question',
          'name': 'What measurable impact does Kwalify™ deliver?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '93% of datasets had missing reference ranges in LB domain — surfaced automatically. 79% of cross-domain datasets had unit mismatches — identified through semantic reasoning. 67% of AE domain datasets had duplicate events — detected before submission. 63% of DM records had missing RFSTDTC — traced via cross-domain AI. Validation errors that take 30 minutes to 2 hours manually are resolved with AI-assisted root cause analysis.' }
        },
        {
          '@type': 'Question',
          'name': 'What are the most common challenges in clinical data validation today?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Based on Care2Data\'s survey: 47% of teams report no error prioritisation, 41% report vague error messages, and 35% report difficulty identifying affected records. These gaps reflect reliance on static rule execution. Kwalify™ addresses each through explainable AI outputs, intelligent error prioritisation, and cross-domain impact tracing.' }
        }
      ]
    });
    document.head.appendChild(faqSchema);

    this.checkDevice();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.checkDevice());
  }

  checkDevice() {
    const w = window.innerWidth;

    this.isMobile = w < 640;       // Tailwind sm
    this.isTablet = w >= 640 && w < 1024; // md
  }

  ngAfterViewInit() {
    const el = this.scrollContainer.nativeElement;

    requestAnimationFrame(() => {
      el.scrollLeft = 0;
      this.updateScrollState();

      // ✅ start AFTER layout ready
      setTimeout(() => {
        this.startAutoSlide();
      }, 300);
    });

    this.scrollSubscription = this.ngZone.runOutsideAngular(() =>
      fromEvent(el, 'scroll')
        .pipe(debounceTime(50))
        .subscribe(() => {
          this.ngZone.run(() => this.updateScrollState());
        })
    );
  }

  scroll(direction: 'left' | 'right') {
    const el = this.scrollContainer.nativeElement;

    const cards = el.children;
    const scrollLeft = el.scrollLeft;

    let targetIndex = 0;

    // find current visible card index
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;

      if (card.offsetLeft >= scrollLeft - 5) {
        targetIndex = i;
        break;
      }
    }

    // move index
    if (direction === 'right') {
      targetIndex = Math.min(targetIndex + this.getStep(), cards.length - 1);
    } else {
      targetIndex = Math.max(targetIndex - this.getStep(), 0);
    }

    const targetCard = cards[targetIndex] as HTMLElement;

    el.scrollTo({
      left: targetCard.offsetLeft,
      behavior: 'smooth'
    });
  }

  getStep() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  updateScrollState() {
    const el = this.scrollContainer.nativeElement;

    this.isAtStart = el.scrollLeft < 10;

    this.isAtEnd =
      Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 10;
  }

  isMobile = false;
  isTablet = false;
  cards = [
    {
      icon: 'images/home/white/context-aware.png',
      title: 'Context-Aware Validation',
      subtitle: `Kwalify™ evaluates relationships across domains, variables, and study logic—moving beyond isolated rule checks.`,
      description1: "Validation logic understands study structure, regulatory expectations, and cross-dataset dependencies."
    },
    {
      icon: 'images/about/white/xai.png',
      title: 'Explainable AI',
      subtitle: 'For every validation finding, Kwalify™ generates:',
      list: [
        'Issue summary',
        'Root cause explanation',
        'Impact analysis',
        'Recommended remediation'
      ],
      footer: 'This transforms validation from manual investigation into guided resolution.'
    },
    {
      icon: 'images/kwalify/white/compliancerules.png',
      title: 'Customizable Compliance Rules',
      subtitle: `Beyond regulatory rule libraries, teams can configure study-specific validation rules to enforce additional compliance requirements—ensuring quality, integrity, and conformance alongside regulatory checks.`,
      description1: "This enables organizations to apply internal governance standards alongside regulatory checks."
    },
    {
      icon: 'images/about/white/traceability.png',
      title: 'Traceable by Design',
      subtitle: `Validation lineage, rule logic, and investigation trails are embedded into the architecture.`,
      description1: "Every validation outcome is traceable—supporting regulatory inspections and internal QA review."
    },
    {
      icon: 'images/home/white/ecosystem.png',
      title: 'Works Within Your Ecosystem',
      subtitle: 'Kwalify™ integrates seamlessly with existing clinical systems including:',
      list: [
        'Clinical Data Management Systems (CDMS)',
        'Statistical Computing Environment (SCE)',
        'Meta Data Repository Systems (MDR)'
      ],
      footer: `No rip-and-replace. No disruption.`,
    }
  ];

  active = 0;
  timer: ReturnType<typeof setInterval> | undefined;

  positions = {
    center: { x: 0, z: 0, scale: 1.15, opacity: 1, blur: 0, border: 'rgba(250,204,21,0.6)' },
    left: { x: -420, z: -80, scale: 0.8, opacity: 0.55, blur: 1.5, border: 'rgba(255,255,255,0.1)' },
    right: { x: 420, z: -80, scale: 0.8, opacity: 0.55, blur: 1.5, border: 'rgba(255,255,255,0.1)' },
    hidden: { x: 0, z: -200, scale: 0.5, opacity: 0, blur: 4, border: 'rgba(255,255,255,0.05)' }
  };

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.resizeSubscription?.unsubscribe();
    this.scrollSubscription?.unsubscribe();
  }

  getPos(i: number) {
    const total = this.cards.length;
    const diff = ((i - this.active) % total + total) % total;

    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === total - 1) return 'left';
    return 'hidden';
  }

  getStyles(i: number) {
    const pos = this.positions[this.getPos(i)];
    const type = this.getPos(i);

    let scale = pos.scale;

    if (this.isMobile) {
      scale = type === 'center' ? 0.9 : 0.8;
    } else if (this.isTablet) {
      scale = type === 'center' ? 1 : 0.85;
    } else {
      scale = type === 'center' ? 1.1 : 0.9;
    }

    return {
      transform: `translateX(${pos.x}px) translateZ(${pos.z}px) scale(${scale})`,
      opacity: pos.opacity,
      filter: `blur(${pos.blur}px)`,
      borderColor: pos.border,
      zIndex: type === 'center' ? 5 : type === 'hidden' ? 0 : 2
    };
  }

  go(dir: number) {
    const total = this.cards.length;
    this.active = ((this.active + dir) % total + total) % total;
    this.resetTimer();
  }

  goTo(i: number) {
    this.active = i;
    this.resetTimer();
  }

  onCardClick(i: number) {
    if (i !== this.active) {
      this.active = i;
      this.resetTimer();
    }
  }

  startAutoSlide() {
    this.timer = setInterval(() => this.go(1), 10000);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.startAutoSlide();
  }

  trackByIndex(i: number) { return i; }
}
