// 콘텐츠 = 데이터. "프로젝트 추가 = md 1개 추가"를 이 스키마가 계약으로 강제한다.
// 수치(measured facts)는 md에 직접 쓰지 않는다 — src/data/facts.json(0_FACTS 투영)만 참조.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** 한/영 이중 문자열 — 파일 이중화 대신 필드 중첩 (drift 방지) */
const L = z.object({ ko: z.string(), en: z.string() });
const Llist = z.object({ ko: z.array(z.string()), en: z.array(z.string()) });
// 언어중립일 수 있는 라벨/칩(링크 라벨·tech·items). 문자열이면 그대로(기존 md 무해),
// 한글이 섞이면 {ko,en} 객체로 국지화 — 렌더 컴포넌트가 locale 분기로 해석.
const LStr = z.union([z.string(), L]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    no: z.number(), // 표시 순서 (01, 02 …)
    key: z.string(), // 안정 식별자 (jiksats, cetana …)
    cat: L, // 카테고리 라벨 (예: AI 서비스 구축)
    year: z.string(), // '2025' | '2024 — 2026'
    track: z.enum(['planning', 'research', 'dev']),
    // 프로젝트 필터 축 (홈 #works 필터 탭). track 이 커리어 축이라면 filter 는 주제 축.
    //   ai = AI·LLM 서비스 / research = 학제간 연구 / brand = 브랜드·공예 / system = 시스템·인프라
    filter: z.enum(['ai', 'research', 'brand', 'system']),
    featured: z.boolean().default(false), // 메인 홈 상단 노출
    title: L,
    sub: L, // 부제 한 줄
    desc: L, // 카드 설명 2-3문장
    bullets: Llist, // 기여·성과 (facts claim 문구 인용)
    tech: z.array(LStr), // 언어중립 스택은 문자열, 한글 스킬은 {ko,en}
    status: L, // 예: 운영 종료·아카이브 / 투고 준비
    role: L, // 예: 1인 기획·구축
    links: z
      .array(z.object({ label: LStr, href: z.string() })) // 라벨은 문자열 또는 {ko,en}
      .default([]),
    factIds: z.array(z.string()).default([]), // 인용한 0_FACTS claim_id — QA 대조용
    figure: z.string().optional(), // components/svg/figures 슬러그. 없으면 도메인 기본 SVG
    // 실물·증거(evidence) 레이어 — 전부 선택. 없이도 빌드되게 optional 필수(기존 md 무해).
    //   images: 로컬 산출물 캡처(경로는 base 없는 절대경로 '/assets/...' → 렌더 시 withBase 적용)
    //   videos: 외부 영상(유튜브 등) — 임베드 대신 로컬 썸네일 링크 카드로 렌더
    //   note:   증거 보충 메모(요청 시 제공, 추후 추가 예정 등)
    evidence: z
      .object({
        images: z
          .array(
            z.object({
              src: z.string(),
              alt: z.string(),
              caption: L,
            })
          )
          .optional(),
        videos: z
          .array(
            z.object({
              url: z.string().url(),
              title: L,
            })
          )
          .optional(),
        note: L.optional(),
      })
      .optional(),
  }),
});

const domains = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/domains' }),
  schema: z.object({
    no: z.number(),
    key: z.string(), // ai | finance-it | research | craft
    k: z.string(), // 모노 eyebrow (예: DOMAIN 01)
    title: L,
    desc: L,
    items: z.array(LStr), // 대표 키워드 3-4개 (언어중립 문자열 또는 {ko,en})
  }),
});

const trih = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/trih' }),
  schema: z.object({
    no: z.number(),
    key: z.enum(['escher', 'bach', 'godel', 'transformer']),
    domain: L, // 시각 / 청각 / 논리 / 계산
    figure: L, // Escher / Bach / Gödel / Transformer
    mechanism: L, // 자기참조 메커니즘 한 줄
    detail: L, // 인스펙터 본문
    tag: z.string(), // 모노 태그 (Drawing Hands 등)
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/publications' }),
  schema: z.object({
    key: z.string(),
    year: z.string(),
    title: L,
    titleEn: z.string(), // 원제 (영문 정식 표기)
    venue: L, // 게시처·상태
    authors: z.string(),
    links: z.array(z.object({ label: LStr, href: z.string() })), // 라벨은 문자열 또는 {ko,en}
    abstract: L.optional(),
    bibtex: z.string().optional(), // 추후 .bib 파이프라인 대비
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/timeline' }),
  schema: z.object({
    no: z.number(),
    period: z.string(), // '2026.01 — 현재'는 ko/en 동일 숫자라 단일
    periodEn: z.string().optional(),
    org: L,
    role: L,
    summary: L,
    factIds: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, domains, trih, publications, timeline };
