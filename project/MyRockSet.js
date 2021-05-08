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
 * @param nestX - the x coordinate of the nest
 * @param nestZ - the z coordinate of the nest
 * @param nestRadius - the radius of the nest
 * 
*/
export class MyRockSet extends CGFobject {
	constructor(scene, slices, stacks, nrRocks, length, nestX, nestZ, nestRadius) {
		super(scene);
		this.rock = new MyRock(this.scene, slices, stacks);
		this.nrRocks = nrRocks;
		this.pos = [];
		this.scale = [];
		var pos;

		for (let i = 0; i < this.nrRocks; i++) {
			pos = [Math.random() * length - length/2, Math.random() * length - length/2];

			//if location inside the nest
			if((pos[0] >= nestX - 0.5 && pos[0] <= nestX + nestRadius + 0.5) && ((pos[1] >= nestZ - 0.5 && pos[1] <= nestX + nestRadius + 0.5)) ){
				pos[0] += nestRadius + 1;
				pos[1] += nestRadius + 1;
			} 

			this.pos.push(pos);
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
