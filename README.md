<p align="center">
  <img width="250" height="250" src="https://github.com/robertcorponoi/graphics/blob/master/superquad/superquad-logo.png?raw=true">
</p>

<h1 align="center">Superquad</h1>

<p align="center">Superquad is yet another quadtree implementation for JavaScript that hopes to provide some additional functionality on top of standard quadtree implementations.<p>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/superquad.svg?style=flat)](https://www.npmjs.com/package/superquad)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/superquad/badge.svg)](https://snyk.io/test/github/robertcorponoi/superquad)
  ![npm](https://img.shields.io/npm/dt/superquad)
  [![NPM downloads](https://img.shields.io/npm/dm/superquad.svg?style=flat)](https://www.npmjs.com/package/superquad)
  <a href="https://badge.fury.io/js/superquad"><img src="https://img.shields.io/github/issues/robertcorponoi/superquad.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/superquad"><img src="https://img.shields.io/github/license/robertcorponoi/superquad.svg" alt="license" height="18"></a>
  [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Install**

Superquad is offered as both a Node package and an ES6 module. To download Superquad through npm, use:

```bash
$ npm install superquad
```

and to use it, you can either require it or import it if you're in a browser environment:

In Node.js:
```js
const Superquad = require('superquad');
```

In a browser environment:
```js
// Browser
import Superquad from 'node_modules/superquad/superquad.js';

// Webpack
import Superquad from 'superquad';
```

## **Usage**

To create a new instance of Superquad, you have to supply at minimum the width and height of the quadtree:

```js
const dimensions = {
  width: 1024,
  height: 768
};

const superquad = new Superquad(dimensions);
```

Now let's say you want to customize Superquad further and adjust the number of objects a quad can hold before it splits:

```js
const dimensions = {
  width: 1024,
  height: 768
};

const options = {
  maxObjects: 20
};

const superquad = new Superquad(dimensions, options);
```

The complete layout of initialization parameters is as follows:

| param      	        | type   	| description                                                             	                                                 | default 	|
|-------------------	|--------	|--------------------------------------------------------------------------------------------------------------------------- |---------	|
| bounds              | Object  |                                                                                                                            |          |
| bounds.x            | number  | The x position of the top left point of the quad. This should only be set if you're working with negative position values. | 0        |
| bounds.y            | number  | The y position of the top left point of the quad. This should only be set if you're working with negative position values. | 0        |
| bounds.width        | number  | The width of the quadtree.                                                                                                 |          |
| bounds.height       | number  | The height of the quadtree.                                                                                                |          |
| options             |         |                                                                                                                            |          |
| options.maxObjects 	| number 	| The amount of objects a quad can hold before it splits into 4 sub-quads 	                                                 | 10      	|
| options.maxLevels  	| number 	| The number of sub-quads a quad can have.                                	                                                 | 4       	|

## **API**

### **add**

Adds an object to the quadtree by specifying the space that it occupies.

| param         	| type   	| description                     	| default 	|
|---------------	|--------	|---------------------------------	|---------	|
| bounds        	| Object 	| The bounds of the object to add 	|         	|
| bounds.x      	| number 	| The x position of the object    	|         	|
| bounds.y      	| number 	| The y position of the object    	|         	|
| bounds.width  	| number 	| The width of the object         	|         	|
| bounds.height 	| number 	| The height of the object        	|         	|

So to add an object to the quadtree at (150, 200) with a width of 50 and a height of 75, you would do:

```js
superquad.add({ x: 150, y: 200, width: 50, height: 75 });
```

Now because it takes an object of bounds specification, if your game objects automatically include this information you can just add the whole game object. However, when retrieving objects from the quadtree all of the extra data will not be present.

### **get**

Gets any objects that are in the same sub-quad as the provided bounds. These are not guaranteed to be collisions so you will have to check for collisions manually.

| param         	| type   	| description                     	      | default 	|
|---------------	|--------	|---------------------------------------- |---------	|
| bounds        	| Object 	| The bounds to check for nearby objects	|         	|
| bounds.x      	| number 	| The x position of the bounds    	      |         	|
| bounds.y      	| number 	| The y position of the bounds    	      |         	|
| bounds.width  	| number 	| The width of the bounds         	      |         	|
| bounds.height 	| number 	| The height of the bounds        	      |         	|

```js
const possibleCollisions = superquad.get({ x: 5, y: 10, width: 50, height: 50 });
```

### **getIntersections**

Gets any objects whose bounds intersect with the bounds provided. This does return objects that collide with the provided bounds but if your object is circular this is not very accurate as it checks for rectangular collision only.

| param         	| type   	| description                     	      | default 	|
|---------------	|--------	|---------------------------------------- |---------	|
| bounds        	| Object 	| The bounds to check for nearby objects	|         	|
| bounds.x      	| number 	| The x position of the bounds    	      |         	|
| bounds.y      	| number 	| The y position of the bounds    	      |         	|
| bounds.width  	| number 	| The width of the bounds         	      |         	|
| bounds.height 	| number 	| The height of the bounds        	      |         	|

```js
const intersections = superquad.getIntersections({ x: 5, y: 10, width: 50, height: 50 });
```

### **getPoints**

Works in a similar fashion to `getIntersections` but instead it returns objects that collide with the bounds only if the objects are points (no width and no height).

| param         	| type   	| description                     	      | default 	|
|---------------	|--------	|---------------------------------------- |---------	|
| bounds        	| Object 	| The bounds to check for nearby points  	|         	|
| bounds.x      	| number 	| The x position of the bounds    	      |         	|
| bounds.y      	| number 	| The y position of the bounds    	      |         	|
| bounds.width  	| number 	| The width of the bounds         	      |         	|
| bounds.height 	| number 	| The height of the bounds        	      |         	|

```js
const points = superquad.getPoints({ x: 5, y: 10, width: 50, height: 50 });
```

### **clear**

Clears all objects from the each quad in the quadtree.

```js
superquad.clear();
```

## **Acknowledgements**

This package is based on Timo Hausmann [Quadtree implementation](https://github.com/timohausmann/quadtree-js) and also JamesMilnerUK's [Go Quadtree implementation](https://github.com/JamesMilnerUK/quadtree-go).

## License

MIT