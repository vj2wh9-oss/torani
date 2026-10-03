/* トップ：当日の事務を選ぶ。

   いまできるのは「在庫集計」だけ。
   残りの3つは置き場所だけ先に取ってあり、押せないようにしてある。 */
(function (DL) {
  'use strict';
  var U = DL.util, ui = DL.ui, el = U.el;

  /* 縦に並べるもの。off が真のものは、まだ押せない */
  var MENU = [
    { key: 'stock', label: '在庫集計' },
    { key: 'extra', label: '新刊余部登録', off: true },
    { key: 'hello', label: '挨拶リスト', off: true },
    { key: 'gift', label: '差しいれメモ', off: true }
  ];

  /** 合鍵がまだ無いときの案内。イベントの一覧からも使う */
  function intro() {
    return el('div', { class: 'card' }, [
      el('p', { text: 'METEO365 の 設定 →「イベント当日用サイト」で合鍵を作り、'
        + 'そこに出る URL をこの端末で開いてください。' }),
      el('p', { class: 'muted small',
        text: 'この合鍵でできるのは、即売会の券と頒布物を読むことと、'
          + '数えた在庫を預けることだけです。' })
    ]);
  }

  function item(m) {
    return el('button', {
      type: 'button',
      class: 'mn-btn' + (m.off ? ' off' : ''),
      disabled: m.off ? 'disabled' : null,
      onclick: m.off ? null : function () { DL.app.go(m.key); },
      text: m.label
    });
  }

  function render(root) {
    var wrap = el('div', { class: 'page' });

    if (!DL.api.ready()) {
      wrap.appendChild(ui.section('はじめに'));
      wrap.appendChild(intro());
    }

    wrap.appendChild(ui.section('当日事務_GUI'));
    wrap.appendChild(el('div', { class: 'mn-list' }, MENU.map(item)));
    // 端末が古い控えを出していないか、ここで見分ける
    wrap.appendChild(el('div', { class: 'ver', text: 'v' + (DL.VERSION || '?') }));
    root.appendChild(wrap);
  }

  DL.views = DL.views || {};
  DL.views.home = { render: render, intro: intro };
})(window.DL = window.DL || {});
