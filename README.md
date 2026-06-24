# Chord Atlas v2 / Phase 2

ギターコードフォームを、単なる名前検索ではなく **実用性・難易度・使用頻度・ジャズ適性・Family・Usage・Level** で探せるようにするためのライブラリ確認版です。

## Current Status

Phase 2 expanded library.

- 約 270+ templates
- 20 qualities
- Family filter
- Usage filter
- Level filter
- Difficulty filter
- Popularity score
- Jazz score
- Rootless support
- SVG chord renderer

## Project Goal

Chord Atlas v2 は、ギターコードフォームを「押さえ方の一覧」としてではなく、実際の演奏用途に合わせて探索できるコードフォームデータベースにすることを目指します。

優先する価値は次の順です。

1. 実際によく使う
2. 押さえやすい
3. 響きが良い
4. ジャンルや用途に合う
5. 理論的に完全である

特にジャズ用途では、理論的な完全性よりも、実際のコンピングで使いやすい形を優先します。

## File Structure

```text
index.html
README.md
css/
  style.css
js/
  main.js
  chord-data.js
  chord-engine.js
  renderer.js
```

## Data Model

Each chord form should follow this shape:

```js
{
  quality: 'maj9',
  name: 'Rootless 3-7-color-5 maj9',
  frets: [null, null, 2, 4, 3, 3],
  family: 'rootless',
  usage: ['jazz-comping', 'bossa'],
  difficulty: 3,
  popularity: 64,
  jazz: 97,
  level: 4,
  rootless: true,
  tags: ['rootless', 'upper-structure', 'tension']
}
```

## Family Definitions

| Family | Meaning |
|---|---|
| open | 開放弦を含む基本フォーム |
| caged | CAGED由来の移動フォーム |
| shell | root / 3rd / 7th などの骨格フォーム |
| drop2 | Drop2 系ボイシング |
| drop3 | Drop3 系ボイシング |
| rootless | ルート省略フォーム |
| compact | 密集配置の実用フォーム |
| spread | 広い配置のコードメロディ向けフォーム |

## Usage Definitions

| Usage | Meaning |
|---|---|
| beginner | 初心者向け |
| pop | ポップス向け |
| jazz-comping | ジャズ伴奏向け |
| bossa | ボサノバ向け |
| solo-guitar | ソロギター向け |
| funk | ファンク / カッティング向け |
| blues | ブルース向け |
| chord-melody | コードメロディ向け |

## Level Definitions

| Level | Meaning |
|---|---|
| 1 | Open / Shell / Guide tone。まず覚える実用フォーム |
| 2 | CAGED / Compact / 基本Drop2。標準的な伴奏フォーム |
| 3 | Drop3 / Spread / Top-set。ソロギターやコードメロディ向け |
| 4 | Rootless / Altered / Upper-structure。ジャズ実戦向け |

## Qualities in Phase 2

Core:

- maj7
- m7
- 7
- m7b5
- dim7

Phase 2 tension expansion:

- maj9
- m9
- 9
- 13
- 6/9
- m11
- 7sus4
- 7alt

Additional color chords:

- 6
- m6
- mMaj7
- 7b9
- 7#9
- 7#11
- 7b13

## Scoring Philosophy

Recommended score currently combines:

- popularity
- ease / difficulty
- jazz score
- rootless bonus
- level bonus

The point is not mathematical purity. The goal is to put useful, playable, common forms near the top.

## Important Jazz Rules

Jazz chord forms may allow:

- 5th omission
- root omission
- guide-tone emphasis
- 9th / 13th / altered color tones
- compact 3-note or 4-note voicings

This is intentional. Many practical jazz guitar forms are not full six-string theoretical spellings.

## Roadmap

### Phase 1 completed

- Family / Usage / Difficulty / Popularity / Jazz score
- Rootless support
- Core chord types
- Around 100 templates

### Phase 2 current

- Level filter added
- Tension qualities expanded
- Around 270+ generated/seeded templates

### Phase 3 target

Focus on curation and verification.

Planned:

- Hand-curated altered dominant library
- Better verified Drop2 / Drop3 sets
- Song-context examples such as ii-V-I, rhythm changes, blues, bossa
- Favorites / usage count tracking
- Better ranking based on actual user selections

## Development Notes for Future ChatGPT Sessions

When continuing development in another chat, read this README first.

The current priority is **library quality**, not UI decoration.

Recommended next steps:

1. Inspect `js/chord-data.js`.
2. Replace generated forms with more hand-curated real-world voicings where needed.
3. Keep `family`, `usage`, `difficulty`, `popularity`, `jazz`, and `level` on every entry.
4. Do not remove rootless forms; they are central to the jazz direction.
5. Keep GitHub Pages compatibility: no build step, plain HTML/CSS/JS modules only.

