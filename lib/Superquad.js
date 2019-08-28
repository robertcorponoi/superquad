'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Bounds = _interopRequireDefault(require("./Bounds"));

var _Options = _interopRequireDefault(require("./Options"));

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
   * @property {Options}
   */

  /**
   * The depth level of this quad.
   * 
   * @property {number}
   */

  /**
   * The bounds of this quad (x, y, width, height).
   * 
   * @property {Bounds}
   */

  /**
   * The objects stored in this quad.
   * 
   * @property {Array<Bounds>}
   */

  /**
   * The subquads of this quad.
   * 
   * @property {Array<Superquad>}
   */

  /**
   * The total number of objects stored in this quad.
   * 
   * @property {number}
   */

  /**
   * @param {Object} bounds The bounds of this quad (x, y, width, height).
   * @param {Object} options A reference to the options for this quad.
   * @param {number} [level=0] The depth level of this quad.
   */
  function Superquad(bounds, options) {
    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Superquad);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "level", void 0);

    _defineProperty(this, "bounds", void 0);

    _defineProperty(this, "objects", []);

    _defineProperty(this, "nodes", []);

    _defineProperty(this, "total", 0);

    this.bounds = new _Bounds["default"](bounds);
    this.options = new _Options["default"](options);
    this.level = level;
  }
  /**
   * Gets the total number of subquads within the main quad.
   * 
   * @returns {number}
   */


  _createClass(Superquad, [{
    key: "totalNodes",
    value: function totalNodes() {
      var total = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
      this.total++;
      var i = 0;
      var index = 0;

      if (this.nodes[0]) {
        index = this.getIndex(bounds);

        if (index !== -1) {
          this.nodes[index].add(bounds);
          return;
        }
      }

      this.objects.push(bounds);

      if (this.objects.length > this.options.maxObjects && this.level < this.options.maxLevels) {
        if (!this.nodes[0]) this.split();

        while (i < this.objects.length) {
          index = this.getIndex(this.objects[i]);
          if (index !== -1) this.nodes[index].add(this.objects.splice(i, 1)[0]);else i = i + 1;
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
      var returnObjects = this.objects;

      if (this.nodes[0]) {
        if (index !== -1) {
          returnObjects = returnObjects.concat(this.nodes[index].get(o, del));
          quad = this.nodes[index];
        } else {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
      this.objects = [];
      this.total = 0;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.nodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
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

      this.nodes = [];
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
      quad.objects = quad.objects.filter(function (o) {
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
      var vMid = this.bounds.x + this.bounds.width / 2;
      var hMid = this.bounds.y + this.bounds.height / 2;
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
      var nextLevel = this.level + 1;
      var subW = Math.round(this.bounds.width / 2);
      var subH = Math.round(this.bounds.height / 2);
      var x = Math.round(this.bounds.x);
      var y = Math.round(this.bounds.y);
      this.nodes[0] = new Superquad(new _Bounds["default"]({
        x: x + subW,
        y: y,
        width: subW,
        height: subH
      }), this.options, nextLevel);
      this.nodes[1] = new Superquad(new _Bounds["default"]({
        x: x,
        y: y,
        width: subW,
        height: subH
      }), this.options, nextLevel);
      this.nodes[2] = new Superquad(new _Bounds["default"]({
        x: x,
        y: y + subH,
        width: subW,
        height: subH
      }), this.options, nextLevel);
      this.nodes[3] = new Superquad(new _Bounds["default"]({
        x: x + subW,
        y: y + subH,
        width: subW,
        height: subH
      }), this.options, nextLevel);
    }
  }]);

  return Superquad;
}();

exports["default"] = Superquad;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TdXBlcnF1YWQudHMiXSwibmFtZXMiOlsiU3VwZXJxdWFkIiwiYm91bmRzIiwib3B0aW9ucyIsImxldmVsIiwiQm91bmRzIiwiT3B0aW9ucyIsInRvdGFsIiwibm9kZXMiLCJub2RlIiwidG90YWxOb2RlcyIsIm8iLCJpIiwiaW5kZXgiLCJnZXRJbmRleCIsImFkZCIsIm9iamVjdHMiLCJwdXNoIiwibGVuZ3RoIiwibWF4T2JqZWN0cyIsIm1heExldmVscyIsInNwbGl0Iiwic3BsaWNlIiwiZGVsIiwicXVhZCIsInJldHVybk9iamVjdHMiLCJjb25jYXQiLCJnZXQiLCJwb2ludHMiLCJzZWFyY2giLCJwb2ludCIsInNhbWVDb29yZHMiLCJ4IiwieSIsImlzUG9pbnQiLCJjbGVhbnVwIiwib2JqIiwiaW50ZXJzZWN0aW9ucyIsInJlc3VsdHMiLCJpbnRlcnNlY3Rpb24iLCJpbnRlcnNlY3RzIiwiY2xlYXIiLCJmaWx0ZXIiLCJ2TWlkIiwid2lkdGgiLCJoTWlkIiwiaGVpZ2h0IiwidG9wUSIsImJvdFEiLCJuZXh0TGV2ZWwiLCJzdWJXIiwiTWF0aCIsInJvdW5kIiwic3ViSCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdxQkEsUzs7O0FBRW5COzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7OztBQUtBLHFCQUFZQyxNQUFaLEVBQTRCQyxPQUE1QixFQUFnRTtBQUFBLFFBQW5CQyxLQUFtQix1RUFBSCxDQUFHOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHFDQXJCdkMsRUFxQnVDOztBQUFBLG1DQWR0QyxFQWNzQzs7QUFBQSxtQ0FQaEQsQ0FPZ0Q7O0FBRTlELFNBQUtGLE1BQUwsR0FBYyxJQUFJRyxrQkFBSixDQUFXSCxNQUFYLENBQWQ7QUFFQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUcsbUJBQUosQ0FBWUgsT0FB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T0FBWCxDQURjLEVBRWQsS0FBS2xELE9BRlMsRUFHZDhDLFNBSGMsQ0FBaEI7QUFNQSxXQUFLekMsS0FBTCxDQUFXLENBQVgsSUFBZ0IsSUFBSVAsU0FBSixDQUNkLElBQUlJLGtCQUFKLENBQVc7QUFBRTJCLFFBQUFBLENBQUMsRUFBRUEsQ0FBTDtBQUFRQyxRQUFBQSxDQUFDLEVBQUVBLENBQUMsR0FBR29CLElBQWY7QUFBcUJULFFBQUFBLEtBQUssRUFBRU0sSUFBNUI7QUFBa0NKLFFBQUFBLE1BQU0sRUFBRU87QUFBMUMsT0FBWCxDQURjLEVBRWQsS0FBS2xELE9BRlMsRUFHZDhDLFNBSGMsQ0FBaEI7QUFNQSxXQUFLekMsS0FBTCxDQUFXLENBQVgsSUFBZ0IsSUFBSVAsU0FBSixDQUNkLElBQUlJLGtCQUFKLENBQVc7QUFBRTJCLFFBQUFBLENBQUMsRUFBRUEsQ0FBQyxHQUFHa0IsSUFBVDtBQUFlakIsUUFBQUEsQ0FBQyxFQUFFQSxDQUFDLEdBQUdvQixJQUF0QjtBQUE0QlQsUUFBQUEsS0FBSyxFQUFFTSxJQUFuQztBQUF5Q0osUUFBQUEsTUFBTSxFQUFFTztBQUFqRCxPQUFYLENBRGMsRUFFZCxLQUFLbEQsT0FGUyxFQUdkOEMsU0FIYyxDQUFoQjtBQU1EIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgQm91bmRzIGZyb20gJy4vQm91bmRzJztcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9PcHRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBBIG1vZGVybiBxdWFkdHJlZSBpbXBsZW1lbnRhdGlvbiBmb3IgbW9kZXJuIEphdmFTY3JpcHQgZ2FtZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBlcnF1YWQge1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9ucyBmb3IgdGhpcyBRdWFkLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cclxuICAgKi9cclxuICBvcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGVwdGggbGV2ZWwgb2YgdGhpcyBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGxldmVsOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBib3VuZHMgb2YgdGhpcyBxdWFkICh4LCB5LCB3aWR0aCwgaGVpZ2h0KS5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0JvdW5kc31cclxuICAgKi9cclxuICBib3VuZHM6IEJvdW5kcztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG9iamVjdHMgc3RvcmVkIGluIHRoaXMgcXVhZC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PEJvdW5kcz59XHJcbiAgICovXHJcbiAgb2JqZWN0czogQXJyYXk8Qm91bmRzPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3VicXVhZHMgb2YgdGhpcyBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8U3VwZXJxdWFkPn1cclxuICAgKi9cclxuICBub2RlczogQXJyYXk8U3VwZXJxdWFkPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdG90YWwgbnVtYmVyIG9mIG9iamVjdHMgc3RvcmVkIGluIHRoaXMgcXVhZC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICB0b3RhbDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGJvdW5kcyBUaGUgYm91bmRzIG9mIHRoaXMgcXVhZCAoeCwgeSwgd2lkdGgsIGhlaWdodCkuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgcXVhZC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xldmVsPTBdIFRoZSBkZXB0aCBsZXZlbCBvZiB0aGlzIHF1YWQuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoYm91bmRzOiBPYmplY3QsIG9wdGlvbnM6IE9iamVjdCwgbGV2ZWw6IG51bWJlciA9IDApIHtcclxuXHJcbiAgICB0aGlzLmJvdW5kcyA9IG5ldyBCb3VuZHMoYm91bmRzKTtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLmxldmVsID0gbGV2ZWw7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgdG90YWwgbnVtYmVyIG9mIHN1YnF1YWRzIHdpdGhpbiB0aGUgbWFpbiBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgdG90YWxOb2RlcygpOiBudW1iZXIge1xyXG5cclxuICAgIGxldCB0b3RhbDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5ub2Rlcykge1xyXG5cclxuICAgICAgdG90YWwrKztcclxuXHJcbiAgICAgIHRvdGFsICs9IG5vZGUudG90YWxOb2RlcygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdG90YWw7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5zZXJ0cyBhbiBvYmplY3QgaW50byB0aGUgcXVhZCBhbmQgc3BsaXRzIHRoZSBxdWFkIGlmIG5lY2Vzc2FyeS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gbyBUaGUgYm91bmRzIG9mIHRoZSBvYmplY3QgdG8gaW5zZXJ0IGludG8gdGhlIHF1YWQuXHJcbiAgICovXHJcbiAgYWRkKG86IE9iamVjdCkge1xyXG5cclxuICAgIGNvbnN0IGJvdW5kczogQm91bmRzID0gbmV3IEJvdW5kcyhvKTtcclxuXHJcbiAgICB0aGlzLnRvdGFsKys7XHJcblxyXG4gICAgbGV0IGk6IG51bWJlciA9IDA7XHJcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgaWYgKHRoaXMubm9kZXNbMF0pIHtcclxuXHJcbiAgICAgIGluZGV4ID0gdGhpcy5nZXRJbmRleChib3VuZHMpO1xyXG5cclxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG5cclxuICAgICAgICB0aGlzLm5vZGVzW2luZGV4XS5hZGQoYm91bmRzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9iamVjdHMucHVzaChib3VuZHMpO1xyXG5cclxuICAgIGlmICh0aGlzLm9iamVjdHMubGVuZ3RoID4gdGhpcy5vcHRpb25zLm1heE9iamVjdHMgJiYgdGhpcy5sZXZlbCA8IHRoaXMub3B0aW9ucy5tYXhMZXZlbHMpIHtcclxuXHJcbiAgICAgIGlmICghdGhpcy5ub2Rlc1swXSkgdGhpcy5zcGxpdCgpO1xyXG5cclxuICAgICAgd2hpbGUgKGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgIGluZGV4ID0gdGhpcy5nZXRJbmRleCh0aGlzLm9iamVjdHNbaV0pO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB0aGlzLm5vZGVzW2luZGV4XS5hZGQodGhpcy5vYmplY3RzLnNwbGljZShpLCAxKVswXSk7XHJcbiAgICAgICAgZWxzZSBpID0gaSArIDE7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHJpZXZlcyBvYmplY3RzIGFyb3VuZCB0aGUgc3BlY2lmaWVkIGJvdW5kcy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gbyBUaGUgYm91bmRzIG9mIHRoZSBvYmplY3QgdG8gY2hlY2sgZm9yIHBvc3NpYmxlIGNvbGxpc2lvbnMuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbZGVsPWZhbHNlXSBTZXQgdG8gdHJ1ZSB0byBkZWxldGUgdGhlIG9iamVjdHMgdGhhdCB3ZXJlIGZvdW5kLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxCb3VuZHM+fSBcclxuICAgKi9cclxuICBnZXQobzogT2JqZWN0LCBkZWw6IGJvb2xlYW4gPSBmYWxzZSk6IChBcnJheTxCb3VuZHM+IHwgYW55KSB7XHJcblxyXG4gICAgbGV0IHF1YWQ6IFN1cGVycXVhZCA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgYm91bmRzOiBCb3VuZHMgPSBuZXcgQm91bmRzKG8pO1xyXG5cclxuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLmdldEluZGV4KGJvdW5kcyk7XHJcblxyXG4gICAgbGV0IHJldHVybk9iamVjdHM6IEFycmF5PEJvdW5kcz4gPSB0aGlzLm9iamVjdHM7XHJcblxyXG4gICAgaWYgKHRoaXMubm9kZXNbMF0pIHtcclxuXHJcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuT2JqZWN0cyA9IHJldHVybk9iamVjdHMuY29uY2F0KHRoaXMubm9kZXNbaW5kZXhdLmdldChvLCBkZWwpKTtcclxuXHJcbiAgICAgICAgcXVhZCA9IHRoaXMubm9kZXNbaW5kZXhdO1xyXG5cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLm5vZGVzKSB7XHJcblxyXG4gICAgICAgIHJldHVybk9iamVjdHMgPSByZXR1cm5PYmplY3RzLmNvbmNhdChub2RlLmdldChvLCBkZWwpKTtcclxuXHJcbiAgICAgICAgcXVhZCA9IG5vZGU7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZWwpIHJldHVybiB7IHF1YWQ6IHF1YWQsIG9iamVjdHM6IHJldHVybk9iamVjdHMgfTtcclxuXHJcbiAgICByZXR1cm4gcmV0dXJuT2JqZWN0cztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXRyaWV2ZXMgYWxsIHBvaW50cyBpbiB0aGlzIHF1YWQgdGhhdCBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvIFRoZSBvYmplY3QgdG8gY2hlY2sgZm9yIGNvbGxpZGluZyBwb2ludHMuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbZGVsPWZhbHNlXSBTZXQgdG8gdHJ1ZSB0byBkZWxldGUgdGhlIHBvaW50cyB0aGF0IHdlcmUgZm91bmQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0FycmF5PEJvdW5kcz59XHJcbiAgICovXHJcbiAgZ2V0UG9pbnRzKG86IE9iamVjdCwgZGVsOiBib29sZWFuID0gZmFsc2UpOiBBcnJheTxCb3VuZHM+IHtcclxuXHJcbiAgICBjb25zdCBib3VuZHM6IEJvdW5kcyA9IG5ldyBCb3VuZHMobyk7XHJcblxyXG4gICAgbGV0IHBvaW50czogQXJyYXk8Qm91bmRzPiA9IFtdO1xyXG5cclxuICAgIGxldCBzZWFyY2g6IChBcnJheTxCb3VuZHM+IHwgYW55KSA9IHRoaXMuZ2V0KGJvdW5kcywgZGVsKTtcclxuXHJcbiAgICBpZiAoZGVsKSBzZWFyY2ggPSBzZWFyY2gub2JqZWN0cztcclxuXHJcbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIHNlYXJjaCkge1xyXG5cclxuICAgICAgY29uc3Qgc2FtZUNvb3JkczogYm9vbGVhbiA9IHBvaW50LnggPT09IGJvdW5kcy54ICYmIHBvaW50LnkgPT09IGJvdW5kcy55O1xyXG5cclxuICAgICAgaWYgKHNhbWVDb29yZHMgJiYgcG9pbnQuaXNQb2ludCgpKSBwb2ludHMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICBpZiAoZGVsKSB0aGlzLmNsZWFudXAoc2VhcmNoLnF1YWQsIHBvaW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBvaW50cztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXRyaWVzIGFsbCBib3VuZHMgaW4gdGhpcyBxdWFkIHRoYXQgaW50ZXJzZWN0IHdpdGggdGhlIHByb3ZpZGVkIGJvdW5kcy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBib3VuZHMgdG8gY2hlY2sgY29sbGlzaW9ucyBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlbD1mYWxzZV0gU2V0IHRvIHRydWUgdG8gZGVsZXRlIHRoZSBpbnRlcnNlY3Rpb25zIHRoYXQgd2VyZSBmb3VuZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8Qm91bmRzPn1cclxuICAgKi9cclxuICBnZXRJbnRlcnNlY3Rpb25zKG9iajogQm91bmRzLCBkZWw6IGJvb2xlYW4gPSBmYWxzZSk6IEFycmF5PEJvdW5kcz4ge1xyXG5cclxuICAgIGNvbnN0IGJvdW5kczogQm91bmRzID0gbmV3IEJvdW5kcyhvYmopO1xyXG5cclxuICAgIGNvbnN0IGludGVyc2VjdGlvbnM6IEFycmF5PEJvdW5kcz4gPSBbXTtcclxuXHJcbiAgICBjb25zdCByZXN1bHRzOiAoQXJyYXk8Qm91bmRzPiB8IGFueSkgPSB0aGlzLmdldChib3VuZHMsIGRlbCk7XHJcblxyXG4gICAgY29uc3Qgb2JqZWN0cyA9IGRlbCA/IHJlc3VsdHMub2JqZWN0cyA6IHJlc3VsdHM7XHJcblxyXG4gICAgZm9yIChjb25zdCBpbnRlcnNlY3Rpb24gb2Ygb2JqZWN0cykge1xyXG5cclxuICAgICAgaWYgKGludGVyc2VjdGlvbi5pbnRlcnNlY3RzKGJvdW5kcykpIHtcclxuXHJcbiAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKGludGVyc2VjdGlvbik7XHJcblxyXG4gICAgICAgIGlmIChkZWwpIHRoaXMuY2xlYW51cChyZXN1bHRzLnF1YWQsIGludGVyc2VjdGlvbik7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbnRlcnNlY3Rpb25zO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFycyBhbGwgb2JqZWN0cyBhbmQgbm9kZXMgZnJvbSB0aGUgcXVhZC5cclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuXHJcbiAgICB0aGlzLm9iamVjdHMgPSBbXTtcclxuXHJcbiAgICB0aGlzLnRvdGFsID0gMDtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5ub2Rlcykgbm9kZS5jbGVhcigpO1xyXG5cclxuICAgIHRoaXMubm9kZXMgPSBbXTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgdG8gc2VlIGlmIGFuIG9iamVjdCBuZWVkcyB0byBiZSBkZWxldGVkIGZyb20gdGhlIHF1YWQgYW5kIGlmIHNvIGl0IGRlbGV0ZXNcclxuICAgKiBpdC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7U3VwZXJxdWFkfSBxdWFkIFRoZSBxdWFkIHRoYXQgdGhlIG9iamVjdCBiZWxvbmdzIHRvLlxyXG4gICAqIEBwYXJhbSB7Qm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0aGF0IGRlZmluZSB0aGUgb2JqZWN0cy5cclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFudXAocXVhZDogU3VwZXJxdWFkLCBib3VuZHM6IEJvdW5kcykge1xyXG5cclxuICAgIHF1YWQub2JqZWN0cyA9IHF1YWQub2JqZWN0cy5maWx0ZXIoKG8pID0+IG8gIT0gYm91bmRzKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBwYXJ0IG9mIHRoZSBxdWFkIHdoZXJlIHRoZSBvYmplY3Qgc2hvdWxkIGJlIHBsYWNlZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7Qm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0byBjaGVjayB0aGUgcGxhY2VtZW50IG9mLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgLTEgdGhyb3VnaCAzIGRlcGVuZGluZyBvbiB3aGVyZSB0aGUgb2JqZWN0IHNob3VsZCBiZSBwbGFjZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRJbmRleChib3VuZHM6IGFueSk6IG51bWJlciB7XHJcblxyXG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICBjb25zdCB2TWlkOiBudW1iZXIgPSB0aGlzLmJvdW5kcy54ICsgKHRoaXMuYm91bmRzLndpZHRoIC8gMik7XHJcbiAgICBjb25zdCBoTWlkOiBudW1iZXIgPSB0aGlzLmJvdW5kcy55ICsgKHRoaXMuYm91bmRzLmhlaWdodCAvIDIpO1xyXG5cclxuICAgIGNvbnN0IHRvcFE6IGJvb2xlYW4gPSAoYm91bmRzLnkgPCBoTWlkICYmIGJvdW5kcy55ICsgYm91bmRzLmhlaWdodCA8IGhNaWQpO1xyXG4gICAgY29uc3QgYm90UTogYm9vbGVhbiA9IChib3VuZHMueSA+IGhNaWQpO1xyXG5cclxuICAgIGlmIChib3VuZHMueCA8IHZNaWQgJiYgYm91bmRzLnggKyBib3VuZHMud2lkdGggPCB2TWlkKSB7XHJcblxyXG4gICAgICBpZiAodG9wUSkgaW5kZXggPSAxO1xyXG5cclxuICAgICAgZWxzZSBpZiAoYm90USkgaW5kZXggPSAyO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoYm91bmRzLnggPiB2TWlkKSB7XHJcblxyXG4gICAgICBpZiAodG9wUSkgaW5kZXggPSAwO1xyXG5cclxuICAgICAgZWxzZSBpZiAoYm90USkgaW5kZXggPSAzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5kZXg7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3BsaXRzIGEgcXVhZCBpbnRvIDQgc3VicXVhZHMuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNwbGl0KCkge1xyXG5cclxuICAgIGNvbnN0IG5leHRMZXZlbDogbnVtYmVyID0gdGhpcy5sZXZlbCArIDE7XHJcblxyXG4gICAgY29uc3Qgc3ViVzogbnVtYmVyID0gTWF0aC5yb3VuZCh0aGlzLmJvdW5kcy53aWR0aCAvIDIpO1xyXG4gICAgY29uc3Qgc3ViSDogbnVtYmVyID0gTWF0aC5yb3VuZCh0aGlzLmJvdW5kcy5oZWlnaHQgLyAyKTtcclxuXHJcbiAgICBjb25zdCB4OiBudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMuYm91bmRzLngpO1xyXG4gICAgY29uc3QgeTogbnVtYmVyID0gTWF0aC5yb3VuZCh0aGlzLmJvdW5kcy55KTtcclxuXHJcbiAgICB0aGlzLm5vZGVzWzBdID0gbmV3IFN1cGVycXVhZChcclxuICAgICAgbmV3IEJvdW5kcyh7IHg6IHggKyBzdWJXLCB5OiB5LCB3aWR0aDogc3ViVywgaGVpZ2h0OiBzdWJIIH0pLFxyXG4gICAgICB0aGlzLm9wdGlvbnMsXHJcbiAgICAgIG5leHRMZXZlbFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLm5vZGVzWzFdID0gbmV3IFN1cGVycXVhZChcclxuICAgICAgbmV3IEJvdW5kcyh7IHg6IHgsIHk6IHksIHdpZHRoOiBzdWJXLCBoZWlnaHQ6IHN1YkggfSksXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgbmV4dExldmVsXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMubm9kZXNbMl0gPSBuZXcgU3VwZXJxdWFkKFxyXG4gICAgICBuZXcgQm91bmRzKHsgeDogeCwgeTogeSArIHN1YkgsIHdpZHRoOiBzdWJXLCBoZWlnaHQ6IHN1YkggfSksXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgbmV4dExldmVsXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMubm9kZXNbM10gPSBuZXcgU3VwZXJxdWFkKFxyXG4gICAgICBuZXcgQm91bmRzKHsgeDogeCArIHN1YlcsIHk6IHkgKyBzdWJILCB3aWR0aDogc3ViVywgaGVpZ2h0OiBzdWJIIH0pLFxyXG4gICAgICB0aGlzLm9wdGlvbnMsXHJcbiAgICAgIG5leHRMZXZlbFxyXG4gICAgKTtcclxuXHJcbiAgfVxyXG5cclxufSJdfQ==