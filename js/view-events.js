/* トップ：イベント（即売会の券）を選ぶ。
   券の見た目は METEO365 のチケットとそろえてある（DL.ticket） */
(function (DL) {
  'use strict';
  var U = DL.util, ui = DL.ui, S = DL.store, el = U.el;

  function render(root) {
    var wrap = el('div', { class: 'page' });

    if (!DL.api.ready()) {
      wrap.appendChild(ui.section('はじめに'));
      wrap.appendChild(el('div', { class: 'card' }, [
        el('p', { text: 'METEO365 の 設定 →「イベント当日用サイト」で合鍵を作り、'
          + 'そこに出る URL をこの端末で開いてください。' }),
        el('p', { class: 'muted small',
          text: 'この合鍵でできるのは、即売会の券と頒布物を読むことと、'
            + '数えた在庫を預けることだけです。' })
      ]));
      root.appendChild(wrap);
      return;
    }

    wrap.appendChild(ui.section('イベント',
      S.state.events.length ? ui.chip(S.state.events.length + '件', 'ghosty') : null));

    if (!S.state.events.length) {
      wrap.appendChild(ui.empty('即売会のチケットがありません。',
        ui.btn('読み直す', 'primary', function () { DL.app.loadEvents(); }, 'refresh')));
      root.appendChild(wrap);
      return;
    }

    wrap.appendChild(el('div', { class: 'tk-list' }, S.state.events.map(function (ev) {
      return DL.ticket.card(ev, { onclick: function () { DL.app.open(ev.id); } });
    })));
    root.appendChild(wrap);
  }

  DL.views = DL.views || {};
  DL.views.events = { render: render };
})(window.DL = window.DL || {});
