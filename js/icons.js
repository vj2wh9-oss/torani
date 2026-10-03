/* 絵。METEO365 と同じ線の太さ・同じ丸めにそろえてある */
(function (DL) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  var PATHS = {
    chevronLeft: 'M15 5 L8 12 L15 19',
    chevronRight: 'M9 5 L16 12 L9 19',
    refresh: 'M20 12a8 8 0 1 1-2.3-5.7 M20 4v4h-4',
    plus: 'M12 5v14 M5 12h14',
    close: 'M6 6l12 12 M18 6L6 18',
    check: 'M4 12.5 L9.5 18 L20 6.5',
    eye: 'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z M12 9.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5Z',
    eyeOff: 'M4 4l16 16 M9.9 5.2A9.6 9.6 0 0 1 12 5c6.4 0 10 6 10 6a16 16 0 0 1-3.3 3.7'
      + ' M6.2 7.3A15.7 15.7 0 0 0 2 11s3.6 6 10 6a9.9 9.9 0 0 0 3.6-.7',
    // 本：背と小口のある薄い直方体
    book: 'M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2Z M7 4v14 M10 8h5',
    // グッズ：星
    star: 'M12 4l2.3 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.8 2.6 1.1-5.3-4-3.7 5.4-.6Z',
    event: 'M4 6h16v14H4Z M4 10h16 M8 3v4 M16 3v4',
    // 砂時計。METEO365 で日付のチップに使っているもの
    deadline: 'M6 3h12 M6 21h12 M8 3v3.6l4 4 4-4V3 M8 21v-3.6l4-4 4 4V21',
    // 会場。地図の針
    place: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z M12 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5Z',
    sales: 'M4 19h16 M7 19V9 M12 19V5 M17 19v-7',
    // 人。挨拶まわりの名簿に
    people: 'M9.5 11.4a3.3 3.3 0 1 0 0-6.6a3.3 3.3 0 1 0 0 6.6Z'
      + ' M3.5 20c0-3.3 2.7-5.2 6-5.2s6 1.9 6 5.2'
      + ' M17.2 10.3a2.6 2.6 0 1 0 0-5.2 M18.2 14.9c1.9.6 2.9 2.3 2.9 5.1',
    // 覚え書き。折り返した紙
    note: 'M6 3h8l4 4v14H6Z M14 3v4h4 M9.5 12h5 M9.5 16h3.5',
    cloud: 'M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 11a3.5 3.5 0 0 0 1 7Z',
    alert: 'M12 4 L21 19 H3 Z M12 10v4 M12 17v.5',
    lock: 'M6 11h12v9H6Z M9 11V8a3 3 0 0 1 6 0v3'
  };

  /**
   * @param {string} name
   * @param {number} [size]
   * @param {string} [cls]
   */
  function icon(name, size, cls) {
    var s = size || 18;
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', s);
    svg.setAttribute('height', s);
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'icon' + (cls ? ' ' + cls : ''));
    (PATHS[name] || PATHS.book).split(' M').forEach(function (d, i) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', (i ? 'M' : '') + d);
      svg.appendChild(p);
    });
    return svg;
  }

  DL.icons = { icon: icon, PATHS: PATHS };
})(window.DL = window.DL || {});
