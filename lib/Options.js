'use strict';
/**
 * Defines the options and their default values for each instance of Superquad.
 * 
 * @since 0.1.0
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
 * @since 0.1.0
 * 
 * @property {number}
 * 
 * @default 4
 */

/**
 * The maximum number of times a quad can split.
 * 
 * @since 0.1.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcHRpb25zLnRzIl0sIm5hbWVzIjpbIk9wdGlvbnMiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7SUFLcUJBLE87QUFFbkI7Ozs7Ozs7Ozs7O0FBWUE7Ozs7Ozs7Ozs7QUFXQTs7Ozs7QUFLQSxpQkFBWUMsT0FBWixFQUE2QjtBQUFBOztBQUFBLHNDQWxCUixFQWtCUTs7QUFBQSxxQ0FQVCxDQU9TOztBQUUzQkMsRUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxFQUFvQkYsT0FBcEI7QUFFRCxDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgb3B0aW9ucyBhbmQgdGhlaXIgZGVmYXVsdCB2YWx1ZXMgZm9yIGVhY2ggaW5zdGFuY2Ugb2YgU3VwZXJxdWFkLlxyXG4gKiBcclxuICogQHNpbmNlIDAuMS4wXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIG9iamVjdHMgdGhhdCBjYW4gYmUgc3RvcmVkIGluIGEgcXVhZCBiZWZvcmUgdGhlXHJcbiAgICogcXVhZCBzcGxpdHMuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgNFxyXG4gICAqL1xyXG4gIG1heE9iamVjdHM6IG51bWJlciA9IDEwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgdGltZXMgYSBxdWFkIGNhbiBzcGxpdC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCA0XHJcbiAgICovXHJcbiAgbWF4TGV2ZWxzOiBudW1iZXIgPSA0O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heE9iamVjdHM9MTBdIFRoZSBtYXhpbXVtIG51bWJlciBvZiBvYmplY3RzIHRoYXQgY2FuIGJlIHN0b3JlZCBpbiBhIHF1YWQgYmVmb3JlIHRoZSBxdWFkIHNwbGl0cy5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4TGV2ZWxzPTRdIFRIZSBtYXhpbXVtIG51bWJlciBvZiB0aW1lcyBhIHF1YWQgY2FuIHNwbGl0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdCkge1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XHJcblxyXG4gIH1cclxuXHJcbn0iXX0=