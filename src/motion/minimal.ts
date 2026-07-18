// ═══════════════════════════════════════════════════════════════════════════
// motion/minimal.ts — 시안 A(미니멀) CTA 마그넷 커서
// ───────────────────────────────────────────────────────────────────────────
// 스펙: _analysis/variants-spec.md §「시안 A — 시그니처 모션 · 마그네틱」
//   극절제 마그넷 — 커서가 CTA 근처에 오면 버튼이 커서 쪽으로 0.3배 감쇠 추종.
//   게이트: pointer:fine(마우스류만) + prefers-reduced-motion 존중(둘 다 통과해야 활성).
//   대상: [data-magnet] 속성을 가진 요소(nav 로고·주요 CTA 등, 절제 적용).
//   무JS/터치/모션-비선호 환경에서는 아무 일도 일어나지 않음(정적 렌더 유지).
// ═══════════════════════════════════════════════════════════════════════════

/** 마그넷 커서 초기화 — cleanup 함수 반환(라우트 전환 시 호출해 리스너 해제) */
export function initMagnet(): () => void {
  // 게이트: 세밀 포인터 + 모션 허용. 하나라도 불통이면 no-op cleanup 반환.
  const fine = matchMedia('(pointer: fine)').matches;
  const okMotion = matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if (!fine || !okMotion) return () => {};

  const damp = 0.3; // 감쇠 계수 — 커서 변위의 30%만 추종(절제)
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnet]'));
  const cleanups: Array<() => void> = [];

  for (const el of targets) {
    // 요소 중심 기준 커서 변위를 계산해 translate 적용
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * damp}px, ${dy * damp}px)`;
    };
    // 이탈 시 원위치 복귀(CSS transition 이 부드럽게 감속)
    const onLeave = () => { el.style.transform = 'translate(0, 0)'; };

    el.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.willChange = 'transform';
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    cleanups.push(() => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.style.transform = '';
      el.style.transition = '';
      el.style.willChange = '';
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
