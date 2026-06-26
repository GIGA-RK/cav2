# Chord Atlas v2 Phase 6.3 — Duplicate Voicing Fix

## What changed

Exact duplicate physical chord shapes are now collapsed in the search result list.

Previously, the same frets could appear multiple times when the voicing was registered from different sources, for example:

- `standard`
- `caged`
- generated movable form
- slash/generated variant

The UI should show the physical chord form only once.

## New behavior

Duplicate detection now uses only the actual fret pattern:

```text
frets: 1-3-3-2-1-1
```

It intentionally ignores metadata such as:

- family
- tags
- source name
- template name

If duplicates exist, Chord Atlas keeps the most useful one by ranking:

1. higher computed score
2. lower difficulty
3. familiar families such as open / standard / power / caged

Tags from duplicate sources are merged internally.

## Files changed

```text
js/chord-engine.js
README.md
```
