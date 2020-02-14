import Bounds from './bounds/Bounds';
import Options from './options/Options';
/**
 * A modern quadtree implementation for modern JavaScript games.
 */
export default class Superquad {
    /**
     * A reference to the options for this Quad.
     *
     * @property {Options}
     */
    options: Options;
    /**
     * The depth level of this quad.
     *
     * @property {number}
     */
    level: number;
    /**
     * The bounds of this quad (x, y, width, height).
     *
     * @property {Bounds}
     */
    bounds: Bounds;
    /**
     * The objects stored in this quad.
     *
     * @property {Array<Bounds>}
     */
    objects: Array<Bounds>;
    /**
     * The subquads of this quad.
     *
     * @property {Array<Superquad>}
     */
    nodes: Array<Superquad>;
    /**
     * The total number of objects stored in this quad.
     *
     * @property {number}
     */
    total: number;
    /**
     * @param {Object} bounds The bounds of this quad (x, y, width, height).
     * @param {Object} options A reference to the options for this quad.
     * @param {number} [level=0] The depth level of this quad.
     */
    constructor(bounds: Object, options: Object, level?: number);
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
