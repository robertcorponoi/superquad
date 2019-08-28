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
 * 
 * @version 0.1.0
 */
var Superquad =
/*#__PURE__*/
function () {
  /**
   * A reference to the options for this Quad.
   * 
   * @since 0.1.0
   * 
   * @property {Options}
   */

  /**
   * The depth level of this quad.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */

  /**
   * The bounds of this quad (x, y, width, height).
   * 
   * @since 0.1.0
   * 
   * @property {Bounds}
   */

  /**
   * The objects stored in this quad.
   * 
   * @since 0.1.0
   * 
   * @property {Array<Bounds>}
   */

  /**
   * The subquads of this quad.
   * 
   * @since 0.1.0
   * 
   * @property {Array<Superquad>}
   */

  /**
   * The total number of objects stored in this quad.
   * 
   * @since 0.1.0
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
   * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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
     * 
     * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TdXBlcnF1YWQudHMiXSwibmFtZXMiOlsiU3VwZXJxdWFkIiwiYm91bmRzIiwib3B0aW9ucyIsImxldmVsIiwiQm91bmRzIiwiT3B0aW9ucyIsInRvdGFsIiwibm9kZXMiLCJub2RlIiwidG90YWxOb2RlcyIsIm8iLCJpIiwiaW5kZXgiLCJnZXRJbmRleCIsImFkZCIsIm9iamVjdHMiLCJwdXNoIiwibGVuZ3RoIiwibWF4T2JqZWN0cyIsIm1heExldmVscyIsInNwbGl0Iiwic3BsaWNlIiwiZGVsIiwicXVhZCIsInJldHVybk9iamVjdHMiLCJjb25jYXQiLCJnZXQiLCJwb2ludHMiLCJzZWFyY2giLCJwb2ludCIsInNhbWVDb29yZHMiLCJ4IiwieSIsImlzUG9pbnQiLCJjbGVhbnVwIiwib2JqIiwiaW50ZXJzZWN0aW9ucyIsInJlc3VsdHMiLCJpbnRlcnNlY3Rpb24iLCJpbnRlcnNlY3RzIiwiY2xlYXIiLCJmaWx0ZXIiLCJ2TWlkIiwid2lkdGgiLCJoTWlkIiwiaGVpZ2h0IiwidG9wUSIsImJvdFEiLCJuZXh0TGV2ZWwiLCJzdWJXIiwiTWF0aCIsInJvdW5kIiwic3ViSCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7O0lBS3FCQSxTOzs7QUFFbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7O0FBS0EscUJBQVlDLE1BQVosRUFBNEJDLE9BQTVCLEVBQWdFO0FBQUEsUUFBbkJDLEtBQW1CLHVFQUFILENBQUc7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEscUNBekJ2QyxFQXlCdUM7O0FBQUEsbUNBaEJ0QyxFQWdCc0M7O0FBQUEsbUNBUGhELENBT2dEOztBQUU5RCxTQUFLRixNQUFMLEdBQWMsSUFBSUcsa0JBQUosQ0FBV0gsTUFBWCxDQUFkO0FBRUEsU0FBS0MsT0FBTCxHQUFlLElBQUlH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O0FBQTJCSixRQUFBQSxNQUFNLEVBQUVPO0FBQW5DLE9BQVgsQ0FEYyxFQUVkLEtBQUtsRCxPQUZTLEVBR2Q4QyxTQUhjLENBQWhCO0FBTUEsV0FBS3pDLEtBQUwsQ0FBVyxDQUFYLElBQWdCLElBQUlQLFNBQUosQ0FDZCxJQUFJSSxrQkFBSixDQUFXO0FBQUUyQixRQUFBQSxDQUFDLEVBQUVBLENBQUw7QUFBUUMsUUFBQUEsQ0FBQyxFQUFFQSxDQUFDLEdBQUdvQixJQUFmO0FBQXFCVCxRQUFBQSxLQUFLLEVBQUVNLElBQTVCO0FBQWtDSixRQUFBQSxNQUFNLEVBQUVPO0FBQTFDLE9BQVgsQ0FEYyxFQUVkLEtBQUtsRCxPQUZTLEVBR2Q4QyxTQUhjLENBQWhCO0FBTUEsV0FBS3pDLEtBQUwsQ0FBVyxDQUFYLElBQWdCLElBQUlQLFNBQUosQ0FDZCxJQUFJSSxrQkFBSixDQUFXO0FBQUUyQixRQUFBQSxDQUFDLEVBQUVBLENBQUMsR0FBR2tCLElBQVQ7QUFBZWpCLFFBQUFBLENBQUMsRUFBRUEsQ0FBQyxHQUFHb0IsSUFBdEI7QUFBNEJULFFBQUFBLEtBQUssRUFBRU0sSUFBbkM7QUFBeUNKLFFBQUFBLE1BQU0sRUFBRU87QUFBakQsT0FBWCxDQURjLEVBRWQsS0FBS2xELE9BRlMsRUFHZDhDLFNBSGMsQ0FBaEI7QUFNRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEJvdW5kcyBmcm9tICcuL0JvdW5kcyc7XHJcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vT3B0aW9ucyc7XHJcblxyXG4vKipcclxuICogQSBtb2Rlcm4gcXVhZHRyZWUgaW1wbGVtZW50YXRpb24gZm9yIG1vZGVybiBKYXZhU2NyaXB0IGdhbWVzLlxyXG4gKiBcclxuICogQHZlcnNpb24gMC4xLjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cGVycXVhZCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBvcHRpb25zIGZvciB0aGlzIFF1YWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtPcHRpb25zfVxyXG4gICAqL1xyXG4gIG9wdGlvbnM6IE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkZXB0aCBsZXZlbCBvZiB0aGlzIHF1YWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgbGV2ZWw6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGJvdW5kcyBvZiB0aGlzIHF1YWQgKHgsIHksIHdpZHRoLCBoZWlnaHQpLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Qm91bmRzfVxyXG4gICAqL1xyXG4gIGJvdW5kczogQm91bmRzO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgb2JqZWN0cyBzdG9yZWQgaW4gdGhpcyBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8Qm91bmRzPn1cclxuICAgKi9cclxuICBvYmplY3RzOiBBcnJheTxCb3VuZHM+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdWJxdWFkcyBvZiB0aGlzIHF1YWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxTdXBlcnF1YWQ+fVxyXG4gICAqL1xyXG4gIG5vZGVzOiBBcnJheTxTdXBlcnF1YWQ+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0b3RhbCBudW1iZXIgb2Ygb2JqZWN0cyBzdG9yZWQgaW4gdGhpcyBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHRvdGFsOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gYm91bmRzIFRoZSBib3VuZHMgb2YgdGhpcyBxdWFkICh4LCB5LCB3aWR0aCwgaGVpZ2h0KS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9ucyBmb3IgdGhpcyBxdWFkLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGV2ZWw9MF0gVGhlIGRlcHRoIGxldmVsIG9mIHRoaXMgcXVhZC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihib3VuZHM6IE9iamVjdCwgb3B0aW9uczogT2JqZWN0LCBsZXZlbDogbnVtYmVyID0gMCkge1xyXG5cclxuICAgIHRoaXMuYm91bmRzID0gbmV3IEJvdW5kcyhib3VuZHMpO1xyXG5cclxuICAgIHRoaXMub3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSB0b3RhbCBudW1iZXIgb2Ygc3VicXVhZHMgd2l0aGluIHRoZSBtYWluIHF1YWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICB0b3RhbE5vZGVzKCk6IG51bWJlciB7XHJcblxyXG4gICAgbGV0IHRvdGFsOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLm5vZGVzKSB7XHJcblxyXG4gICAgICB0b3RhbCsrO1xyXG5cclxuICAgICAgdG90YWwgKz0gbm9kZS50b3RhbE5vZGVzKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0b3RhbDtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnNlcnRzIGFuIG9iamVjdCBpbnRvIHRoZSBxdWFkIGFuZCBzcGxpdHMgdGhlIHF1YWQgaWYgbmVjZXNzYXJ5LlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvIFRoZSBib3VuZHMgb2YgdGhlIG9iamVjdCB0byBpbnNlcnQgaW50byB0aGUgcXVhZC5cclxuICAgKi9cclxuICBhZGQobzogT2JqZWN0KSB7XHJcblxyXG4gICAgY29uc3QgYm91bmRzOiBCb3VuZHMgPSBuZXcgQm91bmRzKG8pO1xyXG5cclxuICAgIHRoaXMudG90YWwrKztcclxuXHJcbiAgICBsZXQgaTogbnVtYmVyID0gMDtcclxuICAgIGxldCBpbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5ub2Rlc1swXSkge1xyXG5cclxuICAgICAgaW5kZXggPSB0aGlzLmdldEluZGV4KGJvdW5kcyk7XHJcblxyXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZXNbaW5kZXhdLmFkZChib3VuZHMpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2JqZWN0cy5wdXNoKGJvdW5kcyk7XHJcblxyXG4gICAgaWYgKHRoaXMub2JqZWN0cy5sZW5ndGggPiB0aGlzLm9wdGlvbnMubWF4T2JqZWN0cyAmJiB0aGlzLmxldmVsIDwgdGhpcy5vcHRpb25zLm1heExldmVscykge1xyXG5cclxuICAgICAgaWYgKCF0aGlzLm5vZGVzWzBdKSB0aGlzLnNwbGl0KCk7XHJcblxyXG4gICAgICB3aGlsZSAoaSA8IHRoaXMub2JqZWN0cy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgaW5kZXggPSB0aGlzLmdldEluZGV4KHRoaXMub2JqZWN0c1tpXSk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHRoaXMubm9kZXNbaW5kZXhdLmFkZCh0aGlzLm9iamVjdHMuc3BsaWNlKGksIDEpWzBdKTtcclxuICAgICAgICBlbHNlIGkgPSBpICsgMTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIG9iamVjdHMgYXJvdW5kIHRoZSBzcGVjaWZpZWQgYm91bmRzLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvIFRoZSBib3VuZHMgb2YgdGhlIG9iamVjdCB0byBjaGVjayBmb3IgcG9zc2libGUgY29sbGlzaW9ucy5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWw9ZmFsc2VdIFNldCB0byB0cnVlIHRvIGRlbGV0ZSB0aGUgb2JqZWN0cyB0aGF0IHdlcmUgZm91bmQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0FycmF5PEJvdW5kcz59IFxyXG4gICAqL1xyXG4gIGdldChvOiBPYmplY3QsIGRlbDogYm9vbGVhbiA9IGZhbHNlKTogKEFycmF5PEJvdW5kcz4gfCBhbnkpIHtcclxuXHJcbiAgICBsZXQgcXVhZDogU3VwZXJxdWFkID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBib3VuZHM6IEJvdW5kcyA9IG5ldyBCb3VuZHMobyk7XHJcblxyXG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuZ2V0SW5kZXgoYm91bmRzKTtcclxuXHJcbiAgICBsZXQgcmV0dXJuT2JqZWN0czogQXJyYXk8Qm91bmRzPiA9IHRoaXMub2JqZWN0cztcclxuXHJcbiAgICBpZiAodGhpcy5ub2Rlc1swXSkge1xyXG5cclxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG5cclxuICAgICAgICByZXR1cm5PYmplY3RzID0gcmV0dXJuT2JqZWN0cy5jb25jYXQodGhpcy5ub2Rlc1tpbmRleF0uZ2V0KG8sIGRlbCkpO1xyXG5cclxuICAgICAgICBxdWFkID0gdGhpcy5ub2Rlc1tpbmRleF07XHJcblxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgZm9yIChjb25zdCBub2RlIG9mIHRoaXMubm9kZXMpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuT2JqZWN0cyA9IHJldHVybk9iamVjdHMuY29uY2F0KG5vZGUuZ2V0KG8sIGRlbCkpO1xyXG5cclxuICAgICAgICBxdWFkID0gbm9kZTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRlbCkgcmV0dXJuIHsgcXVhZDogcXVhZCwgb2JqZWN0czogcmV0dXJuT2JqZWN0cyB9O1xyXG5cclxuICAgIHJldHVybiByZXR1cm5PYmplY3RzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHJpZXZlcyBhbGwgcG9pbnRzIGluIHRoaXMgcXVhZCB0aGF0IGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG8gVGhlIG9iamVjdCB0byBjaGVjayBmb3IgY29sbGlkaW5nIHBvaW50cy5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWw9ZmFsc2VdIFNldCB0byB0cnVlIHRvIGRlbGV0ZSB0aGUgcG9pbnRzIHRoYXQgd2VyZSBmb3VuZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8Qm91bmRzPn1cclxuICAgKi9cclxuICBnZXRQb2ludHMobzogT2JqZWN0LCBkZWw6IGJvb2xlYW4gPSBmYWxzZSk6IEFycmF5PEJvdW5kcz4ge1xyXG5cclxuICAgIGNvbnN0IGJvdW5kczogQm91bmRzID0gbmV3IEJvdW5kcyhvKTtcclxuXHJcbiAgICBsZXQgcG9pbnRzOiBBcnJheTxCb3VuZHM+ID0gW107XHJcblxyXG4gICAgbGV0IHNlYXJjaDogKEFycmF5PEJvdW5kcz4gfCBhbnkpID0gdGhpcy5nZXQoYm91bmRzLCBkZWwpO1xyXG5cclxuICAgIGlmIChkZWwpIHNlYXJjaCA9IHNlYXJjaC5vYmplY3RzO1xyXG5cclxuICAgIGZvciAoY29uc3QgcG9pbnQgb2Ygc2VhcmNoKSB7XHJcblxyXG4gICAgICBjb25zdCBzYW1lQ29vcmRzOiBib29sZWFuID0gcG9pbnQueCA9PT0gYm91bmRzLnggJiYgcG9pbnQueSA9PT0gYm91bmRzLnk7XHJcblxyXG4gICAgICBpZiAoc2FtZUNvb3JkcyAmJiBwb2ludC5pc1BvaW50KCkpIHBvaW50cy5wdXNoKHBvaW50KTtcclxuXHJcbiAgICAgIGlmIChkZWwpIHRoaXMuY2xlYW51cChzZWFyY2gucXVhZCwgcG9pbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcG9pbnRzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHJpZXMgYWxsIGJvdW5kcyBpbiB0aGlzIHF1YWQgdGhhdCBpbnRlcnNlY3Qgd2l0aCB0aGUgcHJvdmlkZWQgYm91bmRzLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIGJvdW5kcyB0byBjaGVjayBjb2xsaXNpb25zIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbZGVsPWZhbHNlXSBTZXQgdG8gdHJ1ZSB0byBkZWxldGUgdGhlIGludGVyc2VjdGlvbnMgdGhhdCB3ZXJlIGZvdW5kLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxCb3VuZHM+fVxyXG4gICAqL1xyXG4gIGdldEludGVyc2VjdGlvbnMob2JqOiBCb3VuZHMsIGRlbDogYm9vbGVhbiA9IGZhbHNlKTogQXJyYXk8Qm91bmRzPiB7XHJcblxyXG4gICAgY29uc3QgYm91bmRzOiBCb3VuZHMgPSBuZXcgQm91bmRzKG9iaik7XHJcblxyXG4gICAgY29uc3QgaW50ZXJzZWN0aW9uczogQXJyYXk8Qm91bmRzPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdHM6IChBcnJheTxCb3VuZHM+IHwgYW55KSA9IHRoaXMuZ2V0KGJvdW5kcywgZGVsKTtcclxuXHJcbiAgICBjb25zdCBvYmplY3RzID0gZGVsID8gcmVzdWx0cy5vYmplY3RzIDogcmVzdWx0cztcclxuXHJcbiAgICBmb3IgKGNvbnN0IGludGVyc2VjdGlvbiBvZiBvYmplY3RzKSB7XHJcblxyXG4gICAgICBpZiAoaW50ZXJzZWN0aW9uLmludGVyc2VjdHMoYm91bmRzKSkge1xyXG5cclxuICAgICAgICBpbnRlcnNlY3Rpb25zLnB1c2goaW50ZXJzZWN0aW9uKTtcclxuXHJcbiAgICAgICAgaWYgKGRlbCkgdGhpcy5jbGVhbnVwKHJlc3VsdHMucXVhZCwgaW50ZXJzZWN0aW9uKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGludGVyc2VjdGlvbnM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXJzIGFsbCBvYmplY3RzIGFuZCBub2RlcyBmcm9tIHRoZSBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqL1xyXG4gIGNsZWFyKCkge1xyXG5cclxuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xyXG5cclxuICAgIHRoaXMudG90YWwgPSAwO1xyXG5cclxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLm5vZGVzKSBub2RlLmNsZWFyKCk7XHJcblxyXG4gICAgdGhpcy5ub2RlcyA9IFtdO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB0byBzZWUgaWYgYW4gb2JqZWN0IG5lZWRzIHRvIGJlIGRlbGV0ZWQgZnJvbSB0aGUgcXVhZCBhbmQgaWYgc28gaXQgZGVsZXRlc1xyXG4gICAqIGl0LlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtTdXBlcnF1YWR9IHF1YWQgVGhlIHF1YWQgdGhhdCB0aGUgb2JqZWN0IGJlbG9uZ3MgdG8uXHJcbiAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRoYXQgZGVmaW5lIHRoZSBvYmplY3RzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYW51cChxdWFkOiBTdXBlcnF1YWQsIGJvdW5kczogQm91bmRzKSB7XHJcblxyXG4gICAgcXVhZC5vYmplY3RzID0gcXVhZC5vYmplY3RzLmZpbHRlcigobykgPT4gbyAhPSBib3VuZHMpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHBhcnQgb2YgdGhlIHF1YWQgd2hlcmUgdGhlIG9iamVjdCBzaG91bGQgYmUgcGxhY2VkLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGNoZWNrIHRoZSBwbGFjZW1lbnQgb2YuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyAtMSB0aHJvdWdoIDMgZGVwZW5kaW5nIG9uIHdoZXJlIHRoZSBvYmplY3Qgc2hvdWxkIGJlIHBsYWNlZC5cclxuICAgKi9cclxuICBwcml2YXRlIGdldEluZGV4KGJvdW5kczogYW55KTogbnVtYmVyIHtcclxuXHJcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIGNvbnN0IHZNaWQ6IG51bWJlciA9IHRoaXMuYm91bmRzLnggKyAodGhpcy5ib3VuZHMud2lkdGggLyAyKTtcclxuICAgIGNvbnN0IGhNaWQ6IG51bWJlciA9IHRoaXMuYm91bmRzLnkgKyAodGhpcy5ib3VuZHMuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgY29uc3QgdG9wUTogYm9vbGVhbiA9IChib3VuZHMueSA8IGhNaWQgJiYgYm91bmRzLnkgKyBib3VuZHMuaGVpZ2h0IDwgaE1pZCk7XHJcbiAgICBjb25zdCBib3RROiBib29sZWFuID0gKGJvdW5kcy55ID4gaE1pZCk7XHJcblxyXG4gICAgaWYgKGJvdW5kcy54IDwgdk1pZCAmJiBib3VuZHMueCArIGJvdW5kcy53aWR0aCA8IHZNaWQpIHtcclxuXHJcbiAgICAgIGlmICh0b3BRKSBpbmRleCA9IDE7XHJcblxyXG4gICAgICBlbHNlIGlmIChib3RRKSBpbmRleCA9IDI7XHJcblxyXG4gICAgfSBlbHNlIGlmIChib3VuZHMueCA+IHZNaWQpIHtcclxuXHJcbiAgICAgIGlmICh0b3BRKSBpbmRleCA9IDA7XHJcblxyXG4gICAgICBlbHNlIGlmIChib3RRKSBpbmRleCA9IDM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbmRleDtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTcGxpdHMgYSBxdWFkIGludG8gNCBzdWJxdWFkcy5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3BsaXQoKSB7XHJcblxyXG4gICAgY29uc3QgbmV4dExldmVsOiBudW1iZXIgPSB0aGlzLmxldmVsICsgMTtcclxuXHJcbiAgICBjb25zdCBzdWJXOiBudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMuYm91bmRzLndpZHRoIC8gMik7XHJcbiAgICBjb25zdCBzdWJIOiBudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMuYm91bmRzLmhlaWdodCAvIDIpO1xyXG5cclxuICAgIGNvbnN0IHg6IG51bWJlciA9IE1hdGgucm91bmQodGhpcy5ib3VuZHMueCk7XHJcbiAgICBjb25zdCB5OiBudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMuYm91bmRzLnkpO1xyXG5cclxuICAgIHRoaXMubm9kZXNbMF0gPSBuZXcgU3VwZXJxdWFkKFxyXG4gICAgICBuZXcgQm91bmRzKHsgeDogeCArIHN1YlcsIHk6IHksIHdpZHRoOiBzdWJXLCBoZWlnaHQ6IHN1YkggfSksXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgbmV4dExldmVsXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMubm9kZXNbMV0gPSBuZXcgU3VwZXJxdWFkKFxyXG4gICAgICBuZXcgQm91bmRzKHsgeDogeCwgeTogeSwgd2lkdGg6IHN1YlcsIGhlaWdodDogc3ViSCB9KSxcclxuICAgICAgdGhpcy5vcHRpb25zLFxyXG4gICAgICBuZXh0TGV2ZWxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5ub2Rlc1syXSA9IG5ldyBTdXBlcnF1YWQoXHJcbiAgICAgIG5ldyBCb3VuZHMoeyB4OiB4LCB5OiB5ICsgc3ViSCwgd2lkdGg6IHN1YlcsIGhlaWdodDogc3ViSCB9KSxcclxuICAgICAgdGhpcy5vcHRpb25zLFxyXG4gICAgICBuZXh0TGV2ZWxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5ub2Rlc1szXSA9IG5ldyBTdXBlcnF1YWQoXHJcbiAgICAgIG5ldyBCb3VuZHMoeyB4OiB4ICsgc3ViVywgeTogeSArIHN1YkgsIHdpZHRoOiBzdWJXLCBoZWlnaHQ6IHN1YkggfSksXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgbmV4dExldmVsXHJcbiAgICApO1xyXG5cclxuICB9XHJcblxyXG59Il19