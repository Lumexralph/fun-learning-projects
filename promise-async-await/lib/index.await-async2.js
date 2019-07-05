'use strict';

var addAsync = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(num1, num2) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', Promise.resolve(num1 + num2));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function addAsync(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var doAsyncSum = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var total;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return addAsync(1, 2);

          case 3:
            resultA = _context2.sent;
            _context2.next = 6;
            return addAsync(resultA, 3);

          case 6:
            resultB = _context2.sent;
            _context2.next = 9;
            return addAsync(resultB, 4);

          case 9:
            resultC = _context2.sent;
            total = resultA + resultB + resultC;


            console.log('total: ' + total);
            console.log(resultA, resultB, resultC);

            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 15]]);
  }));

  return function doAsyncSum() {
    return _ref2.apply(this, arguments);
  };
}();
// start the whole process

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// CONVERTING index.promoises2.js TO ASYN/AWAIT ES7
var resultA = void 0,
    resultB = void 0,
    resultC = void 0;

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return doAsyncSum();

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
}))();