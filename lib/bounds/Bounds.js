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

var Bounds = /*#__PURE__*/function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ib3VuZHMvQm91bmRzLnRzIl0sIm5hbWVzIjpbIkJvdW5kcyIsImJvdW5kcyIsIk9iamVjdCIsImFzc2lnbiIsIndpZHRoIiwiaGVpZ2h0IiwiYU1heFgiLCJ4IiwiYU1heFkiLCJ5IiwiYk1heFgiLCJiTWF4WSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLE07QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0Usa0JBQVlDLE1BQVosRUFBNEI7QUFBQTs7QUFBQSwrQkFoQ2hCLENBZ0NnQjs7QUFBQSwrQkF2QmhCLENBdUJnQjs7QUFBQSxtQ0FkWixDQWNZOztBQUFBLG9DQUxYLENBS1c7O0FBQzFCQyxJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixNQUFwQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztXQUNFLG1CQUEwQjtBQUN4QixVQUFJLEtBQUtHLEtBQUwsSUFBYyxDQUFkLElBQW1CLEtBQUtDLE1BQUwsSUFBZSxDQUF0QyxFQUF5QyxPQUFPLElBQVA7QUFFekMsYUFBTyxLQUFQO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLG9CQUFrQkosTUFBbEIsRUFBMkM7QUFDekMsVUFBTUssS0FBYSxHQUFHTCxNQUFNLENBQUNNLENBQVAsR0FBV04sTUFBTSxDQUFDRyxLQUF4QztBQUNBLFVBQU1JLEtBQWEsR0FBR1AsTUFBTSxDQUFDUSxDQUFQLEdBQVdSLE1BQU0sQ0FBQ0ksTUFBeEM7QUFFQSxVQUFNSyxLQUFhLEdBQUcsS0FBS0gsQ0FBTCxHQUFTLEtBQUtILEtBQXBDO0FBQ0EsVUFBTU8sS0FBYSxHQUFHLEtBQUtGLENBQUwsR0FBUyxLQUFLSixNQUFwQztBQUVBLFVBQUlDLEtBQUssR0FBRyxLQUFLQyxDQUFqQixFQUFvQixPQUFPLEtBQVA7QUFFcEIsVUFBSU4sTUFBTSxDQUFDTSxDQUFQLEdBQVdHLEtBQWYsRUFBc0IsT0FBTyxLQUFQO0FBRXRCLFVBQUlGLEtBQUssR0FBR1AsTUFBTSxDQUFDUSxDQUFuQixFQUFzQixPQUFPLEtBQVA7QUFFdEIsVUFBSVIsTUFBTSxDQUFDUSxDQUFQLEdBQVdFLEtBQWYsRUFBc0IsT0FBTyxLQUFQO0FBRXRCLGFBQU8sSUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogQm91bmRzIGFyZSB1c2VkIHRvIHNwZWNpZnkgYW4gb2JqZWN0J3MgcG9zaXRpb24gaW4gMkQgc3BhY2UuXG4gKiBcbiAqIEJvdGggcXVhZHRyZWVzIGFuZCBvYmplY3RzIGFkZGVkIHRvIHF1YWR0cmVlcyB1c2UgdGhpcyBib3VuZHMgb2JqZWN0LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3VuZHMge1xuICAvKipcbiAgICogVGhlIHggcG9zaXRpb24gb2YgdGhlIG9iamVjdC4gXG4gICAqIFxuICAgKiBAcHJvcGVydHkge251bWJlcn1cbiAgICogXG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHg6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBvYmplY3QuIFxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqIFxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICB5OiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIG9iamVjdC4gXG4gICAqIFxuICAgKiBAcHJvcGVydHkge251bWJlcn1cbiAgICogXG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHdpZHRoOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBvYmplY3QuIFxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqIFxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBoZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib3VuZHMgVGhlIGRhdGEgb2YgdGhlIG9iamVjdCBpbmNsdWRpbmcgeCwgeSwgd2lkdGgsIGFuZCBoZWlnaHQuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihib3VuZHM6IE9iamVjdCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgYm91bmRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoaXMgQm91bmRzIG9iamVjdCBpcyBhIHBvaW50LCBtZWFuaW5nIGl0IGhhcyBubyB3aWR0aFxuICAgKiBvciBoZWlnaHQuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHB1YmxpYyBpc1BvaW50KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLndpZHRoID09IDAgfHwgdGhpcy5oZWlnaHQgPT0gMCkgcmV0dXJuIHRydWU7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGlzIEJvdW5kcyBvYmplY3QgaW50ZXJzZWN0cyB3aXRoIGFub3RoZXIuXG4gICAqIFxuICAgKiBAcGFyYW0ge0JvdW5kc30gYm91bmRzIFRoZSBvdGhlciBib3VuZHMgb2JqZWN0IHRvIGNoZWNrIGZvciBpbnRlcnNlY3Rpb24gd2l0aC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIGludGVyc2VjdHMoYm91bmRzOiBCb3VuZHMpOiBib29sZWFuIHtcbiAgICBjb25zdCBhTWF4WDogbnVtYmVyID0gYm91bmRzLnggKyBib3VuZHMud2lkdGg7XG4gICAgY29uc3QgYU1heFk6IG51bWJlciA9IGJvdW5kcy55ICsgYm91bmRzLmhlaWdodDtcblxuICAgIGNvbnN0IGJNYXhYOiBudW1iZXIgPSB0aGlzLnggKyB0aGlzLndpZHRoO1xuICAgIGNvbnN0IGJNYXhZOiBudW1iZXIgPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcblxuICAgIGlmIChhTWF4WCA8IHRoaXMueCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKGJvdW5kcy54ID4gYk1heFgpIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChhTWF4WSA8IGJvdW5kcy55KSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoYm91bmRzLnkgPiBiTWF4WSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0iXX0=