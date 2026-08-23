// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// GitHub Pages 프로젝트 사이트 — base 필수.
// 내부 링크는 반드시 src/lib/url.ts의 withBase()를 경유할 것 (base 누락 버그 방지).
export default defineConfig({
  site: 'https://hun5932.github.io',
  base: '/YuSeunghun_Portfolio',
  trailingSlash: 'ignore',
  // sitemap: 공개 라우트 전부 색인. (preview 내부 QA 도구는 v4 감사에서 배포 제거됨.)
  integrations: [mdx(), sitemap()],
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: false }, // ko = '/', en = '/en/'
  },
});
