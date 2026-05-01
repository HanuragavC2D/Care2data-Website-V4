// Site configuration - update this when deploying to a new domain
export const SITE_CONFIG = {
  baseUrl: 'https://care2data.com',
  siteName: 'Care2Data',
  author: 'Care2Data',
  ogImage: 'https://care2data.com/assets/Care2data.jpg',
};

/**
 * Generates the full canonical URL for a given route path.
 * Example: getCanonicalUrl('kwalify') => 'https://care2data.com/kwalify'
 */
export function getCanonicalUrl(path: string): string {
  if (!path || path === 'home') return SITE_CONFIG.baseUrl;
  return `${SITE_CONFIG.baseUrl}/${path}`;
}
