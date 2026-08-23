// base path 안전 링크 헬퍼 — GitHub Pages 프로젝트 사이트(/YuSeunghun_Portfolio) 필수.
// 내부 링크·에셋 경로는 반드시 이 헬퍼를 경유한다 (base 누락 = 가장 흔한 GH Pages 버그).

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** '/research' → '/YuSeunghun_Portfolio/research' */
export const withBase = (path: string): string =>
  `${BASE}${path.startsWith('/') ? path : `/${path}`}`;

/** 로케일 접두 링크: localeHref('en', '/research') → '/YuSeunghun_Portfolio/en/research' */
export const localeHref = (locale: 'ko' | 'en', path: string): string =>
  locale === 'ko' ? withBase(path) : withBase(`/en${path === '/' ? '' : path}`);

/** 현재 pathname에서 로케일·순수 경로 분리 (LangSwitcher 경로 보존용) */
export const splitLocale = (pathname: string): { locale: 'ko' | 'en'; path: string } => {
  const p = pathname.replace(BASE, '') || '/';
  if (p === '/en' || p.startsWith('/en/')) {
    return { locale: 'en', path: p.replace(/^\/en/, '') || '/' };
  }
  return { locale: 'ko', path: p };
};
