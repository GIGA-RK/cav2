# Chord Atlas v2 / Phase 1 Library Seed

GitHub Pages でそのまま動く、Family / Usage 対応コードフォームライブラリ確認UIです。

## 現在の目的

Chord Atlas v2 は、単なるコード表ではなく、ギターコードフォームを次の軸で検索・比較できるライブラリを目指します。

- 使用頻度 `popularity`
- 難易度 `difficulty`
- ジャズ適性 `jazz`
- フォーム分類 `family`
- 用途分類 `usage`
- Rootless 判定
- タグ検索の土台

## ファイル構成

```text
index.html
README.md
css/style.css
js/main.js
js/chord-data.js
js/chord-engine.js
js/renderer.js
```

GitHub Pages では、リポジトリの root にこの構成で配置してください。

## 現在の実装状況

実装済み:

- Family フィルタ
- Usage フィルタ
- Difficulty フィルタ
- Jazz タグのみ表示
- Rootless 許可/不許可
- おすすめ / 難易度 / 使用頻度 / Jazz適性 / Family順ソート
- SVG コードダイアグラム描画
- README による開発引き継ぎメモ

現在のライブラリ方針:

- Phase 1 は `maj7`, `m7`, `7`, `m7b5`, `dim7` を厚めに登録
- `maj9`, `m9`, `9`, `13`, `6/9`, `m11`, `7sus4`, `7alt` はスターターとして追加
- 今後は Drop2 / Drop3 / Shell / Rootless を増やしていく

## データ構造

`js/chord-data.js` の `CHORD_LIBRARY` は次の形です。

```js
{
  quality: 'maj7',
  name: 'Drop2 5th string root',
  frets: [null, 3, 5, 4, 5, null],
  family: 'drop2',
  usage: ['jazz-comping', 'bossa'],
  difficulty: 3,
  popularity: 72,
  jazz: 93,
  rootless: false,
  tags: ['drop2']
}
```

### frets について

`frets` は 6弦から1弦の順です。

```text
[6弦, 5弦, 4弦, 3弦, 2弦, 1弦]
```

`null` はミュートです。

例:

```js
[null, 3, 2, 0, 0, 0]
```

これは Cmaj7 の開放フォームです。

## Family Definitions

| family | 意味 |
|---|---|
| open | 開放弦を使う基本フォーム |
| caged | CAGED由来の移動フォーム |
| shell | ルート、3度、7度などを中心にした省略フォーム |
| drop2 | Drop2 系のジャズ向けフォーム |
| drop3 | Drop3 系の低音寄りフォーム |
| rootless | ルートを省略した実用ジャズフォーム |
| compact | 音域が密集したコンパクトフォーム |

## Usage Definitions

| usage | 意味 |
|---|---|
| beginner | 初心者向け |
| pop | ポップス向け |
| jazz-comping | ジャズ伴奏向け |
| bossa | ボサノバ向け |
| solo-guitar | ソロギター向け |
| funk | ファンクカッティング向け |
| blues | ブルース向け |

## スコアリング方針

現在のおすすめ順は `js/chord-engine.js` の `computeScore()` で計算しています。

基本方針:

```text
popularity + ease + jazz + rootless bonus
```

ただし、最終的な価値判断では「理論上の完全性」よりも「実際に使われるか」を優先します。

## ジャズ用フォームの設計ルール

ジャズでは次を許可します。

- 5度省略
- ルート省略
- 3度と7度の優先
- 9th / 13th などテンションの優先
- 3音・4音ボイシング

そのため、`rootless: true` のフォームは理論上の完全コードではなくても、実用フォームとして登録します。

## Roadmap

### Phase 1: Core Jazz Forms

対象:

- maj7
- m7
- 7
- m7b5
- dim7

目標:

```text
100〜200 forms
```

### Phase 2: Tension Chords

対象:

- maj9
- m9
- 9
- 13
- 6/9
- m11

目標:

```text
300+ forms
```

### Phase 3: Altered Dominants

対象:

- 7(b9)
- 7(#9)
- 7(#11)
- 7(b13)
- 7alt

目標:

```text
600+ forms
```

## 次のチャットへの引き継ぎメモ

このプロジェクトを別チャットで続ける場合は、次のように伝えるとスムーズです。

```text
Chord Atlas v2 の README を前提に、js/chord-data.js の CHORD_LIBRARY を拡張したい。
現在は Phase 1 seed。Family / Usage / Difficulty / Popularity / Jazz / Rootless を持つデータ構造で、GitHub Pages 上で動く確認UIがある。
次は maj7 / m7 / 7 / m7b5 / dim7 の Drop2, Drop3, Shell, Rootless を増やしたい。
```

## 開発メモ

- UIは確認用なので、まずはライブラリ品質を優先する。
- `family` と `usage` は必須項目として扱う。
- 今後、ユーザーが「よく使う」フォームを記録できるようにする可能性がある。
- 将来的には、曲中での使用頻度やユーザー選択履歴をスコアに反映したい。
