import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,
    CommonModule, ReactiveFormsModule, HttpClientModule, MatButtonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  contactForm!: FormGroup;
  submitted = false;
  isLoading = false;
  constructor(private fb: FormBuilder, private titleService: Title, private metaService: Meta,
    private http: HttpClient, private toastr: ToastrService
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
      content: 'https://gokulgovindharaj.github.io/Care2Data-Website/#/contact-us'
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
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    if (this.contactForm.valid) {
      const formData = {
        'Name': this.contactForm.value.name,
        'Email ID': this.contactForm.value.email,
        'Organization Name': this.contactForm.value.organization,
        'Area of Interest': this.contactForm.value.interest,
        'Message': this.contactForm.value.message,
        _captcha: "false",
        _subject: "Care2Data : New Contact Message"
      };

      this.http.post(
        'https://formsubmit.co/ajax/admin@care2data.com',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      ).subscribe({
        next: () => {
          this.toastr.success('Message sent successfully!');
          this.contactForm.reset();
          this.isLoading = false;
        },
        error: (err) => {

          this.toastr.error('Something went wrong!');
          this.isLoading = false;
        }
      });
    } else {
      this.toastr.error('Please fill all required fields.');
      this.isLoading = false;
    }
  }
}
