import { CGFobject, CGFtexture, CGFappearance, CGFshader } from '../lib/CGF.js';
/**
* MySeaFloor
* @constructor
 * @param scene - Reference to MyScene object
 * @param nrDivs - number of divisions in both directions of the surface
 * @param length - the length of both directions of the surface
 * @param maxHeight - the maximum height of the sea floor
*/
export class MySeaShell extends CGFobject {
	constructor(scene, nrDivs, coordX, coordZ, radius) {
		super(scene);
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.coordX = coordX;
		this.coordZ = coordZ;
		this.radius = radius;
		this.patchLength = radius / nrDivs;
		this.initBuffers();
		this.shader = new CGFshader(this.scene.gl, "shaders/seashell.vert", "shaders/seashell.frag");
		this.shader.setUniformsValues({ uSampler2: 1 });

		// Textures
		this.shellTexture = new CGFtexture(this.scene, 'images/part-b-images/seashell.png');
		this.shellMapTexture = new CGFtexture(this.scene, 'images/part-b-images/seashellMap.png');
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

	display() {
		this.shellTexture.bind(0);
		this.shellMapTexture.bind(1);
		this.scene.setActiveShader(this.shader);
		super.display();
		this.scene.setActiveShader(this.scene.defaultShader);
	}
}
