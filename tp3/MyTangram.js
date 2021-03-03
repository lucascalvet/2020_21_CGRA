import { CGFobject, CGFappearance} from '../lib/CGF.js';
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
	
        // Green Material
        this.scene.greenMaterial = new CGFappearance(this.scene);
        this.scene.greenMaterial.setAmbient(...this.scene.hexToRgbA('#00ff00'));
        this.scene.greenMaterial.setDiffuse(...this.scene.hexToRgbA('#00aa00'));
        this.scene.greenMaterial.setSpecular(...this.scene.hexToRgbA('#005500'));
        this.scene.greenMaterial.setShininess(10.0);

        // Red Material
        this.scene.redMaterial = new CGFappearance(this.scene);
        this.scene.redMaterial.setAmbient(...this.scene.hexToRgbA('#ff1b1b'));
        this.scene.redMaterial.setDiffuse(...this.scene.hexToRgbA('#ff7575'));
        this.scene.redMaterial.setSpecular(...this.scene.hexToRgbA('#ffa8a8'));
        this.scene.redMaterial.setShininess(10.0);

        // Purple Material
        this.scene.purpleMaterial = new CGFappearance(this.scene);
        this.scene.purpleMaterial.setAmbient(...this.scene.hexToRgbA('#9650be'));
        this.scene.purpleMaterial.setDiffuse(...this.scene.hexToRgbA('#a073ba'));
        this.scene.purpleMaterial.setSpecular(...this.scene.hexToRgbA('#a991b8'));
        this.scene.purpleMaterial.setShininess(10.0);

        // Yellow Material
        this.scene.yellowMaterial = new CGFappearance(this.scene);
        this.scene.yellowMaterial.setAmbient(...this.scene.hexToRgbA('#ffff00'));
        this.scene.yellowMaterial.setDiffuse(...this.scene.hexToRgbA('#ffff3b'));
        this.scene.yellowMaterial.setSpecular(...this.scene.hexToRgbA('#ffff6e'));
        this.scene.yellowMaterial.setShininess(10.0);

        // Blue Material
        this.scene.blueMaterial = new CGFappearance(this.scene);
        this.scene.blueMaterial.setAmbient(...this.scene.hexToRgbA('#009bff'));
        this.scene.blueMaterial.setDiffuse(...this.scene.hexToRgbA('#30aeff'));
        this.scene.blueMaterial.setSpecular(...this.scene.hexToRgbA('#5ec0ff'));
        this.scene.blueMaterial.setShininess(10.0);

        // Orange Material
        this.scene.orangeMaterial = new CGFappearance(this.scene);
        this.scene.orangeMaterial.setAmbient(...this.scene.hexToRgbA('#ff9b00'));
        this.scene.orangeMaterial.setDiffuse(...this.scene.hexToRgbA('#ffb33d'));
        this.scene.orangeMaterial.setSpecular(...this.scene.hexToRgbA('#ffc161'));
        this.scene.orangeMaterial.setShininess(10.0);

        // Pink Material
        this.scene.pinkMaterial = new CGFappearance(this.scene);
        this.scene.pinkMaterial.setAmbient(...this.scene.hexToRgbA('#ff9bcf'));
        this.scene.pinkMaterial.setDiffuse(...this.scene.hexToRgbA('#ffc4e3'));
        this.scene.pinkMaterial.setSpecular(...this.scene.hexToRgbA('#ffe8f4'));
        this.scene.pinkMaterial.setShininess(10.0);
    
    
    }

    display() {

        var trans1 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            3.3, 2.3, 0.0, 1.0, //tx, ty, tz, 1
        ];

        //Diamond Green
        if(this.scene.diamondCustom) this.scene.customMaterial.apply();
        else this.scene.greenMaterial.apply();
        
        this.scene.pushMatrix();
        this.scene.multMatrix(trans1);
        this.scene.diamond.display();
        this.scene.popMatrix();

        //Triangle Big Blue
        this.scene.blueMaterial.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), Math.sqrt(2), 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.triangleBig.display();
        this.scene.popMatrix();

        //Triangle Big Orange
        this.scene.orangeMaterial.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.triangleBig.display();
        this.scene.popMatrix();

        //Triangle Pink
        this.scene.pinkMaterial.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), 0, 0);
        this.scene.rotate(5 * Math.PI / 4, 0, 0, 1);
        this.scene.triangle.display();
        this.scene.popMatrix();

        //Triangle Small Red
        this.scene.redMaterial.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(3 * Math.sqrt(2) / 2, -Math.sqrt(2) / 2, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.triangleSmall.display();
        this.scene.popMatrix();
        
        //Triangle Small Purple
        this.scene.purpleMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.6, 0);
        this.scene.translate(Math.sqrt(2), 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.triangleSmall.display();
        this.scene.popMatrix();
        
        //Parallelogram Yellow
        this.scene.yellowMaterial.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0, -2.5, 0);
        this.scene.scale(-1, 1, 1); //"reflexão"
        this.scene.parallelogram.display();
        this.scene.popMatrix();
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
