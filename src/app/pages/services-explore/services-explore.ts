import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services-explore',
  imports: [],
  templateUrl: './services-explore.html',
  styleUrl: './services-explore.scss',
})
export class ServicesExplore {
  constructor(private route: ActivatedRoute) { }
  
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          const yOffset = -80; // adjust for fixed header if any
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  }
}
