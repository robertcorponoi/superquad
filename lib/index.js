'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Bounds = _interopRequireDefault(require("./bounds/Bounds"));

var _Options = _interopRequireDefault(require("./options/Options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A modern quadtree implementation for modern JavaScript games.
 */
var Superquad = /*#__PURE__*/function () {
  /**
   * A reference to the options for this Quad.
   * 
   * @private
   * 
   * @property {Options}
   */

  /**
   * The depth level of this quad.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The bounds of this quad (x, y, width, height).
   * 
   * @private
   * 
   * @property {Bounds}
   */

  /**
   * The objects stored in this quad.
   * 
   * @private
   * 
   * @property {Array<Bounds>}
   */

  /**
   * The subquads of this quad.
   * 
   * @private
   * 
   * @property {Array<Superquad>}
   */

  /**
   * The total number of objects stored in this quad.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * @param {Object} bounds The bounds of this quad (x, y, width, height).
   * @param {number} [bounds.x=0] The x position of the top left point of the quad. This should only be set if you're working with negative position values.
   * @param {number} [bounds.y=0] The y position of the top left point of the quad. This should only be set if you're working with negative position values.
   * @param {number} bounds.width The width of the quad.
   * @param {number} bounds.height The height of the quad.
   * @param {Object} options A reference to the options for this quad.
   * @param {number} [options.maxObjects=10] The maximum number of objects that can be stored in a quad before the quad splits.
   * @param {number} [options.maxLevels=4] The maximum number of times a quad can split.
   * @param {number} [level=0] Used internally when creating sub-quads.
   */
  function Superquad(bounds) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Superquad);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_level", void 0);

    _defineProperty(this, "_bounds", void 0);

    _defineProperty(this, "_objects", []);

    _defineProperty(this, "_nodes", []);

    _defineProperty(this, "_total", 0);

    this._bounds = new _Bounds["default"](bounds);
    this._options = new _Options["default"](options);
    this._level = level;
  }
  /**
   * Returns the level of this quad.
   * 
   * @returns {number}
   */


  _createClass(Superquad, [{
    key: "level",
    get: function get() {
      return this._level;
    }
    /**
     * Returns the bounds of this quad.
     * 
     * @returns {Bounds}
     */

  }, {
    key: "bounds",
    get: function get() {
      return this._bounds;
    }
    /**
     * Returns the objects in this quad.
     * 
     * @returns {Array<Bounds>}
     */

  }, {
    key: "objects",
    get: function get() {
      return this._objects;
    }
    /**
     * Returns the subquads of this quad.
     * 
     * @returns {Array<Superquad>}
     */

  }, {
    key: "nodes",
    get: function get() {
      return this._nodes;
    }
    /**
     * Returns the total number of objects stored in this quad.
     * 
     * @returns {number}
     */

  }, {
    key: "total",
    get: function get() {
      return this._total;
    }
    /**
     * Gets the total number of subquads within the main quad.
     * 
     * @returns {number}
     */

  }, {
    key: "totalNodes",
    value: function totalNodes() {
      var total = 0;

      var _iterator = _createForOfIteratorHelper(this._nodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          total++;
          total += node.totalNodes();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return total;
    }
    /**
     * Inserts an object into the quad and splits the quad if necessary.
     * 
     * @param {Object} o The bounds of the object to insert into the quad.
     */

  }, {
    key: "add",
    value: function add(o) {
      var bounds = new _Bounds["default"](o);
      this._total++;
      var i = 0;
      var index = 0;

      if (this._nodes[0]) {
        index = this.getIndex(bounds);

        if (index !== -1) {
          this._nodes[index].add(bounds);

          return;
        }
      }

      this._objects.push(bounds);

      if (this._objects.length > this._options.maxObjects && this._level < this._options.maxLevels) {
        if (!this._nodes[0]) this.split();

        while (i < this._objects.length) {
          index = this.getIndex(this._objects[i]);
          if (index !== -1) this._nodes[index].add(this._objects.splice(i, 1)[0]);else i = i + 1;
        }
      }
    }
    /**
     * Retrieves objects around the specified bounds.
     * 
     * @param {Object} o The bounds of the object to check for possible collisions.
     * @param {boolean} [del=false] Set to true to delete the objects that were found.
     * 
     * @returns {Array<Bounds>} 
     */

  }, {
    key: "get",
    value: function get(o) {
      var del = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var quad = this;
      var bounds = new _Bounds["default"](o);
      var index = this.getIndex(bounds);
      var returnObjects = this._objects;

      if (this._nodes[0]) {
        if (index !== -1) {
          returnObjects = returnObjects.concat(this._nodes[index].get(o, del));
          quad = this._nodes[index];
        } else {
          var _iterator2 = _createForOfIteratorHelper(this._nodes),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var node = _step2.value;
              returnObjects = returnObjects.concat(node.get(o, del));
              quad = node;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }

      if (del) return {
        quad: quad,
        objects: returnObjects
      };
      return returnObjects;
    }
    /**
     * Retrieves all points in this quad that collide.
     * 
     * @param {Object} o The object to check for colliding points.
     * @param {boolean} [del=false] Set to true to delete the points that were found.
     * 
     * @returns {Array<Bounds>}
     */

  }, {
    key: "getPoints",
    value: function getPoints(o) {
      var del = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var bounds = new _Bounds["default"](o);
      var points = [];
      var search = this.get(bounds, del);
      if (del) search = search.objects;

      var _iterator3 = _createForOfIteratorHelper(search),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var point = _step3.value;
          var sameCoords = point.x === bounds.x && point.y === bounds.y;
          if (sameCoords && point.isPoint()) points.push(point);
          if (del) this.cleanup(search.quad, point);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return points;
    }
    /**
     * Retries all bounds in this quad that intersect with the provided bounds.
     * 
     * @param {Object} obj The bounds to check collisions against.
     * @param {boolean} [del=false] Set to true to delete the intersections that were found.
     * 
     * @returns {Array<Bounds>}
     */

  }, {
    key: "getIntersections",
    value: function getIntersections(obj) {
      var del = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var bounds = new _Bounds["default"](obj);
      var intersections = [];
      var results = this.get(bounds, del);
      var objects = del ? results.objects : results;

      var _iterator4 = _createForOfIteratorHelper(objects),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var intersection = _step4.value;

          if (intersection.intersects(bounds)) {
            intersections.push(intersection);
            if (del) this.cleanup(results.quad, intersection);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return intersections;
    }
    /**
     * Clears all objects and nodes from the quad.
     */

  }, {
    key: "clear",
    value: function clear() {
      this._objects = [];
      this._total = 0;

      var _iterator5 = _createForOfIteratorHelper(this._nodes),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var node = _step5.value;
          node.clear();
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this._nodes = [];
    }
    /**
     * Checks to see if an object needs to be deleted from the quad and if so it deletes
     * it.
     * 
     * @private
     * 
     * @param {Superquad} quad The quad that the object belongs to.
     * @param {Bounds} bounds The bounds that define the objects.
     */

  }, {
    key: "cleanup",
    value: function cleanup(quad, bounds) {
      quad._objects = quad._objects.filter(function (o) {
        return o != bounds;
      });
    }
    /**
     * Returns the part of the quad where the object should be placed.
     * 
     * @private
     * 
     * @param {Bounds} bounds The bounds to check the placement of.
     * 
     * @returns {number} Returns -1 through 3 depending on where the object should be placed.
     */

  }, {
    key: "getIndex",
    value: function getIndex(bounds) {
      var index = -1;
      var vMid = this._bounds.x + this._bounds.width / 2;
      var hMid = this._bounds.y + this._bounds.height / 2;
      var topQ = bounds.y < hMid && bounds.y + bounds.height < hMid;
      var botQ = bounds.y > hMid;

      if (bounds.x < vMid && bounds.x + bounds.width < vMid) {
        if (topQ) index = 1;else if (botQ) index = 2;
      } else if (bounds.x > vMid) {
        if (topQ) index = 0;else if (botQ) index = 3;
      }

      return index;
    }
    /**
     * Splits a quad into 4 subquads.
     * 
     * @private
     */

  }, {
    key: "split",
    value: function split() {
      var nextLevel = this._level + 1;
      var subW = Math.round(this._bounds.width / 2);
      var subH = Math.round(this._bounds.height / 2);
      var x = Math.round(this._bounds.x);
      var y = Math.round(this._bounds.y);
      this._nodes[0] = new Superquad(new _Bounds["default"]({
        x: x + subW,
        y: y,
        width: subW,
        height: subH
      }), this._options, nextLevel);
      this._nodes[1] = new Superquad(new _Bounds["default"]({
        x: x,
        y: y,
        width: subW,
        height: subH
      }), this._options, nextLevel);
      this._nodes[2] = new Superquad(new _Bounds["default"]({
        x: x,
        y: y + subH,
        width: subW,
        height: subH
      }), this._options, nextLevel);
      this._nodes[3] = new Superquad(new _Bounds["default"]({
        x: x + subW,
        y: y + subH,
        width: subW,
        height: subH
      }), this._options, nextLevel);
    }
  }]);

  return Superquad;
}();

exports["default"] = Superquad;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJTdXBlcnF1YWQiLCJib3VuZHMiLCJvcHRpb25zIiwibGV2ZWwiLCJfYm91bmRzIiwiQm91bmRzIiwiX29wdGlvbnMiLCJPcHRpb25zIiwiX2xldmVsIiwiX29iamVjdHMiLCJfbm9kZXMiLCJfdG90YWwiLCJ0b3RhbCIsIm5vZGUiLCJ0b3RhbE5vZGVzIiwibyIsImkiLCJpbmRleCIsImdldEluZGV4IiwiYWRkIiwicHVzaCIsImxlbmd0aCIsIm1heE9iamVjdHMiLCJtYXhMZXZlbHMiLCJzcGxpdCIsInNwbGljZSIsImRlbCIsInF1YWQiLCJyZXR1cm5PYmplY3RzIiwiY29uY2F0IiwiZ2V0Iiwib2JqZWN0cyIsInBvaW50cyIsInNlYXJjaCIsInBvaW50Iiwic2FtZUNvb3JkcyIsIngiLCJ5IiwiaXNQb2ludCIsImNsZWFudXAiLCJvYmoiLCJpbnRlcnNlY3Rpb25zIiwicmVzdWx0cyIsImludGVyc2VjdGlvbiIsImludGVyc2VjdHMiLCJjbGVhciIsImZpbHRlciIsInZNaWQiLCJ3aWR0aCIsImhNaWQiLCJoZWlnaHQiLCJ0b3BRIiwiYm90USIsIm5leHRMZXZlbCIsInN1YlciLCJNYXRoIiwicm91bmQiLCJzdWJIIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7SUFDcUJBLFM7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LEVBRWYsS0FBS25ELFFBRlUsRUFHZitDLFNBSGUsQ0FBakI7QUFNQSxXQUFLM0MsTUFBTCxDQUFZLENBQVosSUFBaUIsSUFBSVYsU0FBSixDQUNmLElBQUlLLGtCQUFKLENBQVc7QUFBRStCLFFBQUFBLENBQUMsRUFBRUEsQ0FBQyxHQUFHa0IsSUFBVDtBQUFlakIsUUFBQUEsQ0FBQyxFQUFFQSxDQUFDLEdBQUdvQixJQUF0QjtBQUE0QlQsUUFBQUEsS0FBSyxFQUFFTSxJQUFuQztBQUF5Q0osUUFBQUEsTUFBTSxFQUFFTztBQUFqRCxPQUFYLENBRGUsRUFFZixLQUFLbkQsUUFGVSxFQUdmK0MsU0FIZSxDQUFqQjtBQUtEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBCb3VuZHMgZnJvbSAnLi9ib3VuZHMvQm91bmRzJztcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9PcHRpb25zJztcblxuLyoqXG4gKiBBIG1vZGVybiBxdWFkdHJlZSBpbXBsZW1lbnRhdGlvbiBmb3IgbW9kZXJuIEphdmFTY3JpcHQgZ2FtZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cGVycXVhZCB7XG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9ucyBmb3IgdGhpcyBRdWFkLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cbiAgICovXG4gIHByaXZhdGUgX29wdGlvbnM6IE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIFRoZSBkZXB0aCBsZXZlbCBvZiB0aGlzIHF1YWQuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqL1xuICBwcml2YXRlIF9sZXZlbDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgYm91bmRzIG9mIHRoaXMgcXVhZCAoeCwgeSwgd2lkdGgsIGhlaWdodCkuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtCb3VuZHN9XG4gICAqL1xuICBwcml2YXRlIF9ib3VuZHM6IEJvdW5kcztcblxuICAvKipcbiAgICogVGhlIG9iamVjdHMgc3RvcmVkIGluIHRoaXMgcXVhZC5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge0FycmF5PEJvdW5kcz59XG4gICAqL1xuICBwcml2YXRlIF9vYmplY3RzOiBBcnJheTxCb3VuZHM+ID0gW107XG5cbiAgLyoqXG4gICAqIFRoZSBzdWJxdWFkcyBvZiB0aGlzIHF1YWQuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtBcnJheTxTdXBlcnF1YWQ+fVxuICAgKi9cbiAgcHJpdmF0ZSBfbm9kZXM6IEFycmF5PFN1cGVycXVhZD4gPSBbXTtcblxuICAvKipcbiAgICogVGhlIHRvdGFsIG51bWJlciBvZiBvYmplY3RzIHN0b3JlZCBpbiB0aGlzIHF1YWQuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqL1xuICBwcml2YXRlIF90b3RhbDogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGJvdW5kcyBUaGUgYm91bmRzIG9mIHRoaXMgcXVhZCAoeCwgeSwgd2lkdGgsIGhlaWdodCkuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbYm91bmRzLng9MF0gVGhlIHggcG9zaXRpb24gb2YgdGhlIHRvcCBsZWZ0IHBvaW50IG9mIHRoZSBxdWFkLiBUaGlzIHNob3VsZCBvbmx5IGJlIHNldCBpZiB5b3UncmUgd29ya2luZyB3aXRoIG5lZ2F0aXZlIHBvc2l0aW9uIHZhbHVlcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtib3VuZHMueT0wXSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgdG9wIGxlZnQgcG9pbnQgb2YgdGhlIHF1YWQuIFRoaXMgc2hvdWxkIG9ubHkgYmUgc2V0IGlmIHlvdSdyZSB3b3JraW5nIHdpdGggbmVnYXRpdmUgcG9zaXRpb24gdmFsdWVzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gYm91bmRzLndpZHRoIFRoZSB3aWR0aCBvZiB0aGUgcXVhZC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGJvdW5kcy5oZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgcXVhZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgcXVhZC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heE9iamVjdHM9MTBdIFRoZSBtYXhpbXVtIG51bWJlciBvZiBvYmplY3RzIHRoYXQgY2FuIGJlIHN0b3JlZCBpbiBhIHF1YWQgYmVmb3JlIHRoZSBxdWFkIHNwbGl0cy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heExldmVscz00XSBUaGUgbWF4aW11bSBudW1iZXIgb2YgdGltZXMgYSBxdWFkIGNhbiBzcGxpdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsZXZlbD0wXSBVc2VkIGludGVybmFsbHkgd2hlbiBjcmVhdGluZyBzdWItcXVhZHMuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihib3VuZHM6IE9iamVjdCwgb3B0aW9uczogT2JqZWN0ID0ge30sIGxldmVsOiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy5fYm91bmRzID0gbmV3IEJvdW5kcyhib3VuZHMpO1xuXG4gICAgdGhpcy5fb3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fbGV2ZWwgPSBsZXZlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZXZlbCBvZiB0aGlzIHF1YWQuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IGxldmVsKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZXZlbDsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBib3VuZHMgb2YgdGhpcyBxdWFkLlxuICAgKiBcbiAgICogQHJldHVybnMge0JvdW5kc31cbiAgICovXG4gIGdldCBib3VuZHMoKTogQm91bmRzIHsgcmV0dXJuIHRoaXMuX2JvdW5kczsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBvYmplY3RzIGluIHRoaXMgcXVhZC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtBcnJheTxCb3VuZHM+fVxuICAgKi9cbiAgZ2V0IG9iamVjdHMoKTogQXJyYXk8Qm91bmRzPiB7IHJldHVybiB0aGlzLl9vYmplY3RzOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHN1YnF1YWRzIG9mIHRoaXMgcXVhZC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdXBlcnF1YWQ+fVxuICAgKi9cbiAgZ2V0IG5vZGVzKCk6IEFycmF5PFN1cGVycXVhZD4geyByZXR1cm4gdGhpcy5fbm9kZXM7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdG90YWwgbnVtYmVyIG9mIG9iamVjdHMgc3RvcmVkIGluIHRoaXMgcXVhZC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgdG90YWwoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvdGFsOyB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHRvdGFsIG51bWJlciBvZiBzdWJxdWFkcyB3aXRoaW4gdGhlIG1haW4gcXVhZC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICB0b3RhbE5vZGVzKCk6IG51bWJlciB7XG4gICAgbGV0IHRvdGFsOiBudW1iZXIgPSAwO1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuX25vZGVzKSB7XG4gICAgICB0b3RhbCsrO1xuXG4gICAgICB0b3RhbCArPSBub2RlLnRvdGFsTm9kZXMoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG90YWw7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0cyBhbiBvYmplY3QgaW50byB0aGUgcXVhZCBhbmQgc3BsaXRzIHRoZSBxdWFkIGlmIG5lY2Vzc2FyeS5cbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvIFRoZSBib3VuZHMgb2YgdGhlIG9iamVjdCB0byBpbnNlcnQgaW50byB0aGUgcXVhZC5cbiAgICovXG4gIGFkZChvOiBPYmplY3QpIHtcbiAgICBjb25zdCBib3VuZHM6IEJvdW5kcyA9IG5ldyBCb3VuZHMobyk7XG5cbiAgICB0aGlzLl90b3RhbCsrO1xuXG4gICAgbGV0IGk6IG51bWJlciA9IDA7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgaWYgKHRoaXMuX25vZGVzWzBdKSB7XG4gICAgICBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoYm91bmRzKTtcblxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLl9ub2Rlc1tpbmRleF0uYWRkKGJvdW5kcyk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX29iamVjdHMucHVzaChib3VuZHMpO1xuXG4gICAgaWYgKHRoaXMuX29iamVjdHMubGVuZ3RoID4gdGhpcy5fb3B0aW9ucy5tYXhPYmplY3RzICYmIHRoaXMuX2xldmVsIDwgdGhpcy5fb3B0aW9ucy5tYXhMZXZlbHMpIHtcbiAgICAgIGlmICghdGhpcy5fbm9kZXNbMF0pIHRoaXMuc3BsaXQoKTtcbiAgICAgIHdoaWxlIChpIDwgdGhpcy5fb2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLmdldEluZGV4KHRoaXMuX29iamVjdHNbaV0pO1xuXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHRoaXMuX25vZGVzW2luZGV4XS5hZGQodGhpcy5fb2JqZWN0cy5zcGxpY2UoaSwgMSlbMF0pO1xuICAgICAgICBlbHNlIGkgPSBpICsgMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIG9iamVjdHMgYXJvdW5kIHRoZSBzcGVjaWZpZWQgYm91bmRzLlxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG8gVGhlIGJvdW5kcyBvZiB0aGUgb2JqZWN0IHRvIGNoZWNrIGZvciBwb3NzaWJsZSBjb2xsaXNpb25zLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWw9ZmFsc2VdIFNldCB0byB0cnVlIHRvIGRlbGV0ZSB0aGUgb2JqZWN0cyB0aGF0IHdlcmUgZm91bmQuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7QXJyYXk8Qm91bmRzPn0gXG4gICAqL1xuICBnZXQobzogT2JqZWN0LCBkZWw6IGJvb2xlYW4gPSBmYWxzZSk6IChBcnJheTxCb3VuZHM+IHwgYW55KSB7XG4gICAgbGV0IHF1YWQ6IFN1cGVycXVhZCA9IHRoaXM7XG5cbiAgICBjb25zdCBib3VuZHM6IEJvdW5kcyA9IG5ldyBCb3VuZHMobyk7XG5cbiAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5nZXRJbmRleChib3VuZHMpO1xuXG4gICAgbGV0IHJldHVybk9iamVjdHM6IEFycmF5PEJvdW5kcz4gPSB0aGlzLl9vYmplY3RzO1xuXG4gICAgaWYgKHRoaXMuX25vZGVzWzBdKSB7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHJldHVybk9iamVjdHMgPSByZXR1cm5PYmplY3RzLmNvbmNhdCh0aGlzLl9ub2Rlc1tpbmRleF0uZ2V0KG8sIGRlbCkpO1xuXG4gICAgICAgIHF1YWQgPSB0aGlzLl9ub2Rlc1tpbmRleF07XG4gICAgICB9XG4gICAgICBlbHNlIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLl9ub2Rlcykge1xuICAgICAgICByZXR1cm5PYmplY3RzID0gcmV0dXJuT2JqZWN0cy5jb25jYXQobm9kZS5nZXQobywgZGVsKSk7XG5cbiAgICAgICAgcXVhZCA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlbCkgcmV0dXJuIHsgcXVhZDogcXVhZCwgb2JqZWN0czogcmV0dXJuT2JqZWN0cyB9O1xuXG4gICAgcmV0dXJuIHJldHVybk9iamVjdHM7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCBwb2ludHMgaW4gdGhpcyBxdWFkIHRoYXQgY29sbGlkZS5cbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvIFRoZSBvYmplY3QgdG8gY2hlY2sgZm9yIGNvbGxpZGluZyBwb2ludHMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlbD1mYWxzZV0gU2V0IHRvIHRydWUgdG8gZGVsZXRlIHRoZSBwb2ludHMgdGhhdCB3ZXJlIGZvdW5kLlxuICAgKiBcbiAgICogQHJldHVybnMge0FycmF5PEJvdW5kcz59XG4gICAqL1xuICBnZXRQb2ludHMobzogT2JqZWN0LCBkZWw6IGJvb2xlYW4gPSBmYWxzZSk6IEFycmF5PEJvdW5kcz4ge1xuICAgIGNvbnN0IGJvdW5kczogQm91bmRzID0gbmV3IEJvdW5kcyhvKTtcblxuICAgIGxldCBwb2ludHM6IEFycmF5PEJvdW5kcz4gPSBbXTtcblxuICAgIGxldCBzZWFyY2g6IChBcnJheTxCb3VuZHM+IHwgYW55KSA9IHRoaXMuZ2V0KGJvdW5kcywgZGVsKTtcblxuICAgIGlmIChkZWwpIHNlYXJjaCA9IHNlYXJjaC5vYmplY3RzO1xuXG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBzZWFyY2gpIHtcbiAgICAgIGNvbnN0IHNhbWVDb29yZHM6IGJvb2xlYW4gPSBwb2ludC54ID09PSBib3VuZHMueCAmJiBwb2ludC55ID09PSBib3VuZHMueTtcblxuICAgICAgaWYgKHNhbWVDb29yZHMgJiYgcG9pbnQuaXNQb2ludCgpKSBwb2ludHMucHVzaChwb2ludCk7XG5cbiAgICAgIGlmIChkZWwpIHRoaXMuY2xlYW51cChzZWFyY2gucXVhZCwgcG9pbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBwb2ludHM7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmllcyBhbGwgYm91bmRzIGluIHRoaXMgcXVhZCB0aGF0IGludGVyc2VjdCB3aXRoIHRoZSBwcm92aWRlZCBib3VuZHMuXG4gICAqIFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBib3VuZHMgdG8gY2hlY2sgY29sbGlzaW9ucyBhZ2FpbnN0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWw9ZmFsc2VdIFNldCB0byB0cnVlIHRvIGRlbGV0ZSB0aGUgaW50ZXJzZWN0aW9ucyB0aGF0IHdlcmUgZm91bmQuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7QXJyYXk8Qm91bmRzPn1cbiAgICovXG4gIGdldEludGVyc2VjdGlvbnMob2JqOiBCb3VuZHMsIGRlbDogYm9vbGVhbiA9IGZhbHNlKTogQXJyYXk8Qm91bmRzPiB7XG4gICAgY29uc3QgYm91bmRzOiBCb3VuZHMgPSBuZXcgQm91bmRzKG9iaik7XG5cbiAgICBjb25zdCBpbnRlcnNlY3Rpb25zOiBBcnJheTxCb3VuZHM+ID0gW107XG5cbiAgICBjb25zdCByZXN1bHRzOiAoQXJyYXk8Qm91bmRzPiB8IGFueSkgPSB0aGlzLmdldChib3VuZHMsIGRlbCk7XG5cbiAgICBjb25zdCBvYmplY3RzID0gZGVsID8gcmVzdWx0cy5vYmplY3RzIDogcmVzdWx0cztcblxuICAgIGZvciAoY29uc3QgaW50ZXJzZWN0aW9uIG9mIG9iamVjdHMpIHtcbiAgICAgIGlmIChpbnRlcnNlY3Rpb24uaW50ZXJzZWN0cyhib3VuZHMpKSB7XG4gICAgICAgIGludGVyc2VjdGlvbnMucHVzaChpbnRlcnNlY3Rpb24pO1xuXG4gICAgICAgIGlmIChkZWwpIHRoaXMuY2xlYW51cChyZXN1bHRzLnF1YWQsIGludGVyc2VjdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVyc2VjdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBvYmplY3RzIGFuZCBub2RlcyBmcm9tIHRoZSBxdWFkLlxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fb2JqZWN0cyA9IFtdO1xuXG4gICAgdGhpcy5fdG90YWwgPSAwO1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuX25vZGVzKSBub2RlLmNsZWFyKCk7XG5cbiAgICB0aGlzLl9ub2RlcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0byBzZWUgaWYgYW4gb2JqZWN0IG5lZWRzIHRvIGJlIGRlbGV0ZWQgZnJvbSB0aGUgcXVhZCBhbmQgaWYgc28gaXQgZGVsZXRlc1xuICAgKiBpdC5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcGFyYW0ge1N1cGVycXVhZH0gcXVhZCBUaGUgcXVhZCB0aGF0IHRoZSBvYmplY3QgYmVsb25ncyB0by5cbiAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRoYXQgZGVmaW5lIHRoZSBvYmplY3RzLlxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhbnVwKHF1YWQ6IFN1cGVycXVhZCwgYm91bmRzOiBCb3VuZHMpIHtcbiAgICBxdWFkLl9vYmplY3RzID0gcXVhZC5fb2JqZWN0cy5maWx0ZXIoKG8pID0+IG8gIT0gYm91bmRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYXJ0IG9mIHRoZSBxdWFkIHdoZXJlIHRoZSBvYmplY3Qgc2hvdWxkIGJlIHBsYWNlZC5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcGFyYW0ge0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gY2hlY2sgdGhlIHBsYWNlbWVudCBvZi5cbiAgICogXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgLTEgdGhyb3VnaCAzIGRlcGVuZGluZyBvbiB3aGVyZSB0aGUgb2JqZWN0IHNob3VsZCBiZSBwbGFjZWQuXG4gICAqL1xuICBwcml2YXRlIGdldEluZGV4KGJvdW5kczogYW55KTogbnVtYmVyIHtcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xuXG4gICAgY29uc3Qgdk1pZDogbnVtYmVyID0gdGhpcy5fYm91bmRzLnggKyAodGhpcy5fYm91bmRzLndpZHRoIC8gMik7XG4gICAgY29uc3QgaE1pZDogbnVtYmVyID0gdGhpcy5fYm91bmRzLnkgKyAodGhpcy5fYm91bmRzLmhlaWdodCAvIDIpO1xuXG4gICAgY29uc3QgdG9wUTogYm9vbGVhbiA9IChib3VuZHMueSA8IGhNaWQgJiYgYm91bmRzLnkgKyBib3VuZHMuaGVpZ2h0IDwgaE1pZCk7XG4gICAgY29uc3QgYm90UTogYm9vbGVhbiA9IChib3VuZHMueSA+IGhNaWQpO1xuXG4gICAgaWYgKGJvdW5kcy54IDwgdk1pZCAmJiBib3VuZHMueCArIGJvdW5kcy53aWR0aCA8IHZNaWQpIHtcbiAgICAgIGlmICh0b3BRKSBpbmRleCA9IDE7XG4gICAgICBlbHNlIGlmIChib3RRKSBpbmRleCA9IDI7XG4gICAgfSBlbHNlIGlmIChib3VuZHMueCA+IHZNaWQpIHtcbiAgICAgIGlmICh0b3BRKSBpbmRleCA9IDA7XG4gICAgICBlbHNlIGlmIChib3RRKSBpbmRleCA9IDM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIFNwbGl0cyBhIHF1YWQgaW50byA0IHN1YnF1YWRzLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgc3BsaXQoKSB7XG4gICAgY29uc3QgbmV4dExldmVsOiBudW1iZXIgPSB0aGlzLl9sZXZlbCArIDE7XG5cbiAgICBjb25zdCBzdWJXOiBudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMuX2JvdW5kcy53aWR0aCAvIDIpO1xuICAgIGNvbnN0IHN1Ykg6IG51bWJlciA9IE1hdGgucm91bmQodGhpcy5fYm91bmRzLmhlaWdodCAvIDIpO1xuXG4gICAgY29uc3QgeDogbnVtYmVyID0gTWF0aC5yb3VuZCh0aGlzLl9ib3VuZHMueCk7XG4gICAgY29uc3QgeTogbnVtYmVyID0gTWF0aC5yb3VuZCh0aGlzLl9ib3VuZHMueSk7XG5cbiAgICB0aGlzLl9ub2Rlc1swXSA9IG5ldyBTdXBlcnF1YWQoXG4gICAgICBuZXcgQm91bmRzKHsgeDogeCArIHN1YlcsIHk6IHksIHdpZHRoOiBzdWJXLCBoZWlnaHQ6IHN1YkggfSksXG4gICAgICB0aGlzLl9vcHRpb25zLFxuICAgICAgbmV4dExldmVsXG4gICAgKTtcblxuICAgIHRoaXMuX25vZGVzWzFdID0gbmV3IFN1cGVycXVhZChcbiAgICAgIG5ldyBCb3VuZHMoeyB4OiB4LCB5OiB5LCB3aWR0aDogc3ViVywgaGVpZ2h0OiBzdWJIIH0pLFxuICAgICAgdGhpcy5fb3B0aW9ucyxcbiAgICAgIG5leHRMZXZlbFxuICAgICk7XG5cbiAgICB0aGlzLl9ub2Rlc1syXSA9IG5ldyBTdXBlcnF1YWQoXG4gICAgICBuZXcgQm91bmRzKHsgeDogeCwgeTogeSArIHN1YkgsIHdpZHRoOiBzdWJXLCBoZWlnaHQ6IHN1YkggfSksXG4gICAgICB0aGlzLl9vcHRpb25zLFxuICAgICAgbmV4dExldmVsXG4gICAgKTtcblxuICAgIHRoaXMuX25vZGVzWzNdID0gbmV3IFN1cGVycXVhZChcbiAgICAgIG5ldyBCb3VuZHMoeyB4OiB4ICsgc3ViVywgeTogeSArIHN1YkgsIHdpZHRoOiBzdWJXLCBoZWlnaHQ6IHN1YkggfSksXG4gICAgICB0aGlzLl9vcHRpb25zLFxuICAgICAgbmV4dExldmVsXG4gICAgKTtcbiAgfVxufSJdfQ==