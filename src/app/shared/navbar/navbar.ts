import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isMenuOpen = false;
  solutionsDropdownOpen = false;
  productDropdownOpen = false;
  mobileSolutionsOpen = false;
  mobileProductOpen = false;

  constructor(private router: Router) { }

  ngOnInit() {
    // Close dropdown after navigation completes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.solutionsDropdownOpen = false;
        this.productDropdownOpen = false;
      }
    });
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
