# renderer.js update: fret number + taller board

Replace `js/renderer.js` with the included file.

Changes:

- Base fret number is less likely to be clipped on 2-digit frets.
- Fret number position moved slightly inward and should be styled smaller / non-bold via `.base` if needed.
- Fretboard drawing area is vertically expanded inside the same SVG/card size.
- Existing note-name dots and automatic barre connector logic are preserved.

Recommended CSS tweak if the fret number is still bold:

```css
.base {
  font-weight: 600;
  font-size: 15px;
}
```
