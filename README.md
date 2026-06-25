# Chord Atlas v2 — Phase 5.8 Basic Open & Power Chords Diff

## この差分の目的

ジャズ寄りに拡充したことで抜けていた、ポップ・ロックで最重要の基本フォームを補強します。

## 上書きファイル

```text
js/chord-data.js
js/chord-engine.js
js/main.js
README.md
```

## 追加内容

- 基本オープンコードを固定フォームとして追加
  - C / D / E / G / A
  - Am / Dm / Em
  - A7 / B7 / C7 / D7 / E7 / G7
  - Asus2 / Asus4 / Dsus2 / Dsus4 / Esus4 / Gadd9
- Power chord quality `5` を追加
- Power chord family `power` を追加
- C5系の可動フォームを追加
- Open E5 / A5 / D5 を追加
- 簡単順ソートで `open` と `power` が上位に来るよう補正
- Qualityパレットの「よく使う」に `5` を追加
- Qualityカテゴリに `Power` を追加

## 実装方針

固定オープンコードは `fixedRootPc` を持たせ、選択Rootと一致するときだけ表示します。
これにより、Dを選んだときに本物のOpen Dが表示され、Cフォームを単純移調した不自然なフォームを避けます。

Power chordは可動フォームとしてC基準で登録し、他のRootへ移調します。

## 次の課題

- 各Rootのオープン系候補をさらに手動キュレーション
- `easy` / `rock` / `pop` 向けの表示プリセット追加
- 押さえ方逆引き機能との統合
