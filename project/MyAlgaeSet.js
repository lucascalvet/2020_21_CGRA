import { CGFobject , CGFappearance} from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js';

/**
* MyAlgaeSet
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices for each algae
 * @param stacks - number of stacks for each algae
 * @param nrClusters - number of algae to be generated
 * @param length - the length of the sea floor
*/
export class MyAlgaeSet extends CGFobject {
	constructor(scene, slices, stacks, nrClusters, length) {
		super(scene);
		this.algae = new MyPyramid(this.scene, slices, stacks);
		this.nrClusters = nrClusters;
		this.nrAlgae = 0;
		this.pos = [];
		this.scale = [];
		var pos;
		for (let i = 0; i < this.nrClusters; i++) {
			pos = [Math.random() * length - length/2, Math.random() * length - length/2];
			this.scale.push((Math.random() * 4) + 1);
			this.pos.push(pos);
			var number = Math.floor(Math.random()*4 + 1);
			for (let j = 0; j < number; j++) {
				this.scale.push((Math.random() * 4) + 1);

				if(j % 2 == 0){
					this.xpos = pos[0] + j; this.zpos = pos[1] - j*0.5;
				}
				else{
					this.xpos = pos[0] - j * 0.5; this.zpos = pos[1] + j;
				}
								
				if(this.xpos < -length/2 + 0.5) this.xpos = - length/2 + 1;
				if(this.xpos > length/2 - 0.5) this.xpos = length/2 - 1;
				if(this.zpos < -length/2 + 0.5) this.zpos = - length/2 + 1;
				if(this.zpos > length/2 - 0.5) this.zpos = length/2 - 1;
				
				this.pos.push([this.xpos, this.zpos]);

			}

			this.nrAlgae += number;
		}

		 // Algae Material
		 this.scene.algaeMat = new CGFappearance(this.scene);
		 this.scene.algaeMat.setAmbient(0.1, 0.1, 0.1, 1);
		 this.scene.algaeMat.setDiffuse(0.32, 0.73, 0.39, 1);
		 this.scene.algaeMat.setSpecular(0.1, 0.1, 0.1, 1);
		 this.scene.algaeMat.setShininess(10.0);
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
