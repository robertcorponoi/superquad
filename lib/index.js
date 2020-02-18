'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Bounds = _interopRequireDefault(require("./bounds/Bounds"));

var _Options = _interopRequireDefault(require("./options/Options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A modern quadtree implementation for modern JavaScript games.
 */
var Superquad =
/*#__PURE__*/
function () {
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
    key: "totalNodes",

    /**
     * Gets the total number of subquads within the main quad.
     * 
     * @returns {number}
     */
    value: function totalNodes() {
      var total = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;
          total++;
          total += node.totalNodes();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this._nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var node = _step2.value;
              returnObjects = returnObjects.concat(node.get(o, del));
              quad = node;
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
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
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = search[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var point = _step3.value;
          var sameCoords = point.x === bounds.x && point.y === bounds.y;
          if (sameCoords && point.isPoint()) points.push(point);
          if (del) this.cleanup(search.quad, point);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
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
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = objects[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var intersection = _step4.value;

          if (intersection.intersects(bounds)) {
            intersections.push(intersection);
            if (del) this.cleanup(results.quad, intersection);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
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
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._nodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var node = _step5.value;
          node.clear();
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
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
  }, {
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
  }]);

  return Superquad;
}();

exports["default"] = Superquad;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJTdXBlcnF1YWQiLCJib3VuZHMiLCJvcHRpb25zIiwibGV2ZWwiLCJfYm91bmRzIiwiQm91bmRzIiwiX29wdGlvbnMiLCJPcHRpb25zIiwiX2xldmVsIiwidG90YWwiLCJfbm9kZXMiLCJub2RlIiwidG90YWxOb2RlcyIsIm8iLCJfdG90YWwiLCJpIiwiaW5kZXgiLCJnZXRJbmRleCIsImFkZCIsIl9vYmplY3RzIiwicHVzaCIsImxlbmd0aCIsIm1heE9iamVjdHMiLCJtYXhMZXZlbHMiLCJzcGxpdCIsInNwbGljZSIsImRlbCIsInF1YWQiLCJyZXR1cm5PYmplY3RzIiwiY29uY2F0IiwiZ2V0Iiwib2JqZWN0cyIsInBvaW50cyIsInNlYXJjaCIsInBvaW50Iiwic2FtZUNvb3JkcyIsIngiLCJ5IiwiaXNQb2ludCIsImNsZWFudXAiLCJvYmoiLCJpbnRlcnNlY3Rpb25zIiwicmVzdWx0cyIsImludGVyc2VjdGlvbiIsImludGVyc2VjdHMiLCJjbGVhciIsImZpbHRlciIsInZNaWQiLCJ3aWR0aCIsImhNaWQiLCJoZWlnaHQiLCJ0b3BRIiwiYm90USIsIm5leHRMZXZlbCIsInN1YlciLCJNYXRoIiwicm91bmQiLCJzdWJIIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR3FCQSxTOzs7QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7O0FBV0EscUJBQVlDLE1BQVosRUFBcUU7QUFBQSxRQUF6Q0MsT0FBeUMsdUVBQXZCLEVBQXVCO0FBQUEsUUFBbkJDLEtBQW1CLHVFQUFILENBQUc7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsc0NBL0JuQyxFQStCbUM7O0FBQUEsb0NBdEJsQyxFQXNCa0M7O0FBQUEsb0NBYjVDLENBYTRDOztBQUNuRSxT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IHN0cmljdCdcclxuXHJcbmltcG9ydCBCb3VuZHMgZnJvbSAnLi9ib3VuZHMvQm91bmRzJztcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEEgbW9kZXJuIHF1YWR0cmVlIGltcGxlbWVudGF0aW9uIGZvciBtb2Rlcm4gSmF2YVNjcmlwdCBnYW1lcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cGVycXVhZCB7XHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgUXVhZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cclxuICAgKi9cclxuICBwcml2YXRlIF9vcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGVwdGggbGV2ZWwgb2YgdGhpcyBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbGV2ZWw6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGJvdW5kcyBvZiB0aGlzIHF1YWQgKHgsIHksIHdpZHRoLCBoZWlnaHQpLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtCb3VuZHN9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYm91bmRzOiBCb3VuZHM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBvYmplY3RzIHN0b3JlZCBpbiB0aGlzIHF1YWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PEJvdW5kcz59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb2JqZWN0czogQXJyYXk8Qm91bmRzPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3VicXVhZHMgb2YgdGhpcyBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxTdXBlcnF1YWQ+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX25vZGVzOiBBcnJheTxTdXBlcnF1YWQ+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0b3RhbCBudW1iZXIgb2Ygb2JqZWN0cyBzdG9yZWQgaW4gdGhpcyBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdG90YWw6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib3VuZHMgVGhlIGJvdW5kcyBvZiB0aGlzIHF1YWQgKHgsIHksIHdpZHRoLCBoZWlnaHQpLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbYm91bmRzLng9MF0gVGhlIHggcG9zaXRpb24gb2YgdGhlIHRvcCBsZWZ0IHBvaW50IG9mIHRoZSBxdWFkLiBUaGlzIHNob3VsZCBvbmx5IGJlIHNldCBpZiB5b3UncmUgd29ya2luZyB3aXRoIG5lZ2F0aXZlIHBvc2l0aW9uIHZhbHVlcy5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW2JvdW5kcy55PTBdIFRoZSB5IHBvc2l0aW9uIG9mIHRoZSB0b3AgbGVmdCBwb2ludCBvZiB0aGUgcXVhZC4gVGhpcyBzaG91bGQgb25seSBiZSBzZXQgaWYgeW91J3JlIHdvcmtpbmcgd2l0aCBuZWdhdGl2ZSBwb3NpdGlvbiB2YWx1ZXMuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGJvdW5kcy53aWR0aCBUaGUgd2lkdGggb2YgdGhlIHF1YWQuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGJvdW5kcy5oZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgcXVhZC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9ucyBmb3IgdGhpcyBxdWFkLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhPYmplY3RzPTEwXSBUaGUgbWF4aW11bSBudW1iZXIgb2Ygb2JqZWN0cyB0aGF0IGNhbiBiZSBzdG9yZWQgaW4gYSBxdWFkIGJlZm9yZSB0aGUgcXVhZCBzcGxpdHMuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heExldmVscz00XSBUaGUgbWF4aW11bSBudW1iZXIgb2YgdGltZXMgYSBxdWFkIGNhbiBzcGxpdC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xldmVsPTBdIFVzZWQgaW50ZXJuYWxseSB3aGVuIGNyZWF0aW5nIHN1Yi1xdWFkcy5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihib3VuZHM6IE9iamVjdCwgb3B0aW9uczogT2JqZWN0ID0ge30sIGxldmVsOiBudW1iZXIgPSAwKSB7XHJcbiAgICB0aGlzLl9ib3VuZHMgPSBuZXcgQm91bmRzKGJvdW5kcyk7XHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuX2xldmVsID0gbGV2ZWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBsZXZlbCBvZiB0aGlzIHF1YWQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgbGV2ZWwoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xldmVsOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGJvdW5kcyBvZiB0aGlzIHF1YWQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0JvdW5kc31cclxuICAgKi9cclxuICBnZXQgYm91bmRzKCk6IEJvdW5kcyB7IHJldHVybiB0aGlzLl9ib3VuZHM7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgb2JqZWN0cyBpbiB0aGlzIHF1YWQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0FycmF5PEJvdW5kcz59XHJcbiAgICovXHJcbiAgZ2V0IG9iamVjdHMoKTogQXJyYXk8Qm91bmRzPiB7IHJldHVybiB0aGlzLl9vYmplY3RzOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHN1YnF1YWRzIG9mIHRoaXMgcXVhZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3VwZXJxdWFkPn1cclxuICAgKi9cclxuICBnZXQgbm9kZXMoKTogQXJyYXk8U3VwZXJxdWFkPiB7IHJldHVybiB0aGlzLl9ub2RlczsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB0b3RhbCBudW1iZXIgb2Ygb2JqZWN0cyBzdG9yZWQgaW4gdGhpcyBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IHRvdGFsKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3RhbDsgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSB0b3RhbCBudW1iZXIgb2Ygc3VicXVhZHMgd2l0aGluIHRoZSBtYWluIHF1YWQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICB0b3RhbE5vZGVzKCk6IG51bWJlciB7XHJcbiAgICBsZXQgdG90YWw6IG51bWJlciA9IDA7XHJcblxyXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuX25vZGVzKSB7XHJcbiAgICAgIHRvdGFsKys7XHJcblxyXG4gICAgICB0b3RhbCArPSBub2RlLnRvdGFsTm9kZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdG90YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnNlcnRzIGFuIG9iamVjdCBpbnRvIHRoZSBxdWFkIGFuZCBzcGxpdHMgdGhlIHF1YWQgaWYgbmVjZXNzYXJ5LlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvIFRoZSBib3VuZHMgb2YgdGhlIG9iamVjdCB0byBpbnNlcnQgaW50byB0aGUgcXVhZC5cclxuICAgKi9cclxuICBhZGQobzogT2JqZWN0KSB7XHJcbiAgICBjb25zdCBib3VuZHM6IEJvdW5kcyA9IG5ldyBCb3VuZHMobyk7XHJcblxyXG4gICAgdGhpcy5fdG90YWwrKztcclxuXHJcbiAgICBsZXQgaTogbnVtYmVyID0gMDtcclxuICAgIGxldCBpbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5fbm9kZXNbMF0pIHtcclxuICAgICAgaW5kZXggPSB0aGlzLmdldEluZGV4KGJvdW5kcyk7XHJcblxyXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5fbm9kZXNbaW5kZXhdLmFkZChib3VuZHMpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9vYmplY3RzLnB1c2goYm91bmRzKTtcclxuXHJcbiAgICBpZiAodGhpcy5fb2JqZWN0cy5sZW5ndGggPiB0aGlzLl9vcHRpb25zLm1heE9iamVjdHMgJiYgdGhpcy5fbGV2ZWwgPCB0aGlzLl9vcHRpb25zLm1heExldmVscykge1xyXG4gICAgICBpZiAoIXRoaXMuX25vZGVzWzBdKSB0aGlzLnNwbGl0KCk7XHJcbiAgICAgIHdoaWxlIChpIDwgdGhpcy5fb2JqZWN0cy5sZW5ndGgpIHtcclxuICAgICAgICBpbmRleCA9IHRoaXMuZ2V0SW5kZXgodGhpcy5fb2JqZWN0c1tpXSk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHRoaXMuX25vZGVzW2luZGV4XS5hZGQodGhpcy5fb2JqZWN0cy5zcGxpY2UoaSwgMSlbMF0pO1xyXG4gICAgICAgIGVsc2UgaSA9IGkgKyAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXRyaWV2ZXMgb2JqZWN0cyBhcm91bmQgdGhlIHNwZWNpZmllZCBib3VuZHMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG8gVGhlIGJvdW5kcyBvZiB0aGUgb2JqZWN0IHRvIGNoZWNrIGZvciBwb3NzaWJsZSBjb2xsaXNpb25zLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlbD1mYWxzZV0gU2V0IHRvIHRydWUgdG8gZGVsZXRlIHRoZSBvYmplY3RzIHRoYXQgd2VyZSBmb3VuZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8Qm91bmRzPn0gXHJcbiAgICovXHJcbiAgZ2V0KG86IE9iamVjdCwgZGVsOiBib29sZWFuID0gZmFsc2UpOiAoQXJyYXk8Qm91bmRzPiB8IGFueSkge1xyXG4gICAgbGV0IHF1YWQ6IFN1cGVycXVhZCA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgYm91bmRzOiBCb3VuZHMgPSBuZXcgQm91bmRzKG8pO1xyXG5cclxuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLmdldEluZGV4KGJvdW5kcyk7XHJcblxyXG4gICAgbGV0IHJldHVybk9iamVjdHM6IEFycmF5PEJvdW5kcz4gPSB0aGlzLl9vYmplY3RzO1xyXG5cclxuICAgIGlmICh0aGlzLl9ub2Rlc1swXSkge1xyXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuT2JqZWN0cyA9IHJldHVybk9iamVjdHMuY29uY2F0KHRoaXMuX25vZGVzW2luZGV4XS5nZXQobywgZGVsKSk7XHJcblxyXG4gICAgICAgIHF1YWQgPSB0aGlzLl9ub2Rlc1tpbmRleF07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5fbm9kZXMpIHtcclxuICAgICAgICByZXR1cm5PYmplY3RzID0gcmV0dXJuT2JqZWN0cy5jb25jYXQobm9kZS5nZXQobywgZGVsKSk7XHJcblxyXG4gICAgICAgIHF1YWQgPSBub2RlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRlbCkgcmV0dXJuIHsgcXVhZDogcXVhZCwgb2JqZWN0czogcmV0dXJuT2JqZWN0cyB9O1xyXG5cclxuICAgIHJldHVybiByZXR1cm5PYmplY3RzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIGFsbCBwb2ludHMgaW4gdGhpcyBxdWFkIHRoYXQgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gbyBUaGUgb2JqZWN0IHRvIGNoZWNrIGZvciBjb2xsaWRpbmcgcG9pbnRzLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlbD1mYWxzZV0gU2V0IHRvIHRydWUgdG8gZGVsZXRlIHRoZSBwb2ludHMgdGhhdCB3ZXJlIGZvdW5kLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxCb3VuZHM+fVxyXG4gICAqL1xyXG4gIGdldFBvaW50cyhvOiBPYmplY3QsIGRlbDogYm9vbGVhbiA9IGZhbHNlKTogQXJyYXk8Qm91bmRzPiB7XHJcbiAgICBjb25zdCBib3VuZHM6IEJvdW5kcyA9IG5ldyBCb3VuZHMobyk7XHJcblxyXG4gICAgbGV0IHBvaW50czogQXJyYXk8Qm91bmRzPiA9IFtdO1xyXG5cclxuICAgIGxldCBzZWFyY2g6IChBcnJheTxCb3VuZHM+IHwgYW55KSA9IHRoaXMuZ2V0KGJvdW5kcywgZGVsKTtcclxuXHJcbiAgICBpZiAoZGVsKSBzZWFyY2ggPSBzZWFyY2gub2JqZWN0cztcclxuXHJcbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIHNlYXJjaCkge1xyXG4gICAgICBjb25zdCBzYW1lQ29vcmRzOiBib29sZWFuID0gcG9pbnQueCA9PT0gYm91bmRzLnggJiYgcG9pbnQueSA9PT0gYm91bmRzLnk7XHJcblxyXG4gICAgICBpZiAoc2FtZUNvb3JkcyAmJiBwb2ludC5pc1BvaW50KCkpIHBvaW50cy5wdXNoKHBvaW50KTtcclxuXHJcbiAgICAgIGlmIChkZWwpIHRoaXMuY2xlYW51cChzZWFyY2gucXVhZCwgcG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwb2ludHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXRyaWVzIGFsbCBib3VuZHMgaW4gdGhpcyBxdWFkIHRoYXQgaW50ZXJzZWN0IHdpdGggdGhlIHByb3ZpZGVkIGJvdW5kcy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBib3VuZHMgdG8gY2hlY2sgY29sbGlzaW9ucyBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlbD1mYWxzZV0gU2V0IHRvIHRydWUgdG8gZGVsZXRlIHRoZSBpbnRlcnNlY3Rpb25zIHRoYXQgd2VyZSBmb3VuZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8Qm91bmRzPn1cclxuICAgKi9cclxuICBnZXRJbnRlcnNlY3Rpb25zKG9iajogQm91bmRzLCBkZWw6IGJvb2xlYW4gPSBmYWxzZSk6IEFycmF5PEJvdW5kcz4ge1xyXG4gICAgY29uc3QgYm91bmRzOiBCb3VuZHMgPSBuZXcgQm91bmRzKG9iaik7XHJcblxyXG4gICAgY29uc3QgaW50ZXJzZWN0aW9uczogQXJyYXk8Qm91bmRzPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdHM6IChBcnJheTxCb3VuZHM+IHwgYW55KSA9IHRoaXMuZ2V0KGJvdW5kcywgZGVsKTtcclxuXHJcbiAgICBjb25zdCBvYmplY3RzID0gZGVsID8gcmVzdWx0cy5vYmplY3RzIDogcmVzdWx0cztcclxuXHJcbiAgICBmb3IgKGNvbnN0IGludGVyc2VjdGlvbiBvZiBvYmplY3RzKSB7XHJcbiAgICAgIGlmIChpbnRlcnNlY3Rpb24uaW50ZXJzZWN0cyhib3VuZHMpKSB7XHJcbiAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKGludGVyc2VjdGlvbik7XHJcblxyXG4gICAgICAgIGlmIChkZWwpIHRoaXMuY2xlYW51cChyZXN1bHRzLnF1YWQsIGludGVyc2VjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFycyBhbGwgb2JqZWN0cyBhbmQgbm9kZXMgZnJvbSB0aGUgcXVhZC5cclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMuX29iamVjdHMgPSBbXTtcclxuXHJcbiAgICB0aGlzLl90b3RhbCA9IDA7XHJcblxyXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuX25vZGVzKSBub2RlLmNsZWFyKCk7XHJcblxyXG4gICAgdGhpcy5fbm9kZXMgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB0byBzZWUgaWYgYW4gb2JqZWN0IG5lZWRzIHRvIGJlIGRlbGV0ZWQgZnJvbSB0aGUgcXVhZCBhbmQgaWYgc28gaXQgZGVsZXRlc1xyXG4gICAqIGl0LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtTdXBlcnF1YWR9IHF1YWQgVGhlIHF1YWQgdGhhdCB0aGUgb2JqZWN0IGJlbG9uZ3MgdG8uXHJcbiAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRoYXQgZGVmaW5lIHRoZSBvYmplY3RzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYW51cChxdWFkOiBTdXBlcnF1YWQsIGJvdW5kczogQm91bmRzKSB7XHJcbiAgICBxdWFkLl9vYmplY3RzID0gcXVhZC5fb2JqZWN0cy5maWx0ZXIoKG8pID0+IG8gIT0gYm91bmRzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHBhcnQgb2YgdGhlIHF1YWQgd2hlcmUgdGhlIG9iamVjdCBzaG91bGQgYmUgcGxhY2VkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGNoZWNrIHRoZSBwbGFjZW1lbnQgb2YuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyAtMSB0aHJvdWdoIDMgZGVwZW5kaW5nIG9uIHdoZXJlIHRoZSBvYmplY3Qgc2hvdWxkIGJlIHBsYWNlZC5cclxuICAgKi9cclxuICBwcml2YXRlIGdldEluZGV4KGJvdW5kczogYW55KTogbnVtYmVyIHtcclxuICAgIGxldCBpbmRleDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgY29uc3Qgdk1pZDogbnVtYmVyID0gdGhpcy5fYm91bmRzLnggKyAodGhpcy5fYm91bmRzLndpZHRoIC8gMik7XHJcbiAgICBjb25zdCBoTWlkOiBudW1iZXIgPSB0aGlzLl9ib3VuZHMueSArICh0aGlzLl9ib3VuZHMuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgY29uc3QgdG9wUTogYm9vbGVhbiA9IChib3VuZHMueSA8IGhNaWQgJiYgYm91bmRzLnkgKyBib3VuZHMuaGVpZ2h0IDwgaE1pZCk7XHJcbiAgICBjb25zdCBib3RROiBib29sZWFuID0gKGJvdW5kcy55ID4gaE1pZCk7XHJcblxyXG4gICAgaWYgKGJvdW5kcy54IDwgdk1pZCAmJiBib3VuZHMueCArIGJvdW5kcy53aWR0aCA8IHZNaWQpIHtcclxuICAgICAgaWYgKHRvcFEpIGluZGV4ID0gMTtcclxuICAgICAgZWxzZSBpZiAoYm90USkgaW5kZXggPSAyO1xyXG4gICAgfSBlbHNlIGlmIChib3VuZHMueCA+IHZNaWQpIHtcclxuICAgICAgaWYgKHRvcFEpIGluZGV4ID0gMDtcclxuICAgICAgZWxzZSBpZiAoYm90USkgaW5kZXggPSAzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbmRleDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNwbGl0cyBhIHF1YWQgaW50byA0IHN1YnF1YWRzLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzcGxpdCgpIHtcclxuICAgIGNvbnN0IG5leHRMZXZlbDogbnVtYmVyID0gdGhpcy5fbGV2ZWwgKyAxO1xyXG5cclxuICAgIGNvbnN0IHN1Ylc6IG51bWJlciA9IE1hdGgucm91bmQodGhpcy5fYm91bmRzLndpZHRoIC8gMik7XHJcbiAgICBjb25zdCBzdWJIOiBudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMuX2JvdW5kcy5oZWlnaHQgLyAyKTtcclxuXHJcbiAgICBjb25zdCB4OiBudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMuX2JvdW5kcy54KTtcclxuICAgIGNvbnN0IHk6IG51bWJlciA9IE1hdGgucm91bmQodGhpcy5fYm91bmRzLnkpO1xyXG5cclxuICAgIHRoaXMuX25vZGVzWzBdID0gbmV3IFN1cGVycXVhZChcclxuICAgICAgbmV3IEJvdW5kcyh7IHg6IHggKyBzdWJXLCB5OiB5LCB3aWR0aDogc3ViVywgaGVpZ2h0OiBzdWJIIH0pLFxyXG4gICAgICB0aGlzLl9vcHRpb25zLFxyXG4gICAgICBuZXh0TGV2ZWxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fbm9kZXNbMV0gPSBuZXcgU3VwZXJxdWFkKFxyXG4gICAgICBuZXcgQm91bmRzKHsgeDogeCwgeTogeSwgd2lkdGg6IHN1YlcsIGhlaWdodDogc3ViSCB9KSxcclxuICAgICAgdGhpcy5fb3B0aW9ucyxcclxuICAgICAgbmV4dExldmVsXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX25vZGVzWzJdID0gbmV3IFN1cGVycXVhZChcclxuICAgICAgbmV3IEJvdW5kcyh7IHg6IHgsIHk6IHkgKyBzdWJILCB3aWR0aDogc3ViVywgaGVpZ2h0OiBzdWJIIH0pLFxyXG4gICAgICB0aGlzLl9vcHRpb25zLFxyXG4gICAgICBuZXh0TGV2ZWxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fbm9kZXNbM10gPSBuZXcgU3VwZXJxdWFkKFxyXG4gICAgICBuZXcgQm91bmRzKHsgeDogeCArIHN1YlcsIHk6IHkgKyBzdWJILCB3aWR0aDogc3ViVywgaGVpZ2h0OiBzdWJIIH0pLFxyXG4gICAgICB0aGlzLl9vcHRpb25zLFxyXG4gICAgICBuZXh0TGV2ZWxcclxuICAgICk7XHJcbiAgfVxyXG59Il19