import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [MatIconModule, MatChipsModule, FormsModule, CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {
  selectedCategory = 'all';

  categories = [
    { label: 'All News', value: 'all' },
    { label: 'Research', value: 'Research' },
    { label: 'Company News', value: 'Company News' },
    { label: 'Perspectives', value: 'Perspectives' }
  ];

  articles: any = [
    {
      "id": 1,
      "category": "Research",
      "title": "Care2Data Launches New AI-Driven Health Analytics Platform",
      "description": "Our latest platform integrates longitudinal patient data to provide unprecedented insights into chronic disease management and predictive patient outcomes.",
      "date": "October 24, 2023",
      "link": "https://www.care2data.com",
      "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuD7rDeAH3N2W0Eu7htCz9kfR0ox9PFFDPNMu58anxXo_zDDP4__gZy2blk6Fb4tPY2vfKksC3hVqRU5DjJlhIQCOOFhnjwJjKZeUqLtF7BrJqpVWERSPncyWFO752k_1xzZfIGU0iScegSSMkz2RsLR2yKC7f4rfAK-Qoe_dhACcV1yyurDITrIGieS8EmGogyJzdVVAr_RG8IP418Q2JNNthaHPfIRWiPyG89N12eW4Dhl-qGRrBBlLa26WUdmr7wXtf8E5vLyBUOy"
    },
    {
      "id": 2,
      "category": "Company News",
      "title": "Care2Data Named to 'Top 50 Healthcare Innovators' List",
      "description": "We are honored to be recognized for our commitment to data transparency and patient-centric research tools in the global healthcare space.",
      "date": "October 15, 2023",
      "link": "https://www.care2data.com",
      "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAL4iTfQTG4CuOkWxIQrLYvn9m2dF3E1qLIzkvIc1Fgo1FcPlWhkQMuGGP6xg-CD3Tx-r13MNOqGMfOvmhYb_vb1ZyRloa2k-E2xY4Sr94VWMIDznqJ89GfQ9ZETcuLjZG98C_246lQdmRZmkYOkFV_eyMytIr4VrdqqB6DvPBikchCn70LCql3jaN_MD2V_2h75R26z_IhmD1SwGZQBeopv7iBUDX-5j6aZfDBPkfTqYUQsLap3E6RKThh6WgVa_RyPJAGjteiEG1S"
    },
    {
      "id": 3,
      "category": "Perspectives",
      "title": "The Future of Longitudinal Patient Records",
      "description": "Our CEO explores how secure, structured patient data is changing the landscape of clinical trials and therapeutic development.",
      "date": "October 02, 2023",
      "link": "https://www.care2data.com",
      "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCxFHfibgiqhvzYqre1Fj2rg2tjz3rrmi-gjClwt_-h0Z2oZb3j_t26MNBM7fSbAhKwdI2vDouhrhuwTLnL-l_KffiXB-sdng1v57SpKahiFVxgJqnYTdol4CNidKaJxDVn9hB06JIDj8EyQQOBbeacz_FDrZq0xObLvmcM5S85BI3uPUUF67too18JNhSI3Sel1U7TTC-Feq4S7kMnKQytIAg97lO5DQDvh_lw_zLEG578hoPibWC548omyJ_erPqjS-uMPK-txxII"
    },
    {
      "id": 4,
      "category": "Research",
      "title": "Breakthrough in Genomic Data Integration",
      "description": "New collaborative study highlights the efficacy of integrating genomic markers with real-world clinical data points for precision oncology.",
      "date": "September 22, 2023",
      "link": "https://www.care2data.com",
      "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuB8nZLt0dcUN_aWBLybHVEi1CU2pJRHtN5O-Ac4L_Lh1131rnJFB7LnzJMPTT5HOItJXB6K8jWy-PL1VGDa7AkoJzQp8eh92eICOp5Xifv74uIMK5GxhJypb4wFwiS8EYmU8XYC0pmo2KhMS2LzF5XM5xF9uezxoC1Sq34gtCI81C50CXwhVs17mIPA4FQTQmCyvMx8Nr8WiK0R3r0lEEHa3vNgqNCp-6MOmOPcA1gevOjfJfqLWA_SMljP9SXZOmFoON_ndnHkyC2W"
    },
    {
      "id": 5,
      "category": "Company News",
      "title": "Care2Data Expands Global Partnerships",
      "description": "The company announced new collaborations with international research institutes to expand access to high-quality healthcare datasets.",
      "date": "September 10, 2023",
      "link": "https://www.care2data.com",
      "image": "images/expand_partnerships.png"
    },
    {
      "id": 6,
      "category": "Research",
      "title": "AI Models Improve Early Disease Detection",
      "description": "New machine learning models developed by Care2Data researchers significantly improve early diagnosis rates in chronic conditions.",
      "date": "August 29, 2023",
      "link": "https://www.care2data.com",
      "image": "https://images.unsplash.com/photo-1530497610245-94d3c16cda28"
    },
    {
      "id": 7,
      "category": "Perspectives",
      "title": "Why Data Transparency Matters in Healthcare",
      "description": "Industry experts discuss the importance of transparent data governance in modern clinical research and regulatory submissions.",
      "date": "August 15, 2023",
      "link": "https://www.care2data.com",
      "image": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528"
    },
    {
      "id": 8,
      "category": "Company News",
      "title": "Care2Data Opens New Research Hub",
      "description": "A new innovation hub has been launched to accelerate AI-powered healthcare analytics and data integration research.",
      "date": "July 30, 2023",
      "link": "https://www.care2data.com",
      "image": "https://images.unsplash.com/photo-1579154204601-01588f351e67"
    }
  ]
  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {

    // Change Page Title
    this.titleService.setTitle(
      'News & Insights | Care2Data'
    );

    // Change Meta Description
    this.metaService.updateTag({
      name: 'description',
      content: 'Stay updated with the latest news, research insights, and perspectives from Care2Data on clinical data intelligence and healthcare innovation.'
    });

    // Change Meta url
    this.metaService.updateTag({
      name: 'og:url',
      content: 'https://gokulgovindharaj.github.io/Care2Data-Website/#/news'
    });

    // Change Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Care2Data news, healthcare research insights, clinical data intelligence, healthcare innovation, precision medicine, patient data analytics, clinical trial updates, healthcare technology news'
    });

    // Open Graph Title
    this.metaService.updateTag({
      property: 'og:title',
      content: 'News & Insights | Care2Data'
    });

    // Open Graph Description
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Stay updated with the latest news, research insights, and perspectives from Care2Data on clinical data intelligence and healthcare innovation.'
    });

  }

  pageSize = 5;
  currentPage = 1;

  get filteredArticles() {
    if (this.selectedCategory === 'all') return this.articles;
    return this.articles.filter((a: any) => a.category === this.selectedCategory);
  }

  get totalPages() {
    return Math.ceil(this.filteredArticles.length / this.pageSize);
  }

  get paginatedArticles() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredArticles.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}
