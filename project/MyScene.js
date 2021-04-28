import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MySeaShell } from "./MySeaShell.js";
import { MyWaterSurf } from "./MyWaterSurf.js";

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

        this.texBackCubchecke = new CGFtexture(this, 'images/test_cubemap/nz.png');
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

        this.cylinder = new MyCylinder(this, 16, 1);

        this.sphere = new MySphere(this, 16, 16);

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
		this.cylinderAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.cylinderAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.cylinderAppearance.setShininess(120);
        this.cylinderAppearance.setTexture(this.texEarth);
        this.cylinderAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.sphereAppearance = new CGFappearance(this);
        this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
        this.sphereAppearance.setTexture(this.texEarth);
        this.sphereAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.body_shader = new CGFshader(this.gl, "shaders/body.vert", "shaders/body.frag");

        this.mainFish = new MyFish(this, 0.4, [1.0, 0.6863, 0.2510, 1.0]);

        this.seaFloor = new MySeaFloor(this, 200, 50, 1, 1, 0, 2);

        this.seaShell = new MySeaShell(this, 10, 1, 0, 2);

        this.waterSurface = new MyWaterSurf(this, 200, 50, 10);

        this.lastUpdate = 0;

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySphere = false;
        this.displayMVObj = false;
        this.selectedTexture = 1;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.skyBoxTexture = { 'Test Cubemap': 0, 'Demo Cubemap': 1, 'Space Cubemap': 2 };
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.7, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();

        if(t > 0){
            this.movingObject.update(t - this.lastUpdate);
            this.mainFish.update(t - this.lastUpdate);
            this.waterSurface.update(t);
        }
        
        this.lastUpdate = t;
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

        if (this.displayCylinder) {
            this.cylinderAppearance.apply();
            this.cylinder.display();
        }

        if (this.displaySphere) {
            this.sphereAppearance.apply();
            this.sphere.display();
        }

        if (this.displayMVObj) {
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.movingObject.display();
            this.popMatrix();
        }

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

        this.pushMatrix();
        this.translate(0, 3, 0);
        this.mainFish.display();
        this.popMatrix();

        this.seaFloor.display();
        this.seaShell.display();

        this.waterSurface.display();
    
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