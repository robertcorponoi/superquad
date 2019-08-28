'use strict';
/**
 * Defines the options and their default values for each instance of Superquad.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options =
/**
 * The maximum number of objects that can be stored in a quad before the
 * quad splits.
 * 
 * @property {number}
 * 
 * @default 4
 */

/**
 * The maximum number of times a quad can split.
 * 
 * @property {number}
 * 
 * @default 4
 */

/**
 * @param {Object} [options]
 * @param {number} [options.maxObjects=10] The maximum number of objects that can be stored in a quad before the quad splits.
 * @param {number} [options.maxLevels=4] THe maximum number of times a quad can split.
 */
function Options(options) {
  _classCallCheck(this, Options);

  _defineProperty(this, "maxObjects", 10);

  _defineProperty(this, "maxLevels", 4);

  Object.assign(this, options);
};

exports["default"] = Options;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcHRpb25zLnRzIl0sIm5hbWVzIjpbIk9wdGlvbnMiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7O0lBR3FCQSxPO0FBRW5COzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7QUFTQTs7Ozs7QUFLQSxpQkFBWUMsT0FBWixFQUE2QjtBQUFBOztBQUFBLHNDQWhCUixFQWdCUTs7QUFBQSxxQ0FQVCxDQU9TOztBQUUzQkMsRUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxFQUFvQkYsT0FBcEI7QUFFRCxDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgb3B0aW9ucyBhbmQgdGhlaXIgZGVmYXVsdCB2YWx1ZXMgZm9yIGVhY2ggaW5zdGFuY2Ugb2YgU3VwZXJxdWFkLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiBvYmplY3RzIHRoYXQgY2FuIGJlIHN0b3JlZCBpbiBhIHF1YWQgYmVmb3JlIHRoZVxyXG4gICAqIHF1YWQgc3BsaXRzLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IDRcclxuICAgKi9cclxuICBtYXhPYmplY3RzOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIHRpbWVzIGEgcXVhZCBjYW4gc3BsaXQuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgNFxyXG4gICAqL1xyXG4gIG1heExldmVsczogbnVtYmVyID0gNDtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhPYmplY3RzPTEwXSBUaGUgbWF4aW11bSBudW1iZXIgb2Ygb2JqZWN0cyB0aGF0IGNhbiBiZSBzdG9yZWQgaW4gYSBxdWFkIGJlZm9yZSB0aGUgcXVhZCBzcGxpdHMuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heExldmVscz00XSBUSGUgbWF4aW11bSBudW1iZXIgb2YgdGltZXMgYSBxdWFkIGNhbiBzcGxpdC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QpIHtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuICB9XHJcblxyXG59Il19