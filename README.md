# Chord Atlas Library Lab

Chord Atlas v2 のコードライブラリ試作版です。

## 目的

- コードフォームに `difficulty`, `popularity`, `jazzUse`, `tags`, `rootless` を持たせる
- 使用頻度・難易度・ジャズ適性でソートする
- ジャズ向けコードタイプを先に拡張する
- GitHub Pages にそのまま置ける構成にする

## 構成

```text
index.html
css/style.css
js/chord-data.js
js/chord-engine.js
js/renderer.js
js/main.js
```

## 次にやること

1. フォームの実音検証を強化
2. Drop2 / Drop3 / Shell voicing を増やす
3. ルート省略・5度省略の許容ルールを明示
4. タグベースのフィルタをUIに追加
5. 既存の楽譜機能へ接続
