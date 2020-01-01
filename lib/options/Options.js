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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE87QUFFbkI7Ozs7Ozs7OztBQVVBOzs7Ozs7OztBQVNBOzs7OztBQUtBLGlCQUFZQyxPQUFaLEVBQTZCO0FBQUE7O0FBQUEsc0NBaEJSLEVBZ0JROztBQUFBLHFDQVBULENBT1M7O0FBRTNCQyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixPQUFwQjtBQUVELEMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBvcHRpb25zIGFuZCB0aGVpciBkZWZhdWx0IHZhbHVlcyBmb3IgZWFjaCBpbnN0YW5jZSBvZiBTdXBlcnF1YWQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIG9iamVjdHMgdGhhdCBjYW4gYmUgc3RvcmVkIGluIGEgcXVhZCBiZWZvcmUgdGhlXHJcbiAgICogcXVhZCBzcGxpdHMuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgNFxyXG4gICAqL1xyXG4gIG1heE9iamVjdHM6IG51bWJlciA9IDEwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgdGltZXMgYSBxdWFkIGNhbiBzcGxpdC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCA0XHJcbiAgICovXHJcbiAgbWF4TGV2ZWxzOiBudW1iZXIgPSA0O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heE9iamVjdHM9MTBdIFRoZSBtYXhpbXVtIG51bWJlciBvZiBvYmplY3RzIHRoYXQgY2FuIGJlIHN0b3JlZCBpbiBhIHF1YWQgYmVmb3JlIHRoZSBxdWFkIHNwbGl0cy5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4TGV2ZWxzPTRdIFRIZSBtYXhpbXVtIG51bWJlciBvZiB0aW1lcyBhIHF1YWQgY2FuIHNwbGl0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdCkge1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XHJcblxyXG4gIH1cclxuXHJcbn0iXX0=