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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE87QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7O0FBS0EsaUJBQVlDLE9BQVosRUFBNkI7QUFBQTs7QUFBQSxzQ0FoQlIsRUFnQlE7O0FBQUEscUNBUFQsQ0FPUzs7QUFDM0JDLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsRUFBb0JGLE9BQXBCO0FBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIG9wdGlvbnMgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzIGZvciBlYWNoIGluc3RhbmNlIG9mIFN1cGVycXVhZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiBvYmplY3RzIHRoYXQgY2FuIGJlIHN0b3JlZCBpbiBhIHF1YWQgYmVmb3JlIHRoZSBxdWFkIHNwbGl0cy5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCAxMFxyXG4gICAqL1xyXG4gIG1heE9iamVjdHM6IG51bWJlciA9IDEwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgdGltZXMgYSBxdWFkIGNhbiBzcGxpdC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCA0XHJcbiAgICovXHJcbiAgbWF4TGV2ZWxzOiBudW1iZXIgPSA0O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heE9iamVjdHM9MTBdIFRoZSBtYXhpbXVtIG51bWJlciBvZiBvYmplY3RzIHRoYXQgY2FuIGJlIHN0b3JlZCBpbiBhIHF1YWQgYmVmb3JlIHRoZSBxdWFkIHNwbGl0cy5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4TGV2ZWxzPTRdIFRIZSBtYXhpbXVtIG51bWJlciBvZiB0aW1lcyBhIHF1YWQgY2FuIHNwbGl0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdCkge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcclxuICB9XHJcbn0iXX0=