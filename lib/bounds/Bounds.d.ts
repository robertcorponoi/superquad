/**
 * The bounds of an object describes its position within the space of the quadtree.
 */
export default class Bounds {
    /**
     * The x position of the object.
     *
     * @property {number}
     */
    x: number;
    /**
     * The y position of the object.
     *
     * @property {number}
     */
    y: number;
    /**
     * The width of the object.
     *
     * @property {number}
     */
    width: number;
    /**
     * The height of the object.
     *
     * @property {number}
     */
    height: number;
    /**
     * @param {Object} obj The data of this game object including x, y, width, height and any other properties.
     */
    constructor(obj: any);
    /**
     * Checks to see if this Bounds object is a point, meaning it has no width
     * or height.
     *
     * @returns {boolean}
     */
    isPoint(): boolean;
    /**
     * Checks to see if this Bounds object intersects with another.
     *
     * @param {Bounds} bounds The other bounds object to check for intersection with.
     *
     * @returns {boolean}
     */
    intersects(bounds: Bounds): boolean;
}
