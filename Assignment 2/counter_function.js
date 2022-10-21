"use strict";
exports.__esModule = true;
exports.counter = void 0;
function counter(value) {
    if (value === void 0) { value = 0; }
    var val = value;
    return [
        function () { console.log(val); }, function () { val++; }
    ];
}
exports.counter = counter;
var _a = counter(1), getA = _a[0], nextA = _a[1];
getA(); // 1
nextA();
getA(); // 2
var _b = counter(10), getB = _b[0], nextB = _b[1];
nextB();
getA(); // 2
getB(); // 11
nextA();
getA(); // 3
getB(); // 11
