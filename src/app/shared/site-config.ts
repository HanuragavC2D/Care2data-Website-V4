// Site configuration - update this when deploying to a new domain
export const SITE_CONFIG = {
  baseUrl: 'https://www.care2data.com',
  siteName: 'Care2Data',
  author: 'Care2Data',
  ogImage: 'https://www.care2data.com/assets/Care2data.jpg',
};

/**
 * Generates the full canonical URL for a given route path.
 * Example: getCanonicalUrl('contact-us') => 'https://www.care2data.com/#/contact-us'
 */
export function getCanonicalUrl(path: string): string {
  return `${SITE_CONFIG.baseUrl}/#/${path}`;
}
