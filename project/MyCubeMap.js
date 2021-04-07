import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
	constructor(scene, top, front, right, back, left, bottom) {
		super(scene);
		this.init(top, front, right, back, left, bottom);
	}
	
	init(top, front, right, back, left, bottom) {

        this.scene.quadTText = top;
        this.scene.quadFText = front;
        this.scene.quadRText = right;
        this.scene.quadBKText = back;
        this.scene.quadLText = left;
        this.scene.quadBTText = bottom;

        //Textura
        this.scene.CquadMaterial = new CGFappearance(this.scene);
        this.scene.CquadMaterial.setAmbient(0.0, 0.0, 0.0, 1);
        this.scene.CquadMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.scene.CquadMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.scene.CquadMaterial.setEmission(0.9, 0.9, 0.9, 1)
        this.scene.CquadMaterial.setShininess(10.0);
        this.scene.CquadMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.scene.quad = new MyQuad(this.scene);
    }

    display() {
        //Face Frente
        if(this.scene.useNearest) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        if (this.scene.quadFTex !== 'undefined')
            this.scene.CquadMaterial.setTexture(this.scene.quadFText);
        else
            this.scene.CquadMaterial.setTexture(null);
        this.scene.CquadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(500, 500, 500);
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        //Face Baixo
        if(this.scene.useNearest) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        if (this.scene.quadBTText !== 'undefined')
            this.scene.CquadMaterial.setTexture(this.scene.quadBTText);
        else
            this.scene.CquadMaterial.setTexture(null);
        this.scene.CquadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(500, 500, 500);
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        //Face Esquerda
        if(this.scene.useNearest) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        
        if (this.scene.quadLText !== 'undefined')
            this.scene.CquadMaterial.setTexture(this.scene.quadLText);
        else
            this.scene.CquadMaterial.setTexture(null);
        this.scene.CquadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(500, 500, 500);
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        //Face Trás
        if(this.scene.useNearest) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        
        if (this.scene.quadBKText !== 'undefined')
            this.scene.CquadMaterial.setTexture(this.scene.quadBKText);
        else
            this.scene.CquadMaterial.setTexture(null);
        this.scene.CquadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(500, 500, 500);
        this.scene.translate(0, 0, -0.5);
        this.scene.quad.display();
        this.scene.popMatrix();

        //Face Cima
        if(this.scene.useNearest) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        if (this.scene.quadTText !== 'undefined')
            this.scene.CquadMaterial.setTexture(this.scene.quadTText);
        else
            this.scene.CquadMaterial.setTexture(null);
        this.scene.CquadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(500, 500, 500);
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        //Face Direita
        if(this.scene.useNearest) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        if (this.scene.quadRText !== 'undefined')
            this.scene.CquadMaterial.setTexture(this.scene.quadRText);
        else
            this.scene.CquadMaterial.setTexture(null);
        this.scene.CquadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(500, 500, 500);
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();
    
    }
}

