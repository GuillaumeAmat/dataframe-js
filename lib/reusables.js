'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.asArray = asArray;
exports.isArrayOfType = isArrayOfType;
exports.isNumber = isNumber;
exports.arrayEqual = arrayEqual;
exports.transpose = transpose;
exports.makeGenerator = makeGenerator;
exports.match = match;
exports.iter = iter;
exports.chain = chain;
exports.saveFile = saveFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [makeGenerator, iter].map(_regenerator2.default.mark);

function asArray(x) {
    return Array.isArray(x) ? x : [x];
}

function isArrayOfType(value, ofType) {
    var index = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    return value instanceof Array && value.hasOwnProperty(index) && (ofType === String ? typeof value[index] === 'string' : value[index] instanceof ofType) ? true : false;
}

function isNumber(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}

function arrayEqual(a, b) {
    var byOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    return byOrder ? (0, _keys2.default)(a).map(function (x) {
        return a[x] === b[x];
    }).reduce(function (p, n) {
        return p ? n : p;
    }) : [].concat((0, _toConsumableArray3.default)(new _set2.default(a.filter(function (x) {
        return !new _set2.default(b).has(x);
    })))).length === 0;
}

function transpose(table) {
    var tableSize = table.map(function (row) {
        return row.length;
    }).reduce(function (p, n) {
        return Math.max(p, n);
    }, 0);
    return [].concat((0, _toConsumableArray3.default)(Array(tableSize).keys())).map(function (index) {
        return table.map(function (row) {
            return row[index];
        });
    });
}

function makeGenerator(x) {
    return _regenerator2.default.wrap(function makeGenerator$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.delegateYield(x, 't0', 1);

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

function match(value) {
    for (var _len = arguments.length, cases = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        cases[_key - 1] = arguments[_key];
    }

    var casesGen = makeGenerator(cases);
    var checker = function checker(nextCase) {
        return nextCase[0](value) ? nextCase[1](value) : checker(casesGen.next().value);
    };
    return checker(casesGen.next().value);
}

function iter(data, func) {
    var abort = arguments.length <= 2 || arguments[2] === undefined ? function () {
        return false;
    } : arguments[2];

    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, iteration, modifiedRow;

    return _regenerator2.default.wrap(function iter$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context2.prev = 3;
                    _iterator = (0, _getIterator3.default)(data);

                case 5:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context2.next = 16;
                        break;
                    }

                    iteration = _step.value;

                    if (!abort()) {
                        _context2.next = 9;
                        break;
                    }

                    return _context2.abrupt('return');

                case 9:
                    modifiedRow = func(iteration);

                    if (!modifiedRow) {
                        _context2.next = 13;
                        break;
                    }

                    _context2.next = 13;
                    return modifiedRow;

                case 13:
                    _iteratorNormalCompletion = true;
                    _context2.next = 5;
                    break;

                case 16:
                    _context2.next = 22;
                    break;

                case 18:
                    _context2.prev = 18;
                    _context2.t0 = _context2['catch'](3);
                    _didIteratorError = true;
                    _iteratorError = _context2.t0;

                case 22:
                    _context2.prev = 22;
                    _context2.prev = 23;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 25:
                    _context2.prev = 25;

                    if (!_didIteratorError) {
                        _context2.next = 28;
                        break;
                    }

                    throw _iteratorError;

                case 28:
                    return _context2.finish(25);

                case 29:
                    return _context2.finish(22);

                case 30:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this, [[3, 18, 22, 30], [23,, 25, 29]]);
}

function chain(data) {
    for (var _len2 = arguments.length, operations = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        operations[_key2 - 1] = arguments[_key2];
    }

    return iter(data, operations.reduce(function (p, n) {
        return function (x) {
            var prev = p(x);
            var next = prev ? n(prev) : false;
            return next === true ? prev : next;
        };
    }, function (x) {
        return x;
    }));
}

function saveFile(path, content) {
    require('fs').writeFile(path, content, function (err) {
        if (err) {
            throw new Error(err);
        }
    });
}