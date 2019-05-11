'use strict'

/**
 * The bounds of an object describes its position within the space of the quadtree.
 * 
 * @version 0.1.0
 */
export default class Bounds {

  /**
   * The x position of the object. 
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */
  x: number;

  /**
   * The y position of the object. 
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */
  y: number;

  /**
   * The width of the object. 
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */
  width: number;

  /**
   * The height of the object. 
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */
  height: number;

  /**
   * @param {Object} obj The data of this game object including x, y, width, height and any other properties.
   */
  constructor(obj: any) {

    this.x = obj.x;

    this.y = obj.y;

    this.width = obj.width;

    this.height = obj.height;

  }

  /**
   * Checks to see if this Bounds object is a point, meaning it has no width
   * or height.
   * 
   * @since 0.1.0
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
   * @since 0.1.0
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