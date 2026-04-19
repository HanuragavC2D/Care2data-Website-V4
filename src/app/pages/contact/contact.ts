import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactFormService } from '../../shared/services/contact-form.service';
import { getCanonicalUrl, SITE_CONFIG } from '../../shared/site-config';

@Component({
  selector: 'app-contact',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule,
    CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  contactForm!: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private metaService: Meta,
    private contactService: ContactFormService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    // Change Page Title
    this.titleService.setTitle(
      'Contact Us | Care2Data'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'og:description',
      content: 'Contact Care2Data for inquiries about clinical data validation software, KWALIFY™ support, and more.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: getCanonicalUrl('contact-us')
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Contact Care2Data, Clinical data validation software inquiry, KWALIFY™ support, Clinical trial data validation questions, Request a demo of KWALIFY™, Clinical data validation consultation, Clinical research software contact, Clinical data integrity support, Clinical trial data validation assistance'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Contact Us | Care2Data'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Contact Care2Data for inquiries about clinical data validation software, KWALIFY™ support, and more.'
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

    // Pre-fill Area of Interest from query param (e.g. ?interest=Request+an+Executive+Demo)
    const preselect = this.route.snapshot.queryParamMap.get('interest');
    if (preselect) {
      this.contactForm.patchValue({ interest: preselect });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.isLoading = true;

    if (this.contactForm.valid) {
      this.contactService.submit(this.contactForm.value).subscribe({
        next: () => {
          this.toastr.success('Message sent successfully!');
          this.contactForm.reset();
          this.isLoading = false;
        },
        error: () => {
          this.toastr.error('Something went wrong!');
          this.isLoading = false;
        },
      });
    } else {
      this.toastr.error('Please fill all required fields.');
      this.isLoading = false;
    }
  }
}
