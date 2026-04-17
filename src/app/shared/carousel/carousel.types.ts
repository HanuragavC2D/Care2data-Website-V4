export interface CarouselCard {
  icon: string;
  title: string;
  description?: string;
  link?: string;
  fragment?: string;
}

export interface CarouselPosition {
  x: number;
  z: number;
  scale: number;
  opacity: number;
  blur: number;
  border: string;
}

export type CarouselPositionKey = 'center' | 'left' | 'right' | 'hidden';
