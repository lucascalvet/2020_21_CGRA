import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MySphere } from "./MySphere.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFish extends CGFobject {
	constructor(scene, bodyRatio, shader) {
		super(scene);
        this.ratio = bodyRatio;
        this.shader = shader;
        this.alpha = Math.PI/6; //Left & Right Fin Angles
        this.theta = 0; //Tail Angle
        this.up = true;
        this.right = true;
        
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

        // Scales Texture Material
        this.scene.scales = new CGFappearance(this.scene);
        this.scene.scales.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.scales.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.scales.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.scales.setShininess(10.0);
        this.scene.scales.loadTexture('images/part-b-images/scales.png');
        this.scene.scales.setTextureWrap('REPEAT', 'REPEAT');

        // FishEye Texture Material
        this.scene.eye_tex = new CGFappearance(this.scene);
        this.scene.eye_tex.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.eye_tex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.eye_tex.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.eye_tex.setShininess(10.0);
        this.scene.eye_tex.loadTexture('images/part-b-images/fish_eye.png');
        this.scene.eye_tex.setTextureWrap('REPEAT', 'REPEAT');
  
        //Fish Color Material
        this.scene.fish_color = new CGFappearance(this.scene);
        this.scene.fish_color.setAmbient(1.0, 0.6863, 0.2510, 1.0);
        this.scene.fish_color.setDiffuse(1.0, 0.6863, 0.2510, 1.0);
        this.scene.fish_color.setSpecular(1.0, 0.6863, 0.2510, 1.0);
        this.scene.fish_color.setShininess(10.0);
    }

    display() {

        this.scene.scales.apply();
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.18, 0.125); //0.25 porque o comprimento inicial do peixe era 2
        this.scene.body.display();
        this.scene.popMatrix();

        //rever como está o shader

        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.eye_tex.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.10, 0.06, 0.095);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.035, 0.035, 0.035);
        this.scene.left_eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.10, 0.06, -0.095);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.035, 0.035, 0.035);
        this.scene.right_eye.display();
        this.scene.popMatrix();

        this.scene.fish_color.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.05, 0.175, 0);
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(1, 1, 0);
        this.scene.top_fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.25, 0, 0);
        this.scene.scale(0.09, 0.09, 0.09);
        this.scene.rotate(this.theta, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0,-2, 0);
        this.scene.tail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.03, -0.01, 0.1225);
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.rotate(-this.alpha, 1, 0, 0);
        this.scene.translate(1, -1, 0);
        this.scene.left_fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.03, -0.01, -0.1225);
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.rotate(this.alpha, 1, 0, 0);
        this.scene.translate(1, -1, 0);
        this.scene.right_fin.display();
        this.scene.popMatrix();
        
    }

    update(t){

        //fin animation
        if(this.up)
            this.alpha += Math.sin(t/1000.0);
        else
            this.alpha -= Math.sin(t/1000.0);
            
        if(this.alpha >= Math.PI/3){
            this.alpha %= Math.PI/3 + 0.1 ;
            this.up = false;
        }

        if(this.alpha <= Math.PI/15){
            this.up = true;
        }

        //tail animation
        if(this.right)
            this.theta += Math.sin(t/550.0);
        else
            this.theta -= Math.sin(t/550.0);
        
        if(this.theta >= 0.35){
            this.theta %= 1.92 + 0.1 ;
            this.right = false;
        }

        if(this.theta <= -0.35){
            this.right = true;
        }
    }
}
