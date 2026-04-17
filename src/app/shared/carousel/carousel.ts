import { Component, Input, Output, EventEmitter, OnDestroy, OnInit, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { CarouselCard, CarouselPosition, CarouselPositionKey } from './carousel.types';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel implements OnInit, OnDestroy {
  @Input() cards: CarouselCard[] = [];
  @Input() intervalMs = 5000;
  @Input() positions: Record<CarouselPositionKey, CarouselPosition> = {
    center: { x: 0, z: 0, scale: 1.15, opacity: 1, blur: 0, border: 'rgba(250,204,21,0.6)' },
    left: { x: -220, z: -80, scale: 0.78, opacity: 0.22, blur: 4, border: 'rgba(255,255,255,0.06)' },
    right: { x: 220, z: -80, scale: 0.78, opacity: 0.22, blur: 4, border: 'rgba(255,255,255,0.06)' },
    hidden: { x: 0, z: -200, scale: 0.5, opacity: 0, blur: 6, border: 'rgba(255,255,255,0.05)' }
  };

  @ContentChild('cardTemplate') cardTemplate: TemplateRef<any> | undefined;

  @Output() activeChange = new EventEmitter<number>();

  active = 0;
  private timer: ReturnType<typeof setInterval> | undefined;
  private resizeSubscription: Subscription | undefined;
  isMobile = false;
  isTablet = false;

  ngOnInit(): void {
    this.checkDevice();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.checkDevice());
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.resizeSubscription?.unsubscribe();
  }

  private checkDevice(): void {
    const w = window.innerWidth;
    this.isMobile = w < 640;
    this.isTablet = w >= 640 && w < 1024;
  }

  getPos(i: number): CarouselPositionKey {
    const total = this.cards.length;
    const diff = ((i - this.active) % total + total) % total;

    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === total - 1) return 'left';
    return 'hidden';
  }

  shouldShowCard(i: number): boolean {
    return this.getPos(i) !== 'hidden';
  }

  getStyles(i: number): Record<string, string | number> {
    const pos = this.positions[this.getPos(i)];
    const type = this.getPos(i);

    let scale = pos.scale;

    if (this.isMobile) {
      scale = type === 'center' ? 0.9 : 0.8;
    } else if (this.isTablet) {
      scale = type === 'center' ? 1 : 0.85;
    } else {
      scale = type === 'center' ? 1.1 : 0.9;
    }

    return {
      transform: `translateX(${pos.x}px) translateZ(${pos.z}px) scale(${scale})`,
      opacity: pos.opacity,
      filter: `blur(${pos.blur}px)`,
      borderColor: pos.border,
      zIndex: type === 'center' ? 5 : type === 'hidden' ? 0 : 2
    };
  }

  go(dir: number): void {
    const total = this.cards.length;
    this.active = ((this.active + dir) % total + total) % total;
    this.resetTimer();
    this.activeChange.emit(this.active);
  }

  goTo(i: number): void {
    this.active = i;
    this.resetTimer();
    this.activeChange.emit(this.active);
  }

  onCardClick(i: number): void {
    if (i !== this.active) {
      this.active = i;
      this.resetTimer();
      this.activeChange.emit(this.active);
    }
  }

  private startAutoSlide(): void {
    this.timer = setInterval(() => this.go(1), this.intervalMs);
  }

  private resetTimer(): void {
    clearInterval(this.timer);
    this.startAutoSlide();
  }
}
