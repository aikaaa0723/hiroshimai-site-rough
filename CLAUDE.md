# CLAUDE.md

このファイルは、本リポジトリで作業する AI アシスタント（Claude Code 等）向けのガイドです。

## 概要

**HiroshimAI株式会社** のコーポレートサイト**ラフ案（rough）**。ビルドツール・フレームワーク・npm 依存を一切持たない、素の HTML / CSS / vanilla JS による静的サイトです。GitHub Pages（`https://aikaaa0723.github.io/hiroshimai-site-rough/`）で配信されます。

- デザインの狙い: 「Sony風」の落ち着いたモーション＋ブランドグラデ（青→紫→マゼンタ）を差し色に、白背景基調。
- コミットメッセージは日本語で、`rough(main): ...` / `rough: ...` のような接頭辞を使う慣習。
- サイトは企画書 v0.1 に基づく**制作途中の案**であり、実績・正式表記など一部は確認中（フッターにその旨の注記あり）。

## ビルド / 実行 / デプロイ

- **ビルド手順は無い。** トランスパイルもバンドルも不要。HTML を直接編集する。
- ローカル確認は任意の静的サーバで。例:
  ```bash
  python3 -m http.server 8000   # → http://localhost:8000/
  ```
  ※ `file://` 直開きでも概ね動くが、パス解決やパララックス確認のためサーバ経由を推奨。
- **デプロイ**: `main` ブランチをそのまま GitHub Pages が配信。ビルドステップ無し（`.github/workflows` は存在しない）。ルートの `.nojekyll` で Jekyll 処理を無効化。
- `robots.txt` / `sitemap.xml` はルートに実在するファイル。ページを追加・削除したら **`sitemap.xml`（機械可読）と `sitemap.html`（人間向け）を両方**更新すること。

## ディレクトリ構成

```
/                      本番サイト（＝正）
├── index.html         トップ（ヒーロー動画＋イントロアニメ）
├── about/index.html   私たちについて
├── services/index.html 事業案内
├── cases/index.html   導入事例
├── media/index.html   メディア
├── news/index.html    お知らせ
├── recruit/index.html 採用情報
├── contact.html       お問い合わせ
├── privacy.html / terms.html / sitemap.html   法務・サイトマップ
├── css/
│   ├── style.css      全ページ共通スタイル（唯一の主要 CSS・約1500行）
│   └── theme-dark.css ダーク上書き（本番では未使用。cand-dark 系のみで読み込み）
├── js/
│   └── layout.js      共通ヘッダー/フッター注入＋全インタラクション（唯一の JS）
├── assets/            画像・動画・ロゴ（hero-bg.mp4, hero-poster.jpg, logo.png, img-*.webp など）
├── favicon.svg, robots.txt, sitemap.xml, .nojekyll
│
├── cand-dark/         【候補バリエーション】ダークテーマ版
├── cand-japan/        【候補バリエーション】広島／日本の背景動画版
└── cand-dark-japan/   【候補バリエーション】上記2つの組み合わせ
```

### `cand-*` ディレクトリについて（重要）

`cand-dark/` `cand-japan/` `cand-dark-japan/` は本番サイトを**ほぼ丸ごと複製したデザイン候補**です。

- 本番（ルート）が**正**。候補は比較検討用のスナップショット。
- `robots.txt` で `Disallow` 指定済み（インデックス対象外）。`sitemap.xml` にも含めない。
- **ユーザーが明示的に候補を対象と指定しない限り、ルートの本番サイトのみを編集すること。** 本番の変更を候補へ自動反映する仕組みは無い（手動同期）。候補の CSS/JS はルートから枝分かれしており微妙に異なる。
- 主な差分: `cand-japan` は `assets/japan.mp4`＋`japan-poster.jpg` をヒーロー動画に使用。`cand-dark` は各ページで `css/theme-dark.css` を追加読み込み。

## アーキテクチャと主要な慣習

### 共通レイアウトの注入（`js/layout.js`）

ヘッダー・フッター・共通装飾（背景グラデ、スキップリンク、ページトップボタン等）は **HTML に直書きせず `js/layout.js` が JS で注入**する。各ページの `<body>` には空のマウント要素だけ置く:

```html
<div id="app-header"></div>
<main> ... </main>
<div id="app-footer"></div>
```

- ページ末尾で `js/layout.js` を読み込む（`<script src="../js/layout.js"></script>` 等）。
- ヘッダー/フッターの文言・ナビ項目・ロゴ・SNS リンク・会社概要を変えるときは **`js/layout.js` を編集**する（各 HTML ではない）。

