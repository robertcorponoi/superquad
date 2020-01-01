'use strict';
/**
 * The bounds of an object describes its position within the space of the quadtree.
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
   */

  /**
   * The y position of the object. 
   * 
   * @property {number}
   */

  /**
   * The width of the object. 
   * 
   * @property {number}
   */

  /**
   * The height of the object. 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ib3VuZHMvQm91bmRzLnRzIl0sIm5hbWVzIjpbIkJvdW5kcyIsIm9iaiIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJib3VuZHMiLCJhTWF4WCIsImFNYXhZIiwiYk1heFgiLCJiTWF4WSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE07OztBQUVuQjs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7OztBQUdBLGtCQUFZQyxHQUFaLEVBQXNCO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBRXBCLFNBQUtDLENBQUwsR0FBU0QsR0FBRyxDQUFDQyxDQUFiO0FBRUEsU0FBS0MsQ0FBTCxHQUFTRixHQUFHLENBQUNFLENBQWI7QUFFQSxTQUFLQyxLQUFMLEdBQWFILEdBQUcsQ0FBQ0csS0FBakI7QUFFQSxTQUFLQyxNQUFMLEdBQWNKLEdBQUcsQ0FBQ0ksTUFBbEI7QUFFRDtBQUVEOzs7Ozs7Ozs7OzhCQU0wQjtBQUV4QixVQUFJLEtBQUtELEtBQUwsSUFBYyxDQUFkLElBQW1CLEtBQUtDLE1BQUwsSUFBZSxDQUF0QyxFQUF5QyxPQUFPLElBQVA7QUFFekMsYUFBTyxLQUFQO0FBRUQ7QUFFRDs7Ozs7Ozs7OzsrQkFPa0JDLE0sRUFBeUI7QUFFekMsVUFBTUMsS0FBYSxHQUFHRCxNQUFNLENBQUNKLENBQVAsR0FBV0ksTUFBTSxDQUFDRixLQUF4QztBQUNBLFVBQU1JLEtBQWEsR0FBR0YsTUFBTSxDQUFDSCxDQUFQLEdBQVdHLE1BQU0sQ0FBQ0QsTUFBeEM7QUFFQSxVQUFNSSxLQUFhLEdBQUcsS0FBS1AsQ0FBTCxHQUFTLEtBQUtFLEtBQXBDO0FBQ0EsVUFBTU0sS0FBYSxHQUFHLEtBQUtQLENBQUwsR0FBUyxLQUFLRSxNQUFwQztBQUVBLFVBQUlFLEtBQUssR0FBRyxLQUFLTCxDQUFqQixFQUFvQixPQUFPLEtBQVA7QUFFcEIsVUFBSUksTUFBTSxDQUFDSixDQUFQLEdBQVdPLEtBQWYsRUFBc0IsT0FBTyxLQUFQO0FBRXRCLFVBQUlELEtBQUssR0FBR0YsTUFBTSxDQUFDSCxDQUFuQixFQUFzQixPQUFPLEtBQVA7QUFFdEIsVUFBSUcsTUFBTSxDQUFDSCxDQUFQLEdBQVdPLEtBQWYsRUFBc0IsT0FBTyxLQUFQO0FBRXRCLGFBQU8sSUFBUDtBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogVGhlIGJvdW5kcyBvZiBhbiBvYmplY3QgZGVzY3JpYmVzIGl0cyBwb3NpdGlvbiB3aXRoaW4gdGhlIHNwYWNlIG9mIHRoZSBxdWFkdHJlZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdW5kcyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBvYmplY3QuIFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHkgcG9zaXRpb24gb2YgdGhlIG9iamVjdC4gXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgeTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgd2lkdGggb2YgdGhlIG9iamVjdC4gXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgd2lkdGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgb2JqZWN0LiBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgZGF0YSBvZiB0aGlzIGdhbWUgb2JqZWN0IGluY2x1ZGluZyB4LCB5LCB3aWR0aCwgaGVpZ2h0IGFuZCBhbnkgb3RoZXIgcHJvcGVydGllcy5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvYmo6IGFueSkge1xyXG5cclxuICAgIHRoaXMueCA9IG9iai54O1xyXG5cclxuICAgIHRoaXMueSA9IG9iai55O1xyXG5cclxuICAgIHRoaXMud2lkdGggPSBvYmoud2lkdGg7XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSBvYmouaGVpZ2h0O1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB0byBzZWUgaWYgdGhpcyBCb3VuZHMgb2JqZWN0IGlzIGEgcG9pbnQsIG1lYW5pbmcgaXQgaGFzIG5vIHdpZHRoXHJcbiAgICogb3IgaGVpZ2h0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHB1YmxpYyBpc1BvaW50KCk6IGJvb2xlYW4ge1xyXG5cclxuICAgIGlmICh0aGlzLndpZHRoID09IDAgfHwgdGhpcy5oZWlnaHQgPT0gMCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB0byBzZWUgaWYgdGhpcyBCb3VuZHMgb2JqZWN0IGludGVyc2VjdHMgd2l0aCBhbm90aGVyLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7Qm91bmRzfSBib3VuZHMgVGhlIG90aGVyIGJvdW5kcyBvYmplY3QgdG8gY2hlY2sgZm9yIGludGVyc2VjdGlvbiB3aXRoLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHB1YmxpYyBpbnRlcnNlY3RzKGJvdW5kczogQm91bmRzKTogYm9vbGVhbiB7XHJcblxyXG4gICAgY29uc3QgYU1heFg6IG51bWJlciA9IGJvdW5kcy54ICsgYm91bmRzLndpZHRoO1xyXG4gICAgY29uc3QgYU1heFk6IG51bWJlciA9IGJvdW5kcy55ICsgYm91bmRzLmhlaWdodDtcclxuXHJcbiAgICBjb25zdCBiTWF4WDogbnVtYmVyID0gdGhpcy54ICsgdGhpcy53aWR0aDtcclxuICAgIGNvbnN0IGJNYXhZOiBudW1iZXIgPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcclxuXHJcbiAgICBpZiAoYU1heFggPCB0aGlzLngpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBpZiAoYm91bmRzLnggPiBiTWF4WCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGlmIChhTWF4WSA8IGJvdW5kcy55KSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgaWYgKGJvdW5kcy55ID4gYk1heFkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgfVxyXG5cclxufSJdfQ==