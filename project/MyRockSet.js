import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

/**
* MySeaFloor
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices for each rock
 * @param stacks - number of stacks for each rock
 * @param nrRocks - number of rocks to be generated
 * @param length - the length of the sea floor
*/
export class MyRockSet extends CGFobject {
	constructor(scene, slices, stacks, nrRocks, length) {
		super(scene);
		this.rock = new MyRock(this.scene, slices, stacks);
		this.nrRocks = nrRocks;
		this.pos = [];
		this.scale = [];
		for (let i = 0; i < this.nrRocks; i++) {
			this.pos.push([Math.random() * length - length/2, Math.random() * length - length/2]);
			this.scale.push([(Math.random() + 1) / 2, (Math.random() + 1) / 2, (Math.random() + 1) / 2]);
		}
	}

	display() {
		for (let i = 0; i < this.nrRocks; i++) {
			this.scene.pushMatrix();
			this.scene.translate(this.pos[i][0], 0.7, this.pos[i][1]);
			this.scene.scale(this.scale[i][0], this.scale[i][1], this.scale[i][2]);
			this.scene.scale(0.5, 0.5, 0.5);
			this.rock.display();
			this.scene.popMatrix();
		}
	}
}
