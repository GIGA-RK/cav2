# Chord Atlas v2 - Phase 6 Standard Forms Diff

## What changed

This patch restores and prioritizes standard textbook/chord-book guitar forms.

Updated files:

```text
js/chord-data.js
js/chord-engine.js
README.md
```

## Added

- New family: `standard`
- Standard major movable forms such as `x35553` for C
- Standard open C variants such as `x32010`, `x32013`, `xx2013`, and top-set mini forms
- Standard minor, dominant7, maj7, m7, diminished, sus, and add9 forms
- Standard open textbook forms for G, D, E, A, Am, Em, Dm
- Easy/recommended sort now gives `open`, `standard`, and `power` forms stronger priority

## Design note

`standard` means forms commonly found in beginner books, chord books, and everyday pop/rock guitar usage. These are manually curated and should appear before generated jazz voicings when the user sorts by easy or recommended order.

## Next target

Continue adding standard forms for all common qualities:

- maj, min, 7
- maj7, m7
- sus2, sus4
- add9
- 6, m6
- power chords

The goal is practical coverage, not maximum theoretical completeness.