### パス解決: `window.SITE_ROOT`

サブディレクトリ配置に対応するため、各ページは `js/layout.js` 読み込み**前**に相対ルートを宣言する:

```html
<script>window.SITE_ROOT = "";</script>     <!-- ルート直下のページ: index/contact/privacy/terms/sitemap -->
<script>window.SITE_ROOT = "../";</script>   <!-- サブディレクトリのページ: about/ services/ cases/ media/ news/ recruit/ -->
```

- `layout.js` は `SITE_ROOT` を全リンク・画像 src の前置に使う。
- **新規ページを追加したら、その階層に合わせて `SITE_ROOT` を必ず設定**すること。誤るとナビ・ロゴ・画像が 404 になる。

### インタラクション（すべて `js/layout.js` 内）

`layout.js` が配線する主なもの:
- モバイルドロワー（ハンバーガー、Esc で閉じる、背後スクロールロック）。
- スクロールリベール: 要素に `data-reveal` 属性を付けるとフェード＋スライドアップ（同一親の兄弟は stagger）。`IntersectionObserver` 使用、非対応時は即表示にフォールバック。
- 文字マスクリベール: `.s-head h2` / `.nr-head h2` / `.mf-statement` の見出しは行ごとに `overflow:hidden` からせり上がる。
- 画像パララックス: `.s-thumb img` / `.case-thumb img` / `.article-thumb img`。`prefers-reduced-motion` を尊重、`requestAnimationFrame` で間引き、読み（getBoundingClientRect）と書き（transform）を分離してレイアウトスラッシングを回避。
- ヒーロー動画の再生/一時停止トグル、スクロール方向に応じたヘッダー隠し/再表示。
- トップページの「イントロアニメ」は `index.html` の `<head>` 内インライン script（split-flap 風の文字アニメ）。`layout.js` ではなくページ側にある。

### CSS（`css/style.css`）

- **主要スタイルは `css/style.css` の1ファイルに集約**（約1500行）。全ページがこれを読む。
- デザイントークンは `:root` の CSS 変数で管理:
  - カラー: `--ink` `--ink-soft` `--line` `--bg` `--bg-alt`、ブランド `--blue`(#3d5aab) `--purple`(#8c5a9c) `--magenta`(#d6336c) `--accent`、グラデ `--grad` / `--grad-soft`。
  - レイアウト: `--maxw`(1120px) `--header-h`(72px)、フォント `--font`(Noto Sans JP) / `--font-en`(Manrope)。
- グラデ文字は `.grad-text`（`background-clip: text`）。共通コンテナは `.wrap`、セクションは `.section` / `.section.alt`。
- `html, body { overflow-x: clip }`（`hidden` ではなく `clip`＝`position:sticky` を壊さず横はみ出しを抑止）。この意図を壊さないこと。
- フォントは Google Fonts（Manrope / Noto Sans JP）を各 HTML の `<head>` で読み込む外部依存。
- `theme-dark.css` は `style.css` の**後**に読み込み、CSS 変数の再定義と半透明パネルの暗転で上書きする設計（本番では未使用）。

## 編集時の注意

- **依存追加・ビルドツール導入は避ける。** 素の HTML/CSS/JS を保つのがこのプロジェクトの前提。
- 共通のヘッダー/フッター/装飾は `js/layout.js`、見た目は `css/style.css` に集約されている。ページ HTML に個別のヘッダー等を直書きしない。
- 新規ページ追加時のチェックリスト:
  1. `<head>` に `<link rel="stylesheet" href="{root}css/style.css">` と `SITE_ROOT` を設定。
  2. `<body>` に `#app-header` / `<main>` / `#app-footer`、末尾で `layout.js` を読み込み。
  3. 必要なら `js/layout.js` の `NAV` にリンクを追加し、`has()`/`act()` でアクティブ判定を追加。
  4. `sitemap.xml` と `sitemap.html` を更新。
- アニメーションを足すときは `prefers-reduced-motion` を尊重する（既存コードに倣う）。
- `cand-*` は原則触らない（上記参照）。

## Git ワークフロー

- コミットメッセージは日本語。慣習の接頭辞: `rough(main): 変更内容` または `rough: 変更内容`。
- 本番の変更は `main` にマージされると即 GitHub Pages に反映される（プレビュー環境無し）ため、レイアウト崩れ・404 に注意。
