import { CGFobject } from '../lib/CGF.js';

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
	constructor(scene, object) {
		super(scene);
		this.init();
        this.alpha = 0;
        this.velocity = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
	
	init(object) {
        this.object = object;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.alpha, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(1, 2, 1);
        this.scene.translate(0, -0.5, 0);
        this.object.display();
        this.scene.popMatrix();
    }

    update(t){
        this.x = this.x + Math.sin(this.alpha) * (this.velocity * t/1000.0) * this.scene.speedFactor;
        this.y = this.y;
        this.z = this.z + Math.cos(this.alpha) * (this.velocity * t/1000.0) * this.scene.speedFactor;
    }

    turn(val){
        this.alpha += val;
    }

    accelerate(val){
        this.velocity += val;
    }

    reset(){
        this.alpha = 0;
        this.velocity = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}
