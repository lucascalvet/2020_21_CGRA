import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from "./MyCylinder.js";

/**
 * MyPillar
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPillar extends CGFobject {
	constructor(scene, x, y, z, radius, height) {
		super(scene);

        this.centerX = x;
        this.centerY = y;
        this.centerZ = z;
        this.radius = radius;

		this.init(height);
	}
	
	init(height) {
        this.cylinderPillar = new MyCylinder(this.scene, 16, height); //definir aqui as slices do cilindro base do pilar
    }

    display() {

        this.scene.PillarMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.centerX, this.centerY, this.centerZ);
        this.scene.scale(this.radius, 1, this.radius);
        this.cylinderPillar.display();
        this.scene.popMatrix();
    }
}

