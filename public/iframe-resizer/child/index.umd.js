/*!
 *  @preserve
 *
 *  @module      iframe-resizer/child 5.5.4 (umd) - 2025-08-27
 *
 *  @license     GPL-3.0 for non-commercial use only.
 *               For commercial use, you must purchase a license from
 *               https://iframe-resizer.com/pricing
 *
 *  @description Keep same and cross domain iFrames sized to their content
 *
 *  @author      David J. Bradshaw <info@iframe-resizer.com>
 *
 *  @see         {@link https://iframe-resizer.com}
 *
 *  @copyright  (c) 2013 - 2025, David J. Bradshaw. All rights reserved.
 */

!(function (e) {
  'function' == typeof define && define.amd ? define(e) : e()
})(function () {
  'use strict'
  const e = 'font-weight: normal;',
    t = 'font-weight: bold;',
    n = 'font-style: italic;',
    o = e + n,
    r = 'default',
    i = Object.freeze({ assert: !0, error: !0, warn: !0 }),
    a = {
      expand: !0,
      defaultEvent: void 0,
      event: void 0,
      label: 'AutoConsoleGroup',
      showTime: !0,
    },
    s = { profile: 0, profileEnd: 0, timeStamp: 0, trace: 0 },
    c = Object.assign(console)
  const { fromEntries: l, keys: u } = Object,
    d = (e) => [e, c[e]],
    f = (e) => (t) => [
      t,
      function (n) {
        e[t] = n
      },
    ],
    m = (e, t) => l(u(e).map(t))
  const p =
      !(typeof window > 'u' || 'function' != typeof window.matchMedia) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
    h = p ? 'color: #A9C7FB;' : 'color: #135CD2;',
    g = p ? 'color: #E3E3E3;' : 'color: #1F1F1F;',
    y = '5.5.4',
    b = 'iframeResizer',
    v = 10,
    w = 'data-iframe-size',
    z = 'data-iframe-overflowed',
    $ = 'data-iframe-ignore',
    S = 'bottom',
    O = 'right',
    E = 'autoResizeEnabled',
    M = Symbol('sizeChanged'),
    k = 'manualResize',
    j = 'parentResize',
    T = { [k]: 1, [j]: 1 },
    x = 'setOffsetSize',
    A = 'resizeObserver',
    I = 'overflowObserver',
    N = 'mutationObserver',
    C = 'visibilityObserver',
    P = 'init',
    R = new Set([
      'head',
      'body',
      'meta',
      'base',
      'title',
      'script',
      'link',
      'style',
      'map',
      'area',
      'option',
      'optgroup',
      'template',
      'track',
      'wbr',
      'nobr',
    ]),
    B = (e, t, n, o) => e.addEventListener(t, n, o || !1),
    q = (e) => {
      if (!e) return ''
      let t = -559038744,
        n = 1103547984
      for (let o, r = 0; r < e.length; r++)
        (o = e.codePointAt(r)),
          (t = Math.imul(t ^ o, 2246822519)),
          (n = Math.imul(n ^ o, 3266489917))
      return (
        (t ^= Math.imul(t ^ (n >>> 15), 1935289751)),
        (n ^= Math.imul(n ^ (t >>> 15), 3405138345)),
        (t ^= n >>> 16),
        (n ^= t >>> 16),
        (2097152 * (n >>> 0) + (t >>> 11)).toString(36)
      )
    },
    L = (e) =>
      e.replace(/[A-Za-z]/g, (e) =>
        String.fromCodePoint((e <= 'Z' ? 90 : 122) >= (e = e.codePointAt(0) + 19) ? e : e - 26)
      ),
    D = ['spjluzl', 'rlf', 'clyzpvu'],
    F = [
      '<yi>Puchspk Spjluzl Rlf</><iy><iy>',
      '<yi>Tpzzpun Spjluzl Rlf</><iy><iy>',
      'Aopz spiyhyf pz hchpshisl dpao ivao Jvttlyjphs huk Vwlu-Zvbyjl spjluzlz.<iy><iy><i>Jvttlyjphs Spjluzl</><iy>Mvy jvttlyjphs bzl, <p>pmyhtl-ylzpgly</> ylxbpylz h svd jvza vul aptl spjluzl mll. Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.<iy><iy><i>Vwlu Zvbyjl Spjluzl</><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-jvttlyjphs vwlu zvbyjl wyvqlja aolu fvb jhu bzl pa mvy myll bukly aol alytz vm aol NWS C3 Spjluzl. Av jvumpyt fvb hjjlwa aolzl alytz, wslhzl zla aol <i>spjluzl</> rlf pu <p>pmyhtl-ylzpgly</> vwapvuz av <i>NWSc3</>.<iy><iy>Mvy tvyl pumvythapvu wslhzl zll: <b>oaawz://pmyhtl-ylzpgly.jvt/nws</>',
      '<i>NWSc3 Spjluzl Clyzpvu</><iy><iy>Aopz clyzpvu vm <p>pmyhtl-ylzpgly</> pz ilpun bzlk bukly aol alytz vm aol <i>NWS C3</> spjluzl. Aopz spjluzl hssvdz fvb av bzl <p>pmyhtl-ylzpgly</> pu Vwlu Zvbyjl wyvqljaz, iba pa ylxbpylz fvby wyvqlja av il wbispj, wyvcpkl haaypibapvu huk il spjluzlk bukly clyzpvu 3 vy shaly vm aol NUB Nlulyhs Wbispj Spjluzl.<iy><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-vwlu zvbyjl wyvqlja vy dlizpal, fvb dpss ullk av wbyjohzl h svd jvza vul aptl jvttlyjphs spjluzl.<iy><iy>Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.',
      '<iy><yi>Zvsv spjluzl kvlz uva zbwwvya jyvzz-kvthpu</><iy><iy>Av bzl <p>pmyhtl-ylzpgly</> dpao jyvzz kvthpu pmyhtlz fvb ullk lpaoly aol Wyvmlzzpvuhs vy Ibzpulzz spjluzlz. Mvy klahpsz vu bwnyhkl wypjpun wslhzl jvuahja pumv@pmyhtl-ylzpgly.jvt.',
    ],
    W = ['NWSc3', 'zvsv', 'wyv', 'ibzpulzz', 'vlt'],
    V = Object.fromEntries(
      ['2cgs7fdf4xb', '1c9ctcccr4z', '1q2pc4eebgb', 'ueokt0969w', 'w2zxchhgqz', '1umuxblj2e5'].map(
        (e, t) => [e, Math.max(0, t - 1)]
      )
    ),
    H = (e) => L(F[e]),
    U = (e) => {
      const t = e[L(D[0])] || e[L(D[1])] || e[L(D[2])]
      if (!t) return -1
      const n = t.split('-')
      let o = (function (e = '') {
        let t = -2
        const n = q(L(e))
        return n in V && (t = V[n]), t
      })(n[0])
      return 0 === o || ((e) => e[2] === q(e[0] + e[1]))(n) || (o = -2), o
    },
    Z = (e, ...t) => setTimeout(() => e(...t), 0),
    J = (e) => {
      let t = !1
      return function () {
        return t ? void 0 : ((t = !0), Reflect.apply(e, this, arguments))
      }
    },
    _ = (e) => e,
    Q = (e) => Math.round(1e3 * e) / 1e3,
    G = (e) => e.charAt(0).toUpperCase() + e.slice(1),
    Y = (e) => '' != `${e}` && void 0 !== e
  const X = (e, t, n) => {
    if (typeof e !== t) throw new TypeError(`${n} is not a ${G(t)}`)
  }
  let K = !0,
    ee = b
  const te =
    ((ne = function (n = {}) {
      const l = {},
        u = {},
        p = [],
        h = { ...a, expand: !n.collapsed || a.expanded, ...n }
      let g = ''
      function y() {
        ;(p.length = 0), (g = '')
      }
      function b() {
        delete h.event, y()
      }
      const v = () => !!p.some(([e]) => e in i) || !!h.expand
      function w() {
        if (0 !== p.length) {
          c[v() ? 'group' : 'groupCollapsed'](
            `%c${h.label}%c ${((e) => {
              const t = e.event || e.defaultEvent
              return t ? `${t}` : ''
            })(h)} %c${h.showTime ? g : ''}`,
            e,
            t,
            o
          )
          for (const [e, ...t] of p)
            c.assert(e in c, `Unknown console method: ${e}`), e in c && c[e](...t)
          c.groupEnd(), b()
        } else b()
      }
      function z() {
        '' === g &&
          (g = (function () {
            const e = new Date(),
              t = (t, n) => e[t]().toString().padStart(n, '0')
            return `@ ${t('getHours', 2)}:${t('getMinutes', 2)}:${t('getSeconds', 2)}.${t(
              'getMilliseconds',
              3
            )}`
          })())
      }
      function $(e, ...t) {
        0 === p.length && (z(), queueMicrotask(() => queueMicrotask(w))), p.push([e, ...t])
      }
      function S(e = r, ...t) {
        l[e] ? $('log', `${e}: ${performance.now() - l[e]} ms`, ...t) : $('timeLog', e, ...t)
      }
      return {
        ...m(h, f(h)),
        ...m(console, (e) => [e, (...t) => $(e, ...t)]),
        ...m(s, d),
        assert: function (e, ...t) {
          !0 !== e && $('assert', e, ...t)
        },
        count: function (e = r) {
          u[e] ? (u[e] += 1) : (u[e] = 1), $('log', `${e}: ${u[e]}`)
        },
        countReset: function (e = r) {
          delete u[e]
        },
        endAutoGroup: w,
        errorBoundary:
          (e) =>
          (...t) => {
            let n
            try {
              n = e(...t)
            } catch (e) {
              if (!Error.prototype.isPrototypeOf(e)) throw e
              $('error', e), w()
            }
            return n
          },
        event: function (e) {
          z(), (h.event = e)
        },
        purge: y,
        time: function (e = r) {
          z(), (l[e] = performance.now())
        },
        timeEnd: function (e = r) {
          S(e), delete l[e]
        },
        timeLog: S,
        touch: z,
      }
    }),
    ne?.__esModule ? ne.default : ne)
  var ne
  const oe = te({ label: `${b}(child)` })
  var re
  const ie = ((re = 'log'), (...e) => !K || oe[re](...e))
  const {
      assert: ae,
      endAutoGroup: se,
      error: ce,
      errorBoundary: le,
      event: ue,
      label: de,
      purge: fe,
      warn: me,
    } = oe,
    pe = (e) => {
      return oe.warn(
        ((t = _),
        (e) =>
          window.chrome
            ? t(
                e
                  .replaceAll('<br>', '\n')
                  .replaceAll('<rb>', '[31;1m')
                  .replaceAll('</>', '[m')
                  .replaceAll('<b>', '[1m')
                  .replaceAll('<i>', '[3m')
                  .replaceAll('<u>', '[4m')
              )
            : t(e.replaceAll('<br>', '\n').replaceAll(/<[/a-z]+>/gi, '')))(e)
      )
      var t
    },
    he = pe,
    ge = (
      (e) =>
      (t, n = 'renamed to') =>
      (o, r, i = '', a = '') =>
        e(
          a,
          `<rb>Deprecated ${t}(${o.replace(
            '()',
            ''
          )})</>\n\nThe <b>${o}</> ${t.toLowerCase()} has been ${n} <b>${r}</>. ${i}Use of the old ${t.toLowerCase()} will be removed in a future version of <i>iframe-resizer</>.`
        )
    )((e, t) => pe(t)),
    ye = ge('Method'),
    be = ge('Method', 'replaced with'),
    ve = ge('Option'),
    we = ['min-height', 'min-width', 'max-height', 'max-width'],
    ze = new Set(),
    $e = (e, t) => window.getComputedStyle(e).getPropertyValue(t),
    Se = (e, t) => {
      return (n = $e(e, t)) && '0px' !== n && 'auto' !== n && 'none' !== n
      var n
    }
  function Oe({ href: e }) {
    ze.has(e) || ze.add(e)
  }
  const Ee = (e, t) =>
      (function (e, t) {
        const n = e.style[t]
        return n ? { source: 'an inline style attribute', value: n } : null
      })(e, t) ||
      (function (e, t) {
        for (const n of document.styleSheets)
          try {
            for (const o of n.cssRules || [])
              if (o.selectorText && e.matches(o.selectorText)) {
                const e = o.style[t]
                if (e)
                  return {
                    source:
                      'STYLE' === n.ownerNode.tagName
                        ? 'an inline <style> block'
                        : `stylesheet (${n.href})`,
                    value: e,
                  }
              }
          } catch (e) {
            Oe(n)
          }
        return { source: 'cross-origin stylesheet', value: $e(e, t) }
      })(e, t),
    Me = (e, t) => {
      const { source: n, value: o } = Ee(e, t),
        r = ((e) => (e.tagName ? e.tagName.toLowerCase() : 'unknown'))(e)
      pe(
        `The <b>${t}</> CSS property is set to <b>${o}</> on the <b><${r}></> element via ${n}. This may cause issues with the correct operation of <i>iframe-resizer</>.\n\nIf you wish to restrict the size of the iframe, then you should set this property on the iframe element itself, not the content inside it.`
      )
    }
  function ke() {
    for (const e of [document.documentElement, document.body])
      for (const t of we) Se(e, t) && Me(e, t)
  }
  const je = (e) => (t) => (void 0 === t ? void 0 : e(t)),
    Te = je((e) => 'true' === e),
    xe = je(Number),
    Ae = (e) => (e) => {
      e.size
    },
    Ie = (
      (e = '') =>
      (t) =>
      (n) => {
        n.size > 0 && ce(`${t}Observer ${e}:`, ...Array.from(n).flatMap((e) => ['\n', e]))
      }
    )('already attached'),
    Ne = (e) => (e) => {
      e.size
    },
    Ce =
      (t, n = !0) =>
      (o) => {
        o > 0 &&
          ie(
            `${n ? 'At' : 'De'}tached ${t}Observer ${n ? 'to' : 'from'} %c${o}%c element${
              1 === o ? '' : 's'
            }`,
            h,
            e
          )
      },
    Pe = (e, t, n, o) => {
      const r = Ne(e)
      return (e) => {
        const i = new Set()
        let a = 0
        for (const o of e) n.has(o) && (t.unobserve(o), n.delete(o), i.add(o), (a += 1))
        r(i), o(a), i.clear()
      }
    },
    Re = new Set(),
    Be = new Set(),
    qe = new Set(),
    Le = [],
    De = {
      attributes: !0,
      attributeFilter: [$, w],
      attributeOldValue: !1,
      characterData: !1,
      characterDataOldValue: !1,
      childList: !0,
      subtree: !0,
    }
  let Fe,
    We = 1,
    Ve = !1,
    He = 0
  const Ue = (e) => {
      e.size
    },
    Ze = (e) => {
      e.size
    },
    Je = (e) => {
      e.size
    },
    _e = (e) => e.nodeType !== Node.ELEMENT_NODE || R.has(e.tagName.toLowerCase())
  function Qe(e) {
    const t = e.addedNodes
    for (const e of t) _e(e) || Re.add(e)
  }
  function Ge(e) {
    const t = e.removedNodes
    for (const e of t) _e(e) || (Re.has(e) ? (Re.delete(e), qe.add(e)) : Be.add(e))
  }
  const Ye = (e) => {
    ie('Mutations:', e)
    for (const t of e) Qe(t), Ge(t)
    Ue(Re), Ze(Be), Je(qe), qe.clear()
  }
  const Xe = (e) => () => {
    const t = performance.now(),
      n = t - He,
      o = 16 * We++ + 2
    if (n > o && n < 200)
      return (
        ue('mutationThrottled'),
        ie('Update delayed due to heavy workload on the callStack'),
        ie(`EventLoop busy time: %c${Q(n)}ms %c> Max wait: %c${o - 2}ms`, h, g, h),
        setTimeout(Fe, 16 * We),
        void (He = t)
      )
    ;(We = 1),
      Le.forEach(Ye),
      (Le.length = 0),
      (Ve = !1),
      Be.size,
      Re.size,
      e({ addedNodes: Re, removedNodes: Be }),
      Re.clear(),
      Be.clear()
  }
  function Ke(e) {
    Le.push(e), Ve || ((He = performance.now()), (Ve = !0), requestAnimationFrame(Fe))
  }
  function et(e) {
    const t = new window.MutationObserver(Ke),
      n = document.body || document.documentElement
    return (
      (Fe = Xe(e)),
      t.observe(n, De),
      ie('Attached MutationObserver to body'),
      {
        ...t,
        disconnect: () => {
          Re.clear(), Be.clear(), (Le.length = 0), t.disconnect(), ie('Detached MutationObserver')
        },
      }
    )
  }
  const tt = 'Overflow',
    nt = Ce(tt),
    ot = Ce(tt, !1),
    rt = Ae(tt),
    it = Ie(tt),
    at = (e) => e.hidden || null === e.offsetParent || 'none' === e.style.display,
    st = (e, t) => {
      const n = t.side,
        o = { root: t.root, rootMargin: '0px', threshold: 1 },
        r = window?.requestAnimationFrame || _,
        i = (t = !1) => e(t),
        a = (e, t) => 0 === e || e > t[n],
        s = (e, t) => e.toggleAttribute(z, t)
      const c = new IntersectionObserver(function (e) {
          for (const t of e) {
            const { boundingClientRect: e, rootBounds: o, target: r } = t
            if (!o) continue
            const i = e[n],
              c = a(i, o) && !at(r)
            s(r, c)
          }
          r(i)
        }, o),
        l = new WeakSet()
      return {
        attachObservers: function (e) {
          const t = new Set(),
            n = new Set()
          let o = 0
          for (const r of e)
            r.nodeType === Node.ELEMENT_NODE &&
              (l.has(r) ? t.add(r) : (c.observe(r), l.add(r), n.add(r), (o += 1)))
          it(t), rt(n), nt(o), n.clear(), t.clear()
        },
        detachObservers: Pe(tt, c, l, ot),
        disconnect: () => {
          c.disconnect(), ie('Detached OverflowObserver')
        },
      }
    },
    ct = '--ifr-start',
    lt = '--ifr-end',
    ut = '--ifr-measure',
    dt = []
  let ft,
    mt = {},
    pt = 0
  function ht() {
    try {
      performance.clearMarks(ct), performance.clearMarks(lt), performance.clearMeasures(ut)
    } catch {}
  }
  function gt(e) {
    e.getEntries().forEach((e) => {
      if (e.name === lt)
        try {
          const { duration: t } = performance.measure(ut, ct, lt)
          ;(mt = e.detail), dt.push(t), dt.length > 100 && dt.shift()
        } catch {}
    })
  }
  function yt() {
    ie('Attached PerformanceObserver to page')
    const e = new PerformanceObserver(gt)
    return (
      e.observe({ entryTypes: ['mark'] }),
      (ft = setInterval(() => {
        if (dt.length < 10) return
        if (mt.hasTags && mt.len < 25) return
        dt.sort()
        const e = Math.min(
            dt.reduce((e, t) => e + t, 0) / dt.length,
            dt[Math.floor(dt.length / 2)]
          ),
          t = Q(e)
        t > pt && ((pt = t), ue('performanceObserver')),
          ht(),
          e <= 4 ||
            (clearInterval(ft),
            pe(
              `<rb>Performance Warning</>\n\nCalculating the page size is taking an excessive amount of time (${Q(
                e
              )}ms).\n\nTo improve performance add the <b>data-iframe-size</> attribute to the ${mt.Side.toLowerCase()} most element on the page. For more details see: <u>https://iframe-resizer.com/perf</>.`
            ))
      }, 5e3)),
      {
        disconnect: () => {
          ht(), clearInterval(ft), e.disconnect(), ie('Detached PerformanceObserver')
        },
      }
    )
  }
  const bt = 'Resize',
    vt = Ce(bt),
    wt = Ce(bt, !1),
    zt = Ae(bt),
    $t = Ie(bt),
    St = new WeakSet(),
    Ot = new Set(),
    Et = new Set()
  let Mt
  function kt(e) {
    let t = 0
    for (const n of e) {
      if (n.nodeType !== Node.ELEMENT_NODE) continue
      const e = getComputedStyle(n)?.position
      '' !== e &&
        'static' !== e &&
        (St.has(n) ? Ot.add(n) : (Mt.observe(n), St.add(n), Et.add(n), (t += 1)))
    }
    $t(Ot), zt(Et), vt(t), Et.clear(), Ot.clear()
  }
  function jt(e) {
    const t = new IntersectionObserver((t) => e(t[0].isIntersecting), { threshold: 0 }),
      n = document.documentElement
    return (
      t.observe(n),
      ie('Attached VisibilityObserver to page'),
      {
        disconnect: () => {
          t.disconnect(), ie('Detached VisibilityObserver')
        },
      }
    )
  }
  const Tt = (e) => (t, n) => {
      if (n in t) {
        if (typeof t[n] === e) return t[n]
        throw new TypeError(`${n} is not a ${e}.`)
      }
    },
    xt = Tt('function'),
    At = Tt('number'),
    It = Tt('string')
  'undefined' != typeof window &&
    (function () {
      const o = {
          height: () => (me('Custom height calculation function not defined'), pn.auto()),
          width: () => (me('Custom width calculation function not defined'), hn.auto()),
        },
        r = {
          bodyOffset: 1,
          bodyScroll: 1,
          offset: 1,
          documentElementOffset: 1,
          documentElementScroll: 1,
          boundingClientRect: 1,
          max: 1,
          min: 1,
          grow: 1,
          lowestElement: 1,
        },
        i = {},
        a = 'auto',
        s = '[iFrameSizer]',
        c = [],
        l = 'scroll'
      let u,
        d,
        f,
        m,
        p,
        q,
        F,
        V = !0,
        Q = '',
        te = 0,
        ne = '',
        re = '',
        ge = !1,
        we = !0,
        ze = !1,
        $e = !0,
        Se = !1,
        Oe = !1,
        Ee = !0,
        Me = !1,
        je = 1,
        Ae = a,
        Ie = '',
        Ne = !0,
        Ce = {},
        Re = !1,
        Be = !1,
        qe = !1,
        Le = 0,
        De = !1,
        Fe = 0,
        We = 0,
        Ve = new Set(),
        He = '',
        Ue = 'child',
        Ze = !1,
        Je = '',
        _e = [],
        Qe = window.parent,
        Ge = '*',
        Ye = 0,
        Xe = !1,
        Ke = 1,
        tt = l,
        nt = window,
        ot = () => {
          me('onMessage function not defined')
        },
        rt = () => {},
        it = null,
        at = null
      function ut(e) {
        var t
        !(function (e) {
          ;(He = e[0] ?? He),
            (te = xe(e[1]) ?? te),
            (ze = Te(e[2]) ?? ze),
            (qe = Te(e[3]) ?? qe),
            (V = Te(e[6]) ?? V),
            (ne = e[7] ?? ne),
            (Ae = e[8] ?? Ae),
            (Q = e[9] ?? Q),
            (re = e[10] ?? re),
            (Ye = xe(e[11]) ?? Ye),
            (Ce.enable = Te(e[12]) ?? !1),
            (Ue = e[13] ?? Ue),
            (tt = e[14] ?? tt),
            (De = Te(e[15]) ?? De),
            (Fe = xe(e[16]) ?? Fe),
            (We = xe(e[17]) ?? We),
            (we = Te(e[18]) ?? we),
            (u = e[19] ?? u),
            (q = e[20] ?? q),
            (Le = xe(e[21]) ?? Le),
            (Be = Te(e[23]) ?? Be)
        })(e),
          (ee = (t = { id: He, enabled: qe, expand: Be }).id || b),
          oe.label(`${ee}`),
          oe.expand(t.expand),
          (K = t.enabled),
          (function () {
            function e(e) {
              ;(F = xt(e, 'onBeforeResize') ?? F),
                (ot = xt(e, 'onMessage') ?? ot),
                (rt = xt(e, 'onReady') ?? rt),
                'number' == typeof e?.offset &&
                  (ve('offset', 'offsetSize'),
                  we && (Fe = At(e, 'offset') ?? Fe),
                  ze && (We = At(e, 'offset') ?? We)),
                'number' == typeof e?.offsetSize &&
                  (we && (Fe = At(e, 'offsetSize') ?? Fe), ze && (We = At(e, 'offsetSize') ?? We)),
                (d = It(e, L(D[0])) ?? d),
                (Ie = It(e, 'ignoreSelector') ?? Ie),
                (Je = It(e, 'sizeSelector') ?? Je),
                (Ge = It(e, 'targetOrigin') ?? Ge),
                (Ae = e?.heightCalculationMethod || Ae),
                (tt = e?.widthCalculationMethod || tt)
            }
            function t(e, t) {
              return (
                'function' == typeof e &&
                  (pe(
                    `<rb>Deprecated Option(${t}CalculationMethod)</>\n\nThe use of <b>${t}CalculationMethod</> as a function is deprecated and will be removed in a future version of <i>iframe-resizer</>. Please use the new <b>onBeforeResize</> event handler instead.\n\nSee <u>https://iframe-resizer.com/api/child</> for more details.`
                  ),
                  (o[t] = e),
                  (e = 'custom')),
                e
              )
            }
            if (1 === Le) return
            const n = window.iframeResizer || window.iFrameResizer
            'object' == typeof n &&
              (e(n),
              (Ae = t(Ae, 'height')),
              (tt = t(tt, 'width')),
              ie(`Set targetOrigin for parent: %c${Ge}`, h))
          })(),
          [
            vt,
            $t,
            Ft,
            ht,
            zt,
            Lt,
            Dt,
            Bt,
            gt,
            mt,
            ge ? _ : ke,
            Tt,
            Zt,
            Ut,
            Ht,
            Nt,
            () => Ot('background', Q),
            () => Ot('padding', re),
            ge ? _ : Ct,
            Vt,
            Wt,
            rn,
            dt,
          ].forEach((e) => {
            try {
              e()
            } catch (e) {
              if (Le < 0) throw e
              pe(
                '<rb>Error in setup function</>\n<i>iframe-resizer</> detected an error during setup.\n\nPlease report the following error message at <u>https://github.com/davidjbradshaw/iframe-resizer/issues</>'
              ),
                ce(e)
            }
          }),
          ft(J(rt)),
          $n(P, 'Init message from host page', void 0, void 0, `${y}:${Le}`),
          document.title && '' !== document.title && En(0, 0, 'title', document.title)
      }
      function dt() {
        B(window, 'beforeunload', () => {
          c.forEach((e) => e()), En(0, 0, 'beforeUnload')
        })
      }
      function ft(e) {
        'complete' === document.readyState ? Z(e) : B(document, 'readystatechange', () => ft(e))
      }
      function mt() {
        ;(_e = document.querySelectorAll(`[${w}]`)), (Me = _e.length > 0)
      }
      let pt = 0
      function ht() {
        const n = document.querySelectorAll(`*[${$}]`)
        return (
          (Se = n.length > 0),
          Se &&
            n.length !== pt &&
            ((function (n) {
              const o = 1 === n.length ? '' : 's'
              me(`%c[${$}]%c found on %c${n.length}%c element${o}`, t, e, t, e)
            })(n),
            (pt = n.length)),
          Se
        )
      }
      function gt() {
        'BackCompat' === document.compatMode &&
          pe(
            "<rb>Quirks Mode Detected</>\n\nThis iframe is running in the browser's legacy <b>Quirks Mode</>, this may cause issues with the correct operation of <i>iframe-resizer</>. It is recommended that you switch to the modern <b>Standards Mode</>.\n\nFor more information see <u>https://iframe-resizer.com/quirks-mode</>.\n"
          )
      }
      function vt() {
        q && '' !== q && 'false' !== q
          ? q !== y &&
            pe(
              `<b>Version mismatch</>\n\nThe parent and child pages are running different versions of <i>iframe resizer</>.\n\nParent page: ${q} - Child page: ${y}.\n`
            )
          : pe(
              '<rb>Legacy version detected on parent page</>\n\nDetected legacy version of parent page script. It is recommended to update the parent page to use <b>@iframe-resizer/parent</>.\n\nSee <u>https://iframe-resizer.com/setup/</> for more details.\n'
            )
      }
      function zt() {
        try {
          Ze = 1 === Le || 'iframeParentListener' in window.parent
        } catch (e) {}
      }
      function $t() {
        ze === we && (ge = !0)
      }
      function Ot(e, t) {
        void 0 !== t &&
          '' !== t &&
          'null' !== t &&
          (document.body.style.setProperty(e, t), ie(`Set body ${e}: %c${t}`, h))
      }
      function Et(e, t, n) {
        if ('' !== n) for (const e of document.querySelectorAll(n)) e.toggleAttribute(t, !0)
      }
      function Tt() {
        Et(0, w, Je), Et(0, $, Ie)
      }
      function Nt() {
        var e, t
        void 0 === ne && (ne = `${te}px`),
          Ot(
            'margin',
            ((e = 'margin'),
            (t = ne).includes('-') && (me(`Negative CSS value ignored for ${e}`), (t = '')),
            t)
          )
      }
      function Ct() {
        const e = (e) => e.style.setProperty('height', 'auto', 'important')
        e(document.documentElement), e(document.body)
      }
      function Pt(e) {
        ;({
          add(t) {
            function n() {
              $n(e.eventName, e.eventType)
            }
            ;(i[t] = n), B(window, t, n, { passive: !0 })
          },
          remove(e) {
            const t = i[e]
            var n, o
            delete i[e], (n = e), (o = t), window.removeEventListener(n, o, !1)
          },
        })[e.method](e.eventName)
      }
      function Rt(e) {
        Pt({ method: e, eventType: 'After Print', eventName: 'afterprint' }),
          Pt({ method: e, eventType: 'Before Print', eventName: 'beforeprint' }),
          Pt({ method: e, eventType: 'Ready State Change', eventName: 'readystatechange' })
      }
      function Bt() {
        let e = !1
        const t = (t) =>
          document.querySelectorAll(`[${t}]`).forEach((n) => {
            ;(e = !0), n.removeAttribute(t), n.toggleAttribute(w, !0)
          })
        t('data-iframe-height'),
          t('data-iframe-width'),
          e &&
            pe(
              '<rb>Deprecated Attributes</>\n          \nThe <b>data-iframe-height</> and <b>data-iframe-width</> attributes have been deprecated and replaced with the single <b>data-iframe-size</> attribute. Use of the old attributes will be removed in a future version of <i>iframe-resizer</>.'
            )
      }
      function qt(e, t, n) {
        const { label: o } = n
        return (
          t !== e &&
            (e in n || (me(`${e} is not a valid option for ${o}CalculationMethod.`), (e = t)),
            e in r) &&
            pe(
              `<rb>Deprecated ${o}CalculationMethod (${e})</>\n\nThis version of <i>iframe-resizer</> can auto detect the most suitable ${o} calculation method. It is recommended that you ${
                q
                  ? 'remove this option.'
                  : `set this option to <b>'auto'</> when using an older version of <i>iframe-resizer</> on the parent page. This can be done on the child page by adding the following code:\n          \nwindow.iframeResizer = {\n  license: 'xxxx',\n  ${o}CalculationMethod: 'auto',\n}\n`
              }\n`
            ),
          e
        )
      }
      function Lt() {
        Ae = qt(Ae, a, pn)
      }
      function Dt() {
        tt = qt(tt, l, hn)
      }
      function Ft() {
        const t = Le,
          n = U({ key: u }),
          o = U({ key: d })
        if (((Le = Math.max(n, o)), Le < 0)) {
          if (((Le = Math.min(n, o)), fe(), pe(`${H(Le + 2)}${H(2)}`), Y(q)))
            throw H(Le + 2).replace(/<\/?[a-z][^>]*>|<\/>/gi, '')
        } else
          (!Y(q) || (t > -1 && Le > t)) &&
            (sessionStorage.getItem('ifr') !== y &&
              (function (t, n) {
                console.info(`${ee} %ciframe-resizer ${t}`, K || n < 1 ? 'font-weight: bold;' : e)
              })(`v${y} (${((e) => L(W[e]))(Le)})`, Le),
            Le < 2 && he(H(3)),
            sessionStorage.setItem('ifr', y))
      }
      function Wt() {
        Rt('add'), c.push(() => Rt('remove'))
      }
      function Vt() {
        const e = document.createElement('div')
        ;(e.style.clear = 'both'),
          (e.style.display = 'block'),
          (e.style.height = '0'),
          document.body.append(e)
      }
      function Ht() {
        function e(e) {
          const t = e.getBoundingClientRect(),
            n = { x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop }
          return {
            x: parseInt(t.left, v) + parseInt(n.x, v),
            y: parseInt(t.top, v) + parseInt(n.y, v),
          }
        }
        function t(t) {
          const n = t.split('#')[1] || t,
            o = decodeURIComponent(n),
            r = document.getElementById(o) || document.getElementsByName(o)[0]
          void 0 === r
            ? En(0, 0, 'inPageLink', `#${n}`)
            : (function (t) {
                const n = e(t)
                En(n.y, n.x, 'scrollToOffset')
              })(r)
        }
        function n() {
          const { hash: e, href: n } = window.location
          '' !== e && '#' !== e && t(n)
        }
        Ce.enable &&
          (1 === Le
            ? pe(
                'In page linking requires a Professional or Business license. Please see <u>https://iframe-resizer.com/pricing</> for more details.'
              )
            : ((function () {
                for (const e of document.querySelectorAll('a[href^="#"]'))
                  '#' !== e.getAttribute('href') &&
                    B(e, 'click', (n) => {
                      n.preventDefault(), t(e.getAttribute('href'))
                    })
              })(),
              B(window, 'hashchange', n),
              setTimeout(n, 128))),
          (Ce = { findTarget: t })
      }
      function Ut() {
        function e(e) {
          En(0, 0, e.type, `${e.screenY}:${e.screenX}`)
        }
        function t(t, n) {
          B(window.document, t, e)
        }
        !0 === De && (t('mouseenter'), t('mouseleave'))
      }
      function Zt() {
        1 !== Le &&
          ((nt.parentIframe = Object.freeze({
            autoResize: (e) => (
              X(e, 'boolean', 'parentIframe.autoResize(enable) enable'),
              !1 === ze && !1 === we
                ? (ue(E),
                  pe("Auto Resize can not be changed when <b>direction</> is set to 'none'."),
                  !1)
                : (!0 === e && !1 === V
                    ? ((V = !0), queueMicrotask(() => $n(E, 'Auto Resize enabled')))
                    : !1 === e && !0 === V && (V = !1),
                  En(0, 0, 'autoResize', JSON.stringify(V)),
                  V)
            ),
            close() {
              En(0, 0, 'close')
            },
            getId: () => He,
            getOrigin: () => (ye('getOrigin()', 'getParentOrigin()'), f),
            getParentOrigin: () => f,
            getPageInfo(e) {
              if ('function' == typeof e)
                return (
                  (it = e),
                  En(0, 0, 'pageInfo'),
                  void be(
                    'getPageInfo()',
                    'getParentProps()',
                    'See <u>https://iframe-resizer.com/upgrade</> for details. '
                  )
                )
              ;(it = null), En(0, 0, 'pageInfoStop')
            },
            getParentProps: (e) => (
              X(e, 'function', 'parentIframe.getParentProps(callback) callback'),
              (at = e),
              En(0, 0, 'parentInfo'),
              () => {
                ;(at = null), En(0, 0, 'parentInfoStop')
              }
            ),
            getParentProperties(e) {
              ye('getParentProperties()', 'getParentProps()'), this.getParentProps(e)
            },
            moveToAnchor(e) {
              X(e, 'string', 'parentIframe.moveToAnchor(anchor) anchor'), Ce.findTarget(e)
            },
            reset() {
              !(function () {
                const e = Ae
                ;(Ae = a),
                  Xe ||
                    ((Xe = !0),
                    requestAnimationFrame(() => {
                      Xe = !1
                    })),
                  Sn('reset'),
                  (Ae = e)
              })()
            },
            setOffsetSize(e) {
              X(e, 'number', 'parentIframe.setOffsetSize(offset) offset'),
                (Fe = e),
                (We = e),
                $n(x, `parentIframe.setOffsetSize(${e})`)
            },
            scrollBy(e, t) {
              X(e, 'number', 'parentIframe.scrollBy(x, y) x'),
                X(t, 'number', 'parentIframe.scrollBy(x, y) y'),
                En(t, e, 'scrollBy')
            },
            scrollTo(e, t) {
              X(e, 'number', 'parentIframe.scrollTo(x, y) x'),
                X(t, 'number', 'parentIframe.scrollTo(x, y) y'),
                En(t, e, 'scrollTo')
            },
            scrollToOffset(e, t) {
              X(e, 'number', 'parentIframe.scrollToOffset(x, y) x'),
                X(t, 'number', 'parentIframe.scrollToOffset(x, y) y'),
                En(t, e, 'scrollToOffset')
            },
            sendMessage(e, t) {
              t && X(t, 'string', 'parentIframe.sendMessage(msg, targetOrigin) targetOrigin'),
                En(0, 0, 'message', JSON.stringify(e), t)
            },
            setHeightCalculationMethod(e) {
              ;(Ae = e), Lt()
            },
            setWidthCalculationMethod(e) {
              ;(tt = e), Dt()
            },
            setTargetOrigin(e) {
              X(e, 'string', 'parentIframe.setTargetOrigin(targetOrigin) targetOrigin'), (Ge = e)
            },
            resize(e, t) {
              void 0 !== e &&
                X(e, 'number', 'parentIframe.resize(customHeight, customWidth) customHeight'),
                void 0 !== t &&
                  X(t, 'number', 'parentIframe.resize(customHeight, customWidth) customWidth'),
                $n(k, `parentIframe.resize(${e || ''}${t ? `,${t}` : ''})`, e, t)
            },
            size(e, t) {
              ye('size()', 'resize()'), this.resize(e, t)
            },
          })),
          (nt.parentIFrame = nt.parentIframe))
      }
      let Jt = new Set()
      function _t() {
        const e = document.querySelectorAll(`[${z}]`)
        ;(Ve = (function (e) {
          const t = new Set(),
            n = new Set()
          for (const o of e) o.closest(`[${$}]`) ? n.add(o) : t.add(o)
          return (
            n.size > 0 &&
              queueMicrotask(() => {
                ue('overflowIgnored'),
                  ie('Ignoring elements with [data-iframe-ignore] > *:\n', n),
                  se()
              }),
            t
          )
        })(e)),
          (Oe = Ve.size > 0),
          'function' == typeof Set.prototype.symmetricDifference &&
            (Ee = Ve.symmetricDifference(Jt).size > 0),
          (Jt = Ve)
      }
      function Qt() {
        switch ((_t(), !0)) {
          case !Ee:
            return
          case Ve.size > 1:
            ie('Overflowed Elements:', Ve)
            break
          case Oe:
            break
          default:
            ie('No overflow detected')
        }
        $n(I, 'Overflow updated')
      }
      function Gt(e) {
        const t = { root: document.documentElement, side: we ? S : O }
        return (m = st(Qt, t)), m.attachObservers(e), m
      }
      function Yt(e) {
        if (!Array.isArray(e) || 0 === e.length) return
        const t = e[0].target
        $n(
          A,
          `Element resized <${(function (e) {
            switch (!0) {
              case !Y(e):
                return ''
              case Y(e.id):
                return `${e.nodeName}#${e.id}`
              case Y(e.name):
                return `${e.nodeName} (${e.name}`
              case Y(e.className):
                return `${e.nodeName}.${e.className}`
              default:
                return e.nodeName
            }
          })(t)}>`
        )
      }
      function Xt(e) {
        return (
          (Mt = new ResizeObserver(Yt)),
          Mt.observe(document.body),
          St.add(document.body),
          ie('Attached ResizeObserver to body'),
          (p = {
            attachObserverToNonStaticElements: kt,
            detachObservers: Pe(bt, Mt, St, wt),
            disconnect: () => {
              Mt.disconnect(), ie('Detached ResizeObserver')
            },
          }),
          p.attachObserverToNonStaticElements(e),
          p
        )
      }
      function Kt(e) {
        ;(Re = !e), $n(C, 'Visibility changed')
      }
      const en = (e) => {
          const t = new Set()
          for (const n of e) {
            t.add(n)
            for (const e of ln(n)) t.add(e)
          }
          return ie('Inspecting:\n', t), t
        },
        tn = (e) => {
          if (0 === e.size) return
          ue('addObservers')
          const t = en(e)
          m.attachObservers(t), p.attachObserverToNonStaticElements(t), se()
        },
        nn = (e) => {
          if (0 === e.size) return
          ue('removeObservers')
          const t = en(e)
          m.detachObservers(t), p.detachObservers(t), se()
        }
      function on(e) {
        !(function ({ addedNodes: e, removedNodes: t }) {
          ue('contentMutated'), Tt(), mt(), _t(), se(), nn(t), tn(e)
        })(e),
          $n(N, 'Mutation Observed')
      }
      function rn() {
        const e = ln(document.documentElement)
        var t
        ;(t = [et(on), Gt(e), yt(), Xt(e), jt(Kt)]), c.push(...t.map((e) => e.disconnect))
      }
      function an(e) {
        performance.mark(ct)
        const t = G(e)
        let n = 1,
          o = document.documentElement,
          r = Me ? 0 : document.documentElement.getBoundingClientRect().bottom
        const i = Me ? _e : Oe ? Array.from(Ve) : ln(document.documentElement)
        for (const t of i)
          (n =
            t.getBoundingClientRect()[e] +
            parseFloat(getComputedStyle(t).getPropertyValue(`margin-${e}`))),
            n > r && ((r = n), (o = t))
        return (
          ie(`${t} position calculated from:`, o),
          ie(`Checked %c${i.length}%c elements`, h, g),
          performance.mark(lt, { detail: { hasTags: Me, len: i.length, logging: qe, Side: t } }),
          r
        )
      }
      const sn = (e) => [
          e.bodyOffset(),
          e.bodyScroll(),
          e.documentElementOffset(),
          e.documentElementScroll(),
          e.boundingClientRect(),
        ],
        cn = `* ${Array.from(R)
          .map((e) => `:not(${e})`)
          .join('')}`,
        ln = (e) => e.querySelectorAll(cn),
        un = { height: 0, width: 0 },
        dn = { height: 0, width: 0 },
        fn = [h, g, h]
      function mn(e) {
        function t() {
          return (dn[o] = r), (un[o] = s), Math.max(r, 1)
        }
        const n = e === pn,
          o = e.label,
          r = e.boundingClientRect(),
          i = Math.ceil(r),
          a = Math.floor(r),
          s = ((e) => e.documentElementScroll() + Math.max(0, e.getOffset()))(e),
          c = `HTML: %c${r}px %cPage: %c${s}px`
        let l = 0
        switch (!0) {
          case !e.enabled():
            return Math.max(s, 1)
          case Me:
            ie('Found element with data-iframe-size attribute'), (l = e.taggedElement())
            break
          case !Oe && $e && 0 === dn[o] && 0 === un[o]:
            ie(`Initial page size values: ${c}`, ...fn), (l = t())
            break
          case Xe && r === dn[o] && s === un[o]:
            ie(`Size unchanged: ${c}`, ...fn), (l = Math.max(r, s))
            break
          case 0 === r && 0 !== s:
            ie(`Page is hidden: ${c}`, ...fn), (l = s)
            break
          case !Oe && r !== dn[o] && s <= un[o]:
            ie(`New <html> size: ${c} `, ...fn),
              ie(`Previous <html> size: %c${dn[o]}px`, h),
              (l = t())
            break
          case !n:
            l = e.taggedElement()
            break
          case !Oe && r < dn[o]:
            ie(`<html> size decreased: ${c}`, ...fn), (l = t())
            break
          case s === a || s === i:
            ie(`<html> size equals page size: ${c}`, ...fn), (l = t())
            break
          case r > s:
            ie(`Page size < <html> size: ${c}`, ...fn), (l = t())
            break
          case Oe:
            ie('Found elements possibly overflowing <html> '), (l = e.taggedElement())
            break
          default:
            ie(`Using <html> size: ${c}`, ...fn), (l = t())
        }
        return (
          ie(`Content ${o}: %c${l}px`, h),
          (l += (function (e) {
            const t = e.getOffset()
            return 0 !== t && ie(`Page offsetSize: %c${t}px`, h), t
          })(e)),
          l
        )
      }
      const pn = {
          label: 'height',
          enabled: () => we,
          getOffset: () => Fe,
          auto: () => mn(pn),
          bodyOffset: () => {
            const { body: e } = document,
              t = getComputedStyle(e)
            return e.offsetHeight + parseInt(t.marginTop, v) + parseInt(t.marginBottom, v)
          },
          bodyScroll: () => document.body.scrollHeight,
          offset: () => pn.bodyOffset(),
          custom: () => o.height(),
          documentElementOffset: () => document.documentElement.offsetHeight,
          documentElementScroll: () => document.documentElement.scrollHeight,
          boundingClientRect: () =>
            Math.max(
              document.documentElement.getBoundingClientRect().bottom,
              document.body.getBoundingClientRect().bottom
            ),
          max: () => Math.max(...sn(pn)),
          min: () => Math.min(...sn(pn)),
          grow: () => pn.max(),
          lowestElement: () => an(S),
          taggedElement: () => an(S),
        },
        hn = {
          label: 'width',
          enabled: () => ze,
          getOffset: () => We,
          auto: () => mn(hn),
          bodyScroll: () => document.body.scrollWidth,
          bodyOffset: () => document.body.offsetWidth,
          custom: () => o.width(),
          documentElementScroll: () => document.documentElement.scrollWidth,
          documentElementOffset: () => document.documentElement.offsetWidth,
          boundingClientRect: () =>
            Math.max(
              document.documentElement.getBoundingClientRect().right,
              document.body.getBoundingClientRect().right
            ),
          max: () => Math.max(...sn(hn)),
          min: () => Math.min(...sn(hn)),
          rightMostElement: () => an(O),
          scroll: () => Math.max(hn.bodyScroll(), hn.documentElementScroll()),
          taggedElement: () => an(O),
        },
        gn = (e, t) => !(Math.abs(e - t) <= Ye)
      function yn(e, t) {
        const n = e[t](),
          o =
            e.enabled() && void 0 !== F
              ? (function (e) {
                  const t = F(e)
                  if (void 0 === t)
                    throw new TypeError(
                      'No value returned from onBeforeResize(), expected a numeric value'
                    )
                  if (Number.isNaN(t))
                    throw new TypeError(
                      `Invalid value returned from onBeforeResize(): ${t}, expected Number`
                    )
                  if (t < 1)
                    throw new RangeError(
                      `Out of range value returned from onBeforeResize(): ${t}, must be at least 1`
                    )
                  return t
                })(n)
              : n
        return ae(o >= 1, `New iframe ${e.label} is too small: ${o}, must be at least 1`), o
      }
      let bn = !1
      const vn = J(() => he(H(4)))
      let wn,
        zn = !1
      const $n = le((e, t, n, o, r) => {
        switch ((ue(e), !0)) {
          case !0 === Re:
            if (!0 === zn) break
            ;(zn = !0), (bn = !1), cancelAnimationFrame(wn)
            break
          case !0 === bn:
            fe()
            break
          case !V && !(e in T):
            ie('Resizing disabled')
            break
          default:
            ;(zn = !1),
              (bn = !0),
              performance.now(),
              (wn = requestAnimationFrame(() => {
                ;(bn = !1), ue('requestAnimationFrame')
              })),
              (function (e, t, n, o, r) {
                const i = n ?? yn(pn, Ae),
                  a = o ?? yn(hn, tt)
                switch ((we && gn(je, i)) || (ze && gn(Ke, a)) ? M : e) {
                  case P:
                  case E:
                  case M:
                    ;(je = i), (Ke = a)
                  case x:
                    On(je, Ke, e, r)
                    break
                  case I:
                  case N:
                  case A:
                  case C:
                    fe()
                    break
                  default:
                    fe(), ie('No change in content size detected')
                }
              })(e, 0, n, o, r)
        }
        se()
      })
      function Sn(e) {
        ;(je = pn[Ae]()), (Ke = hn[tt]()), En(je, Ke, e)
      }
      function On(e, t, o, r, i) {
        Le < -1 ||
          (void 0 !== i || (i = Ge),
          (function () {
            const a = `${He}:${e}:${t}:${o}${void 0 === r ? '' : `:${r}`}`
            if (Ze)
              try {
                window.parent.iframeParentListener(s + a)
              } catch (e) {
                if (1 !== Le) throw e
                return void vn()
              }
            else Qe.postMessage(s + a, i)
            ie(
              `Sending message to parent page via ${Ze ? 'sameOrigin' : 'postMessage'}: %c%c${a}`,
              n,
              h
            )
          })())
      }
      const En = le((e, t, n, o, r) => {
          ue(n), On(e, t, n, o, r), se()
        }),
        Mn = le(function (e) {
          ue('onMessage')
          const { freeze: t } = Object,
            { parse: n } = JSON,
            o = (e) => En(0, 0, `${e}Stop`),
            r = {
              init: function () {
                if ('loading' === document.readyState) return
                const t = e.data.slice(13).split(':')
                ;(Qe = e.source),
                  (f = e.origin),
                  ut(t),
                  ($e = !1),
                  setTimeout(() => {
                    Ne = !1
                  }, 128)
              },
              reset() {
                Ne || Sn('resetPage')
              },
              resize() {
                $n(j, 'Parent window requested size check')
              },
              moveToAnchor() {
                Ce.findTarget(a())
              },
              inPageLink() {
                this.moveToAnchor()
              },
              pageInfo() {
                const e = a()
                it ? Z(it, n(e)) : o('pageInfo')
              },
              parentInfo() {
                const e = ((r = a()), t(n(r)))
                var r
                at ? Z(at, e) : o('parentInfo')
              },
              message() {
                const e = a()
                Z(ot, n(e))
              },
            },
            i = () => e.data.split(']')[1].split(':')[0],
            a = () => e.data.slice(e.data.indexOf(':') + 1),
            c = () => e.data.split(':')[2] in { true: 1, false: 1 }
          function l() {
            const t = i()
            ue(t),
              t in r
                ? r[t]()
                : 'iframeResize' in window ||
                  (void 0 !== window.jQuery && '' in window.jQuery.prototype) ||
                  c() ||
                  me(`Unexpected message (${e.data})`)
          }
          s === `${e.data}`.slice(0, 13) &&
            (function () {
              if (!1 !== $e) return c() ? (de(i()), ue(P), void r.init()) : void 0
              l()
            })()
        })
      let kn = !1
      const jn = (e) => e.postMessage('[iFrameResizerChild]Ready', '*')
      function Tn() {
        if ('loading' === document.readyState || !$e || kn) return
        const { parent: e, top: t } = window
        jn(e), e !== t && jn(t), (kn = !0)
      }
      'iframeChildListener' in window
        ? me('Already setup')
        : ((window.iframeChildListener = (e) => setTimeout(() => Mn({ data: e, sameOrigin: !0 }))),
          B(window, 'message', Mn),
          B(document, 'readystatechange', Tn),
          setTimeout(Tn))
    })()
})
