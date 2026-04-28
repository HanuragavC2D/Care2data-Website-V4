import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, AfterViewInit, OnDestroy {
  isMenuOpen = false;
  solutionsDropdownOpen = false;
  productDropdownOpen = false;
  mobileSolutionsOpen = false;
  mobileProductOpen = false;
  scrollProgress = 0;
  private routerSub: Subscription | undefined;

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  @HostListener('window:resize')
  onResize() { this.setScrollbarOffset(); }

private setScrollbarOffset() {
    const w = window.innerWidth - document.body.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-w', `${w}px`);
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.solutionsDropdownOpen = false;
        this.productDropdownOpen = false;
      }
    });

  }

  ngAfterViewInit() {
    // Measure after content is rendered so scrollbar is present
    setTimeout(() => this.setScrollbarOffset(), 0);
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  closeDropdown() {
    this.solutionsDropdownOpen = false;
    this.productDropdownOpen = false;
  }

  openDropdown(dropdown: string) {
    if (dropdown === 'solutions') {
      this.solutionsDropdownOpen = true;
    } else if (dropdown === 'product') {
      this.productDropdownOpen = true;
    }
  }

  onDropdownLinkClick() {
    this.closeDropdown();
  }

  toggleMobileDropdown(dropdown: string) {
    if (dropdown === 'solutions') {
      this.mobileSolutionsOpen = !this.mobileSolutionsOpen;
    } else if (dropdown === 'product') {
      this.mobileProductOpen = !this.mobileProductOpen;
    }
  }

  onMobileLinkClick() {
    this.closeMenu();
    this.mobileSolutionsOpen = false;
    this.mobileProductOpen = false;
  }
}
