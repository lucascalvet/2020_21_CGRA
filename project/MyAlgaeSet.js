import { CGFobject } from '../lib/CGF.js';
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
			this.scale.push((Math.random() * 1.5) + 0.5);
		}
	}

	display() {
		for (let i = 0; i < this.nrAlgae; i++) {
			this.scene.pushMatrix();
			this.scene.translate(this.pos[i][0], 0.8, this.pos[i][1]);
			this.scene.scale(1, this.scale[i], 1);
			this.algae.display();
			this.scene.popMatrix();
		}
	}
}
