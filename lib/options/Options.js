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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE87QUFDbkI7Ozs7Ozs7OztBQVVBOzs7Ozs7OztBQVNBOzs7OztBQUtBLGlCQUFZQyxPQUFaLEVBQTZCO0FBQUE7O0FBQUEsc0NBaEJSLEVBZ0JROztBQUFBLHFDQVBULENBT1M7O0FBQzNCQyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixPQUFwQjtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBvcHRpb25zIGFuZCB0aGVpciBkZWZhdWx0IHZhbHVlcyBmb3IgZWFjaCBpbnN0YW5jZSBvZiBTdXBlcnF1YWQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2Ygb2JqZWN0cyB0aGF0IGNhbiBiZSBzdG9yZWQgaW4gYSBxdWFkIGJlZm9yZSB0aGVcclxuICAgKiBxdWFkIHNwbGl0cy5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCA0XHJcbiAgICovXHJcbiAgbWF4T2JqZWN0czogbnVtYmVyID0gMTA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiB0aW1lcyBhIHF1YWQgY2FuIHNwbGl0LlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IDRcclxuICAgKi9cclxuICBtYXhMZXZlbHM6IG51bWJlciA9IDQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4T2JqZWN0cz0xMF0gVGhlIG1heGltdW0gbnVtYmVyIG9mIG9iamVjdHMgdGhhdCBjYW4gYmUgc3RvcmVkIGluIGEgcXVhZCBiZWZvcmUgdGhlIHF1YWQgc3BsaXRzLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhMZXZlbHM9NF0gVEhlIG1heGltdW0gbnVtYmVyIG9mIHRpbWVzIGEgcXVhZCBjYW4gc3BsaXQuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG4gIH1cclxufSJdfQ==