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
		this.nrRocks = nrRocks
		var x = [];
		var z = [];
		for (let i = 0; i < this.nrRocks; i++) {
			x.push(Math.floor(Math.random() * 50) - length/2);
			z.push(Math.floor(Math.random() * 50) - length/2);
			console.log("X, Z: ", x[i]);
		}
		this.x = x;
		this.z = z;
	}

	display() {
		for (let i = 0; i < this.nrRocks; i++) {
			this.scene.pushMatrix();
			this.scene.translate(this.x[i], 1, this.z[i]);
			this.rock.display();
			this.scene.popMatrix();
		}
	}
}
