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
		this.positions = [];
		this.scale = [];
		this.fishRockIdx = -1;
		this.fishRockPos = [];

		this.maxRocksNest = 7;
		this.numNestRocks = 0;
		this.nestRocksIdxs = [];
		this.nestRocksPos = [
			[nestX + nestRadius * 0.5, 0.55, nestZ + nestRadius *0.5],//0 
			[nestX + nestRadius * 0.15, 0.9, nestZ + nestRadius * 0.5],//1
			[nestX + nestRadius * 0.85, 0.9, nestZ + nestRadius * 0.5],//2
			[nestX + nestRadius * 0.3 , 0.9, nestZ + nestRadius * 0.15],//3
			[nestX + nestRadius * 0.6, 0.9, nestZ + nestRadius * 0.85],//4
			[nestX + nestRadius * 0.3, 0.9, nestZ + nestRadius * 0.85],//5
			[nestX + nestRadius * 0.6, 0.9, nestZ + nestRadius * 0.15] //6
		];

		var pos;

		for (let i = 0; i < this.nrRocks; i++) {
			pos = [Math.random() * length - length/2, Math.random() * length - length/2];

			//if location inside the nest
			if((pos[0] >= nestX - 1 && pos[0] <= nestX + nestRadius + 1) && ((pos[1] >= nestZ - 1 && pos[1] <= nestZ + nestRadius + 1)) ){
				pos[0] += nestRadius + 2;
				pos[1] += nestRadius + 2;
			} 

			this.positions.push(pos);
			this.scale.push([(Math.random() + 1), (Math.random() + 1), (Math.random() + 1)]);
		}
	}

	display() {
		for (let i = 0; i < this.nrRocks; i++) {
			var rockFoundNest = false;

			this.scene.pushMatrix();
			
			if (i == this.fishRockIdx)
				this.scene.translate(this.fishRockPos[0], this.fishRockPos[1], this.fishRockPos[2]);
			else{
				for (let k = 0; k < this.numNestRocks; k++){
					if (i == this.nestRocksIdxs[k]) {
						this.scene.translate(this.nestRocksPos[k][0], this.nestRocksPos[k][1], this.nestRocksPos[k][2]);
						rockFoundNest = true;
						break;
					}
				}

				if(!rockFoundNest)
					this.scene.translate(this.positions[i][0], 0.7, this.positions[i][1]);
			}
				
			
			this.scene.scale(this.scale[i][0], this.scale[i][1], this.scale[i][2]);
			this.scene.scale(0.15, 0.15, 0.15);
			this.rock.display();
			this.scene.popMatrix();
		}
	}
}