import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Kwalify } from './pages/kwalify/kwalify';
import { KnowledgeServices } from './pages/knowledge-services/knowledge-services';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { SyntheticGen } from './pages/synthetic-gen/synthetic-gen';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'kwalify', component: Kwalify },
  { path: 'trialgen', component: SyntheticGen },
  { path: 'knowledge-services', component: KnowledgeServices },
  { path: 'about-us', component: About },
  { path: 'contact-us', component: Contact },

  // Lazy-loaded — split into separate chunks, loaded only when first visited
  { path: 'careers',            loadComponent: () => import('./pages/careers/careers').then(m => m.Careers) },
  { path: 'news',               loadComponent: () => import('./pages/news/news').then(m => m.News) },
  { path: 'engagement-models',  loadComponent: () => import('./pages/engagement/engagement').then(m => m.Engagement) },
  { path: 'models-explore',     loadComponent: () => import('./pages/models-explore/models-explore').then(m => m.ModelsExplore) },
  { path: 'services-explore',   loadComponent: () => import('./pages/services-explore/services-explore').then(m => m.ServicesExplore) },
  { path: 'clinical-intelligence', loadComponent: () => import('./pages/clinical-intelligence/clinical-intelligence').then(m => m.ClinicalIntelligence) },
  { path: 'privacy-policy',     loadComponent: () => import('./pages/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy) },
  { path: 'terms-conditions',   loadComponent: () => import('./pages/terms-conditions/terms-conditions').then(m => m.TermsConditions) },
  { path: 'accessibility',      loadComponent: () => import('./pages/accessibility/accessibility').then(m => m.Accessibility) },
  { path: 'team/:id',           loadComponent: () => import('./pages/team-profile/team-profile').then(m => m.TeamProfile) },

  // Wildcard MUST be last
  { path: '**', redirectTo: '' }
];
