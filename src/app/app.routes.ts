import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Careers } from './pages/careers/careers';
import { KnowledgeServices } from './pages/knowledge-services/knowledge-services';
import { Kwalify } from './pages/kwalify/kwalify';
import { News } from './pages/news/news';
import { Engagement } from './pages/engagement/engagement';
import { SyntheticGen } from './pages/synthetic-gen/synthetic-gen';
import { ClinicalIntelligence } from './pages/clinical-intelligence/clinical-intelligence';
import { ServicesExplore } from './pages/services-explore/services-explore';
import { TermsConditions } from './pages/terms-conditions/terms-conditions';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { Accessibility } from './pages/accessibility/accessibility';
import { ModelsExplore } from './pages/models-explore/models-explore';
import { TeamProfile } from './pages/team-profile/team-profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about-us', component: About },
  { path: 'contact-us', component: Contact },
  { path: 'careers', component: Careers },
  { path: 'kwalify', component: Kwalify },
  { path: 'knowledge-services', component: KnowledgeServices },
  { path: 'news', component: News },
  { path: 'engagement-models', component: Engagement },
  { path: 'models-explore', component: ModelsExplore },
  { path: 'trialgen', component: SyntheticGen },
  { path: 'clinical-intelligence', component: ClinicalIntelligence },
  { path: 'services-explore', component: ServicesExplore },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-conditions', component: TermsConditions },
  { path: 'accessibility', component: Accessibility },
  { path: 'team/:id', component: TeamProfile },
  // Wildcard MUST be last
  { path: '**', redirectTo: '' }
];
