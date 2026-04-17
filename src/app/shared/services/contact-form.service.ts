import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  interest: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactFormService {
  private readonly endpoint = 'https://formsubmit.co/ajax/admin@care2data.com';

  constructor(private http: HttpClient) {}

  submit(formData: ContactFormData): Observable<any> {
    const payload = {
      'Name': formData.name,
      'Email ID': formData.email,
      'Organization Name': formData.organization,
      'Area of Interest': formData.interest,
      'Message': formData.message,
      _captcha: 'false',
      _subject: 'Care2Data : New Contact Message',
    };

    return this.http.post(this.endpoint, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
