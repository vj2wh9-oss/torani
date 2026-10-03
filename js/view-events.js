/* トップ：イベント（即売会の券）を選ぶ。
   券の見た目は METEO365 のチケットとそろえてある（DL.ticket） */
(function (DL) {
  'use strict';
  var U = DL.util, ui = DL.ui, S = DL.store, el = U.el;

  function render(root) {
    var wrap = el('div', { class: 'page' });

    if (!DL.api.ready()) {
      wrap.appendChild(ui.section('はじめに'));
      wrap.appendChild(DL.views.home.intro());
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
