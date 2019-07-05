'use strict';

// explain to Nike about the result
var explainToNike = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve) {
              return resolve(value);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function explainToNike(_x) {
    return _ref.apply(this, arguments);
  };
}();

// consume the promise result


var doLeave = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var leaveDetails, leaveInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            console.log('Begining of leave application');

            _context2.next = 4;
            return applyForLeave;

          case 4:
            leaveDetails = _context2.sent;
            _context2.next = 7;
            return explainToNike(leaveDetails);

          case 7:
            leaveInfo = _context2.sent;


            console.log(leaveInfo);
            console.log('after the application ended');

            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 12]]);
  }));

  return function doLeave() {
    return _ref2.apply(this, arguments);
  };
}();

// start the process using an IIFE


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// USING aync and await for index.promises1.js

var hrRespond = true;

var applyForLeave = new Promise(function (resolve, reject) {
  if (hrRespond) {
    // when hr responds
    var leaveDetails = {
      startDate: 'Monday',
      endDate: 'Tuesday'
    };
    resolve(leaveDetails);
  } else {
    // if hr chooses to misbehave as usual
    var error = new Error('The HR refuses to grant the application');

    reject(error.message);
  }
});_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return doLeave();

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
}))();