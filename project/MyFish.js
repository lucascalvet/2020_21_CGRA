import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MySphere } from "./MySphere.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFish extends CGFobject {
	constructor(scene, bodyRatio, color, texturePath) {
		super(scene);
        this.ratio = bodyRatio;
        this.body_color = color;
        this.texture = texturePath;

        this.alphaLeft = Math.PI/6; //Left Fin Angle
        this.alphaRight = Math.PI/6; //Right Fin Angle
        this.theta = 0; //Tail Angle
        this.upLeft = true;
        this.upRight = true;
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
        this.scales = new CGFappearance(this.scene);
        this.scales.setAmbient(0.5, 0.5, 0.5, 1);
        this.scales.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scales.setSpecular(0.1, 0.1, 0.1, 1);
        this.scales.setShininess(10.0);
        this.scales.loadTexture(this.texture);
        this.scales.setTextureWrap('REPEAT', 'REPEAT');

        //Body Shader
        this.body_shader = new CGFshader(this.scene.gl, "shaders/lightCustom.vert", "shaders/body.frag");
  
        //Fish Color Material
        this.fish_color = new CGFappearance(this.scene);
        this.fish_color.setAmbient(this.body_color[0], this.body_color[1], this.body_color[2], this.body_color[3]);
        this.fish_color.setDiffuse(this.body_color[0], this.body_color[1], this.body_color[2], this.body_color[3]);
        this.fish_color.setSpecular(this.body_color[0], this.body_color[1], this.body_color[2], this.body_color[3]);
        this.fish_color.setShininess(10.0);
    }

    display() {

        this.scene.pushMatrix();
        //this rotate is necessary because the fish was designed with the front to the negative x
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        //it puts the front of the fish in positive z

        //this.scene.body_shader.setUniformsValues({bodyHeadRatio : this.ratio , colorBody: this.body_color, isNight: this.scene.night});
        this.body_shader.setUniformsValues({bodyHeadRatio : this.ratio , colorBody: this.body_color, isNight: this.scene.night});

        this.scales.apply();
        this.scene.setActiveShader(this.body_shader);
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.18, 0.125); //0.25 porque o comprimento inicial do peixe era 2
        this.scene.body.display();
        this.scene.popMatrix();

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

        this.fish_color.apply();

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
        this.scene.rotate(-this.alphaLeft, 1, 0, 0);
        this.scene.translate(1, -1, 0);
        this.scene.left_fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.03, -0.01, -0.1225);
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.rotate(this.alphaRight, 1, 0, 0);
        this.scene.translate(1, -1, 0);
        this.scene.right_fin.display();
        this.scene.popMatrix();
        
        this.scene.popMatrix();
        
    }

    update(t, velocity, turnState){

        //left fin animation
        if (turnState != "left") {

            if (this.upLeft)
                this.alphaLeft += Math.sin(t / 1000.0);
            else
                this.alphaLeft -= Math.sin(t / 1000.0);

            if (this.alphaLeft >= Math.PI / 3) {
                this.alphaLeft %= Math.PI / 3 + 0.1;
                this.upLeft = false;
            }

            if (this.alphaLeft <= Math.PI / 15) {
                this.upLeft = true;
            }
        }

        //right fin animation
        if (turnState != "right") {
            if (this.upRight)
                this.alphaRight += Math.sin(t / 1000.0);
            else
                this.alphaRight -= Math.sin(t / 1000.0);

            if (this.alphaRight >= Math.PI / 3) {
                this.alphaRight %= Math.PI / 3 + 0.1;
                this.upRight = false;
            }

            if (this.alphaRight <= Math.PI / 15) {
                this.upRight = true;
            }
        }

        if(turnState == "idle")
            this.alphaLeft = this.alphaRight;

        //tail animation
        if(this.right)
            this.theta += (velocity + 1.0) * Math.sin(t/550.0);
        else
            this.theta -= (velocity + 1.0) * Math.sin(t/550.0);
        
        if(this.theta >= 0.35){
            this.theta %= 1.92 + 0.1 ;
            this.right = false;
        }

        if(this.theta <= -0.35){
            this.right = true;
        }
    }
}
