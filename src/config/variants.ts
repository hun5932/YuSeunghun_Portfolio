// ★ 시안 매니페스트 — 디자인 시스템의 단일 진실원.
// data-variant(html 속성) = 디자인 시스템 선택 / data-theme = 그 안의 색모드(직교 축).
// 두 축의 분리는 유지한다. 시안을 늘릴 땐 여기 항목 1개 + styles/variants/*.css 1개를 함께 추가하고
// BaseLayout 의 import 와 THEME_COLOR 에도 반영한다.
//
// 2026-08-24: 미채택 시안 4종(minimal·tradition·selfref·classic)을 제거했다.
//   전용 라우트가 없어 도달 불가인데 CSS 46KB 가 전량 번들되고 있었다. 필요하면 git 이력에서 복원한다.

export type VariantId = 'v2evolved';

export interface VariantDef {
  id: VariantId;
  label: { ko: string; en: string };
  tagline: { ko: string; en: string };
  /** 이 시안의 기본 색모드 (data-theme 초기값) */
  defaultTheme: 'light' | 'dark';
}

export const VARIANTS: VariantDef[] = [
  {
    id: 'v2evolved',
    label: { ko: 'v2 에볼브드', en: 'v2 Evolved' },
    tagline: { ko: '한지·옻칠골드·나전보라 — 기존 v2의 계승과 진화', en: 'Hanji, ottchil gold, najeon violet — the live v2, evolved' },
    defaultTheme: 'light',
  },
];

/** 채택 시안. */
export const DEFAULT_VARIANT: VariantId = 'v2evolved';

export const getVariant = (id: string | undefined): VariantDef =>
  VARIANTS.find((v) => v.id === id) ?? VARIANTS.find((v) => v.id === DEFAULT_VARIANT)!;
