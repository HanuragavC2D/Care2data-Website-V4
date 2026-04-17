import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { JobOpening } from '../../shared/types/content.types';
import { getCanonicalUrl, SITE_CONFIG } from '../../shared/site-config';

@Component({
  selector: 'app-careers',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,
    CommonModule, ReactiveFormsModule, HttpClientModule, MatButtonModule, MatIconModule],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers implements OnInit {

  openingRoles: JobOpening[] = [
    {
      jobtitle: 'Clinical Data Analyst',
      department: 'Clinical Data Management',
      location: 'Chennai',
      description: 'Analyze and interpret clinical datasets, ensure data quality, and generate insights supporting clinical trials and healthcare analytics.'
    },
    {
      jobtitle: 'SAS Programmer',
      department: 'Biostatistics & Programming',
      location: 'Chennai',
      description: 'Develop and maintain SAS programs for clinical trial data analysis, reporting, and regulatory submissions.'
    },
    {
      jobtitle: 'Data Validation Specialist',
      department: 'Data Quality & Compliance',
      location: 'Chennai',
      description: 'Design and execute validation checks to ensure accuracy, consistency, and regulatory compliance of clinical datasets.'
    },
    {
      jobtitle: 'Data Engineer',
      department: 'Data Engineering',
      location: 'Chennai',
      description: 'Build scalable data pipelines, manage clinical data infrastructure, and enable efficient data processing and integration.'
    },
    {
      jobtitle: 'Business Analyst',
      department: 'Business & Strategy',
      location: 'Chennai',
      description: 'Gather and analyze business requirements, translate them into data-driven solutions, and support strategic decision-making.'
    },
    {
      jobtitle: 'Internships',
      department: 'Multiple Departments',
      location: 'Chennai',
      description: 'Opportunity for students and fresh graduates to gain hands-on experience in clinical data, analytics, programming, and healthcare technology.'
    }
  ];

  contactForm!: FormGroup;
  submitted = false;
  isLoading = false;
  constructor(private fb: FormBuilder, private titleService: Title, private metaService: Meta,
    private http: HttpClient, private toastr: ToastrService
  ) { }

  ngOnInit() {

    // Change Page Title
    this.titleService.setTitle(
      'Careers | Care2Data'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'description',
      content: 'Join Care2Data and build the future of clinical data intelligence. Explore career opportunities in data engineering, regulatory affairs, and knowledge systems.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('careers')
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Care2Data careers, Data engineering jobs, Regulatory affairs jobs, Healthcare careers, Clinical data jobs, Knowledge systems roles, Life sciences careers, Data validation jobs'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Careers | Care2Data'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Join Care2Data and build the future of clinical data intelligence. Explore career opportunities in data engineering, regulatory affairs, and knowledge systems.'
    });

    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z ]+$')
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      organization: [''],
      interest: ['', Validators.required],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ]
    });
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  applyJobs(job: JobOpening): void {
    // Set the selected position in the dropdown
    this.contactForm.patchValue({
      interest: job.jobtitle
    });

    // Scroll to the form with smooth behavior
    setTimeout(() => {
      const element = document.getElementById('applicationForm');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  selectedFile: File | null = null;
  pageSize = 5;
  currentPage = 1;


  get paginatedArticles() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.openingRoles.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.openingRoles.length / this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < 5) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    const allowed = ['application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (!allowed.includes(file.type)) {
      this.toastr.error('Only PDF or Word files allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.toastr.error('File must be under 5MB');
      return;
    }

    this.selectedFile = file;
  }

  onSubmit() {

    this.submitted = true;

    if (!this.selectedFile) {
      this.toastr.error('Please upload your CV');
      return;
    }

    if (!this.contactForm.valid) {
      this.toastr.error('Please fill all required fields.');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();

    formData.append('Name', this.contactForm.value.name);
    formData.append('Email', this.contactForm.value.email);
    formData.append('Mobile Number', this.contactForm.value.phone);
    formData.append('Company/Organization', this.contactForm.value.organization || '');
    formData.append('Position Applied For', this.contactForm.value.interest);
    formData.append('Cover Letter', this.contactForm.value.message);

    formData.append('attachment', this.selectedFile);

    formData.append('_captcha', 'false');
    formData.append('_subject', 'Care2Data : New Job Application');

    this.http.post(
      'https://formsubmit.co/ajax/hr@care2data.com',
      formData
    ).subscribe({
      next: () => {

        this.toastr.success('Application submitted successfully!');
        this.contactForm.reset();
        this.selectedFile = null;
        this.isLoading = false;

      },
      error: (err) => {

        console.error(err);   // check real error
        this.toastr.error('Something went wrong!');
        this.isLoading = false;

      }
    });

  }

  scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
}
