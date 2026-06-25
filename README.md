# Chord Atlas v2 / Phase 2.5 Slash Chord Build

Chord Atlas v2 は、ギターコードフォームを単なる一覧ではなく、使用頻度・難易度・ジャズ適性・Family・Usage・Level で探せるライブラリとして育てるプロジェクトです。

## Current Status

Phase 2.5 では Phase 2 の 276 templates / 20 qualities ライブラリを基盤に、分数コード検索を追加しました。

実装済み:

- Root 選択
- Quality 選択
- Bass 選択（なし / C〜B）
- Family フィルタ
- Usage フィルタ
- Level フィルタ
- Difficulty フィルタ
- Jazz タグのみ
- Rootless 許可
- 使用頻度 / 難易度 / Jazz 適性 / Family 順ソート
- SVG コードダイアグラム描画
- 分数コード候補の自動生成

## Slash Chord Implementation

Phase 2.5 の分数コードは、まず「最低音を指定 Bass にする」方式で実装しています。

例:

- Cmaj7/E
- Cmaj7/G
- Dm7/G
- F/G
- Am7/C

内部では、既存のコードフォームを基準にして、6弦・5弦・4弦側へ指定 Bass を追加し、より低い弦をミュートして、最低音が指定 Bass になる候補を生成します。

これは完全な理論解析ではなく、まず実用的な確認用実装です。

## Important Design Rule

分数コードには2種類あります。

### Type A: Inversion

通常の転回形。

例:

- C/E
- C/G
- Am/C

### Type B: Jazz Slash Chord

実質的に別のコード機能として使われるもの。

例:

- Dm7/G
- F/G
- Bb/C
- Cmaj7/B

今後は Type B をより丁寧に扱い、以下のような説明を追加する予定です。

例:

```text
F/G ≒ G11 / G13sus 的に使われることが多い
Dm7/G ≒ G9sus 的に使われることが多い
```

## Data Structure

現在の基本データ構造:

```js
{
  quality: 'maj7',
  name: 'Shell 5th string root maj7',
  frets: [null, 3, 2, 4, null, null],
  family: 'shell',
  usage: ['jazz-comping', 'bossa'],
  difficulty: 1,
  popularity: 82,
  jazz: 92,
  level: 1,
  rootless: false,
  tags: ['shell', 'guide-tones']
}
```

分数コード生成後の候補には以下が追加されます。

```js
{
  slash: true,
  bass: 'G',
  tags: ['slash', 'bass-note', 'inversion']
}
```

## Family Definitions

| Family | Meaning |
|---|---|
| open | 開放コード |
| caged | CAGED由来フォーム |
| shell | Root / 3rd / 7th などのシェルボイシング |
| drop2 | Drop2 ボイシング |
| drop3 | Drop3 ボイシング |
| rootless | ルート省略フォーム |
| compact | 密集配置 |
| spread | 広い配置 |

## Usage Definitions

| Usage | Meaning |
|---|---|
| beginner | 初心者向け |
| pop | ポップス |
| jazz-comping | ジャズ伴奏 |
| bossa | ボサノバ |
| solo-guitar | ソロギター |
| funk | ファンク |
| blues | ブルース |
| chord-melody | コードメロディ |

## Level Definitions

| Level | Meaning |
|---|---|
| 1 | Open / Shell / Guide tone などの基礎 |
| 2 | CAGED / Drop2 / Compact などの実用中級 |
| 3 | Drop3 / Spread / Solo guitar 向け |
| 4 | Rootless / Altered / Upper structure 系 |

## Scoring Philosophy

コードフォームは理論上の完全性よりも、実際の使用頻度・押さえやすさ・音楽的な使いやすさを優先します。

優先順位:

1. 実際によく使う
2. 押さえやすい
3. 響きが良い
4. ジャズ文脈で使える
5. 理論的に完全

## Roadmap

### Phase 2.5

- Bass select 追加
- 分数コード候補の自動生成
- Slash / Bass pill 表示

### Phase 3

- Jazz slash chord の curated データ追加
- Dm7/G, F/G, Bb/C などの機能説明
- 7alt / 7b9 / 7#9 / 7#11 / 7b13 の実戦フォーム強化
- 500〜800 templates を目標

### Phase 4

- 代理コード提案
- II-V-I 文脈での推奨フォーム
- コード進行内でのボイスリーディング評価

## Handoff Notes for Future Chats

このREADMEを読んだら、次の方針で続けること。

1. Phase 2.5 は分数コードの最初の実装。
2. 現在の分数コード生成は自動生成ベースで、curated slash chord library は未実装。
3. 次にやるべきことは、Dm7/G, F/G, Bb/C, Cmaj7/B などのジャズ実用分数コードを手入力で追加すること。
4. UIは最低限動いているため、次はデータ品質と説明文を強化する。
