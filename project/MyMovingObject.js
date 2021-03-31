import { CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyPyramid } from "./MyPyramid.js";

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
	}
	
	init() {
        this.scene.pyramid = new MyPyramid(this.scene, 4, 1);
    }

    display(){

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(1, 2, 1);
        this.scene.translate(0, -0.5, 0);
        this.scene.pyramid.display();
        this.scene.popMatrix();
    }

}
