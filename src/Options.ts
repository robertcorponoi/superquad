'use strict'

/**
 * Defines the options and their default values for each instance of Superquad.
 */
export default class Options {

  /**
   * The maximum number of objects that can be stored in a quad before the
   * quad splits.
   * 
   * @property {number}
   * 
   * @default 4
   */
  maxObjects: number = 10;

  /**
   * The maximum number of times a quad can split.
   * 
   * @property {number}
   * 
   * @default 4
   */
  maxLevels: number = 4;

  /**
   * @param {Object} [options]
   * @param {number} [options.maxObjects=10] The maximum number of objects that can be stored in a quad before the quad splits.
   * @param {number} [options.maxLevels=4] THe maximum number of times a quad can split.
   */
  constructor(options: Object) {

    Object.assign(this, options);

  }

}