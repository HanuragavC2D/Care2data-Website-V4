export interface JobOpening {
  jobtitle: string;
  department: string;
  location: string;
  description: string;
}

export interface NewsArticle {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  link: string;
  image: string;
}

export interface CarouselCard {
  icon: string;
  title: string;
  subtitle?: string;
  description?: string;
  description1?: string;
  footer?: string;
  list?: string[];
  link?: string;
  fragment?: string;
}

export interface KnowledgeServiceCard {
  icon: string;
  title: string;
  subtitle?: string;
  description?: string;
  list?: string[];
  link?: string;
  fragment?: string;
}
