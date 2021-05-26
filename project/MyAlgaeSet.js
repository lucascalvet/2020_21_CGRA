import { CGFobject , CGFappearance } from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js';

/**
* MyAlgaeSet
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices for each algae
 * @param stacks - number of stacks for each algae
 * @param nrClusters - number of algae to be generated
 * @param length - the length of the sea floor
 * @param nestX - the x coordinate of the nest
 * @param nestZ - the z coordinate of the nest
 * @param nestRadius - the radius of the nest
*/
export class MyAlgaeSet extends CGFobject {
	constructor(scene, slices, stacks, nrClusters, length, nestX, nestZ, nestRadius) {
		super(scene);
		this.algae = new MyPyramid(this.scene, slices, stacks);
		this.nrClusters = nrClusters;
		this.nrAlgae = 0;
		this.pos = [];
		this.scale = [];
		var pos;
		for (let i = 0; i < this.nrClusters; i++) {
			pos = [Math.random() * length - length/2, Math.random() * length - length/2];

			//if location inside the nest
			if((pos[0] >= nestX - 1 && pos[0] <= nestX + nestRadius + 1) && ((pos[1] >= nestZ - 1 && pos[1] <= nestZ + nestRadius + 1)) ){
				pos[0] += nestRadius + 2;
				pos[1] += nestRadius + 2;
			} 

			this.scale.push([Math.random()*0.5 + 0.3, (Math.random() * 4) + 1, Math.random()* 0.5 + 0.5]);
			this.pos.push(pos);
			var number = Math.floor(Math.random()*4 + 1);
			for (let j = 0; j < number; j++) {
				this.scale.push([Math.random()*0.5 + 0.5, (Math.random() * 4) + 1, Math.random()*0.5 + 0.3]);

				if(j % 2 == 0){
					this.xpos = pos[0] + j + 0.2; this.zpos = pos[1] - j*0.5 - 0.2;
				}
				else{
					this.xpos = pos[0] - j * 0.5 - 0.2; this.zpos = pos[1] + j + 0.2;
				}
								
				if(this.xpos < -length/2 + 0.5) this.xpos = - length/2 + 1;
				if(this.xpos > length/2 - 0.5) this.xpos = length/2 - 1;
				if(this.zpos < -length/2 + 0.5) this.zpos = - length/2 + 1;
				if(this.zpos > length/2 - 0.5) this.zpos = length/2 - 1;
				
				this.pos.push([this.xpos, this.zpos]);

			}

			this.nrAlgae += number;
		}

		 // Algae Material 1 
		 this.scene.algaeMat1 = new CGFappearance(this.scene);
		 this.scene.algaeMat1.setAmbient(0.1, 0.1, 0.1, 1);
		 this.scene.algaeMat1.setDiffuse(0.32, 0.73, 0.39, 1);
		 this.scene.algaeMat1.setSpecular(0.1, 0.1, 0.1, 1);
		 this.scene.algaeMat1.setShininess(10.0);

		 // Algae Material 2 
		 this.scene.algaeMat2 = new CGFappearance(this.scene);
		 this.scene.algaeMat2.setAmbient(0.1, 0.1, 0.1, 1);
		 this.scene.algaeMat2.setDiffuse(0.723, 0.855, 0.234, 1);
		 this.scene.algaeMat2.setSpecular(0.1, 0.1, 0.1, 1);
		 this.scene.algaeMat2.setShininess(10.0);

		 // Algae Material 3
		 this.scene.algaeMat3 = new CGFappearance(this.scene);
		 this.scene.algaeMat3.setAmbient(0.1, 0.1, 0.1, 1);
		 this.scene.algaeMat3.setDiffuse(0.625, 0.125, 0.102, 1);
		 this.scene.algaeMat3.setSpecular(0.1, 0.1, 0.1, 1);
		 this.scene.algaeMat3.setShininess(10.0);
	}

	display() {

		
		for (let i = 0; i < this.nrAlgae; i++) {

			//For different algae colors
			var idx = i % 3;
			if(idx == 0) this.scene.algaeMat1.apply();
			else if (idx == 1) this.scene.algaeMat2.apply();
			else this.scene.algaeMat3.apply();

			this.scene.pushMatrix();
			this.scene.translate(this.pos[i][0], 0.6, this.pos[i][1]);
			this.scene.scale(this.scale[i][0], this.scale[i][1], this.scale[i][2]);
			this.scene.scale(0.3, 0.3, 0.3);
			this.algae.display();
			this.scene.popMatrix();
		}
	}
}
