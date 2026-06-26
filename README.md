# Chord Atlas v2 - Phase 6.7 Exact Dedupe Revert

## Purpose

Phase 6.6 の「見た目基準の重複整理」を戻し、重複判定を安全な方針に戻します。

## Policy

- `frets` 配列が完全一致するフォームだけを重複として統合します。
- フレット位置・構成音・ボイシングが違うフォームは、見た目が似ていても残します。
- コード百科事典として、似たフォームよりも実際に違うフォームを保持する方針です。

## Files

Overwrite:

```text
js/chord-engine.js
README.md
```

## Notes

This reverts the visible-diagram based dedupe logic introduced in Phase 6.6.
