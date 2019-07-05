'use strict';

// ADD SUM USING PROMISE
var resultA = void 0,
    resultB = void 0,
    resultC = void 0;

function addAsync(num1, num2) {
				return Promise.resolve(num1 + num2);
}

addAsync(1, 2).then(function (success) {
				resultA = success;
				return resultA;
}).then(function (success) {
				return addAsync(success, 3);
}).then(function (success) {
				resultB = success;
				return resultB;
}).then(function (success) {
				return addAsync(success, 4);
}).then(function (success) {
				resultC = success;
				return resultC;
}).then(function (success) {
				console.log('total: ' + success);
				console.log(resultA, resultB, resultC);
});