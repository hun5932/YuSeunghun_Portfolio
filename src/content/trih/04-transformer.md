---
no: 4
key: transformer
domain:
  ko: 계산
  en: Computational
figure:
  ko: 트랜스포머
  en: Transformer
mechanism:
  ko: self-attention이 시퀀스 내부에서 토큰을 자기 자신에 참조
  en: Self-attention lets tokens reference themselves within the sequence
detail:
  ko: self-attention은 시퀀스 내부에서 토큰이 자기 자신과 과거를 가리키게 합니다. induction heads(Olsson 2022) · 단의적 특징(Templeton 2024) · 귀속 그래프(Anthropic 2025)의 삼중 실증이 자기참조 회로를 직접 관찰했고, 임계 규모를 넘으면 emergent abilities(Wei 2022)가 출현합니다. 종래 비유 수준의 담론을 회로 수준에서 입증된 명제로 격상시킨 결정 증거입니다.
  en: Self-attention makes each token attend to itself and its past within the sequence. A triple line of evidence — induction heads (Olsson 2022), monosemantic features (Templeton 2024) and attribution graphs (Anthropic 2025) — directly observes the self-referential circuit, and beyond a threshold scale emergent abilities (Wei 2022) appear. This is the decisive evidence that lifts what was once mere analogy into a claim demonstrated at the circuit level.
tag: Causal mask
---
