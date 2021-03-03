import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 1, 0,	//1
			2, 0, 0,	//2
            3, 1, 0,	//3
			0, 0, 0,	//0b
			1, 1, 0,	//1b
			2, 0, 0,	//2b
            3, 1, 0		//3b
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
            0, 1, 2,
            1, 2, 3,
            3, 2, 1
		];

		this.normals = [
			0, 0, 1,	//0
			0, 0, 1,	//1
			0, 0, 1,	//2
			0, 0, 1,	//3
			0, 0, -1,	//0b
			0, 0, -1,	//1b
			0, 0, -1,	//2b
            0, 0, -1	//3b
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

