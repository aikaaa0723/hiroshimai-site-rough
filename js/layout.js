/* ============================================================
   HiroshimAI rough — 共通レイアウト（多ページ）
   #app-header / #app-footer に共通ヘッダー・フッターを注入し、
   モバイルメニューとスクロールリビールを配線する。背景は白（動画なし）。
   各ページ先頭で window.SITE_ROOT = "" or "../" を指定する。
   ============================================================ */
(function () {
  "use strict";

  var ROOT = (typeof window.SITE_ROOT === "string") ? window.SITE_ROOT : "";
  var path = location.pathname;
  function has(seg) { return path.indexOf(seg) >= 0; }
  function act(cond) { return cond ? " active" : ""; }

  var inAbout = has("/about/");
  var inServices = has("/services/");
  var inCases = has("/cases/");
  var inMedia = has("/media/");
  var inNews = has("/news/");
  var inRecruit = has("/recruit/");

  /* 小マーク（フッターの暗背景用：白文字テキストと併用） */
  var MARK =
    '<svg class="logo-mark" viewBox="0 0 24 24" aria-hidden="true">' +
      '<rect x="3" y="5" width="2" height="14" rx="1" fill="#5b7bd6"/>' +
      '<rect x="8" y="3" width="2" height="18" rx="1" fill="#5b7bd6"/>' +
      '<rect x="13" y="6" width="2" height="12" rx="1" fill="#8c5a9c"/>' +
      '<rect x="18" y="4" width="2" height="16" rx="1" fill="#e0314e"/>' +
    '</svg>';

  /* ダークロゴ（白ヘッダー用・SVG：Hiroshim=ダーク／AI=マゼンタ）。透明ヘッダー時は画像ロゴ(白文字)へ切替 */
  var LOGO_DARK =
    '<svg class="brand-logo logo-dark" viewBox="0 0 286 56" role="img" aria-label="HiroshimAI">' +
      '<rect x="2"  y="16" width="3.4" height="24" rx="1.7" fill="#3d5aab"/>' +
      '<rect x="10" y="6"  width="3.4" height="44" rx="1.7" fill="#3d5aab"/>' +
      '<rect x="18" y="20" width="3.4" height="18" rx="1.7" fill="#8c5a9c"/>' +
      '<rect x="26" y="10" width="3.4" height="38" rx="1.7" fill="#d6336c"/>' +
      '<rect x="34" y="16" width="3.4" height="24" rx="1.7" fill="#d6336c"/>' +
      '<text x="48" y="41" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="40" font-weight="500" letter-spacing="0.2" fill="#0a0a0b">Hiroshim<tspan fill="#d6336c">AI</tspan></text>' +
    '</svg>';

  var NAV =
    '<li><a href="' + ROOT + 'about/index.html" class="nav-top' + act(inAbout) + '">About</a></li>' +
    '<li><a href="' + ROOT + 'services/index.html" class="nav-top' + act(inServices) + '">Service</a></li>' +
    '<li><a href="' + ROOT + 'cases/index.html" class="nav-top' + act(inCases) + '">導入事例</a></li>' +
    '<li><a href="' + ROOT + 'media/index.html" class="nav-top' + act(inMedia) + '">Media</a></li>' +
    '<li><a href="' + ROOT + 'news/index.html" class="nav-top' + act(inNews) + '">News</a></li>' +
    '<li><a href="' + ROOT + 'recruit/index.html" class="nav-top' + act(inRecruit) + '">採用情報</a></li>';

  var header =
    '<header class="site-header" id="siteHeader">' +
      '<div class="header-inner">' +
        '<a href="' + ROOT + 'index.html" class="brand" aria-label="HiroshimAI ホーム">' +
          '<img class="brand-logo logo-light" src="' + ROOT + 'assets/logo.png" alt="HiroshimAI" />' +
          LOGO_DARK +
        '</a>' +
        '<nav class="global-nav" aria-label="グローバルナビゲーション"><ul>' + NAV + '</ul></nav>' +
        '<span class="lang-toggle" aria-label="言語切り替え"><a class="on" aria-current="true">JP</a><span class="sep">|</span><a>EN</a></span>' +
        '<a href="' + ROOT + 'contact.html" class="btn-head">お問い合わせ</a>' +
        '<button class="nav-burger" id="navBurger" type="button" aria-label="メニュー" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '</div>' +
    '</header>' +
    '<div class="mobile-drawer" id="mobileDrawer">' +
      '<ul>' + NAV + '<li><a href="' + ROOT + 'contact.html">お問い合わせ</a></li></ul>' +
      '<a href="' + ROOT + 'contact.html" class="btn-head">お問い合わせ</a>' +
    '</div>';

  var footer =
    '<footer class="site-footer">' +
      '<div class="footer-inner">' +
        '<div class="footer-brand">' +
          '<a href="' + ROOT + 'index.html" class="brand">' + MARK + '<span>Hiroshim<span style="color:#d6336c">AI</span></span></a>' +
          '<p>AIで広島から、未来を実装する。<br />地域の中小企業のAI活用を、構想から実装まで。</p>' +
          '<div class="footer-social">' +
            '<a href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M18.9 2H22l-7.3 8.4L23 22h-6.8l-5-6.6L5.5 22H2.3l7.8-9L1.5 2h6.9l4.5 6 5.9-6Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z"/></svg></a>' +
            '<a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/></svg></a>' +
            '<a href="#" aria-label="note"><svg viewBox="0 0 24 24"><path d="M4 3h12.5L20 6.5V21H4V3Zm3 6h10v1.8H7V9Zm0 4h10v1.8H7V13Zm0 4h7v1.8H7V17Z"/></svg></a>' +
          '</div>' +
        '</div>' +
        '<nav class="footer-nav" aria-label="フッターナビゲーション">' +
          '<div class="footer-col"><h4>会社情報</h4><ul>' +
            '<li><a href="' + ROOT + 'about/index.html">私たちについて</a></li>' +
            '<li><a href="' + ROOT + 'recruit/index.html">採用情報</a></li>' +
            '<li><a href="' + ROOT + 'contact.html">お問い合わせ</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>サービス・情報</h4><ul>' +
            '<li><a href="' + ROOT + 'services/index.html">事業案内</a></li>' +
            '<li><a href="' + ROOT + 'cases/index.html">導入事例</a></li>' +
            '<li><a href="' + ROOT + 'media/index.html">Media</a></li>' +
            '<li><a href="' + ROOT + 'news/index.html">お知らせ</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>会社概要</h4><ul class="footer-meta">' +
            '<li>HiroshimAI株式会社</li><li>代表取締役　住田 隆真</li><li>設立　2026年</li><li>広島県広島市</li>' +
          '</ul></div>' +
        '</nav>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<ul class="footer-legal"><li><a href="#">利用規約</a></li><li><a href="#">プライバシーポリシー</a></li><li><a href="#">サイトマップ</a></li></ul>' +
        '<p class="copyright">© 2026 HiroshimAI Inc.</p>' +
      '</div>' +
      '<p class="footer-note" style="max-width:var(--maxw);margin:14px auto 0;">本サイトは企画書 v0.1 に基づく制作中の案です。実績・正式表記など一部は確認中の項目を含みます。</p>' +
    '</footer>';

  /* 多重注入ガード：既存のヘッダー/ドロワー/フッター/背景があれば除去（重複防止） */
  document.querySelectorAll(".site-header, .mobile-drawer, .site-footer, .site-bg").forEach(function (el) { el.remove(); });

  /* サイト全体の固定背景（トンマナの緩やかに動くグラデ） */
  var siteBg = document.createElement("div");
  siteBg.className = "site-bg";
  siteBg.setAttribute("aria-hidden", "true");
  document.body.insertBefore(siteBg, document.body.firstChild);

  var hMount = document.getElementById("app-header");
  var fMount = document.getElementById("app-footer");
  if (hMount) hMount.outerHTML = header;
  if (fMount) fMount.outerHTML = footer;

  /* ヘッダーは常時ダーク・白ロゴで統一（スクロールでの切替なし） */

  /* mobile drawer */
  var burger = document.getElementById("navBurger");
  var drawer = document.getElementById("mobileDrawer");
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var open = drawer.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.classList.remove("open"); burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* scroll reveal（Sony風：同じ親に並ぶ要素へ段階ディレイ＝stagger を付与） */
  var items = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || !items.length) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var counts = new Map();
  items.forEach(function (el) {
    var p = el.parentElement;
    var n = counts.get(p) || 0;
    counts.set(p, n + 1);
    el.style.transitionDelay = Math.min(n * 75, 340) + "ms";
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
  items.forEach(function (el) { io.observe(el); });
})();
