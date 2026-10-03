/* 券（チケット）の札。

   METEO365 のチケットと同じ組み立て。一覧でも、開いたときの見出しでも、
   まったく同じものを出す（違うのは押せるかどうかだけ）。

     ┌──────────────────┬────────┐
     │ ◆ 冬の即売会      │        │
     │ 12/30(火) 東京…   │   3    │
     │ 頒布物 5点        │   日   │
     └──────────────────┴────────┘
                          ↑ もぎり（残り日数） */
(function (DL) {
  'use strict';
  var U = DL.util, ui = DL.ui, el = U.el;

  /** 残り日数の半券。当日は「当日」、過ぎていれば「n日前」 */
  function stub(left) {
    return el('div', { class: 'tk-card-stub' }, left === null ? [
      el('b', { class: 'tk-num', text: '—' })
    ] : [
      el('b', { class: 'tk-num', text: left > 0 ? String(left) : left === 0 ? '当日' : String(-left) }),
      el('span', { class: 'tk-unit', text: left > 0 ? '日' : left === 0 ? '' : '日前' })
    ]);
  }

  /** 券の地紋になるロゴ。読み終わってから、そっと敷く */
  function logo(box, ref) {
    if (!ref) return;
    DL.api.pic(ref).then(function (src) {
      if (!src || !box.isConnected) return;
      box.insertBefore(el('img', { class: 'tk-logo', src: src, alt: '' }), box.firstChild);
    });
  }

  /**
   * 券を1枚。
   * @param {object} ev {id,name,date,venue,space,logo}
   * @param {object} [o] {hero:true で見出し／onclick／chips:[Node]}
   */
  function card(ev, o) {
    o = o || {};
    var today = U.today();
    var left = U.isISO(ev.date) ? U.diffDays(today, ev.date) : null;
    var soon = left !== null && left > 0 && left <= 14;
    var past = left !== null && left < 0;

    var main = el('div', { class: 'tk-card-main' }, [
      el('div', { class: 'tk-card-head' }, [
        ui.icon('event', 15),
        el('span', { class: 'tk-card-name', text: ev.name })
      ]),
      el('div', { class: 'tk-card-sub' }, [
        U.isISO(ev.date) ? ui.iconChip('deadline', U.fmtMD(ev.date), past ? 'ghosty' : 'soft') : null,
        ev.venue ? ui.iconChip('place', ev.venue, 'ghosty') : null,
        ev.space ? ui.chip(ev.space, 'ghosty') : null
      ]),
      (o.chips && o.chips.length) ? el('div', { class: 'tk-card-sub' }, o.chips) : null
    ]);
    logo(main, ev.logo);

    return el(o.hero ? 'div' : 'button', {
      type: o.hero ? null : 'button',
      class: (o.hero ? 'tk-hero' : 'tk-card')
        + (soon ? ' soon' : '') + (left === 0 ? ' today' : '') + (past ? ' past' : ''),
      onclick: o.onclick || null
    }, [main, stub(left)]);
  }

  DL.ticket = { card: card, stub: stub };
})(window.DL = window.DL || {});
