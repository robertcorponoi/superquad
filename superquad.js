function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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

var Options =
/**
 * The maximum number of objects that can be stored in a quad before the quad splits.
 * 
 * @property {number}
 * 
 * @default 10
 */

/**
 * The maximum number of times a quad can split.
 * 
 * @property {number}
 * 
 * @default 4
 */

/**
 * @param {Object} [options]
 * @param {number} [options.maxObjects=10] The maximum number of objects that can be stored in a quad before the quad splits.
 * @param {number} [options.maxLevels=4] THe maximum number of times a quad can split.
 */
function Options(options) {
  _classCallCheck(this, Options);

  _defineProperty(this, "maxObjects", 10);

  _defineProperty(this, "maxLevels", 4);

  Object.assign(this, options);
};

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

    this._bounds = new Bounds(bounds);
    this._options = new Options(options);
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
      var bounds = new Bounds(o);
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
      var bounds = new Bounds(o);
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
      var bounds = new Bounds(o);
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
      var bounds = new Bounds(obj);
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
      this._nodes[0] = new Superquad(new Bounds({
        x: x + subW,
        y: y,
        width: subW,
        height: subH
      }), this._options, nextLevel);
      this._nodes[1] = new Superquad(new Bounds({
        x: x,
        y: y,
        width: subW,
        height: subH
      }), this._options, nextLevel);
      this._nodes[2] = new Superquad(new Bounds({
        x: x,
        y: y + subH,
        width: subW,
        height: subH
      }), this._options, nextLevel);
      this._nodes[3] = new Superquad(new Bounds({
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

export default Superquad;
