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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb3VuZHMudHMiXSwibmFtZXMiOlsiQm91bmRzIiwib2JqIiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsImJvdW5kcyIsImFNYXhYIiwiYU1heFkiLCJiTWF4WCIsImJNYXhZIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztJQUdxQkEsTTs7O0FBRW5COzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7O0FBR0Esa0JBQVlDLEdBQVosRUFBc0I7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFFcEIsU0FBS0MsQ0FBTCxHQUFTRCxHQUFHLENBQUNDLENBQWI7QUFFQSxTQUFLQyxDQUFMLEdBQVNGLEdBQUcsQ0FBQ0UsQ0FBYjtBQUVBLFNBQUtDLEtBQUwsR0FBYUgsR0FBRyxDQUFDRyxLQUFqQjtBQUVBLFNBQUtDLE1BQUwsR0FBY0osR0FBRyxDQUFDSSxNQUFsQjtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7OEJBTTBCO0FBRXhCLFVBQUksS0FBS0QsS0FBTCxJQUFjLENBQWQsSUFBbUIsS0FBS0MsTUFBTCxJQUFlLENBQXRDLEVBQXlDLE9BQU8sSUFBUDtBQUV6QyxhQUFPLEtBQVA7QUFFRDtBQUVEOzs7Ozs7Ozs7OytCQU9rQkMsTSxFQUF5QjtBQUV6QyxVQUFNQyxLQUFhLEdBQUdELE1BQU0sQ0FBQ0osQ0FBUCxHQUFXSSxNQUFNLENBQUNGLEtBQXhDO0FBQ0EsVUFBTUksS0FBYSxHQUFHRixNQUFNLENBQUNILENBQVAsR0FBV0csTUFBTSxDQUFDRCxNQUF4QztBQUVBLFVBQU1JLEtBQWEsR0FBRyxLQUFLUCxDQUFMLEdBQVMsS0FBS0UsS0FBcEM7QUFDQSxVQUFNTSxLQUFhLEdBQUcsS0FBS1AsQ0FBTCxHQUFTLEtBQUtFLE1BQXBDO0FBRUEsVUFBSUUsS0FBSyxHQUFHLEtBQUtMLENBQWpCLEVBQW9CLE9BQU8sS0FBUDtBQUVwQixVQUFJSSxNQUFNLENBQUNKLENBQVAsR0FBV08sS0FBZixFQUFzQixPQUFPLEtBQVA7QUFFdEIsVUFBSUQsS0FBSyxHQUFHRixNQUFNLENBQUNILENBQW5CLEVBQXNCLE9BQU8sS0FBUDtBQUV0QixVQUFJRyxNQUFNLENBQUNILENBQVAsR0FBV08sS0FBZixFQUFzQixPQUFPLEtBQVA7QUFFdEIsYUFBTyxJQUFQO0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBUaGUgYm91bmRzIG9mIGFuIG9iamVjdCBkZXNjcmliZXMgaXRzIHBvc2l0aW9uIHdpdGhpbiB0aGUgc3BhY2Ugb2YgdGhlIHF1YWR0cmVlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmRzIHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHggcG9zaXRpb24gb2YgdGhlIG9iamVjdC4gXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgeDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgb2JqZWN0LiBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICB5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgb2JqZWN0LiBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICB3aWR0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBvYmplY3QuIFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBkYXRhIG9mIHRoaXMgZ2FtZSBvYmplY3QgaW5jbHVkaW5nIHgsIHksIHdpZHRoLCBoZWlnaHQgYW5kIGFueSBvdGhlciBwcm9wZXJ0aWVzLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9iajogYW55KSB7XHJcblxyXG4gICAgdGhpcy54ID0gb2JqLng7XHJcblxyXG4gICAgdGhpcy55ID0gb2JqLnk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IG9iai53aWR0aDtcclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IG9iai5oZWlnaHQ7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGlzIEJvdW5kcyBvYmplY3QgaXMgYSBwb2ludCwgbWVhbmluZyBpdCBoYXMgbm8gd2lkdGhcclxuICAgKiBvciBoZWlnaHQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHVibGljIGlzUG9pbnQoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGggPT0gMCB8fCB0aGlzLmhlaWdodCA9PSAwKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGlzIEJvdW5kcyBvYmplY3QgaW50ZXJzZWN0cyB3aXRoIGFub3RoZXIuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kcyBUaGUgb3RoZXIgYm91bmRzIG9iamVjdCB0byBjaGVjayBmb3IgaW50ZXJzZWN0aW9uIHdpdGguXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHVibGljIGludGVyc2VjdHMoYm91bmRzOiBCb3VuZHMpOiBib29sZWFuIHtcclxuXHJcbiAgICBjb25zdCBhTWF4WDogbnVtYmVyID0gYm91bmRzLnggKyBib3VuZHMud2lkdGg7XHJcbiAgICBjb25zdCBhTWF4WTogbnVtYmVyID0gYm91bmRzLnkgKyBib3VuZHMuaGVpZ2h0O1xyXG5cclxuICAgIGNvbnN0IGJNYXhYOiBudW1iZXIgPSB0aGlzLnggKyB0aGlzLndpZHRoO1xyXG4gICAgY29uc3QgYk1heFk6IG51bWJlciA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgIGlmIChhTWF4WCA8IHRoaXMueCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGlmIChib3VuZHMueCA+IGJNYXhYKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgaWYgKGFNYXhZIDwgYm91bmRzLnkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBpZiAoYm91bmRzLnkgPiBiTWF4WSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG5cclxuICB9XHJcblxyXG59Il19