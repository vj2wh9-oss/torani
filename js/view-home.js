/* トップ：会場でやることを選ぶ。

   いまできるのは「在庫集計」だけ。
   残りの3つは置き場所だけ先に取ってあり、押せないようにしてある。 */
(function (DL) {
  'use strict';
  var U = DL.util, ui = DL.ui, S = DL.store, el = U.el;

  /* 縦に並べるもの。off が真のものは、まだ押せない */
  var MENU = [
    { key: 'stock', icon: 'sales', label: '在庫集計', note: 'イベントごとに在庫を数える' },
    { key: 'extra', icon: 'book', label: '新刊余部登録', off: true },
    { key: 'hello', icon: 'people', label: '挨拶リスト', off: true },
    { key: 'gift', icon: 'note', label: '差しいれメモ', off: true }
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
      onclick: m.off ? null : function () { DL.app.go(m.key); }
    }, [
      el('span', { class: 'mn-ico' }, ui.icon(m.icon, 20)),
      el('span', { class: 'mn-text' }, [
        el('b', { class: 'mn-label', text: m.label }),
        m.note ? el('span', { class: 'mn-note', text: m.note }) : null
      ]),
      ui.icon('chevronRight', 18, 'mn-arrow')
    ]);
  }

  function render(root) {
    var wrap = el('div', { class: 'page' });

    if (!DL.api.ready()) {
      wrap.appendChild(ui.section('はじめに'));
      wrap.appendChild(intro());
    }

    wrap.appendChild(ui.section('会場でやること'));
    wrap.appendChild(el('div', { class: 'mn-list' }, MENU.map(item)));
    root.appendChild(wrap);
  }

  DL.views = DL.views || {};
  DL.views.home = { render: render, intro: intro };
})(window.DL = window.DL || {});
