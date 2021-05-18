import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyFish } from "./MyFish.js";
import { MyMovingFish } from "./MyMovingFish.js"
import { MySeaFloor } from "./MySeaFloor.js";
import { MyWaterSurf } from "./MyWaterSurf.js";
import { MyPillar } from "./MyPillar.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyAlgaeSet } from "./MyAlgaeSet.js";
import { MyAnimatedFish } from "./MyAnimatedFish.js";

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
    
        this.movingObject = new MyMovingObject(this, new MyPyramid(this, 4, 1));

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

        this.texUW1Back = new CGFtexture(this, 'images/part-b-images/underwater_cubemap/front.jpg');
        this.texUW1Bottom = new CGFtexture(this, 'images/part-b-images/underwater_cubemap/bottom.jpg');
        this.texUW1Front = new CGFtexture(this, 'images/part-b-images/underwater_cubemap/back.jpg');
        this.texUW1Left = new CGFtexture(this, 'images/part-b-images/underwater_cubemap/left.jpg');
        this.texUW1Right = new CGFtexture(this, 'images/part-b-images/underwater_cubemap/right.jpg');
        this.texUW1Top = new CGFtexture(this, 'images/part-b-images/underwater_cubemap/top.jpg');

        this.texUW2Back = new CGFtexture(this, 'images/part-b-images/underwater_cubemap_night/front.jpg');
        this.texUW2Bottom = new CGFtexture(this, 'images/part-b-images/underwater_cubemap_night/bottom.jpg');
        this.texUW2Front = new CGFtexture(this, 'images/part-b-images/underwater_cubemap_night/back.jpg');
        this.texUW2Left = new CGFtexture(this, 'images/part-b-images/underwater_cubemap_night/left.jpg');
        this.texUW2Right = new CGFtexture(this, 'images/part-b-images/underwater_cubemap_night/right.jpg');
        this.texUW2Top = new CGFtexture(this, 'images/part-b-images/underwater_cubemap_night/top.jpg');
   
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

        this.nestX = 1;
        this.nestZ = 1;
        this.nestRadius = 2;

        this.seaFloor = new MySeaFloor(this, 150, 50, 1, 10, this.nestX, this.nestZ, this.nestRadius);

        this.rocks = new MyRockSet(this, 10, 10, 200, 50, this.nestX, this.nestZ, this.nestRadius);

        this.mainFish = new MyFish(this, 0.4, [1.0, 0.6863, 0.2510, 1.0]);
        this.movingFish = new MyMovingFish(this, this.mainFish, 3, 1, 0.25, this.rocks, this.nestX, this.nestZ, this.nestRadius);

        this.algae = new MyAlgaeSet(this, 3, 5, 75, 50, this.nestX, this.nestZ, this.nestRadius);

        this.waterSurface = new MyWaterSurf(this, 200, 50, 10);

        this.pillar1 = new MyPillar(this, 5, 0, 0, 0.25, 12);
        this.pillar2 = new MyPillar(this, 5, 0, -3.5, 0.25, 12);
        this.pillar3 = new MyPillar(this, 10, 0, 0, 0.25, 12);
        this.pillar4 = new MyPillar(this, 10, 0, -3.5, 0.25, 12);
        this.pillar5 = new MyPillar(this, 15, 0, 0, 0.25, 12);
        this.pillar6 = new MyPillar(this, 15, 0, -3.5, 0.25, 12);
        this.pillar7 = new MyPillar(this, 20, 0, 0, 0.25, 12);
        this.pillar8 = new MyPillar(this, 20, 0, -3.5, 0.25, 12);

        this.moreFish = [];
        this.numAnimFish = 4;

        for(let fish = 0; fish < this.numAnimFish; fish++){
            this.fishX = (Math.random() * 40 - 15); //random number between -40 and 40
            this.fishY = (Math.random() * (5 - 2.5) + 2.5).toFixed(2); //Random Number between 2.5 and 5
            this.fishZ = (Math.random() * 40 - 15); //random number between -40 and 40

            this.period = (Math.random() * (10 - 2) + 2).toFixed(2); //random number between 2 and 10 (secs)

            this.bRatio = (Math.random() * (0.65 - 0.35) + 0.35).toFixed(2); //random number between 0.35 and 0.65

            this.r = (Math.random()).toFixed(2); //random number between 0 and 1
            this.g = (Math.random()).toFixed(2); //random number between 0 and 1
            this.b = (Math.random()).toFixed(2); //random number between 0 and 1

            this.moreFish.push(new MyAnimatedFish(this, this.bRatio, [this.r, this.g, this.b, 1.0], this.fishY, this.fishX, this.fishZ, this.period));
        }

        // this.fish2 = new MyAnimatedFish(this, 0.5, [0.75, 0.3, 0.4, 1.0], 4, 10, 5, 3);
        // this.fish3 = new MyAnimatedFish(this, 0.35, [0.6, 0.6, 0.4, 1.0], 2.5, -5, 7, 6);
        // this.fish4 = new MyAnimatedFish(this, 0.45, [1.0, 0.96, 0.34, 1.0], 3.5, 2, -3, 10);

        this.lastUpdate = 0;

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayCylinder = false;
        this.displaySphere = false;
        this.displayMVObj = false;
        this.selectedTexture = 3;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.skyBoxTexture = { 'Test Cubemap': 0, 'Demo Cubemap': 1, 'Space Cubemap': 2, 'UnderWater Day': 3, 'Underwater Night': 4};
    }
    initLights() {
        this.setGlobalAmbientLight(0.0, 0.0, 0.0, 0.0);

        //Day Light
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0); //1.0, 1.0, 1.0, 1.0
        this.lights[0].enable();
        this.lights[0].update();

        //Night Light
        this.lights[1].setPosition(15, 2, 5, 1);
        this.lights[1].setAmbient(0.5, 0.5, 0.55, 1.0);
        this.lights[1].setDiffuse(0.5, 0.5, 0.55, 1.0);
        this.lights[1].setSpecular(0.2, 0.2, 0.2, 1.0);
        this.lights[1].update();
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
            this.movingFish.update(t - this.lastUpdate);

            for(let i = 0; i < this.numAnimFish; i++){
                this.moreFish[i].update(t - this.lastUpdate);
            }

            // this.fish2.update(t - this.lastUpdate);
            // this.fish3.update(t - this.lastUpdate);
            // this.fish4.update(t - this.lastUpdate);

            this.night = 0;
            if(this.selectedTexture == 4 || this.selectedTexture == 2)
                this.night = 1;

            this.waterSurface.update(t, this.night);

            if(this.night == 1){
                this.lights[0].disable()
                this.lights[1].enable();
            }
            else{
                this.lights[1].disable()
                this.lights[0].enable();
            }
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

        if(this.selectedTexture == 0){ //test cubemap
            this.quadBKText = this.texBackCube;
            this.quadBTText = this.texBottomCube;
            this.quadFText = this.texFrontCube;
            this.quadLText = this.texLeftCube;
            this.quadRText = this.texRightCube;
            this.quadTText = this.texTopCube;
        }
        if(this.selectedTexture == 1){ //demo cubemap
            this.quadBKText = this.texBackCubeD;
            this.quadBTText = this.texBottomCubeD;
            this.quadFText = this.texFrontCubeD;
            this.quadLText = this.texLeftCubeD;
            this.quadRText = this.texRightCubeD;
            this.quadTText = this.texTopCubeD;
       }
       if(this.selectedTexture == 2){ //space cubemap
            this.quadBKText = this.texBackCubeS;
            this.quadBTText = this.texBottomCubeS;
            this.quadFText = this.texFrontCubeS;
            this.quadLText = this.texLeftCubeS;
            this.quadRText = this.texRightCubeS;
            this.quadTText = this.texTopCubeS;
        }
        if(this.selectedTexture == 3){ //underwater day cubemap
            this.quadBKText = this.texUW1Back;
            this.quadBTText = this.texUW1Bottom;
            this.quadFText = this.texUW1Front;
            this.quadLText = this.texUW1Left;
            this.quadRText = this.texUW1Right;
            this.quadTText = this.texUW1Top;
        }
        if(this.selectedTexture == 4){ //underwater night cubemap
            this.quadBKText = this.texUW2Back;
            this.quadBTText = this.texUW2Bottom;
            this.quadFText = this.texUW2Front;
            this.quadLText = this.texUW2Left;
            this.quadRText = this.texUW2Right;
            this.quadTText = this.texUW2Top;
        }

        this.cubeMap.display();

        this.movingFish.display();

        this.seaFloor.display();

        this.rocks.display();

        this.algae.display();

        this.waterSurface.display();

        this.pillar1.display();
        this.pillar2.display();
        this.pillar3.display();
        this.pillar4.display();
        this.pillar5.display();
        this.pillar6.display();
        this.pillar7.display();
        this.pillar8.display();

        for(let i = 0; i < this.numAnimFish; i++){
            this.moreFish[i].display();
        }

        // this.fish2.display();
        // this.fish3.display();
        // this.fish4.display();
        
        // ---- END Primitive drawing section
    }

    checkKeys() {

        var text = "Keys pressed : ";
        var keysPressed = false;
        
        if(this.gui.isKeyPressed("KeyW")){
            text += " W ";
            keysPressed = true;
            this.movingObject.accelerate(0.5);
            this.movingFish.accelerate(0.5);
        }

        if(this.gui.isKeyPressed("KeyS")){
            text += " S ";
            keysPressed = true;
            this.movingObject.accelerate(-0.5);
            this.movingFish.accelerate(-0.5);
        }

        if(this.gui.isKeyPressed("KeyA")){
            text += " A ";
            keysPressed = true;
            this.movingObject.turn(Math.PI/16);
            this.movingFish.turn(Math.PI/16);
        }

        if(this.gui.isKeyPressed("KeyD")){
            text += " D ";
            keysPressed = true;
            this.movingObject.turn(-Math.PI/16);
            this.movingFish.turn(-Math.PI/16);
        }

        if(this.gui.isKeyPressed("KeyR")){
            text += " R ";
            keysPressed = true;
            this.movingObject.reset();
            this.movingFish.reset();
        }

        if(this.gui.isKeyPressed("KeyP")){
            text += " P ";
            keysPressed = true;
            this.movingFish.up();
        }

        if(this.gui.isKeyPressed("KeyL")){
            text += " L ";
            keysPressed = true;
            this.movingFish.down();
        }

        if(this.gui.isKeyPressed("KeyC")){
            text += " C ";
            keysPressed = true;
            this.movingFish.interact();
        }

        if(keysPressed)
            console.log(text);
    }
}