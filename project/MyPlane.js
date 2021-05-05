import { CGFobject } from '../lib/CGF.js';
/**
* MySeaFloor
* @constructor
 * @param scene - Reference to MyScene object
 * @param nrDivs - number of divisions in both directions of the surface
 * @param coordX - the x coordinate of the upper left vertex of the plane
 * @param coordZ - the z coordinate of the upper left vertex of the plane
 * @param length - the length of both directions of the surface
*/
export class MyPlane extends CGFobject {
	constructor(scene, nrDivs, coordX, coordZ, length) {
		super(scene);
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.coordX = coordX;
		this.coordZ = coordZ;
		this.patchLength = length / nrDivs;
		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		var zCoord = this.coordZ;
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = this.coordX;
			for (var i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, 0, zCoord);
				this.normals.push(0, 1, 0);
				this.texCoords.push(i / this.nrDivs, j / this.nrDivs);
				xCoord += this.patchLength;
			}
			zCoord += this.patchLength;
		}
		// Generating indices
		this.indices = [];

		var ind = 0;
		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);
				ind++;
			}
			if (j + 1 < this.nrDivs) {
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}
}
