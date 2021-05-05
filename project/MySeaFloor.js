import { CGFobject, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
* MySeaFloor
* @constructor
 * @param scene - Reference to MyScene object
 * @param nrDivs - number of divisions in both directions of the surface
 * @param length - the length of both directions of the surface
 * @param maxHeight - the maximum height of the sea floor
 * @param nrDivsNest - number of divisions in both directions of the nest
 * @param nestX - the x coordinate of the nest
 * @param nestZ - the z coordinate of the nest
 * @param nestRadius - the radius of the nest
*/
export class MySeaFloor extends CGFobject {
	constructor(scene, nrDivs, length, maxHeight, nrDivsNest, nestX, nestZ, nestRadius) {
		super(scene);
		this.seafloor = new MyPlane(scene, nrDivs, -length/2, -length/2, length);
		this.seashell = new MyPlane(scene, nrDivsNest, nestX, nestZ, nestRadius);
		this.floorshader = new CGFshader(this.scene.gl, "shaders/seafloor.vert", "shaders/seafloor.frag");
		this.floorshader.setUniformsValues({ uSampler2: 1, uSampler3: 2, maxHeight: maxHeight, nestX: nestX, nestZ: nestZ, nestRadius: nestRadius});
		this.shellshader = new CGFshader(this.scene.gl, "shaders/seashell.vert", "shaders/seashell.frag");
		this.floorshader.setUniformsValues({ uSampler2: 1, uSampler3: 2, maxHeight: maxHeight, length: length, nestX: nestX, nestZ: nestZ, nestRadius: nestRadius});
		// Textures
		this.sandTexture = new CGFtexture(this.scene, 'images/part-b-images/sand.png');
		this.sandMapTexture = new CGFtexture(this.scene, 'images/part-b-images/sandMapCustom.png');
		this.shellTexture = new CGFtexture(this.scene, 'images/part-b-images/seashell.png');
		this.shellMapTexture = new CGFtexture(this.scene, 'images/part-b-images/seashellMap.png');
	}

	display() {
		this.sandTexture.bind(0);
		this.sandMapTexture.bind(1);
		this.shellTexture.bind(2);
		this.scene.setActiveShader(this.floorshader);
		this.seafloor.display();
		this.shellTexture.bind(0);
		this.shellMapTexture.bind(1);
		this.sandMapTexture.bind(2);
		this.scene.setActiveShader(this.shellshader);
		this.seashell.display();
		this.scene.setActiveShader(this.scene.defaultShader);
	}
}
