import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, texCoords) {
		super(scene);
		this.initBuffers(texCoords);
	}
	
	initBuffers(texCoords) {
		this.vertices = [
			-1, 0, 0,	//0
			0, 1, 0,	//1
			1, 0, 0, 	//2
			-1, 0, 0,	//0b
			0, 1, 0,	//1b
			1, 0, 0 	//2b
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
            0, 1, 2
		];

		this.normals = [
			0, 0, 1,	//0
			0, 0, 1,	//1
			0, 0, 1, 	//2
			0, 0, -1,	//0b
			0, 0, -1,	//1b
			0, 0, -1 	//2b
		];

		this.texCoords = [
			texCoords[0], texCoords[1], //0
			texCoords[2], texCoords[3], //1
			texCoords[4], texCoords[5], //2
			texCoords[0], texCoords[1], //0a
			texCoords[2], texCoords[3], //1a
			texCoords[4], texCoords[5] //2a
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

