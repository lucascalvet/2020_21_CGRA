import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
	}
	
	init() {
        this.scene.diamond = new MyDiamond(this.scene);
        this.scene.triangle = new MyTriangle(this.scene);
        this.scene.parallelogram = new MyParallelogram(this.scene);
        this.scene.triangleSmall = new MyTriangleSmall(this.scene);
        this.scene.triangleBig = new MyTriangleBig(this.scene);
	}

    display() {

        var trans1 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            3.3, 2.3, 0.0, 1.0, //tx, ty, tz, 1
        ];

        //Diamond Green
        this.scene.pushMatrix();
        this.scene.multMatrix(trans1);
        this.scene.diamond.display();
        this.scene.popMatrix();

        //Triangle Big Blue
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), Math.sqrt(2), 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.triangleBig.display();
        this.scene.popMatrix();

        //Triangle Big Orange
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.triangleBig.display();
        this.scene.popMatrix();

        //Triangle Medium(?) Pink
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), 0, 0);
        this.scene.rotate(5 * Math.PI / 4, 0, 0, 1);
        this.scene.triangle.display();
        this.scene.popMatrix();

        //Triangle Small Red
        this.scene.pushMatrix();
        this.scene.translate(3 * Math.sqrt(2) / 2, -Math.sqrt(2) / 2, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.triangleSmall.display();
        this.scene.popMatrix();

        //Triangle Small Purple
        this.scene.pushMatrix();
        this.scene.translate(0, -1.6, 0);
        this.scene.translate(Math.sqrt(2), 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.triangleSmall.display();
        this.scene.popMatrix();

        //Parallelogram Yellow
        this.scene.pushMatrix();
        this.scene.translate(0, -2.5, 0);
        this.scene.scale(-1, 1, 1); //"reflexão"
        this.scene.parallelogram.display();
        this.scene.popMatrix();
    }
}
