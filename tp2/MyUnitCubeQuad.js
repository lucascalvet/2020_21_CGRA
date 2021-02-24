import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
	}
	
	init() {
        this.scene.quad = new MyQuad(this.scene);
    }

    display() {
        //Face Frente
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.quad.display();
        this.scene.popMatrix();

        //Face Baixo
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        //Face Esquerda
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        //Face Trás
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5); 
        //Não precisamos de rotação
        //por o nosso quad ser double sided
        this.scene.quad.display();
        this.scene.popMatrix();

        //Face Cima
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        //Face Direita
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();
    
    }
}

