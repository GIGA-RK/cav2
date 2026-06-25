# Chord Atlas v2 / Phase 4 Broad Coverage

ポップ・ロック系からジャズまで幅広く使えるコードフォーム集を目指す、Chord Atlas v2 の Phase 4 版です。

Phase 4 では、Phase 3 の `Family / Usage / Level / Voice / Slash Bass` 設計を維持したまま、コード品質とテンションのカバー範囲を広げています。

## Current Status

- Phase: 4 Broad Coverage
- 60+ qualities expected in UI
- 1,000+ generated templates expected in UI
- Slash chord / 分数コード対応
- Family filter
- Usage filter
- Level filter
- Voice filter
- Rootless filter
- Difficulty / Popularity / Jazz score sorting

実数はアプリのヘッダーに表示される `templates / qualities / jazz` を参照してください。

## Goal

目的は「とにかく珍しいコードを全部並べること」ではなく、以下です。

- ポップ・ロック・アニソン系でよく使うコードを広くカバーする
- ボサノバ、ファンク、ネオソウル、ジャズで使うテンションコードを扱う
- Shell / Drop2 / Rootless / Compact などの考え方で探せる
- 難易度・使用頻度・ジャンル適性で並び替えられる
- 今後、コード進行・曲単位のUIへ拡張できるデータ構造にする

## GitHub Pages Structure

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

GitHub Pagesでは、この構成をリポジトリ直下に置けば動きます。ビルド不要です。

## Data Model

`js/chord-data.js` は、Quality と Blueprint からフォームを生成しています。

```js
{
  quality: 'maj9',
  name: 'Drop2 5th string root maj9',
  frets: [null, 3, 2, 4, 3, null],
  family: 'drop2',
  voice: 'close',
  usage: ['jazz-comping', 'bossa'],
  difficulty: 3,
  popularity: 76,
  jazz: 95,
  level: 2,
  rootless: false,
  tags: ['drop2', 'maj9', 'tension']
}
```

## Main Metadata Fields

| Field | Meaning |
|---|---|
| quality | コード品質。maj7, m9, 13, 7alt など |
| frets | 6弦から1弦。null はミュート |
| family | フォームの系統 |
| voice | 響き・配置の性格 |
| usage | 使いやすい場面 |
| difficulty | 難易度 1〜5 |
| popularity | 使用頻度 0〜100 |
| jazz | ジャズ適性 0〜100 |
| level | 学習段階 1〜5 |
| rootless | ルート省略フォームか |
| tags | 検索・説明用タグ |

## Phase 4 Quality Coverage

### Pop / Rock / Basic

- maj
- min
- 5相当の扱いは今後追加予定
- sus2
- sus4
- add9
- madd9
- add11
- maj7sus4
- maj9sus4

### Major / Bright Color

- 6
- 6/9
- maj7
- maj9
- maj11
- maj13
- maj7#11
- maj9#11
- maj13#11
- maj7#5
- maj9#5

### Minor

- m6
- m6/9
- m7
- m9
- m11
- m13
- mMaj7
- mMaj9
- m7b5
- m9b5
- m11b5
- m7b9
- m9add11
- m7#5

### Dominant / Jazz / Blues / Funk

- 7
- 9
- 11
- 13
- 7b9
- 7#9
- 7b5
- 7#5
- 7#11
- 7b13
- 9#11
- 9b13
- 9#5
- 9b5
- 13b9
- 13#9
- 13#11
- 13b5
- 13#5
- 7b9b13
- 7#9b13
- 7#9#5
- 7b9#5
- 7b9#11
- 7alt

### Sus / Diminished / Augmented

- 7sus4
- 9sus4
- 13sus4
- 7sus4b9
- 7sus4b13
- 9sus4b13
- dim
- dim7
- dimMaj7
- aug
- aug7
- augadd9

## Family Definitions

| Family | Meaning |
|---|---|
| open | 開放弦を使うフォーム |
| caged | CAGED由来の移動フォーム |
| shell | Root / 3rd / 7th 中心のシェル |
| drop2 | Drop2系の実用ジャズフォーム |
| drop3 | Drop3 / 低音広めのフォーム |
| rootless | ルート省略フォーム |
| compact | 密集配置のコンパクトフォーム |
| spread | 広い配置のフォーム |
| upper-structure | 上部構造・テンション重視 |

## Voice Definitions

| Voice | Meaning |
|---|---|
| basic | 基本的な響き |
| guide-tone | 3rd / 7th 中心 |
| close | 密集した響き |
| spread | 広い響き |
| rootless-color | ルートレス＋テンション |
| upper-structure | 上部構造的な響き |
| quartal | 4度堆積寄り |
| altered | オルタード系 |
| sus | sus系 |

## Important Design Rule

このライブラリは、現時点では「生成フォーム＋一部手動フォーム」のハイブリッドです。

そのため、Phase 4 の次に必要なのは数をさらに増やすことではなく、以下です。

1. 実用度の低い生成フォームを削る
2. 各Qualityの代表フォームを手動キュレーションする
3. ポップ・ロック系のOpen / CAGEDフォームを増やす
4. ジャズ系のShell / Drop2 / Rootlessの精度を上げる
5. 曲進行入力UIに向けて、コード名パーサーを作る

## Roadmap

### Phase 4.1: Manual Curation

- 各Qualityの代表フォームを最低3〜5個確保
- 不自然な自動生成フォームの除外
- popularity / difficulty / jazz の手動補正

### Phase 4.2: Alias and Parser

- C△7, CΔ7, C-7, Cø7, C7alt などの表記揺れ対応
- テキスト入力からコードを解析
- 曲のコード進行入力への準備

### Phase 4.5: Practical Slash Chords

- C/E, C/G, Am/C の基本転回形
- Dm7/G, F/G, Bb/C などのジャズ実用Slash
- slashType: inversion / pedal / sus-dominant / upper-structure

### Phase 5: Progression UI

- II-V-I generator
- Key指定
- Family / Level / Usage指定でフォーム列生成
- 指板移動量が少ない順に提案

## Handoff Notes for Future Chats

次のチャットで開発を続ける場合は、以下を伝える。

> Chord Atlas v2 Phase 4 の続きです。READMEの設計方針を守って、フォームの手動キュレーション、コード名パーサー、曲進行UIの準備を進めてください。

重要な前提。

- `chord-data.js` は Quality と Blueprint からフォームを生成している
- 現在はカバー範囲拡大を優先した段階
- 次は品質管理とコード名入力が重要
- GitHub Pages は静的ファイルだけで動く

---

## Phase 5: Compact Search UI

Goal: make the app feel light and casual, especially on mobile.

Implemented:

- Compact top bar
- Sticky main search controls
- Root / Quality / Bass / Sort promoted as primary controls
- Family / Usage / Level / Voice moved into an Advanced filter drawer
- Compact card layout for showing more chord diagrams at once
- Smaller mobile diagrams and metadata pills
- Density toggle on desktop

Design direction:

Chord Atlas should feel like a quick chord finder first, with advanced filters available when needed.
The next major UI feature is chord sheet creation: lyrics + chord placement + JSON save/load + print layout.
