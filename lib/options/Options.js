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
 * The maximum number of objects that can be stored in a quad before the quad splits.
 * 
 * @property {number}
 * 
 * @default 10
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztJQUNxQkEsTztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsaUJBQVlDLE9BQVosRUFBNkI7QUFBQTs7QUFBQSxzQ0FoQlIsRUFnQlE7O0FBQUEscUNBUFQsQ0FPUzs7QUFDM0JDLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsRUFBb0JGLE9BQXBCO0FBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIERlZmluZXMgdGhlIG9wdGlvbnMgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzIGZvciBlYWNoIGluc3RhbmNlIG9mIFN1cGVycXVhZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2Ygb2JqZWN0cyB0aGF0IGNhbiBiZSBzdG9yZWQgaW4gYSBxdWFkIGJlZm9yZSB0aGUgcXVhZCBzcGxpdHMuXG4gICAqIFxuICAgKiBAcHJvcGVydHkge251bWJlcn1cbiAgICogXG4gICAqIEBkZWZhdWx0IDEwXG4gICAqL1xuICBtYXhPYmplY3RzOiBudW1iZXIgPSAxMDtcblxuICAvKipcbiAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIHRpbWVzIGEgcXVhZCBjYW4gc3BsaXQuXG4gICAqIFxuICAgKiBAcHJvcGVydHkge251bWJlcn1cbiAgICogXG4gICAqIEBkZWZhdWx0IDRcbiAgICovXG4gIG1heExldmVsczogbnVtYmVyID0gNDtcblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4T2JqZWN0cz0xMF0gVGhlIG1heGltdW0gbnVtYmVyIG9mIG9iamVjdHMgdGhhdCBjYW4gYmUgc3RvcmVkIGluIGEgcXVhZCBiZWZvcmUgdGhlIHF1YWQgc3BsaXRzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4TGV2ZWxzPTRdIFRIZSBtYXhpbXVtIG51bWJlciBvZiB0aW1lcyBhIHF1YWQgY2FuIHNwbGl0LlxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcbiAgfVxufSJdfQ==