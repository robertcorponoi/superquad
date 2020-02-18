'use strict'

import Bounds from './bounds/Bounds';
import Options from './options/Options';

/**
 * A modern quadtree implementation for modern JavaScript games.
 */
export default class Superquad {
  /**
   * A reference to the options for this Quad.
   * 
   * @private
   * 
   * @property {Options}
   */
  private _options: Options;

  /**
   * The depth level of this quad.
   * 
   * @private
   * 
   * @property {number}
   */
  private _level: number;

  /**
   * The bounds of this quad (x, y, width, height).
   * 
   * @private
   * 
   * @property {Bounds}
   */
  private _bounds: Bounds;

  /**
   * The objects stored in this quad.
   * 
   * @private
   * 
   * @property {Array<Bounds>}
   */
  private _objects: Array<Bounds> = [];

  /**
   * The subquads of this quad.
   * 
   * @private
   * 
   * @property {Array<Superquad>}
   */
  private _nodes: Array<Superquad> = [];

  /**
   * The total number of objects stored in this quad.
   * 
   * @private
   * 
   * @property {number}
   */
  private _total: number = 0;

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
  constructor(bounds: Object, options: Object = {}, level: number = 0) {
    this._bounds = new Bounds(bounds);

    this._options = new Options(options);

    this._level = level;
  }

  /**
   * Returns the level of this quad.
   * 
   * @returns {number}
   */
  get level(): number { return this._level; }

  /**
   * Returns the bounds of this quad.
   * 
   * @returns {Bounds}
   */
  get bounds(): Bounds { return this._bounds; }

  /**
   * Returns the objects in this quad.
   * 
   * @returns {Array<Bounds>}
   */
  get objects(): Array<Bounds> { return this._objects; }

  /**
   * Returns the subquads of this quad.
   * 
   * @returns {Array<Superquad>}
   */
  get nodes(): Array<Superquad> { return this._nodes; }

  /**
   * Returns the total number of objects stored in this quad.
   * 
   * @returns {number}
   */
  get total(): number { return this._total; }

  /**
   * Gets the total number of subquads within the main quad.
   * 
   * @returns {number}
   */
  totalNodes(): number {
    let total: number = 0;

    for (const node of this._nodes) {
      total++;

      total += node.totalNodes();
    }

    return total;
  }

  /**
   * Inserts an object into the quad and splits the quad if necessary.
   * 
   * @param {Object} o The bounds of the object to insert into the quad.
   */
  add(o: Object) {
    const bounds: Bounds = new Bounds(o);

    this._total++;

    let i: number = 0;
    let index: number = 0;

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

        if (index !== -1) this._nodes[index].add(this._objects.splice(i, 1)[0]);
        else i = i + 1;
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
  get(o: Object, del: boolean = false): (Array<Bounds> | any) {
    let quad: Superquad = this;

    const bounds: Bounds = new Bounds(o);

    const index: number = this.getIndex(bounds);

    let returnObjects: Array<Bounds> = this._objects;

    if (this._nodes[0]) {
      if (index !== -1) {
        returnObjects = returnObjects.concat(this._nodes[index].get(o, del));

        quad = this._nodes[index];
      }
      else for (const node of this._nodes) {
        returnObjects = returnObjects.concat(node.get(o, del));

        quad = node;
      }
    }

    if (del) return { quad: quad, objects: returnObjects };

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
  getPoints(o: Object, del: boolean = false): Array<Bounds> {
    const bounds: Bounds = new Bounds(o);

    let points: Array<Bounds> = [];

    let search: (Array<Bounds> | any) = this.get(bounds, del);

    if (del) search = search.objects;

    for (const point of search) {
      const sameCoords: boolean = point.x === bounds.x && point.y === bounds.y;

      if (sameCoords && point.isPoint()) points.push(point);

      if (del) this.cleanup(search.quad, point);
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
  getIntersections(obj: Bounds, del: boolean = false): Array<Bounds> {
    const bounds: Bounds = new Bounds(obj);

    const intersections: Array<Bounds> = [];

    const results: (Array<Bounds> | any) = this.get(bounds, del);

    const objects = del ? results.objects : results;

    for (const intersection of objects) {
      if (intersection.intersects(bounds)) {
        intersections.push(intersection);

        if (del) this.cleanup(results.quad, intersection);
      }
    }

    return intersections;
  }

  /**
   * Clears all objects and nodes from the quad.
   */
  clear() {
    this._objects = [];

    this._total = 0;

    for (const node of this._nodes) node.clear();

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
  private cleanup(quad: Superquad, bounds: Bounds) {
    quad._objects = quad._objects.filter((o) => o != bounds);
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
  private getIndex(bounds: any): number {
    let index: number = -1;

    const vMid: number = this._bounds.x + (this._bounds.width / 2);
    const hMid: number = this._bounds.y + (this._bounds.height / 2);

    const topQ: boolean = (bounds.y < hMid && bounds.y + bounds.height < hMid);
    const botQ: boolean = (bounds.y > hMid);

    if (bounds.x < vMid && bounds.x + bounds.width < vMid) {
      if (topQ) index = 1;
      else if (botQ) index = 2;
    } else if (bounds.x > vMid) {
      if (topQ) index = 0;
      else if (botQ) index = 3;
    }

    return index;
  }

  /**
   * Splits a quad into 4 subquads.
   * 
   * @private
   */
  private split() {
    const nextLevel: number = this._level + 1;

    const subW: number = Math.round(this._bounds.width / 2);
    const subH: number = Math.round(this._bounds.height / 2);

    const x: number = Math.round(this._bounds.x);
    const y: number = Math.round(this._bounds.y);

    this._nodes[0] = new Superquad(
      new Bounds({ x: x + subW, y: y, width: subW, height: subH }),
      this._options,
      nextLevel
    );

    this._nodes[1] = new Superquad(
      new Bounds({ x: x, y: y, width: subW, height: subH }),
      this._options,
      nextLevel
    );

    this._nodes[2] = new Superquad(
      new Bounds({ x: x, y: y + subH, width: subW, height: subH }),
      this._options,
      nextLevel
    );

    this._nodes[3] = new Superquad(
      new Bounds({ x: x + subW, y: y + subH, width: subW, height: subH }),
      this._options,
      nextLevel
    );
  }
}