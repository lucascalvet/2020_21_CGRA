import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,	//0a
			-0.5, -0.5, 0.5,	//1a
			-0.5, 0.5, -0.5,	//2a
			-0.5, 0.5, 0.5,		//3a
			0.5, -0.5, -0.5,	//4a
			0.5, -0.5, 0.5,		//5a
			0.5, 0.5, -0.5,		//6a
			0.5, 0.5, 0.5,		//7a
			-0.5, -0.5, -0.5,	//0b
			-0.5, -0.5, -0.5,	//0c
			-0.5, -0.5, 0.5,	//1b
			-0.5, -0.5, 0.5,	//1c
			-0.5, 0.5, -0.5,	//2b
			-0.5, 0.5, -0.5,	//2c
			-0.5, 0.5, 0.5,		//3b
			-0.5, 0.5, 0.5,		//3c
			0.5, -0.5, -0.5,	//4b
			0.5, -0.5, -0.5,	//4c
			0.5, -0.5, 0.5,		//5b
			0.5, -0.5, 0.5,		//5c
			0.5, 0.5, -0.5,		//6b
			0.5, 0.5, -0.5,		//6c
			0.5, 0.5, 0.5,		//7b
			0.5, 0.5, 0.5		//7c
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1, 3, 2,
			0, 1, 2,
			0, 4, 1,
			4, 5, 1,
			0, 6, 4,
			0, 2, 6,
			1, 5, 3,
			7, 3, 5,
			3, 7, 2,
			7, 6, 2,
			5, 4, 7,
			4, 6, 7
		];

		this.normals = [
			-1, 0, 0,	//0a
			-1, 0, 0,	//1a
			-1, 0, 0,	//2a
			-1, 0, 0,	//3a
			0, 0, -1,	//4a
			0, -1, 0,	//5a
			0, 1, 0,	//6a
			0, 1, 0,	//7a
			0, -1, 0,	//0b
			0, 0, -1,	//0c
			0, -1, 0,	//1b
			0, 0, 1,	//1c
			0, 1, 0,	//2b
			0, 0, -1,	//2c
			0, 1, 0,	//3b
			0, 0, 1,	//3c
			0, -1, 0,	//4b
			1, 0, 0,	//4c
			0, 0, 1,	//5b
			1, 0, 0,	//5c
			0, 0, -1,	//6b
			1, 0, 0,	//6c
			1, 0, 0,	//7b
			0, 0, 1		//7c
		]
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

