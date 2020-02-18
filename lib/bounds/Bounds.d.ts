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
    x: number;
    /**
     * The y position of the object.
     *
     * @property {number}
     *
     * @default 0
     */
    y: number;
    /**
     * The width of the object.
     *
     * @property {number}
     *
     * @default 0
     */
    width: number;
    /**
     * The height of the object.
     *
     * @property {number}
     *
     * @default 0
     */
    height: number;
    /**
     * @param {Object} bounds The data of the object including x, y, width, and height.
     */
    constructor(bounds: Object);
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
