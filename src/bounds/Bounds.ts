'use strict'

/**
 * Bounds are used to specify an object's position in 2D space.
 * 
 * Both quadtrees and objects added to quadtrees use this bounds object.
 */
export default class Bounds {
  /**
   * The x position of the object. 
   * 
   * @property {number}
   * 
   * @default 0
   */
  x: number = 0;

  /**
   * The y position of the object. 
   * 
   * @property {number}
   * 
   * @default 0
   */
  y: number = 0;

  /**
   * The width of the object. 
   * 
   * @property {number}
   * 
   * @default 0
   */
  width: number = 0;

  /**
   * The height of the object. 
   * 
   * @property {number}
   * 
   * @default 0
   */
  height: number = 0;

  /**
   * @param {Object} bounds The data of the object including x, y, width, and height.
   */
  constructor(bounds: Object) {
    Object.assign(this, bounds);
  }

  /**
   * Checks to see if this Bounds object is a point, meaning it has no width
   * or height.
   * 
   * @returns {boolean}
   */
  public isPoint(): boolean {
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
  public intersects(bounds: Bounds): boolean {
    const aMaxX: number = bounds.x + bounds.width;
    const aMaxY: number = bounds.y + bounds.height;

    const bMaxX: number = this.x + this.width;
    const bMaxY: number = this.y + this.height;

    if (aMaxX < this.x) return false;

    if (bounds.x > bMaxX) return false;

    if (aMaxY < bounds.y) return false;

    if (bounds.y > bMaxY) return false;

    return true;
  }
}