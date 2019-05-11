# Superquad

Superquad is yet another quadtree implementation for JavaScript that hopes to provide some additional functionality on top of standard quadtree implementations.

Superquad is always being improved with much more functionality including the ability to perform collision checks on objects that are not rectangular so stay tuned!

## **Install**

Superquad is offered as both a Node package and an ES6 module. To download Superquad through npm, use:

```bash
$ npm install Superquad
```

and to use it, you can either require it or import it if you're in a browser environment:

In Node.js:
```js
const Superquad = require('Superquad');
```

In a browser environment:
```js
import Superquad from './path/to/Superquad.js';
```

## **Usage**

To create a new quadtree, you have to create a new instance of Superquad like so:

```js
const superquad = new Superquad();
```

For now there are two options that can be provided upon initalization:

| param      	| type   	| description                                                             	| default 	|
|------------	|--------	|-------------------------------------------------------------------------	|---------	|
| maxObjects 	| number 	| The amount of objects a quad can hold before it splits into 4 sub-quads 	| 10      	|
| maxLevels  	| number 	| The number of sub-quads a quad can have.                                	| 4       	|

So let's say you want to have 20 objects in the quad before it splits into sub-quad, you could do:

```js
const superquad = new Superquad({ maxObjects: 20 });
```

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