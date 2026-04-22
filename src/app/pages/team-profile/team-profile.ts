import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

interface Leader {
  id: string;
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  tagline: string;
  bio: string[];
  expertise: string[];
}

@Component({
  selector: 'app-team-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './team-profile.html',
  styleUrl: './team-profile.scss',
})
export class TeamProfile implements OnInit {

  leader: Leader | undefined;

  private leaders: Leader[] = [
    {
      id: 'giri',
      name: 'Giri Balasubramanian',
      role: 'Co-Founder',
      photo: 'images/leaders/giri.jpg',
      linkedin: 'https://www.linkedin.com/in/giri-balasubramanian-21a31013/',
      tagline: 'Global leader in clinical data standards, automation, and analytics.',
      bio: [
        'Giri Balasubramanian is an experienced innovative technology leader with over 25 years in product development, specializing in the CRO, Pharma, and Biopharma industries. An alumnus of Marquette University (Math, Stat,    and Computer Science), he is recognized for rolling out an revolutionary product EXACT, a metadata-driven, regulatory-compliant system for SDTM datasets and TFL generations.',
        'Giri Balasubramanian is an experienced technology leader with over 25 years in product development, specializing in clinical research, and Pharma sectors. An alumnus of Marquette University (Math, Stat, and Computer Science), he is recognized as the innovator behind EXACT, a revolutionary metadata-driven product for clinical data standards and Report generations. Currently, he is the CEO & Co-founder of CARE2DATA, focusing on AI-enabled Ontology driven data validation, verification, and clinical trial quality assurance.'
      ],
      expertise: ['Ontology-Driven Validation', 'Clinical Data Standards (SDTM/ADaM)', 'Metadata Architecture', 'AI & Knowledge Graphs', 'Regulatory Submissions', 'CDISC & PhUSE']
    },
    {
      id: 'gopinath',
      name: 'Gopinath Viswanathan',
      role: 'CTO & Co-Founder',
      photo: 'images/leaders/gopinath.jpg',
      linkedin: 'https://www.linkedin.com/in/gopinath-viswanathan-1502607a/',
      tagline: 'Two decades of expertise across pharmaceutical, CRO, and life sciences organizations.',
      bio: [
        'Gopinath Viswanathan is a technology-driven leader with over two decades of experience spanning pharmaceutical, CRO, and life sciences organizations. His career bridges deep clinical domain expertise with a forward-looking focus on intelligent platform design — positioning technology as the foundation for clinical data quality, regulatory defensibility, and operational scale.',
        'As CTO & Co-Founder of CARE2DATA, Gopinath leads the architecture of KWALIFY™ — the company\'s ontology-driven clinical data validation engine — and the development of TrialGen™ for synthetic clinical data generation. With expertise across SDTM, ADaM, knowledge graphs, and explainable AI (XAI), he translates complex clinical data standards into scalable, AI-enabled technology solutions that deliver submission-ready, audit-traceable data intelligence at enterprise scale.'
      ],
      expertise: ['Ontology-Driven Knowledge Modelling', 'Semantic Intelligence & Reasoning', 'KWALIFY™ Platform Architecture', 'Explainable AI (XAI) in Clinical Data', 'Governance-First Platform Design', 'Regulatory Submission Workflows', 'Synthetic Data Generation (TrialGen™)', 'SDTM & ADaM Standards']
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.leader = this.leaders.find(l => l.id === id);

    if (this.leader) {
      this.titleService.setTitle(`${this.leader.name} | Care2Data`);
      this.metaService.updateTag({ name: 'description', content: this.leader.tagline });
    }
  }
}
