# 유승훈 · Seunghun Yu

**AI 서비스 기획자 · PM** — 실무 · 연구 · 시스템 3축
_AI Service Planner · PM — practice, research, systems_

문제를 환원하고, 구조로 다시 세우고, 겪은 것을 이해한 것으로 바꿉니다.
📍 Seoul · remote-friendly

**🌐 Live Portfolio → [hun5932.github.io/YuSeunghun_Portfolio](https://hun5932.github.io/YuSeunghun_Portfolio/)**

---

### 세 개의 트랙 · Three tracks

| | | |
|---|---|---|
| 🗂 **Portfolio** | AI 기획 × 인프라 × 연구 통합 | [hun5932.github.io/YuSeunghun_Portfolio](https://hun5932.github.io/YuSeunghun_Portfolio/) |
| 📝 **Research** | 자기참조와 마음 — TRIH 가설 | [self-reference-possibility-of-mind](https://github.com/hun5932/self-reference-possibility-of-mind) |
| 🔧 **Dev** | 미들웨어 · k8s · SLA 핸즈온 랩 | [infra-lab](https://github.com/hun5932/infra-lab) |

---

### Selected Projects

| 프로젝트 | 한 줄 | 스택 |
|---|---|---|
| **JiksaTS Master AI** | LLM 기반 업무 지식 시스템 1인 기획·구축 — 매뉴얼·재무 가이드·프로세스를 지식베이스로 체계화 | LLM · RAG · Knowledge Base |
| **마음들이 (AI PERSO)** | LLM 심리상담·매칭 MVP 총괄 — MMPI-2-RF 프로파일링 (2024 해커톤) | LangChain · LLM |
| **CETANA** | 나전칠기 브랜드 — 등록상표 2건(제20·35류) · 청년창업 정부사업 완주 · APEC 경주 상위 10팀 | Brand · Product |
| **TRIH 논문** | 「자기참조와 마음의 가능성」 — 임계 재귀적 동형성 가설 제안 (학사 졸업논문) | Research · Transformer 분석 |

---

### Research

「자기참조와 마음의 가능성」 · 임계 재귀적 동형성 가설(TRIH) — 시각·청각·논리·계산 4영역 형식 동형성.
본문 약 109,000자 · 참고문헌 70편(peer-reviewed) · 도판 19점 자체 제작 · 영문판 3종.

DOI [10.5281/zenodo.21006608](https://doi.org/10.5281/zenodo.21006608) · ORCID [0009-0000-6161-7563](https://orcid.org/0009-0000-6161-7563) · [OSF](https://osf.io/69fv3/)

### Dev / Infra

`infra-lab` — 금융 클라우드 운영 도메인(SLA · ITSM · 미들웨어 · Kubernetes · 모니터링)을 로컬에서 재현하는 학습 랩. 공개 표준·합성 데이터만 사용.

| 랩 | 하이라이트 |
|---|---|
| [web-was](https://github.com/hun5932/infra-lab/tree/main/web-was) | 단일 인스턴스 패치 순단 **1.2초** 실측 · ip_hash 세션 실증 |
| [k8s-oss](https://github.com/hun5932/infra-lab/tree/main/k8s-oss) | rolling update 순단 **0초** — "무중단 = 아키텍처" 실측 대비 |
| [observability](https://github.com/hun5932/infra-lab/tree/main/observability) | SLA 계산기(Python) · Prometheus 알람 pending→firing 실증 |

---

### This repository

이 저장소는 위 포트폴리오 사이트의 소스입니다.

- [Astro 5](https://astro.build) 정적 사이트 · 콘텐츠 컬렉션 · 한/영 i18n (`/` ko · `/en/` en)
- 디자인: 한지 · 옻칠골드 · 나전보라 팔레트, Noto Serif KR 디스플레이, 전량 인라인 SVG 도판
- 배포: GitHub Actions → GitHub Pages

```bash
npm ci
npm run dev      # http://localhost:4321/YuSeunghun_Portfolio/
npm run build    # dist/
```

---

### Contact

📧 [yshun1595@gmail.com](mailto:yshun1595@gmail.com) · 👤 [github.com/hun5932](https://github.com/hun5932) · 🎬 [Templestay 소개 영상](https://youtu.be/Sv5RCnyo37E)

© 2026 Seunghun Yu. All rights reserved.
