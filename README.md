# Chord Atlas v2 - Phase 6.2 Ranking Fix

## Purpose

Phase 6.1で低ポジション移調は直ったが、F Major の定番1フレットバレー `1-3-3-2-1-1` の順位が低すぎたため、スコアリングを調整した。

## Changes

- `standard` / `open` / `power` をおすすめ順で強く優先
- `textbook` / `cowboy` / `barre` / `beginner` タグを加点
- 低ポジションフォームを加点
  - 1〜4フレット内のフォームを特に優先
  - 8フレット以上の高ポジション生成フォームはやや減点
- おすすめ順では Jazz スコアの比重を下げ、日常的な実用度を優先
- 簡単順でも open / standard / power / beginner をさらに優先

## Expected Result

F Majorで検索した場合、定番の `1-3-3-2-1-1` が上位に表示される。

