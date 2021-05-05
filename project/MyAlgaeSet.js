import { CGFobject , CGFappearance} from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js';

/**
* MySeaFloor
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices for each algae
 * @param stacks - number of stacks for each algae
 * @param nrAlgae - number of algae to be generated
 * @param length - the length of the sea floor
*/
export class MyAlgaeSet extends CGFobject {
	constructor(scene, slices, stacks, nrAlgae, length) {
		super(scene);
		this.algae = new MyPyramid(this.scene, slices, stacks);
		this.nrAlgae = nrAlgae;
		this.pos = [];
		this.scale = [];
		for (let i = 0; i < this.nrAlgae; i++) {
			this.pos.push([Math.random() * length - length/2, Math.random() * length - length/2]);
			this.scale.push((Math.random() * 4) + 1);
		}

		 // Algae Material
		 this.scene.algaeMat = new CGFappearance(this.scene);
		 this.scene.algaeMat.setAmbient(0.1, 0.1, 0.1, 1);
		 this.scene.algaeMat.setDiffuse(0.32, 0.73, 0.39, 1);
		 this.scene.algaeMat.setSpecular(0.1, 0.1, 0.1, 1);
		 this.scene.algaeMat.setShininess(10.0);
		//  this.scene.algaeMat.loadTexture('images/part-b-images/fish_eye.png');
		//  this.scene.algaeMat.setTextureWrap('REPEAT', 'REPEAT');
	}

	display() {

		this.scene.algaeMat.apply();

		for (let i = 0; i < this.nrAlgae; i++) {
			this.scene.pushMatrix();
			this.scene.translate(this.pos[i][0], 0.8, this.pos[i][1]);
			this.scene.scale(1, this.scale[i], 1);
			this.scene.scale(0.3, 0.3, 0.3);
			this.algae.display();
			this.scene.popMatrix();
		}
	}
}
