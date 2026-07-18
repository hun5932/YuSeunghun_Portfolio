// ═══════════════════════════════════════════════════════════════════════════
// motion/tradition.ts — 시안 B「전통 × 현대」 모션
// ───────────────────────────────────────────────────────────────────────────
// 한지 그레인은 tradition.css 가 정적 SVG feTurbulence 를 body 배경에 베이크하므로
// 런타임 JS 가 필요 없다 → 기본 export 는 no-op(정적 SVG 로 충분).
// bakeHanjiGrain() 은 '더 고운/커스텀 그레인'이 필요할 때만 쓰는 선택 유틸:
// 캔버스에 노이즈를 1회 렌더해 data-URI 로 구워 CSS 변수(--pf-grain)에 주입한다
// (무한 rAF 아님 — 단발 렌더).
// ═══════════════════════════════════════════════════════════════════════════

/** 기본 진입점 — 정적 SVG 그레인으로 충분하므로 아무 것도 하지 않고 정리 함수만 반환. */
export default function initTradition(): () => void {
  return () => {};
}

/**
 * (선택) 한지 그레인을 캔버스로 1회 베이크해 --pf-grain data-URI 로 주입.
 * @param opacity 노이즈 알파(0~1, 기본 0.05)  @param tile 타일 한 변 px(기본 140)
 * @returns 주입한 data-URI 문자열 (실패 시 빈 문자열)
 */
export function bakeHanjiGrain(opacity = 0.05, tile = 140): string {
  const cv = document.createElement('canvas');
  cv.width = cv.height = tile;
  const ctx = cv.getContext('2d');
  if (!ctx) return '';                         // 캔버스 미지원 → 정적 SVG 폴백 유지
  const img = ctx.createImageData(tile, tile); // 픽셀 노이즈 1회 생성
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = (Math.random() * 255) | 0;       // 회색(웜톤 중립) 노이즈
    d[i] = d[i + 1] = d[i + 2] = v;
    d[i + 3] = (opacity * 255) | 0;            // 저밀도 알파
  }
  ctx.putImageData(img, 0, 0);
  const uri = `url("${cv.toDataURL('image/png')}")`;
  document.documentElement.style.setProperty('--pf-grain', uri); // 원할 때 CSS 에서 소비
  return uri;
}
