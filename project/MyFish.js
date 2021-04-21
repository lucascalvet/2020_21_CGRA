import { CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MySphere } from "./MySphere.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFish extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
	}
	
	init() {
        this.scene.left_fin = new MyTriangle(this.scene);
        this.scene.right_fin = new MyTriangle(this.scene);
        this.scene.top_fin = new MyTriangle(this.scene);
        this.scene.tail = new MyTriangleBig(this.scene);
        this.scene.body = new MySphere(this.scene, 16, 16);
        this.scene.left_eye = new MySphere(this.scene, 16, 16);
        this.scene.right_eye = new MySphere(this.scene, 16, 16);

        // Texture Material
        this.scene.scales = new CGFappearance(this.scene);
        this.scene.scales.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.scales.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.scales.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.scales.setShininess(10.0);
        // this.scene.scales.loadTexture('images/part-b-images/scales.png');
        // this.scene.scales.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        this.scene.scales.apply();
        
    }

    enableNormalViz() {
        this.scene.diamond.enableNormalViz();
        this.scene.triangle.enableNormalViz();
        this.scene.triangleBig.enableNormalViz();
        this.scene.triangleSmall.enableNormalViz();
        this.scene.parallelogram.enableNormalViz();
    }

    disableNormalViz() {
        this.scene.diamond.disableNormalViz();
        this.scene.triangle.disableNormalViz();
        this.scene.triangleBig.disableNormalViz();
        this.scene.triangleSmall.disableNormalViz();
        this.scene.parallelogram.disableNormalViz();
    }

}
