// ★ 4시안 매니페스트 — 디자인 시스템의 단일 진실원.
// 시안 추가 = 여기 항목 1개 + styles/variants/*.css 1개 (+선택: motion/*.ts).
// data-variant(html 속성) = 디자인 시스템 선택 / data-theme = 그 안의 색모드(직교 축).

export type VariantId = 'minimal' | 'tradition' | 'selfref' | 'classic' | 'v2evolved';

export interface VariantDef {
  id: VariantId;
  label: { ko: string; en: string };
  tagline: { ko: string; en: string };
  /** styles/variants/{cssFile} — BaseLayout에서 조건 로드 */
  cssFile: string;
  /** motion/{motionModule}.ts — 해당 시안에서만 지연 로드. null = CSS-only */
  motionModule: string | null;
  /** 이 시안의 기본 색모드 (data-theme 초기값) */
  defaultTheme: 'light' | 'dark';
}

export const VARIANTS: VariantDef[] = [
  {
    id: 'minimal',
    label: { ko: '미니멀', en: 'Minimal' },
    tagline: { ko: '한지와 금 — 절제 위의 시그니처 한 획', en: 'Hanji & gold — one signature stroke on restraint' },
    cssFile: 'minimal.css',
    motionModule: 'minimal', // CTA 마그넷 커서만 (scroll-driven은 CSS)
    defaultTheme: 'light',
  },
  {
    id: 'tradition',
    label: { ko: '전통 × 현대', en: 'Tradition × Modern' },
    tagline: { ko: '옻칠의 깊이, 자개의 빛 — 벤토 그리드', en: 'Ottchil depth, nacre light — bento grid' },
    cssFile: 'tradition.css',
    motionModule: 'tradition', // 한지 그레인 canvas + 자개 shimmer
    defaultTheme: 'light',
  },
  {
    id: 'selfref',
    label: { ko: '자기참조', en: 'Self-Reference' },
    tagline: { ko: '이상한 고리 — 재귀·글리치·야간', en: 'Strange loop — recursion, glitch, night' },
    cssFile: 'selfref.css',
    motionModule: 'selfref', // 회전 링 + 글리치 (velocit 계열 포팅)
    defaultTheme: 'dark',
  },
  {
    id: 'classic',
    label: { ko: '클래식', en: 'Classic' },
    tagline: { ko: '세리프 에디토리얼 — 정통, 무장식, 인쇄 완벽', en: 'Serif editorial — timeless, unadorned, print-perfect' },
    cssFile: 'classic.css',
    motionModule: null, // 무모션 (정제된 CSS 페이드만)
    defaultTheme: 'light',
  },
  {
    id: 'v2evolved',
    label: { ko: 'v2 에볼브드', en: 'v2 Evolved' },
    tagline: { ko: '한지·옻칠골드·나전보라 — 기존 v2의 계승과 진화', en: 'Hanji, ottchil gold, najeon violet — the live v2, evolved' },
    cssFile: 'v2evolved.css',
    motionModule: null, // CSS-only (히어로 회전·마퀴·펄스 전부 순 CSS)
    defaultTheme: 'light',
  },
];

/** 채택 시안 — P7 게이트에서 사용자 선택 후 변경. 나머지는 /preview/에 존치.
    이 폴더(v2evolved 별도 clone)의 홈은 v2evolved 로 뜬다. */
export const DEFAULT_VARIANT: VariantId = 'v2evolved';

export const getVariant = (id: string | undefined): VariantDef =>
  VARIANTS.find((v) => v.id === id) ?? VARIANTS.find((v) => v.id === DEFAULT_VARIANT)!;
