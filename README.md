# Chord Atlas v2 — Phase 6.5 Classification Cleanup Diff

## 目的

コード分類の指標を整理し、UIで迷いにくい4軸へまとめます。

## 新しい整理

### WHAT
- Root
- Quality
- Bass
- Capo

### HOW / Shape
従来の `family` をユーザー向けには Shape として扱います。

- Open
- Barre
- CAGED
- Shell
- Drop
- Compact
- Rootless
- Power
- Special

内部的には既存データの `standard`, `drop2`, `drop3`, `spread`, `upper-structure` などを `normalizeShapeFamily()` で統合します。

### WHEN / Usage
用途は次に整理します。

- Beginner
- Pop
- Rock
- Folk
- Jazz
- Bossa
- Funk
- Solo
- Blues

既存データの `jazz-comping`, `solo-guitar`, `chord-melody` などは `usageMatches()` で吸収します。

### HOW GOOD / Sort
ソートは次の5種類へ整理します。

- 実用順 `practical`
- 定番順 `standard`
- 簡単順 `difficulty`
- Jazz順 `jazz`
- レア順 `rare`

## 更新ファイル

- `index.html`
- `js/main.js`
- `js/chord-data.js`
- `js/chord-engine.js`
- `README.md`

