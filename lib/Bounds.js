'use strict';
/**
 * The bounds of an object describes its position within the space of the quadtree.
 * 
 * @version 0.1.0
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
   * @since 0.1.0
   * 
   * @property {number}
   */

  /**
   * The y position of the object. 
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */

  /**
   * The width of the object. 
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */

  /**
   * The height of the object. 
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */

  /**
   * @param {Object} obj The data of this game object including x, y, width, height and any other properties.
   */
  function Bounds(obj) {
    _classCallCheck(this, Bounds);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    this.x = obj.x;
    this.y = obj.y;
    this.width = obj.width;
    this.height = obj.height;
  }
  /**
   * Checks to see if this Bounds object is a point, meaning it has no width
   * or height.
   * 
   * @since 0.1.0
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
     * @since 0.1.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb3VuZHMudHMiXSwibmFtZXMiOlsiQm91bmRzIiwib2JqIiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsImJvdW5kcyIsImFNYXhYIiwiYU1heFkiLCJiTWF4WCIsImJNYXhZIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBS3FCQSxNOzs7QUFFbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7OztBQUdBLGtCQUFZQyxHQUFaLEVBQXNCO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBRXBCLFNBQUtDLENBQUwsR0FBU0QsR0FBRyxDQUFDQyxDQUFiO0FBRUEsU0FBS0MsQ0FBTCxHQUFTRixHQUFHLENBQUNFLENBQWI7QUFFQSxTQUFLQyxLQUFMLEdBQWFILEdBQUcsQ0FBQ0csS0FBakI7QUFFQSxTQUFLQyxNQUFMLEdBQWNKLEdBQUcsQ0FBQ0ksTUFBbEI7QUFFRDtBQUVEOzs7Ozs7Ozs7Ozs7OEJBUTBCO0FBRXhCLFVBQUksS0FBS0QsS0FBTCxJQUFjLENBQWQsSUFBbUIsS0FBS0MsTUFBTCxJQUFlLENBQXRDLEVBQXlDLE9BQU8sSUFBUDtBQUV6QyxhQUFPLEtBQVA7QUFFRDtBQUVEOzs7Ozs7Ozs7Ozs7K0JBU2tCQyxNLEVBQXlCO0FBRXpDLFVBQU1DLEtBQWEsR0FBR0QsTUFBTSxDQUFDSixDQUFQLEdBQVdJLE1BQU0sQ0FBQ0YsS0FBeEM7QUFDQSxVQUFNSSxLQUFhLEdBQUdGLE1BQU0sQ0FBQ0gsQ0FBUCxHQUFXRyxNQUFNLENBQUNELE1BQXhDO0FBRUEsVUFBTUksS0FBYSxHQUFHLEtBQUtQLENBQUwsR0FBUyxLQUFLRSxLQUFwQztBQUNBLFVBQU1NLEtBQWEsR0FBRyxLQUFLUCxDQUFMLEdBQVMsS0FBS0UsTUFBcEM7QUFFQSxVQUFJRSxLQUFLLEdBQUcsS0FBS0wsQ0FBakIsRUFBb0IsT0FBTyxLQUFQO0FBRXBCLFVBQUlJLE1BQU0sQ0FBQ0osQ0FBUCxHQUFXTyxLQUFmLEVBQXNCLE9BQU8sS0FBUDtBQUV0QixVQUFJRCxLQUFLLEdBQUdGLE1BQU0sQ0FBQ0gsQ0FBbkIsRUFBc0IsT0FBTyxLQUFQO0FBRXRCLFVBQUlHLE1BQU0sQ0FBQ0gsQ0FBUCxHQUFXTyxLQUFmLEVBQXNCLE9BQU8sS0FBUDtBQUV0QixhQUFPLElBQVA7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIFRoZSBib3VuZHMgb2YgYW4gb2JqZWN0IGRlc2NyaWJlcyBpdHMgcG9zaXRpb24gd2l0aGluIHRoZSBzcGFjZSBvZiB0aGUgcXVhZHRyZWUuXHJcbiAqIFxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmRzIHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHggcG9zaXRpb24gb2YgdGhlIG9iamVjdC4gXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgeDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgb2JqZWN0LiBcclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICB5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgb2JqZWN0LiBcclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICB3aWR0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBvYmplY3QuIFxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBkYXRhIG9mIHRoaXMgZ2FtZSBvYmplY3QgaW5jbHVkaW5nIHgsIHksIHdpZHRoLCBoZWlnaHQgYW5kIGFueSBvdGhlciBwcm9wZXJ0aWVzLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9iajogYW55KSB7XHJcblxyXG4gICAgdGhpcy54ID0gb2JqLng7XHJcblxyXG4gICAgdGhpcy55ID0gb2JqLnk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IG9iai53aWR0aDtcclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IG9iai5oZWlnaHQ7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGlzIEJvdW5kcyBvYmplY3QgaXMgYSBwb2ludCwgbWVhbmluZyBpdCBoYXMgbm8gd2lkdGhcclxuICAgKiBvciBoZWlnaHQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHVibGljIGlzUG9pbnQoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGggPT0gMCB8fCB0aGlzLmhlaWdodCA9PSAwKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGlzIEJvdW5kcyBvYmplY3QgaW50ZXJzZWN0cyB3aXRoIGFub3RoZXIuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kcyBUaGUgb3RoZXIgYm91bmRzIG9iamVjdCB0byBjaGVjayBmb3IgaW50ZXJzZWN0aW9uIHdpdGguXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHVibGljIGludGVyc2VjdHMoYm91bmRzOiBCb3VuZHMpOiBib29sZWFuIHtcclxuXHJcbiAgICBjb25zdCBhTWF4WDogbnVtYmVyID0gYm91bmRzLnggKyBib3VuZHMud2lkdGg7XHJcbiAgICBjb25zdCBhTWF4WTogbnVtYmVyID0gYm91bmRzLnkgKyBib3VuZHMuaGVpZ2h0O1xyXG5cclxuICAgIGNvbnN0IGJNYXhYOiBudW1iZXIgPSB0aGlzLnggKyB0aGlzLndpZHRoO1xyXG4gICAgY29uc3QgYk1heFk6IG51bWJlciA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgIGlmIChhTWF4WCA8IHRoaXMueCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGlmIChib3VuZHMueCA+IGJNYXhYKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgaWYgKGFNYXhZIDwgYm91bmRzLnkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBpZiAoYm91bmRzLnkgPiBiTWF4WSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG5cclxuICB9XHJcblxyXG59Il19