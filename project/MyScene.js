import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this);

        this.texBackCube = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.texBottomCube = new CGFtexture(this, 'images/test_cubemap/ny.png');
        this.texFrontCube = new CGFtexture(this, 'images/test_cubemap/pz.png');
        this.texLeftCube = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.texRightCube = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.texTopCube = new CGFtexture(this, 'images/test_cubemap/py.png');

        this.texBackCubeD = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.texBottomCubeD = new CGFtexture(this, 'images/demo_cubemap/bottom.png');
        this.texFrontCubeD = new CGFtexture(this, 'images/demo_cubemap/back.png');
        this.texLeftCubeD = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.texRightCubeD = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.texTopCubeD = new CGFtexture(this, 'images/demo_cubemap/top.png');

        this.texBackCubeS = new CGFtexture(this, 'images/space_cubemap/front.png');
        this.texBottomCubeS = new CGFtexture(this, 'images/space_cubemap/bottom.png');
        this.texFrontCubeS = new CGFtexture(this, 'images/space_cubemap/back.png');
        this.texLeftCubeS = new CGFtexture(this, 'images/space_cubemap/left.png');
        this.texRightCubeS = new CGFtexture(this, 'images/space_cubemap/right.png');
        this.texTopCubeS = new CGFtexture(this, 'images/space_cubemap/top.png');
        
        this.cubeMap = new MyCubeMap(this, this.texTopCube, this.texFrontCube, this.texRightCube, this.texBackCube, this.texLeftCube, this.texBottomCube);
        
        this.texTest = new CGFtexture(this, 'images/texture.jpg');
        this.texEarth = new CGFtexture(this, 'images/earth.jpg');

        this.cylinder = new MyCylinder(this, 16);

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);

        this.cylinderAppearance = new CGFappearance(this);
        this.cylinderAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.cylinderAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.cylinderAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.cylinderAppearance.setShininess(120);

        this.cylinderAppearance.setTexture(this.texEarth);
        this.cylinderAppearance.setTextureWrap('REPEAT', 'REPEAT');

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.selectedTexture = 1;
        this.skyBoxTexture = { 'Test Cubemap': 0, 'Demo Cubemap': 1, 'Space Cubemap': 2 };
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(){
        this.checkKeys();
        this.movingObject.update();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        //this.incompleteSphere.display();

        this.cylinderAppearance.apply();
        this.cylinder.display();

        this.sphereAppearance.apply();
        this.movingObject.display();

        if(this.selectedTexture == 0){
            this.quadBKText = this.texBackCube;
            this.quadBTText = this.texBottomCube;
            this.quadFText = this.texFrontCube;
            this.quadLText = this.texLeftCube;
            this.quadRText = this.texRightCube;
            this.quadTText = this.texTopCube;
        }
        if(this.selectedTexture == 1){
            this.quadBKText = this.texBackCubeD;
           this.quadBTText = this.texBottomCubeD;
            this.quadFText = this.texFrontCubeD;
           this.quadLText = this.texLeftCubeD;
           this.quadRText = this.texRightCubeD;
           this.quadTText = this.texTopCubeD;
       }
       if(this.selectedTexture == 2){
           this.quadBKText = this.texBackCubeS;
           this.quadBTText = this.texBottomCubeS;
           this.quadFText = this.texFrontCubeS;
           this.quadLText = this.texLeftCubeS;
           this.quadRText = this.texRightCubeS;
           this.quadTText = this.texTopCubeS;
   }

        this.cubeMap.display();
        // ---- END Primitive drawing section
    }

    checkKeys() {

        var text = "Keys pressed : ";
        var keysPressed = false;

        
        if(this.gui.isKeyPressed("KeyW")){
            text += " W ";
            keysPressed = true;
            this.movingObject.accelerate(0.5);
        }

        if(this.gui.isKeyPressed("KeyS")){
            text += " S ";
            keysPressed = true;
            this.movingObject.accelerate(-0.5);
        }

        if(this.gui.isKeyPressed("KeyA")){
            text += " A ";
            keysPressed = true;
            this.movingObject.turn(Math.PI/16);
        }

        if(this.gui.isKeyPressed("KeyD")){
            text += " D ";
            keysPressed = true;
            this.movingObject.turn(-Math.PI/16);
        }

        if(this.gui.isKeyPressed("KeyR")){
            text += " R ";
            keysPressed = true;
            this.movingObject.reset();
        }

        if(keysPressed)
            console.log(text);
    }
}