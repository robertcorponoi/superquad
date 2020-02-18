'use strict';
/**
 * Bounds are used to specify an object's position in 2D space.
 * 
 * Both quadtrees and objects added to quadtrees use this bounds object.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Bounds =
/*#__PURE__*/
function () {
  /**
   * The x position of the object. 
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * The y position of the object. 
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * The width of the object. 
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * The height of the object. 
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * @param {Object} bounds The data of the object including x, y, width, and height.
   */
  function Bounds(bounds) {
    _classCallCheck(this, Bounds);

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    Object.assign(this, bounds);
  }
  /**
   * Checks to see if this Bounds object is a point, meaning it has no width
   * or height.
   * 
   * @returns {boolean}
   */


  _createClass(Bounds, [{
    key: "isPoint",
    value: function isPoint() {
      if (this.width == 0 || this.height == 0) return true;
      return false;
    }
    /**
     * Checks to see if this Bounds object intersects with another.
     * 
     * @param {Bounds} bounds The other bounds object to check for intersection with.
     * 
     * @returns {boolean}
     */

  }, {
    key: "intersects",
    value: function intersects(bounds) {
      var aMaxX = bounds.x + bounds.width;
      var aMaxY = bounds.y + bounds.height;
      var bMaxX = this.x + this.width;
      var bMaxY = this.y + this.height;
      if (aMaxX < this.x) return false;
      if (bounds.x > bMaxX) return false;
      if (aMaxY < bounds.y) return false;
      if (bounds.y > bMaxY) return false;
      return true;
    }
  }]);

  return Bounds;
}();

exports["default"] = Bounds;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ib3VuZHMvQm91bmRzLnRzIl0sIm5hbWVzIjpbIkJvdW5kcyIsImJvdW5kcyIsIk9iamVjdCIsImFzc2lnbiIsIndpZHRoIiwiaGVpZ2h0IiwiYU1heFgiLCJ4IiwiYU1heFkiLCJ5IiwiYk1heFgiLCJiTWF4WSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtxQkEsTTs7O0FBQ25COzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7QUFHQSxrQkFBWUMsTUFBWixFQUE0QjtBQUFBOztBQUFBLCtCQWhDaEIsQ0FnQ2dCOztBQUFBLCtCQXZCaEIsQ0F1QmdCOztBQUFBLG1DQWRaLENBY1k7O0FBQUEsb0NBTFgsQ0FLVzs7QUFDMUJDLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsRUFBb0JGLE1BQXBCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs4QkFNMEI7QUFDeEIsVUFBSSxLQUFLRyxLQUFMLElBQWMsQ0FBZCxJQUFtQixLQUFLQyxNQUFMLElBQWUsQ0FBdEMsRUFBeUMsT0FBTyxJQUFQO0FBRXpDLGFBQU8sS0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7K0JBT2tCSixNLEVBQXlCO0FBQ3pDLFVBQU1LLEtBQWEsR0FBR0wsTUFBTSxDQUFDTSxDQUFQLEdBQVdOLE1BQU0sQ0FBQ0csS0FBeEM7QUFDQSxVQUFNSSxLQUFhLEdBQUdQLE1BQU0sQ0FBQ1EsQ0FBUCxHQUFXUixNQUFNLENBQUNJLE1BQXhDO0FBRUEsVUFBTUssS0FBYSxHQUFHLEtBQUtILENBQUwsR0FBUyxLQUFLSCxLQUFwQztBQUNBLFVBQU1PLEtBQWEsR0FBRyxLQUFLRixDQUFMLEdBQVMsS0FBS0osTUFBcEM7QUFFQSxVQUFJQyxLQUFLLEdBQUcsS0FBS0MsQ0FBakIsRUFBb0IsT0FBTyxLQUFQO0FBRXBCLFVBQUlOLE1BQU0sQ0FBQ00sQ0FBUCxHQUFXRyxLQUFmLEVBQXNCLE9BQU8sS0FBUDtBQUV0QixVQUFJRixLQUFLLEdBQUdQLE1BQU0sQ0FBQ1EsQ0FBbkIsRUFBc0IsT0FBTyxLQUFQO0FBRXRCLFVBQUlSLE1BQU0sQ0FBQ1EsQ0FBUCxHQUFXRSxLQUFmLEVBQXNCLE9BQU8sS0FBUDtBQUV0QixhQUFPLElBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIEJvdW5kcyBhcmUgdXNlZCB0byBzcGVjaWZ5IGFuIG9iamVjdCdzIHBvc2l0aW9uIGluIDJEIHNwYWNlLlxyXG4gKiBcclxuICogQm90aCBxdWFkdHJlZXMgYW5kIG9iamVjdHMgYWRkZWQgdG8gcXVhZHRyZWVzIHVzZSB0aGlzIGJvdW5kcyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3VuZHMge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBvYmplY3QuIFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IDBcclxuICAgKi9cclxuICB4OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgb2JqZWN0LiBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCAwXHJcbiAgICovXHJcbiAgeTogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBvYmplY3QuIFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IDBcclxuICAgKi9cclxuICB3aWR0aDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgb2JqZWN0LiBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCAwXHJcbiAgICovXHJcbiAgaGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gYm91bmRzIFRoZSBkYXRhIG9mIHRoZSBvYmplY3QgaW5jbHVkaW5nIHgsIHksIHdpZHRoLCBhbmQgaGVpZ2h0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGJvdW5kczogT2JqZWN0KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGJvdW5kcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoaXMgQm91bmRzIG9iamVjdCBpcyBhIHBvaW50LCBtZWFuaW5nIGl0IGhhcyBubyB3aWR0aFxyXG4gICAqIG9yIGhlaWdodC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwdWJsaWMgaXNQb2ludCgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLndpZHRoID09IDAgfHwgdGhpcy5oZWlnaHQgPT0gMCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGlzIEJvdW5kcyBvYmplY3QgaW50ZXJzZWN0cyB3aXRoIGFub3RoZXIuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kcyBUaGUgb3RoZXIgYm91bmRzIG9iamVjdCB0byBjaGVjayBmb3IgaW50ZXJzZWN0aW9uIHdpdGguXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHVibGljIGludGVyc2VjdHMoYm91bmRzOiBCb3VuZHMpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGFNYXhYOiBudW1iZXIgPSBib3VuZHMueCArIGJvdW5kcy53aWR0aDtcclxuICAgIGNvbnN0IGFNYXhZOiBudW1iZXIgPSBib3VuZHMueSArIGJvdW5kcy5oZWlnaHQ7XHJcblxyXG4gICAgY29uc3QgYk1heFg6IG51bWJlciA9IHRoaXMueCArIHRoaXMud2lkdGg7XHJcbiAgICBjb25zdCBiTWF4WTogbnVtYmVyID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKGFNYXhYIDwgdGhpcy54KSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgaWYgKGJvdW5kcy54ID4gYk1heFgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBpZiAoYU1heFkgPCBib3VuZHMueSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGlmIChib3VuZHMueSA+IGJNYXhZKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59Il19