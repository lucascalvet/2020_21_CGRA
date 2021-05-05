import { CGFobject, CGFtexture, CGFappearance, CGFshader } from '../lib/CGF.js';
/**
* MyWaterSurf
* @constructor
 * @param scene - Reference to MyScene object
 * @param nrDivs - number of divisions in both directions of the surface
 * @param length - the length of both directions of the surface
 * @param maxHeight - the maximum height of the water surface
*/
export class MyWaterSurf extends CGFobject {
	constructor(scene, nrDivs, length, WaterLevel) {
		super(scene);
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.length = length;
		this.patchLength = length / nrDivs;

        this.height = WaterLevel;

		this.shader = new CGFshader(this.scene.gl, "shaders/waterSurf.vert", "shaders/waterSurf.frag");
		this.shader.setUniformsValues({ uSampler: 0 , uSampler1: 1, uSampler2: 2, night: 0});

		// Textures
		this.pierTex = new CGFtexture(this.scene, 'images/part-b-images/pier.jpg');  //- DAY
		this.pierTexNight = new CGFtexture(this.scene, 'images/part-b-images/pier_night.jpg'); //- NIGHT

		this.waterDistMapTex = new CGFtexture(this.scene, 'images/part-b-images/distortionmap.png');

		//Pier Appearence - for time cicle of the image
		this.pierApp = new CGFappearance(this.scene);
        this.pierApp.setAmbient(0.1, 0.1, 0.1, 1);
        this.pierApp.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pierApp.setSpecular(0.1, 0.1, 0.1, 1);
        this.pierApp.setShininess(10.0);
		this.pierApp.setTexture(this.pierTex);
		this.pierApp.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		var zCoord = - this.length / 2.0;
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = - this.length / 2.0;
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
		this.pierTex.bind(0);	
		this.waterDistMapTex.bind(1);
		this.pierTexNight.bind(2);

		this.pierApp.apply();

		this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.translate(0, this.height, 0);
		this.scene.rotate(Math.PI, 1, 0, 0);
        super.display();
        this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader);
	}

    update(t, night){
        this.shader.setUniformsValues({ timeFactor: t / 100 % 100 , isNight : night});
    }
}