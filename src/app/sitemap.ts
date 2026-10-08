import { MetadataRoute } from 'next';
import { MOCK_PRODUCTS, MARKETS } from '@/data/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.branda.com.ng';
  const markets = Object.keys(MARKETS);

  // Home pages for each market
  const marketUrls = markets.map((market) => ({
    url: `${baseUrl}/${market}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // Product pages for each market
  const productUrls = markets.flatMap((market) =>
    MOCK_PRODUCTS.map((product) => ({
      url: `${baseUrl}/${market}/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...marketUrls,
    ...productUrls,
  ];
}
