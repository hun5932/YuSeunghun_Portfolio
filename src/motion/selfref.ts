// ═══════════════════════════════════════════════════════════════════════════
// motion/selfref.ts — 시안 C「자기참조」 모션
// ───────────────────────────────────────────────────────────────────────────
// ① 글리치 RGB-split 캔버스  ② 재귀 포탈 전환(clip-path)
// 전부 pointer:fine + prefers-reduced-motion 게이트. 미충족 시 캔버스/오버레이를
// 아예 만들지 않아 <img> 원본·일반 링크가 그대로 동작(프로그레시브 인핸스먼트).
//
// 글리치 완화(스펙 C-1 전부):
//   · DPR 상한 2 캡        — 레티나 거대 버퍼 방지
//   · hover 게이트 rAF     — 마우스 올렸을 때만 애니(평시 CPU 0)
//   · IntersectionObserver — 오프스크린이면 rAF 정지
//   · idle 정지            — 비-hover 시 drawStatic 1회로 정적, rAF 취소
//   · getImageData 미사용  — drawImage 합성만 → CORS 태인트/보안오류 회피
//   · 리스너/observer 해제  — cleanup 에서 전부 정리(velocita 누수 버그 예방)
// ═══════════════════════════════════════════════════════════════════════════

const prefersReduce = (): boolean =>
  matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFine = (): boolean => matchMedia('(pointer: fine)').matches;

// ─── ① 글리치 RGB-split ─────────────────────────────────────────────────────
/**
 * [data-glitch] 안의 <img> 위에 캔버스를 얹어 hover 시 RGB 크로마 스플릿 글리치.
 * 채널 분리는 오프스크린 캔버스에 색을 multiply 로 입힌 뒤 main 에 screen 합성 →
 * 두 채널이 겹치면 원본, 어긋나면 적/청 분리(getImageData 불필요).
 */
export function initGlitch(root: ParentNode = document): () => void {
  if (prefersReduce() || !isFine()) return () => {};
  const cleanups: Array<() => void> = [];

  root.querySelectorAll<HTMLElement>('[data-glitch]').forEach((host) => {
    const img = host.querySelector('img');
    if (!(img instanceof HTMLImageElement)) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'glitch-canvas';
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // 채널 틴트용 오프스크린(1개 재사용 — 프레임당 재할당 없음)
    const tmp = document.createElement('canvas');
    const tctx = tmp.getContext('2d');
    if (!tctx) return;
    host.appendChild(canvas);

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // DPR 상한 2 캡
    let raf = 0;
    let hovering = false;
    let onScreen = true;

    const size = (): void => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      canvas.width = tmp.width = Math.max(1, Math.round(w * dpr));
      canvas.height = tmp.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawStatic = (): void => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h); // 정적 1프레임 — 이후 rAF 없음(CPU 0)
    };

    // 한 채널(색) 을 dx 만큼 밀어 그림: 오프스크린에 원본→color multiply→main 에 screen
    const drawChannel = (color: string, dx: number, w: number, h: number): void => {
      tctx.globalCompositeOperation = 'source-over';
      tctx.clearRect(0, 0, w, h);
      tctx.drawImage(img, 0, 0, w, h);
      tctx.globalCompositeOperation = 'multiply';
      tctx.fillStyle = color;
      tctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'screen';
      ctx.drawImage(tmp, dx, 0, w, h);
    };

    const drawGlitch = (): void => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      const shift = (Math.random() * 2 - 1) * 12; // ±12px 크로마틱 어버레이션
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      drawChannel('#FF0000', shift, w, h);   // red 채널 →
      drawChannel('#00FFFF', -shift, w, h);  // cyan 채널 ← (겹치면 원본 복원)
      // 랜덤 수평 슬라이스 몇 조각을 어긋나게 덧그림 → 스캔라인 찢김
      ctx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < 3; i++) {
        const sy = Math.random() * h;
        const sh = 4 + Math.random() * 18;
        const off = (Math.random() * 2 - 1) * 22;
        ctx.drawImage(img, 0, sy, w, sh, off, sy, w, sh);
      }
    };

    const tick = (): void => {
      if (!hovering || !onScreen || prefersReduce()) { // idle → 정적 후 정지
        drawStatic();
        raf = 0;
        return;
      }
      drawGlitch();
      raf = requestAnimationFrame(tick);
    };
    const start = (): void => { if (!raf) raf = requestAnimationFrame(tick); };
    const stop = (): void => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

    // hover 게이트
    const onEnter = (): void => { hovering = true; if (onScreen) start(); };
    const onLeave = (): void => { hovering = false; /* tick 이 스스로 정적 후 정지 */ };
    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointerleave', onLeave);

    // 오프스크린 정지
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (!onScreen) { stop(); }
        else if (hovering) { start(); }
      },
      { threshold: 0 }
    );
    io.observe(host);

    // 리사이즈 → 버퍼 재설정 후 정적 1프레임
    const ro = new ResizeObserver(() => { size(); if (!raf) drawStatic(); });
    ro.observe(host);

    // 초기화: 이미지 로드 후 사이즈+정적
    const boot = (): void => { size(); drawStatic(); };
    if (img.complete) boot();
    else img.addEventListener('load', boot, { once: true });

    cleanups.push(() => {
      stop();
      io.disconnect();
      ro.disconnect();
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointerleave', onLeave);
      canvas.remove();
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

// ─── ② 재귀 포탈 전환 ────────────────────────────────────────────────────────
/**
 * [data-portal] 요소 클릭 시 클릭 좌표에서 원형 clip-path 가 확장되며 화면을 덮고
 * 목표 URL 로 이동(재귀적 줌-인 전환). reduced-motion/터치 시 기본 내비게이션 유지.
 */
export function initPortal(root: Document = document): () => void {
  if (prefersReduce() || !isFine()) return () => {};

  const onClick = (e: MouseEvent): void => {
    const trigger = (e.target as Element | null)?.closest('[data-portal]');
    if (!(trigger instanceof HTMLElement)) return;
    const href = trigger.getAttribute('href') || trigger.dataset.portal || '';
    if (!href) return;
    e.preventDefault();

    const ov = document.createElement('div');
    ov.className = 'portal-overlay';
    ov.style.setProperty('--click-x', `${e.clientX}px`);
    ov.style.setProperty('--click-y', `${e.clientY}px`);
    document.body.appendChild(ov);

    const go = (): void => { window.location.href = href; };
    ov.addEventListener('transitionend', go, { once: true });
    window.setTimeout(go, 700); // transitionend 미발화 대비 폴백
    requestAnimationFrame(() => ov.classList.add('is-open')); // 다음 프레임에 전이 트리거
  };

  root.addEventListener('click', onClick);
  return () => root.removeEventListener('click', onClick);
}

// ─── 통합 진입점 ─────────────────────────────────────────────────────────────
/** 글리치 + 포탈을 함께 초기화하고 통합 정리 함수를 반환. */
export default function initSelfref(): () => void {
  const a = initGlitch();
  const b = initPortal();
  return () => { a(); b(); };
}
