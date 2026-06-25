# Chord Atlas v2 / Phase 3

ギターコードフォームを、単なる押さえ方一覧ではなく、**使用頻度・難易度・ジャズ適性・Family・Usage・Level・Voice・Slash Bass** で探せるライブラリ確認UIです。

## Current Status

Phase 3: トーン・コード品質拡充版

- 933 templates
- 45 qualities
- 806 jazz-oriented templates
- Slash chord / 分数コード対応
- Family filter
- Usage filter
- Level filter
- Voice filter
- Rootless filter
- Difficulty / Popularity / Jazz score sorting

## GitHub Pages 構成

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

GitHub Pages では repository root に `index.html` を置き、`css/` と `js/` を同階層に置く。

## Project Goal

Chord Atlas v2 は、ギターコードフォームを「名前から探す」だけではなく、演奏目的から探せるようにする。

目標は以下。

- 実際に使う頻度が高いフォームを優先表示する
- 初心者向けからジャズ実用形まで段階的に探せる
- Shell / Drop2 / Rootless など、考え方別に検索できる
- 分数コードやテンションコードも自然に扱う
- 将来的に II-V-I や曲進行から最適フォーム列を提案する

## Library Philosophy

コードフォームは、理論上の完全性よりも実際の使用頻度を優先する。

フォーム追加の優先順位は以下。

1. 実際によく使う
2. 押さえやすい
3. 響きが良い
4. 理論的に説明しやすい
5. 理論的に完全

ジャズ用途では、以下を許可する。

- 5度省略
- ルート省略
- 3rd / 7th 優先
- テンション優先
- Rootless voicing
- Slash bass / inversion

## Data Model

`js/chord-data.js` のフォームは以下の考え方で生成される。

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

## Usage Definitions

| Usage | Meaning |
|---|---|
| beginner | 初心者向け |
| pop | ポップス |
| rock | ロック |
| jazz-comping | ジャズ伴奏 |
| bossa | ボサノバ |
| solo-guitar | ソロギター |
| funk | ファンク |
| blues | ブルース |
| chord-melody | コードメロディ |
| neo-soul | ネオソウル的な響き |

## Level Definitions

| Level | Meaning |
|---|---|
| 1 | Open / Shell / Guide tone |
| 2 | CAGED / Compact / 基本Drop2 |
| 3 | Drop2応用 / Drop3 / Spread |
| 4 | Rootless / 高度なテンション |
| 5 | Upper Structure / Altered / Chord Melody |

## Qualities in Phase 3

### Major

- maj
- 6
- 6/9
- maj7
- maj9
- maj11
- maj13
- maj7#11
- maj9#11
- maj7#5

### Minor

- min
- m6
- m7
- m9
- m11
- m13
- mMaj7
- mMaj9
- m7b5
- m9b5

### Dominant

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
- 13b9
- 13#11
- 7alt

### Sus / Diminished / Augmented / Add

- sus2
- sus4
- 7sus4
- 9sus4
- 13sus4
- dim
- dim7
- aug
- aug7
- add9
- madd9

## Roadmap

### Phase 3.1

Quality数は増えたので、次は「実在フォームとしての品質管理」をする。

- 代表フォームの手動キュレーション
- 不自然な自動生成フォームの除外
- 各Qualityの代表フォームを最低3〜5個確保
- Drop2 / Shell / Rootless の精度改善

### Phase 3.5

分数コードをさらに音楽的にする。

- C/E, C/G などの基本転回形
- Dm7/G, F/G, Bb/C などのジャズ実用Slash
- slashType: inversion / pedal / sus-dominant / upper-structure を追加

### Phase 4

進行ベースの提案。

- II-V-I generator
- Key指定
- Family指定でフォーム列生成
- 指板移動量が少ない順に提案

## Handoff Notes for Future Chats

次のチャットで開発を続ける場合は、以下を伝える。

> Chord Atlas v2 Phase 3 の続きです。READMEの設計方針を守って、フォームライブラリの品質管理・Slash chord改善・II-V-I提案機能を進めてください。

重要な前提。

- `chord-data.js` は現在、完全手入力ではなく、Quality と Blueprint からフォームを生成している
- 今後は生成フォームに加えて、curated manual forms を増やす方針
- UIは確認用。最終版ではライブラリを育ててから統合する
- GitHub Pages はビルド不要。静的ファイルだけで動く
