'use strict'

import Bounds from './Bounds';
import Options from './Options';

/**
 * A modern quadtree implementation for modern JavaScript games.
 * 
 * @version 0.1.0
 */
export default class Superquad {

  /**
   * A reference to the options for this Quad.
   * 
   * @since 0.1.0
   * 
   * @property {Options}
   */
  options: Options;

  /**
   * The depth level of this quad.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */
  level: number;

  /**
   * The bounds of this quad (x, y, width, height).
   * 
   * @since 0.1.0
   * 
   * @property {Bounds}
   */
  bounds: Bounds;

  /**
   * The objects stored in this quad.
   * 
   * @since 0.1.0
   * 
   * @property {Array<Bounds>}
   */
  objects: Array<Bounds> = [];

  /**
   * The subquads of this quad.
   * 
   * @since 0.1.0
   * 
   * @property {Array<Superquad>}
   */
  nodes: Array<Superquad> = [];

  /**
   * The total number of objects stored in this quad.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */
  total: number = 0;

  /**
   * @param {Object} bounds The bounds of this quad (x, y, width, height).
   * @param {Object} options A reference to the options for this quad.
   * @param {number} [level=0] The depth level of this quad.
   */
  constructor(bounds: Object, options: Object, level: number = 0) {

    this.bounds = new Bounds(bounds);

    this.options = new Options(options);

    this.level = level;

  }

  /**
   * Gets the total number of subquads within the main quad.
   * 
   * @since 0.1.0
   * 
   * @returns {number}
   */
  totalNodes(): number {

    let total: number = 0;

    for (const node of this.nodes) {

      total++;

      total += node.totalNodes();

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
  add(o: Object) {

    const bounds: Bounds = new Bounds(o);

    this.total++;

    let i: number = 0;
    let index: number = 0;

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

        if (index !== -1) this.nodes[index].add(this.objects.splice(i, 1)[0]);
        else i = i + 1;

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
  get(o: Object, del: boolean = false): (Array<Bounds> | any) {

    let quad: Superquad = this;

    const bounds: Bounds = new Bounds(o);

    const index: number = this.getIndex(bounds);

    let returnObjects: Array<Bounds> = this.objects;

    if (this.nodes[0]) {

      if (index !== -1) {

        returnObjects = returnObjects.concat(this.nodes[index].get(o, del));

        quad = this.nodes[index];

      }
      else for (const node of this.nodes) {

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
   * @since 0.1.0
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
   * @since 0.1.0
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
   * 
   * @since 0.1.0
   */
  clear() {

    this.objects = [];

    this.total = 0;

    for (const node of this.nodes) node.clear();

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
  private cleanup(quad: Superquad, bounds: Bounds) {

    quad.objects = quad.objects.filter((o) => o != bounds);

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
  private getIndex(bounds: any): number {

    let index: number = -1;

    const vMid: number = this.bounds.x + (this.bounds.width / 2);
    const hMid: number = this.bounds.y + (this.bounds.height / 2);

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
   * @since 0.1.0
   * @private
   */
  private split() {

    const nextLevel: number = this.level + 1;

    const subW: number = Math.round(this.bounds.width / 2);
    const subH: number = Math.round(this.bounds.height / 2);

    const x: number = Math.round(this.bounds.x);
    const y: number = Math.round(this.bounds.y);

    this.nodes[0] = new Superquad(
      new Bounds({ x: x + subW, y: y, width: subW, height: subH }),
      this.options,
      nextLevel
    );

    this.nodes[1] = new Superquad(
      new Bounds({ x: x, y: y, width: subW, height: subH }),
      this.options,
      nextLevel
    );

    this.nodes[2] = new Superquad(
      new Bounds({ x: x, y: y + subH, width: subW, height: subH }),
      this.options,
      nextLevel
    );

    this.nodes[3] = new Superquad(
      new Bounds({ x: x + subW, y: y + subH, width: subW, height: subH }),
      this.options,
      nextLevel
    );

  }

}