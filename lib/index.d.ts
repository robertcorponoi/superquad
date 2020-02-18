import Bounds from './bounds/Bounds';
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
    private _options;
    /**
     * The depth level of this quad.
     *
     * @private
     *
     * @property {number}
     */
    private _level;
    /**
     * The bounds of this quad (x, y, width, height).
     *
     * @private
     *
     * @property {Bounds}
     */
    private _bounds;
    /**
     * The objects stored in this quad.
     *
     * @private
     *
     * @property {Array<Bounds>}
     */
    private _objects;
    /**
     * The subquads of this quad.
     *
     * @private
     *
     * @property {Array<Superquad>}
     */
    private _nodes;
    /**
     * The total number of objects stored in this quad.
     *
     * @private
     *
     * @property {number}
     */
    private _total;
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
    constructor(bounds: Object, options?: Object, level?: number);
    /**
     * Returns the level of this quad.
     *
     * @returns {number}
     */
    get level(): number;
    /**
     * Returns the bounds of this quad.
     *
     * @returns {Bounds}
     */
    get bounds(): Bounds;
    /**
     * Returns the objects in this quad.
     *
     * @returns {Array<Bounds>}
     */
    get objects(): Array<Bounds>;
    /**
     * Returns the subquads of this quad.
     *
     * @returns {Array<Superquad>}
     */
    get nodes(): Array<Superquad>;
    /**
     * Returns the total number of objects stored in this quad.
     *
     * @returns {number}
     */
    get total(): number;
    /**
     * Gets the total number of subquads within the main quad.
     *
     * @returns {number}
     */
    totalNodes(): number;
    /**
     * Inserts an object into the quad and splits the quad if necessary.
     *
     * @param {Object} o The bounds of the object to insert into the quad.
     */
    add(o: Object): void;
    /**
     * Retrieves objects around the specified bounds.
     *
     * @param {Object} o The bounds of the object to check for possible collisions.
     * @param {boolean} [del=false] Set to true to delete the objects that were found.
     *
     * @returns {Array<Bounds>}
     */
    get(o: Object, del?: boolean): (Array<Bounds> | any);
    /**
     * Retrieves all points in this quad that collide.
     *
     * @param {Object} o The object to check for colliding points.
     * @param {boolean} [del=false] Set to true to delete the points that were found.
     *
     * @returns {Array<Bounds>}
     */
    getPoints(o: Object, del?: boolean): Array<Bounds>;
    /**
     * Retries all bounds in this quad that intersect with the provided bounds.
     *
     * @param {Object} obj The bounds to check collisions against.
     * @param {boolean} [del=false] Set to true to delete the intersections that were found.
     *
     * @returns {Array<Bounds>}
     */
    getIntersections(obj: Bounds, del?: boolean): Array<Bounds>;
    /**
     * Clears all objects and nodes from the quad.
     */
    clear(): void;
    /**
     * Checks to see if an object needs to be deleted from the quad and if so it deletes
     * it.
     *
     * @private
     *
     * @param {Superquad} quad The quad that the object belongs to.
     * @param {Bounds} bounds The bounds that define the objects.
     */
    private cleanup;
    /**
     * Returns the part of the quad where the object should be placed.
     *
     * @private
     *
     * @param {Bounds} bounds The bounds to check the placement of.
     *
     * @returns {number} Returns -1 through 3 depending on where the object should be placed.
     */
    private getIndex;
    /**
     * Splits a quad into 4 subquads.
     *
     * @private
     */
    private split;
}
