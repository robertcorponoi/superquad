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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJTdXBlcnF1YWQiLCJib3VuZHMiLCJvcHRpb25zIiwibGV2ZWwiLCJCb3VuZHMiLCJPcHRpb25zIiwidG90YWwiLCJub2RlcyIsIm5vZGUiLCJ0b3RhbE5vZGVzIiwibyIsImkiLCJpbmRleCIsImdldEluZGV4IiwiYWRkIiwib2JqZWN0cyIsInB1c2giLCJsZW5ndGgiLCJtYXhPYmplY3RzIiwibWF4TGV2ZWxzIiwic3BsaXQiLCJzcGxpY2UiLCJkZWwiLCJxdWFkIiwicmV0dXJuT2JqZWN0cyIsImNvbmNhdCIsImdldCIsInBvaW50cyIsInNlYXJjaCIsInBvaW50Iiwic2FtZUNvb3JkcyIsIngiLCJ5IiwiaXNQb2ludCIsImNsZWFudXAiLCJvYmoiLCJpbnRlcnNlY3Rpb25zIiwicmVzdWx0cyIsImludGVyc2VjdGlvbiIsImludGVyc2VjdHMiLCJjbGVhciIsImZpbHRlciIsInZNaWQiLCJ3aWR0aCIsImhNaWQiLCJoZWlnaHQiLCJ0b3BRIiwiYm90USIsIm5leHRMZXZlbCIsInN1YlciLCJNYXRoIiwicm91bmQiLCJzdWJIIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR3FCQSxTOzs7QUFDbkI7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7O0FBS0EscUJBQVlDLE1BQVosRUFBNEJDLE9BQTVCLEVBQWdFO0FBQUEsUUFBbkJDLEtBQW1CLHVFQUFILENBQUc7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEscUNBckJ2QyxFQXFCdUM7O0FBQUEsbUNBZHRDLEVBY3NDOztBQUFBLG1DQVBoRCxDQU9nRDs7QUFDOUQsU0FBS0YsTUFBTCxHQUFjLElBQUlHLGtCQUFKLENBQVdILE1BQVgsQ0FBZDtBQUVBLFNBQUtDLE9BQUwsR0FBZSxJQUFJRyxtQkFBSixDQUFZSCxPQUFaLENBQWY7QUFFQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDRDtBQUVEOzs7Ozs7Ozs7aUNBS3FCO0FBQ25CLFVBQUlHLEtBQWEsR0FBRyxDQUFwQjtBQURtQjtBQUFBO0FBQUE7O0FBQUE7QUFHbkIsNkJBQW1CLEtBQUtDLEtBQXhCLDhIQUErQjtBQUFBLGNBQXBCQyxJQUFvQjtBQUM3QkYsVUFBQUEsS0FBSztBQUVMQSxVQUFBQSxLQUFLLElBQUlFLElBQUksQ0FBQ0MsVUFBTCxFQUFUO0FBQ0Q7QUFQa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTbkIsYUFBT0gsS0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7O3dCQUtJSSxDLEVBQVc7QUFDYixVQUFNVCxNQUFjLEdBQUcsSUFBSUcsa0JBQUosQ0FBV00sQ0FBWCxDQUF2QjtBQUVBLFdBQUtKLEtBQUw7QUFFQSxVQUFJSyxDQUFTLEdBQUcsQ0FBaEI7QUFDQSxVQUFJQyxLQUFhLEdBQUcsQ0FBcEI7O0FBRUEsVUFBSSxLQUFLTCxLQUFMLENBQVcsQ0FBWCxDQUFKLEVBQW1CO0FBQ2pCSyxRQUFBQSxLQUFLLEdBQUcsS0FBS0MsUUFBTCxDQUFjWixNQUFkLENBQVI7O0FBRUEsWUFBSVcsS0FBSyxLQUFLLENBQUMsQ0FBZixFQUFrQjtBQUNoQixlQUFLTCxLQUFMLENBQVdLLEtBQVgsRUFBa0JFLEdBQWxCLENBQXNCYixNQUF0QjtBQUVBO0FBQ0Q7QUFDRjs7QUFFRCxXQUFLYyxPQUFMLENBQWFDLElBQWIsQ0FBa0JmLE1BQWxCOztBQUVBLFVBQUksS0FBS2MsT0FBTCxDQUFhRSxNQUFiLEdBQXNCLEtBQUtmLE9BQUwsQ0FBYWdCLFVBQW5DLElBQWlELEtBQUtmLEtBQUwsR0FBYSxLQUFLRCxPQUFMLENBQWFpQixTQUEvRSxFQUEwRjtBQUN4RixZQUFJLENBQUMsS0FBS1osS0FBTCxDQUFXLENBQVgsQ0FBTCxFQUFvQixLQUFLYSxLQUFMOztBQUNwQixlQUFPVCxDQUFDLEdBQUcsS0FBS0ksT0FBTCxDQUFhRSxNQUF4QixFQUFnQztBQUM5QkwsVUFBQUEsS0FBSyxHQUFHLEtBQUtDLFFBQUwsQ0FBYyxLQUFLRSxPQUFMLENBQWFKLENBQWIsQ0FBZCxDQUFSO0FBRUEsY0FBSUMsS0FBSyxLQUFLLENBQUMsQ0FBZixFQUFrQixLQUFLTCxLQUFMLENBQVdLLEtBQVgsRUFBa0JFLEdBQWxCLENBQXNCLEtBQUtDLE9BQUwsQ0FBYU0sTUFBYixDQUFvQlYsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsQ0FBdEIsRUFBbEIsS0FDS0EsQ0FBQyxHQUFHQSxDQUFDLEdBQUcsQ0FBUjtBQUNOO0FBQ0Y7QUFDRjtBQUVEOzs7Ozs7Ozs7Ozt3QkFRSUQsQyxFQUF3RDtBQUFBLFVBQTdDWSxHQUE2Qyx1RUFBOUIsS0FBOEI7QUFDMUQsVUFBSUMsSUFBZSxHQUFHLElBQXRCO0FBRUEsVUFBTXRCLE1BQWMsR0FBRyxJQUFJRyxrQkFBSixDQUFXTSxDQUFYLENBQXZCO0FBRUEsVUFBTUUsS0FBYSxHQUFHLEtBQUtDLFFBQUwsQ0FBY1osTUFBZCxDQUF0QjtBQUVBLFVBQUl1QixhQUE0QixHQUFHLEtBQUtULE9BQXhDOztBQUVBLFVBQUksS0FBS1IsS0FBTCxDQUFXLENBQVgsQ0FBSixFQUFtQjtBQUNqQixZQUFJSyxLQUFLLEtBQUssQ0FBQyxDQUFmLEVBQWtCO0FBQ2hCWSxVQUFBQSxhQUFhLEdBQUdBLGFBQWEsQ0FBQ0MsTUFBZCxDQUFxQixLQUFLbEIsS0FBTCxDQUFXSyxLQUFYLEVBQWtCYyxHQUFsQixDQUFzQmhCLENBQXRCLEVBQXlCWSxHQUF6QixDQUFyQixDQUFoQjtBQUVBQyxVQUFBQSxJQUFJLEdBQUcsS0FBS2hCLEtBQUwsQ0FBV0ssS0FBWCxDQUFQO0FBQ0QsU0FKRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUtLLGtDQUFtQixLQUFLTCxLQUF4QixtSUFBK0I7QUFBQSxrQkFBcEJDLElBQW9CO0FBQ2xDZ0IsY0FBQUEsYUFBYSxHQUFHQSxhQUFhLENBQUNDLE1BQWQsQ0FBcUJqQixJQUFJLENBQUNrQixHQUFMLENBQVNoQixDQUFULEVBQVlZLEdBQVosQ0FBckIsQ0FBaEI7QUFFQUMsY0FBQUEsSUFBSSxHQUFHZixJQUFQO0FBQ0Q7QUFURDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVRDs7QUFFRCxVQUFJYyxHQUFKLEVBQVMsT0FBTztBQUFFQyxRQUFBQSxJQUFJLEVBQUVBLElBQVI7QUFBY1IsUUFBQUEsT0FBTyxFQUFFUztBQUF2QixPQUFQO0FBRVQsYUFBT0EsYUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7OzhCQVFVZCxDLEVBQWdEO0FBQUEsVUFBckNZLEdBQXFDLHVFQUF0QixLQUFzQjtBQUN4RCxVQUFNckIsTUFBYyxHQUFHLElBQUlHLGtCQUFKLENBQVdNLENBQVgsQ0FBdkI7QUFFQSxVQUFJaUIsTUFBcUIsR0FBRyxFQUE1QjtBQUVBLFVBQUlDLE1BQTZCLEdBQUcsS0FBS0YsR0FBTCxDQUFTekIsTUFBVCxFQUFpQnFCLEdBQWpCLENBQXBDO0FBRUEsVUFBSUEsR0FBSixFQUFTTSxNQUFNLEdBQUdBLE1BQU0sQ0FBQ2IsT0FBaEI7QUFQK0M7QUFBQTtBQUFBOztBQUFBO0FBU3hELDhCQUFvQmEsTUFBcEIsbUlBQTRCO0FBQUEsY0FBakJDLEtBQWlCO0FBQzFCLGNBQU1DLFVBQW1CLEdBQUdELEtBQUssQ0FBQ0UsQ0FBTixLQUFZOUIsTUFBTSxDQUFDOEIsQ0FBbkIsSUFBd0JGLEtBQUssQ0FBQ0csQ0FBTixLQUFZL0IsTUFBTSxDQUFDK0IsQ0FBdkU7QUFFQSxjQUFJRixVQUFVLElBQUlELEtBQUssQ0FBQ0ksT0FBTixFQUFsQixFQUFtQ04sTUFBTSxDQUFDWCxJQUFQLENBQVlhLEtBQVo7QUFFbkMsY0FBSVAsR0FBSixFQUFTLEtBQUtZLE9BQUwsQ0FBYU4sTUFBTSxDQUFDTCxJQUFwQixFQUEwQk0sS0FBMUI7QUFDVjtBQWZ1RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWlCeEQsYUFBT0YsTUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7O3FDQVFpQlEsRyxFQUFrRDtBQUFBLFVBQXJDYixHQUFxQyx1RUFBdEIsS0FBc0I7QUFDakUsVUFBTXJCLE1BQWMsR0FBRyxJQUFJRyxrQkFBSixDQUFXK0IsR0FBWCxDQUF2QjtBQUVBLFVBQU1DLGFBQTRCLEdBQUcsRUFBckM7QUFFQSxVQUFNQyxPQUE4QixHQUFHLEtBQUtYLEdBQUwsQ0FBU3pCLE1BQVQsRUFBaUJxQixHQUFqQixDQUF2QztBQUVBLFVBQU1QLE9BQU8sR0FBR08sR0FBRyxHQUFHZSxPQUFPLENBQUN0QixPQUFYLEdBQXFCc0IsT0FBeEM7QUFQaUU7QUFBQTtBQUFBOztBQUFBO0FBU2pFLDhCQUEyQnRCLE9BQTNCLG1JQUFvQztBQUFBLGNBQXpCdUIsWUFBeUI7O0FBQ2xDLGNBQUlBLFlBQVksQ0FBQ0MsVUFBYixDQUF3QnRDLE1BQXhCLENBQUosRUFBcUM7QUFDbkNtQyxZQUFBQSxhQUFhLENBQUNwQixJQUFkLENBQW1Cc0IsWUFBbkI7QUFFQSxnQkFBSWhCLEdBQUosRUFBUyxLQUFLWSxPQUFMLENBQWFHLE9BQU8sQ0FBQ2QsSUFBckIsRUFBMkJlLFlBQTNCO0FBQ1Y7QUFDRjtBQWZnRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWlCakUsYUFBT0YsYUFBUDtBQUNEO0FBRUQ7Ozs7Ozs0QkFHUTtBQUNOLFdBQUtyQixPQUFMLEdBQWUsRUFBZjtBQUVBLFdBQUtULEtBQUwsR0FBYSxDQUFiO0FBSE07QUFBQTtBQUFBOztBQUFBO0FBS04sOEJBQW1CLEtBQUtDLEtBQXhCO0FBQUEsY0FBV0MsSUFBWDtBQUErQkEsVUFBQUEsSUFBSSxDQUFDZ0MsS0FBTDtBQUEvQjtBQUxNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBT04sV0FBS2pDLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7OzRCQVNnQmdCLEksRUFBaUJ0QixNLEVBQWdCO0FBQy9Dc0IsTUFBQUEsSUFBSSxDQUFDUixPQUFMLEdBQWVRLElBQUksQ0FBQ1IsT0FBTCxDQUFhMEIsTUFBYixDQUFvQixVQUFDL0IsQ0FBRDtBQUFBLGVBQU9BLENBQUMsSUFBSVQsTUFBWjtBQUFBLE9BQXBCLENBQWY7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7NkJBU2lCQSxNLEVBQXFCO0FBQ3BDLFVBQUlXLEtBQWEsR0FBRyxDQUFDLENBQXJCO0FBRUEsVUFBTThCLElBQVksR0FBRyxLQUFLekMsTUFBTCxDQUFZOEIsQ0FBWixHQUFpQixLQUFLOUIsTUFBTCxDQUFZMEMsS0FBWixHQUFvQixDQUExRDtBQUNBLFVBQU1DLElBQVksR0FBRyxLQUFLM0MsTUFBTCxDQUFZK0IsQ0FBWixHQUFpQixLQUFLL0IsTUFBTCxDQUFZNEMsTUFBWixHQUFxQixDQUEzRDtBQUVBLFVBQU1DLElBQWEsR0FBSTdDLE1BQU0sQ0FBQytCLENBQVAsR0FBV1ksSUFBWCxJQUFtQjNDLE1BQU0sQ0FBQytCLENBQVAsR0FBVy9CLE1BQU0sQ0FBQzRDLE1BQWxCLEdBQTJCRCxJQUFyRTtBQUNBLFVBQU1HLElBQWEsR0FBSTlDLE1BQU0sQ0FBQytCLENBQVAsR0FBV1ksSUFBbEM7O0FBRUEsVUFBSTNDLE1BQU0sQ0FBQzhCLENBQVAsR0FBV1csSUFBWCxJQUFtQnpDLE1BQU0sQ0FBQzhCLENBQVAsR0FBVzlCLE1BQU0sQ0FBQzBDLEtBQWxCLEdBQTBCRCxJQUFqRCxFQUF1RDtBQUNyRCxZQUFJSSxJQUFKLEVBQVVsQyxLQUFLLEdBQUcsQ0FBUixDQUFWLEtBQ0ssSUFBSW1DLElBQUosRUFBVW5DLEtBQUssR0FBRyxDQUFSO0FBQ2hCLE9BSEQsTUFHTyxJQUFJWCxNQUFNLENBQUM4QixDQUFQLEdBQVdXLElBQWYsRUFBcUI7QUFDMUIsWUFBSUksSUFBSixFQUFVbEMsS0FBSyxHQUFHLENBQVIsQ0FBVixLQUNLLElBQUltQyxJQUFKLEVBQVVuQyxLQUFLLEdBQUcsQ0FBUjtBQUNoQjs7QUFFRCxhQUFPQSxLQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7NEJBS2dCO0FBQ2QsVUFBTW9DLFNBQWlCLEdBQUcsS0FBSzdDLEtBQUwsR0FBYSxDQUF2QztBQUVBLFVBQU04QyxJQUFZLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtsRCxNQUFMLENBQVkwQyxLQUFaLEdBQW9CLENBQS9CLENBQXJCO0FBQ0EsVUFBTVMsSUFBWSxHQUFHRixJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLbEQsTUFBTCxDQUFZNEMsTUFBWixHQUFxQixDQUFoQyxDQUFyQjtBQUVBLFVBQU1kLENBQVMsR0FBR21CLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtsRCxNQUFMLENBQVk4QixDQUF2QixDQUFsQjtBQUNBLFVBQU1DLENBQVMsR0FBR2tCLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtsRCxNQUFMLENBQVkrQixDQUF2QixDQUFsQjtBQUVBLFdBQUt6QixLQUFMLENBQVcsQ0FBWCxJQUFnQixJQUFJUCxTQUFKLENBQ2QsSUFBSUksa0JBQUosQ0FBVztBQUFFMkIsUUFBQUEsQ0FBQyxFQUFFQSxDQUFDLEdBQUdrQixJQUFUO0FBQWVqQixRQUFBQSxDQUFDLEVBQUVBLENBQWxCO0FBQXFCVyxRQUFBQSxLQUFLLEVBQUVNLElBQTVCO0FBQWtDSixRQUFBQSxNQUFNLEVBQUVPO0FBQTFDLE9BQVgsQ0FEYyxFQUVkLEtBQUtsRCxPQUZTLEVBR2Q4QyxTQUhjLENBQWhCO0FBTUEsV0FBS3pDLEtBQUwsQ0FBVyxDQUFYLElBQWdCLElBQUlQLFNBQUosQ0FDZCxJQUFJSSxrQkFBSixDQUFXO0FBQUUyQixRQUFBQSxDQUFDLEVBQUVBLENBQUw7QUFBUUMsUUFBQUEsQ0FBQyxFQUFFQSxDQUFYO0FBQWNXLFFBQUFBLEtBQUssRUFBRU0sSUFBckI7QUFBMkJKLFFBQUFBLE1BQU0sRUFBRU87QUFBbkMsT0FBWCxDQURjLEVBRWQsS0FBS2xELE9BRlMsRUFHZDhDLFNBSGMsQ0FBaEI7QUFNQSxXQUFLekMsS0FBTCxDQUFXLENBQVgsSUFBZ0IsSUFBSVAsU0FBSixDQUNkLElBQUlJLGtCQUFKLENBQVc7QUFBRTJCLFFBQUFBLENBQUMsRUFBRUEsQ0FBTDtBQUFRQyxRQUFBQSxDQUFDLEVBQUVBLENBQUMsR0FBR29CLElBQWY7QUFBcUJULFFBQUFBLEtBQUssRUFBRU0sSUFBNUI7QUFBa0NKLFFBQUFBLE1BQU0sRUFBRU87QUFBMUMsT0FBWCxDQURjLEVBRWQsS0FBS2xELE9BRlMsRUFHZDhDLFNBSGMsQ0FBaEI7QUFNQSxXQUFLekMsS0FBTCxDQUFXLENBQVgsSUFBZ0IsSUFBSVAsU0FBSixDQUNkLElBQUlJLGtCQUFKLENBQVc7QUFBRTJCLFFBQUFBLENBQUMsRUFBRUEsQ0FBQyxHQUFHa0IsSUFBVDtBQUFlakIsUUFBQUEsQ0FBQyxFQUFFQSxDQUFDLEdBQUdvQixJQUF0QjtBQUE0QlQsUUFBQUEsS0FBSyxFQUFFTSxJQUFuQztBQUF5Q0osUUFBQUEsTUFBTSxFQUFFTztBQUFqRCxPQUFYLENBRGMsRUFFZCxLQUFLbEQsT0FGUyxFQUdkOEMsU0FIYyxDQUFoQjtBQUtEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgQm91bmRzIGZyb20gJy4vYm91bmRzL0JvdW5kcyc7XHJcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9PcHRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBBIG1vZGVybiBxdWFkdHJlZSBpbXBsZW1lbnRhdGlvbiBmb3IgbW9kZXJuIEphdmFTY3JpcHQgZ2FtZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBlcnF1YWQge1xyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBvcHRpb25zIGZvciB0aGlzIFF1YWQuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtPcHRpb25zfVxyXG4gICAqL1xyXG4gIG9wdGlvbnM6IE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkZXB0aCBsZXZlbCBvZiB0aGlzIHF1YWQuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgbGV2ZWw6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGJvdW5kcyBvZiB0aGlzIHF1YWQgKHgsIHksIHdpZHRoLCBoZWlnaHQpLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Qm91bmRzfVxyXG4gICAqL1xyXG4gIGJvdW5kczogQm91bmRzO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgb2JqZWN0cyBzdG9yZWQgaW4gdGhpcyBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8Qm91bmRzPn1cclxuICAgKi9cclxuICBvYmplY3RzOiBBcnJheTxCb3VuZHM+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdWJxdWFkcyBvZiB0aGlzIHF1YWQuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxTdXBlcnF1YWQ+fVxyXG4gICAqL1xyXG4gIG5vZGVzOiBBcnJheTxTdXBlcnF1YWQ+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0b3RhbCBudW1iZXIgb2Ygb2JqZWN0cyBzdG9yZWQgaW4gdGhpcyBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHRvdGFsOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gYm91bmRzIFRoZSBib3VuZHMgb2YgdGhpcyBxdWFkICh4LCB5LCB3aWR0aCwgaGVpZ2h0KS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9ucyBmb3IgdGhpcyBxdWFkLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGV2ZWw9MF0gVGhlIGRlcHRoIGxldmVsIG9mIHRoaXMgcXVhZC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihib3VuZHM6IE9iamVjdCwgb3B0aW9uczogT2JqZWN0LCBsZXZlbDogbnVtYmVyID0gMCkge1xyXG4gICAgdGhpcy5ib3VuZHMgPSBuZXcgQm91bmRzKGJvdW5kcyk7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zID0gbmV3IE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5sZXZlbCA9IGxldmVsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgdG90YWwgbnVtYmVyIG9mIHN1YnF1YWRzIHdpdGhpbiB0aGUgbWFpbiBxdWFkLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgdG90YWxOb2RlcygpOiBudW1iZXIge1xyXG4gICAgbGV0IHRvdGFsOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLm5vZGVzKSB7XHJcbiAgICAgIHRvdGFsKys7XHJcblxyXG4gICAgICB0b3RhbCArPSBub2RlLnRvdGFsTm9kZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdG90YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnNlcnRzIGFuIG9iamVjdCBpbnRvIHRoZSBxdWFkIGFuZCBzcGxpdHMgdGhlIHF1YWQgaWYgbmVjZXNzYXJ5LlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvIFRoZSBib3VuZHMgb2YgdGhlIG9iamVjdCB0byBpbnNlcnQgaW50byB0aGUgcXVhZC5cclxuICAgKi9cclxuICBhZGQobzogT2JqZWN0KSB7XHJcbiAgICBjb25zdCBib3VuZHM6IEJvdW5kcyA9IG5ldyBCb3VuZHMobyk7XHJcblxyXG4gICAgdGhpcy50b3RhbCsrO1xyXG5cclxuICAgIGxldCBpOiBudW1iZXIgPSAwO1xyXG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLm5vZGVzWzBdKSB7XHJcbiAgICAgIGluZGV4ID0gdGhpcy5nZXRJbmRleChib3VuZHMpO1xyXG5cclxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIHRoaXMubm9kZXNbaW5kZXhdLmFkZChib3VuZHMpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9iamVjdHMucHVzaChib3VuZHMpO1xyXG5cclxuICAgIGlmICh0aGlzLm9iamVjdHMubGVuZ3RoID4gdGhpcy5vcHRpb25zLm1heE9iamVjdHMgJiYgdGhpcy5sZXZlbCA8IHRoaXMub3B0aW9ucy5tYXhMZXZlbHMpIHtcclxuICAgICAgaWYgKCF0aGlzLm5vZGVzWzBdKSB0aGlzLnNwbGl0KCk7XHJcbiAgICAgIHdoaWxlIChpIDwgdGhpcy5vYmplY3RzLmxlbmd0aCkge1xyXG4gICAgICAgIGluZGV4ID0gdGhpcy5nZXRJbmRleCh0aGlzLm9iamVjdHNbaV0pO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB0aGlzLm5vZGVzW2luZGV4XS5hZGQodGhpcy5vYmplY3RzLnNwbGljZShpLCAxKVswXSk7XHJcbiAgICAgICAgZWxzZSBpID0gaSArIDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHJpZXZlcyBvYmplY3RzIGFyb3VuZCB0aGUgc3BlY2lmaWVkIGJvdW5kcy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gbyBUaGUgYm91bmRzIG9mIHRoZSBvYmplY3QgdG8gY2hlY2sgZm9yIHBvc3NpYmxlIGNvbGxpc2lvbnMuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbZGVsPWZhbHNlXSBTZXQgdG8gdHJ1ZSB0byBkZWxldGUgdGhlIG9iamVjdHMgdGhhdCB3ZXJlIGZvdW5kLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxCb3VuZHM+fSBcclxuICAgKi9cclxuICBnZXQobzogT2JqZWN0LCBkZWw6IGJvb2xlYW4gPSBmYWxzZSk6IChBcnJheTxCb3VuZHM+IHwgYW55KSB7XHJcbiAgICBsZXQgcXVhZDogU3VwZXJxdWFkID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBib3VuZHM6IEJvdW5kcyA9IG5ldyBCb3VuZHMobyk7XHJcblxyXG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuZ2V0SW5kZXgoYm91bmRzKTtcclxuXHJcbiAgICBsZXQgcmV0dXJuT2JqZWN0czogQXJyYXk8Qm91bmRzPiA9IHRoaXMub2JqZWN0cztcclxuXHJcbiAgICBpZiAodGhpcy5ub2Rlc1swXSkge1xyXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuT2JqZWN0cyA9IHJldHVybk9iamVjdHMuY29uY2F0KHRoaXMubm9kZXNbaW5kZXhdLmdldChvLCBkZWwpKTtcclxuXHJcbiAgICAgICAgcXVhZCA9IHRoaXMubm9kZXNbaW5kZXhdO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgZm9yIChjb25zdCBub2RlIG9mIHRoaXMubm9kZXMpIHtcclxuICAgICAgICByZXR1cm5PYmplY3RzID0gcmV0dXJuT2JqZWN0cy5jb25jYXQobm9kZS5nZXQobywgZGVsKSk7XHJcblxyXG4gICAgICAgIHF1YWQgPSBub2RlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRlbCkgcmV0dXJuIHsgcXVhZDogcXVhZCwgb2JqZWN0czogcmV0dXJuT2JqZWN0cyB9O1xyXG5cclxuICAgIHJldHVybiByZXR1cm5PYmplY3RzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIGFsbCBwb2ludHMgaW4gdGhpcyBxdWFkIHRoYXQgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gbyBUaGUgb2JqZWN0IHRvIGNoZWNrIGZvciBjb2xsaWRpbmcgcG9pbnRzLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlbD1mYWxzZV0gU2V0IHRvIHRydWUgdG8gZGVsZXRlIHRoZSBwb2ludHMgdGhhdCB3ZXJlIGZvdW5kLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxCb3VuZHM+fVxyXG4gICAqL1xyXG4gIGdldFBvaW50cyhvOiBPYmplY3QsIGRlbDogYm9vbGVhbiA9IGZhbHNlKTogQXJyYXk8Qm91bmRzPiB7XHJcbiAgICBjb25zdCBib3VuZHM6IEJvdW5kcyA9IG5ldyBCb3VuZHMobyk7XHJcblxyXG4gICAgbGV0IHBvaW50czogQXJyYXk8Qm91bmRzPiA9IFtdO1xyXG5cclxuICAgIGxldCBzZWFyY2g6IChBcnJheTxCb3VuZHM+IHwgYW55KSA9IHRoaXMuZ2V0KGJvdW5kcywgZGVsKTtcclxuXHJcbiAgICBpZiAoZGVsKSBzZWFyY2ggPSBzZWFyY2gub2JqZWN0cztcclxuXHJcbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIHNlYXJjaCkge1xyXG4gICAgICBjb25zdCBzYW1lQ29vcmRzOiBib29sZWFuID0gcG9pbnQueCA9PT0gYm91bmRzLnggJiYgcG9pbnQueSA9PT0gYm91bmRzLnk7XHJcblxyXG4gICAgICBpZiAoc2FtZUNvb3JkcyAmJiBwb2ludC5pc1BvaW50KCkpIHBvaW50cy5wdXNoKHBvaW50KTtcclxuXHJcbiAgICAgIGlmIChkZWwpIHRoaXMuY2xlYW51cChzZWFyY2gucXVhZCwgcG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwb2ludHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXRyaWVzIGFsbCBib3VuZHMgaW4gdGhpcyBxdWFkIHRoYXQgaW50ZXJzZWN0IHdpdGggdGhlIHByb3ZpZGVkIGJvdW5kcy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBib3VuZHMgdG8gY2hlY2sgY29sbGlzaW9ucyBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlbD1mYWxzZV0gU2V0IHRvIHRydWUgdG8gZGVsZXRlIHRoZSBpbnRlcnNlY3Rpb25zIHRoYXQgd2VyZSBmb3VuZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8Qm91bmRzPn1cclxuICAgKi9cclxuICBnZXRJbnRlcnNlY3Rpb25zKG9iajogQm91bmRzLCBkZWw6IGJvb2xlYW4gPSBmYWxzZSk6IEFycmF5PEJvdW5kcz4ge1xyXG4gICAgY29uc3QgYm91bmRzOiBCb3VuZHMgPSBuZXcgQm91bmRzKG9iaik7XHJcblxyXG4gICAgY29uc3QgaW50ZXJzZWN0aW9uczogQXJyYXk8Qm91bmRzPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdHM6IChBcnJheTxCb3VuZHM+IHwgYW55KSA9IHRoaXMuZ2V0KGJvdW5kcywgZGVsKTtcclxuXHJcbiAgICBjb25zdCBvYmplY3RzID0gZGVsID8gcmVzdWx0cy5vYmplY3RzIDogcmVzdWx0cztcclxuXHJcbiAgICBmb3IgKGNvbnN0IGludGVyc2VjdGlvbiBvZiBvYmplY3RzKSB7XHJcbiAgICAgIGlmIChpbnRlcnNlY3Rpb24uaW50ZXJzZWN0cyhib3VuZHMpKSB7XHJcbiAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKGludGVyc2VjdGlvbik7XHJcblxyXG4gICAgICAgIGlmIChkZWwpIHRoaXMuY2xlYW51cChyZXN1bHRzLnF1YWQsIGludGVyc2VjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFycyBhbGwgb2JqZWN0cyBhbmQgbm9kZXMgZnJvbSB0aGUgcXVhZC5cclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xyXG5cclxuICAgIHRoaXMudG90YWwgPSAwO1xyXG5cclxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLm5vZGVzKSBub2RlLmNsZWFyKCk7XHJcblxyXG4gICAgdGhpcy5ub2RlcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiBhbiBvYmplY3QgbmVlZHMgdG8gYmUgZGVsZXRlZCBmcm9tIHRoZSBxdWFkIGFuZCBpZiBzbyBpdCBkZWxldGVzXHJcbiAgICogaXQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1N1cGVycXVhZH0gcXVhZCBUaGUgcXVhZCB0aGF0IHRoZSBvYmplY3QgYmVsb25ncyB0by5cclxuICAgKiBAcGFyYW0ge0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdGhhdCBkZWZpbmUgdGhlIG9iamVjdHMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhbnVwKHF1YWQ6IFN1cGVycXVhZCwgYm91bmRzOiBCb3VuZHMpIHtcclxuICAgIHF1YWQub2JqZWN0cyA9IHF1YWQub2JqZWN0cy5maWx0ZXIoKG8pID0+IG8gIT0gYm91bmRzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHBhcnQgb2YgdGhlIHF1YWQgd2hlcmUgdGhlIG9iamVjdCBzaG91bGQgYmUgcGxhY2VkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGNoZWNrIHRoZSBwbGFjZW1lbnQgb2YuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyAtMSB0aHJvdWdoIDMgZGVwZW5kaW5nIG9uIHdoZXJlIHRoZSBvYmplY3Qgc2hvdWxkIGJlIHBsYWNlZC5cclxuICAgKi9cclxuICBwcml2YXRlIGdldEluZGV4KGJvdW5kczogYW55KTogbnVtYmVyIHtcclxuICAgIGxldCBpbmRleDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgY29uc3Qgdk1pZDogbnVtYmVyID0gdGhpcy5ib3VuZHMueCArICh0aGlzLmJvdW5kcy53aWR0aCAvIDIpO1xyXG4gICAgY29uc3QgaE1pZDogbnVtYmVyID0gdGhpcy5ib3VuZHMueSArICh0aGlzLmJvdW5kcy5oZWlnaHQgLyAyKTtcclxuXHJcbiAgICBjb25zdCB0b3BROiBib29sZWFuID0gKGJvdW5kcy55IDwgaE1pZCAmJiBib3VuZHMueSArIGJvdW5kcy5oZWlnaHQgPCBoTWlkKTtcclxuICAgIGNvbnN0IGJvdFE6IGJvb2xlYW4gPSAoYm91bmRzLnkgPiBoTWlkKTtcclxuXHJcbiAgICBpZiAoYm91bmRzLnggPCB2TWlkICYmIGJvdW5kcy54ICsgYm91bmRzLndpZHRoIDwgdk1pZCkge1xyXG4gICAgICBpZiAodG9wUSkgaW5kZXggPSAxO1xyXG4gICAgICBlbHNlIGlmIChib3RRKSBpbmRleCA9IDI7XHJcbiAgICB9IGVsc2UgaWYgKGJvdW5kcy54ID4gdk1pZCkge1xyXG4gICAgICBpZiAodG9wUSkgaW5kZXggPSAwO1xyXG4gICAgICBlbHNlIGlmIChib3RRKSBpbmRleCA9IDM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3BsaXRzIGEgcXVhZCBpbnRvIDQgc3VicXVhZHMuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNwbGl0KCkge1xyXG4gICAgY29uc3QgbmV4dExldmVsOiBudW1iZXIgPSB0aGlzLmxldmVsICsgMTtcclxuXHJcbiAgICBjb25zdCBzdWJXOiBudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMuYm91bmRzLndpZHRoIC8gMik7XHJcbiAgICBjb25zdCBzdWJIOiBudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMuYm91bmRzLmhlaWdodCAvIDIpO1xyXG5cclxuICAgIGNvbnN0IHg6IG51bWJlciA9IE1hdGgucm91bmQodGhpcy5ib3VuZHMueCk7XHJcbiAgICBjb25zdCB5OiBudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMuYm91bmRzLnkpO1xyXG5cclxuICAgIHRoaXMubm9kZXNbMF0gPSBuZXcgU3VwZXJxdWFkKFxyXG4gICAgICBuZXcgQm91bmRzKHsgeDogeCArIHN1YlcsIHk6IHksIHdpZHRoOiBzdWJXLCBoZWlnaHQ6IHN1YkggfSksXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgbmV4dExldmVsXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMubm9kZXNbMV0gPSBuZXcgU3VwZXJxdWFkKFxyXG4gICAgICBuZXcgQm91bmRzKHsgeDogeCwgeTogeSwgd2lkdGg6IHN1YlcsIGhlaWdodDogc3ViSCB9KSxcclxuICAgICAgdGhpcy5vcHRpb25zLFxyXG4gICAgICBuZXh0TGV2ZWxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5ub2Rlc1syXSA9IG5ldyBTdXBlcnF1YWQoXHJcbiAgICAgIG5ldyBCb3VuZHMoeyB4OiB4LCB5OiB5ICsgc3ViSCwgd2lkdGg6IHN1YlcsIGhlaWdodDogc3ViSCB9KSxcclxuICAgICAgdGhpcy5vcHRpb25zLFxyXG4gICAgICBuZXh0TGV2ZWxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5ub2Rlc1szXSA9IG5ldyBTdXBlcnF1YWQoXHJcbiAgICAgIG5ldyBCb3VuZHMoeyB4OiB4ICsgc3ViVywgeTogeSArIHN1YkgsIHdpZHRoOiBzdWJXLCBoZWlnaHQ6IHN1YkggfSksXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgbmV4dExldmVsXHJcbiAgICApO1xyXG4gIH1cclxufSJdfQ==