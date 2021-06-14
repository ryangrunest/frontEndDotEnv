var fdd;
(() => {
  'use strict';
  var e = e => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: 'Module',
        }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    },
    n = {};
  (() => {
    e(n);
    var r = void 0;
    function t(e) {
      return (t =
        'function' == typeof Symbol &&
        'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function o(e, n, r, t, o, c, a) {
      try {
        var u = e[c](a),
          i = u.value;
      } catch (e) {
        return void r(e);
      }
      u.done ? n(i) : Promise.resolve(i).then(t, o);
    }
    function c(e) {
      return function () {
        var n = this,
          r = arguments;
        return new Promise(function (t, c) {
          var a = e.apply(n, r);
          function u(e) {
            o(a, t, c, u, i, 'next', e);
          }
          function i(e) {
            o(a, t, c, u, i, 'throw', e);
          }
          u(void 0);
        });
      };
    }
    const a = (encode = {
      encodeValue: function (e) {
        return new TextEncoder().encode(e);
      },
      encryptValue: function (e, n) {
        return new Promise(function (r) {
          var t = window.crypto.getRandomValues(
            new Uint8Array(16)
          );
          window.crypto.subtle
            .encrypt(
              { name: 'AES-CTR', counter: t, length: 64 },
              e,
              n
            )
            .then(function (e) {
              console.log('encrypted value', n),
                r({ cipherText: e, counter: t });
            });
        });
      },
      getEncryptionKey: function () {
        return new Promise(
          (function () {
            var e = c(
              regeneratorRuntime.mark(function e(n) {
                var r;
                return regeneratorRuntime.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          crypto.subtle.generateKey(
                            { name: 'AES-CTR', length: 256 },
                            !1,
                            ['encrypt', 'decrypt']
                          )
                        );
                      case 2:
                        (r = e.sent), n(r);
                      case 4:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (n) {
              return e.apply(this, arguments);
            };
          })()
        );
      },
      init: function (e) {
        return (
          console.log('encoding these values...', e),
          new Promise(
            (function () {
              var n = c(
                regeneratorRuntime.mark(function n(t, o) {
                  var c, a, u, i, s, f, l, y, p, d, m, b;
                  return regeneratorRuntime.wrap(
                    function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            if (window) {
                              n.next = 2;
                              break;
                            }
                            throw new Error(
                              'must use fdd in the browser'
                            );
                          case 2:
                            return (
                              (n.prev = 2),
                              (c =
                                r.splitObjectIntoTwoArrays(e)),
                              (a = c.arrayOfKeys),
                              (u = c.arrayOfValues),
                              (n.next = 6),
                              r.encode.getEncryptionKey()
                            );
                          case 6:
                            (i = n.sent), (s = []), (f = 0);
                          case 9:
                            if (!(f < u.length)) {
                              n.next = 23;
                              break;
                            }
                            return (
                              (l = r.encode.encodeValue(u[f])),
                              (n.next = 13),
                              encode.encryptValue(i, l)
                            );
                          case 13:
                            (y = n.sent),
                              (p = y.cipherText),
                              (d = y.counter),
                              (m = new Uint8Array(p)),
                              (b = ''),
                              m.forEach(function (e) {
                                b += String.fromCharCode(e);
                              }),
                              s.push(
                                ((w = {}),
                                (v = a[f]),
                                (h = {
                                  cipherText: p,
                                  counter: d,
                                  buffer: b,
                                }),
                                v in w
                                  ? Object.defineProperty(w, v, {
                                      value: h,
                                      enumerable: !0,
                                      configurable: !0,
                                      writable: !0,
                                    })
                                  : (w[v] = h),
                                w)
                              );
                          case 20:
                            f++, (n.next = 9);
                            break;
                          case 23:
                            console.log('encoded values:\n', s),
                              t({
                                encodedValues: s,
                                encryptionKey: i,
                              }),
                              (n.next = 31);
                            break;
                          case 27:
                            (n.prev = 27),
                              (n.t0 = n.catch(2)),
                              console.warn(
                                'error with fdd config. you are doing something wrong: \n',
                                n.t0
                              ),
                              o(!1);
                          case 31:
                          case 'end':
                            return n.stop();
                        }
                      var w, v, h;
                    },
                    n,
                    null,
                    [[2, 27]]
                  );
                })
              );
              return function (e, r) {
                return n.apply(this, arguments);
              };
            })()
          )
        );
      },
      splitObjectIntoTwoArrays: function (e) {
        if (('object' === t(e)) & (null !== e))
          return {
            arrayOfKeys: Array.from(Object.keys(e)),
            arrayOfValues: Array.from(Object.values(e)),
          };
        throw new Error('error encoding environment variables');
      },
    });
    function u(e) {
      return (u =
        'function' == typeof Symbol &&
        'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function i(e, n, r, t, o, c, a) {
      try {
        var u = e[c](a),
          i = u.value;
      } catch (e) {
        return void r(e);
      }
      u.done ? n(i) : Promise.resolve(i).then(t, o);
    }
    function s(e) {
      return function () {
        var n = this,
          r = arguments;
        return new Promise(function (t, o) {
          var c = e.apply(n, r);
          function a(e) {
            i(c, t, o, a, u, 'next', e);
          }
          function u(e) {
            i(c, t, o, a, u, 'throw', e);
          }
          a(void 0);
        });
      };
    }
    var f = new (function (e) {
      var n = this;
      (this.keys = function () {
        return e;
      }),
        (this.encode = {
          encodeValue: function (e) {
            return new TextEncoder().encode(e);
          },
          encryptValue: function (e, n) {
            return new Promise(function (r) {
              var t = window.crypto.getRandomValues(
                new Uint8Array(16)
              );
              window.crypto.subtle
                .encrypt(
                  { name: 'AES-CTR', counter: t, length: 64 },
                  e,
                  n
                )
                .then(function (e) {
                  console.log('encrypted value', n),
                    r({ cipherText: e, counter: t });
                });
            });
          },
          getEncryptionKey: function () {
            return new Promise(
              (function () {
                var e = s(
                  regeneratorRuntime.mark(function e(n) {
                    var r;
                    return regeneratorRuntime.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.next = 2),
                              crypto.subtle.generateKey(
                                { name: 'AES-CTR', length: 256 },
                                !1,
                                ['encrypt', 'decrypt']
                              )
                            );
                          case 2:
                            (r = e.sent), n(r);
                          case 4:
                          case 'end':
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (n) {
                  return e.apply(this, arguments);
                };
              })()
            );
          },
          init: function (e) {
            return (
              console.log('encoding these values...', e),
              new Promise(
                (function () {
                  var r = s(
                    regeneratorRuntime.mark(function r(t, o) {
                      var c, u, i, s, f, l, y, p, d, m, b, w;
                      return regeneratorRuntime.wrap(
                        function (r) {
                          for (;;)
                            switch ((r.prev = r.next)) {
                              case 0:
                                if (window) {
                                  r.next = 2;
                                  break;
                                }
                                throw new Error(
                                  'must use fdd in the browser'
                                );
                              case 2:
                                return (
                                  (r.prev = 2),
                                  (c =
                                    n.splitObjectIntoTwoArrays(
                                      e
                                    )),
                                  (u = c.arrayOfKeys),
                                  (i = c.arrayOfValues),
                                  (r.next = 6),
                                  n.encode.getEncryptionKey()
                                );
                              case 6:
                                (s = r.sent), (f = []), (l = 0);
                              case 9:
                                if (!(l < i.length)) {
                                  r.next = 23;
                                  break;
                                }
                                return (
                                  (y = n.encode.encodeValue(
                                    i[l]
                                  )),
                                  (r.next = 13),
                                  a.encryptValue(s, y)
                                );
                              case 13:
                                (p = r.sent),
                                  (d = p.cipherText),
                                  (m = p.counter),
                                  (b = new Uint8Array(d)),
                                  (w = ''),
                                  b.forEach(function (e) {
                                    w += String.fromCharCode(e);
                                  }),
                                  f.push(
                                    ((v = {}),
                                    (h = u[l]),
                                    (g = {
                                      cipherText: d,
                                      counter: m,
                                      buffer: w,
                                    }),
                                    h in v
                                      ? Object.defineProperty(
                                          v,
                                          h,
                                          {
                                            value: g,
                                            enumerable: !0,
                                            configurable: !0,
                                            writable: !0,
                                          }
                                        )
                                      : (v[h] = g),
                                    v)
                                  );
                              case 20:
                                l++, (r.next = 9);
                                break;
                              case 23:
                                console.log(
                                  'encoded values:\n',
                                  f
                                ),
                                  t({
                                    encodedValues: f,
                                    encryptionKey: s,
                                  }),
                                  (r.next = 31);
                                break;
                              case 27:
                                (r.prev = 27),
                                  (r.t0 = r.catch(2)),
                                  console.warn(
                                    'error with fdd config. you are doing something wrong: \n',
                                    r.t0
                                  ),
                                  o(!1);
                              case 31:
                              case 'end':
                                return r.stop();
                            }
                          var v, h, g;
                        },
                        r,
                        null,
                        [[2, 27]]
                      );
                    })
                  );
                  return function (e, n) {
                    return r.apply(this, arguments);
                  };
                })()
              )
            );
          },
          splitObjectIntoTwoArrays: function (e) {
            if (('object' === u(e)) & (null !== e))
              return {
                arrayOfKeys: Array.from(Object.keys(e)),
                arrayOfValues: Array.from(Object.values(e)),
              };
            throw new Error(
              'error encoding environment variables'
            );
          },
        }),
        (this.init = s(
          regeneratorRuntime.mark(function e() {
            var r, t, o;
            return regeneratorRuntime.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), n.encode.init(n.keys());
                  case 2:
                    (r = e.sent),
                      (t = r.encodedValues),
                      (o = r.encryptionKey),
                      (window.encodedValues = t),
                      console.log(
                        'encoded values:\n',
                        t,
                        '\nencryption key:\n',
                        o
                      ),
                      f.decodeValues(t, o);
                  case 8:
                  case 'end':
                    return e.stop();
                }
            }, e);
          })
        )),
        (this.decodeValues = (function () {
          var e = s(
            regeneratorRuntime.mark(function e(n, r) {
              var t, o, c, a;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      console.log('decoding values', n), (t = 0);
                    case 2:
                      if (!(t < n.length)) {
                        e.next = 12;
                        break;
                      }
                      return (
                        (o = Array.from(Object.values(n[t]))),
                        (e.next = 6),
                        f.decodeValue(o[0], r)
                      );
                    case 6:
                      (c = e.sent),
                        (a = new TextDecoder()),
                        console.log(a.decode(c));
                    case 9:
                      t++, (e.next = 2);
                      break;
                    case 12:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (n, r) {
            return e.apply(this, arguments);
          };
        })()),
        (this.decodeValue = function (e, n) {
          return new Promise(
            (function () {
              var r = s(
                regeneratorRuntime.mark(function r(t, o) {
                  var c, a, u;
                  return regeneratorRuntime.wrap(
                    function (r) {
                      for (;;)
                        switch ((r.prev = r.next)) {
                          case 0:
                            return (
                              (c = e.cipherText),
                              (a = e.counter),
                              (r.prev = 1),
                              (r.next = 4),
                              window.crypto.subtle.decrypt(
                                {
                                  name: 'AES-CTR',
                                  counter: a,
                                  length: 64,
                                },
                                n,
                                c
                              )
                            );
                          case 4:
                            (u = r.sent), t(u), (r.next = 11);
                            break;
                          case 8:
                            (r.prev = 8),
                              (r.t0 = r.catch(1)),
                              o(r.t0);
                          case 11:
                          case 'end':
                            return r.stop();
                        }
                    },
                    r,
                    null,
                    [[1, 8]]
                  );
                })
              );
              return function (e, n) {
                return r.apply(this, arguments);
              };
            })()
          );
        }),
        (this.getCipherTextFromUIntArray = function () {});
    })({
      MEASUREMENT_ID: 'G-8JPJ4BEEWT',
      NEXT_PUBLIC_APP_ID:
        '1:496062853871:web:30a427c740d371018f611a',
      NEXT_PUBLIC_MESSAGING_SENDER_ID: '496062853871',
      NEXT_PUBLIC_STORAGE_BUCKET: 'myblog-3536b.appspot.com',
      NEXT_PUBLIC_PROJECT_ID: 'myblog-3536b',
      NEXT_PUBLIC_DB_URL: 'https://myblog-3536b.firebaseio.com',
      NEXT_PUBLIC_AUTH_DOMAIN: 'myblog-3536b.firebaseapp.com',
      NEXT_PUBLIC_API_KEY:
        'AIzaSyCYBzQ6yAAZFpTIMUAjuei6bl0iolSmbjA',
    });
    f.init();
  })(),
    (fdd = n);
})();
