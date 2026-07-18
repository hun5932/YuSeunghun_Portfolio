---
no: 7
key: infra-lab
cat:
  ko: 금융 인프라
  en: Financial Infra
year: "2026"
track: dev
filter: system
featured: false
title:
  ko: Infra Lab — 인프라 핸즈온 랩 3종
  en: Infra Lab — three hands-on infrastructure labs
sub:
  ko: "무중단은 아키텍처의 산물 — 재현과 실측으로"
  en: "Zero-downtime is a product of architecture — reproduced and measured"
desc:
  ko: web/WAS 3계층 · Kubernetes · SLA/모니터링 — 금융 클라우드 현직에서 SR로 접한 구성을 직접 재현·실측한 학습 랩. 단일 인스턴스 패치와 k8s 롤링 업데이트의 순단 차이를 프로브로 실측했습니다.
  en: web/WAS three-tier, Kubernetes, and SLA/monitoring — a learning lab reproducing and measuring the configurations encountered as SRs on the job in financial cloud. Downtime for single-instance patching vs. k8s rolling updates was measured with probes.
bullets:
  ko:
    - "infra-lab 3종 — 단일 인스턴스 패치 순단 1.2초 vs k8s 무중단 0초 실증 (GitHub 공개 실측)"
    - "web/WAS 3계층 — 세션 실험 · 장애 주입 · 502 vs 504 원인 규명"
    - "NGINX 무중단 패치 대비 k8s 롤링 업데이트(maxUnavailable: 0) 순단 비교"
    - "SLA 툴킷(Python) — 가동률 ↔ 허용 다운타임 왕복 변환 · 이상치 탐지 · 테스트 통과"
    - "Prometheus 알람 pending → firing 라이프사이클 실증"
  en:
    - "infra-lab ×3 — measured 1.2s downtime (single instance) vs 0s (k8s rolling), public on GitHub"
    - "web/WAS three-tier — session experiments, fault injection, root-causing 502 vs 504"
    - "Compared NGINX in-place patching against a k8s rolling update (maxUnavailable: 0)"
    - "SLA toolkit (Python) — availability ↔ allowed-downtime round-trip conversion, outlier detection, passing tests"
    - "Demonstrated the Prometheus alert pending → firing lifecycle"
tech:
  - Docker Compose
  - NGINX
  - Tomcat
  - MySQL
  - Redis
  - kind (k8s)
  - Prometheus
  - Grafana
  - Python
status:
  ko: 랩 3종 구축·실증 완료 · GitHub 공개
  en: Three labs built & validated · public on GitHub
role:
  ko: Solo Builder
  en: Solo builder
links:
  - label: GitHub — infra-lab
    href: https://github.com/hun5932/infra-lab
factIds:
  - INF-01
---

금융 클라우드에서 SR로 만난 구성을 직접 재현하고 순단을 수치로 증명한 랩.
