import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.victoryvelocity.ca',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.victoryvelocity.ca/about',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.victoryvelocity.ca/blog',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.victoryvelocity.ca/blog/the-biggest-shift-in-marketing-since-google-ads',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.victoryvelocity.ca/blog/sound-elite-theatres-case-study',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
