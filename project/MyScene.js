import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyFish } from "./MyFish.js";
import { MyMovingFish } from "./MyMovingFish.js"
import { MySeaFloor } from "./MySeaFloor.js";
import { MyWaterSurf } from "./MyWaterSurf.js";
import { MyPillar } from "./MyPillar.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyAlgaeSet } from "./MyAlgaeSet.js";
import { MyAnimatedFish } from "./MyAnimatedFish.js";
import { CGFcamera2 } from "./CGFcamera2.js";

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

        this.defaultShader=new CGFshader(this.gl,"shaders/lightCustom.vert","../lib/CGF/shaders/Gouraud/textured/fragment.glsl");
        this.defaultShader.setUniformsValues({isNight: this.night});
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
    
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

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

        this.nestX = 1;
        this.nestZ = 1;
        this.nestRadius = 2;

        this.seaFloor = new MySeaFloor(this, 150, 50, 1, 10, this.nestX, this.nestZ, this.nestRadius);

        this.rocks = new MyRockSet(this, 10, 10, 300, 50, this.nestX, this.nestZ, this.nestRadius);

        // FishEye Texture Material
        this.eye_tex = new CGFappearance(this);
        this.eye_tex.setAmbient(0.5, 0.5, 0.5, 1);
        this.eye_tex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eye_tex.setSpecular(0.1, 0.1, 0.1, 1);
        this.eye_tex.setShininess(10.0);
        this.eye_tex.loadTexture('images/part-b-images/fish_eye.png');
        this.eye_tex.setTextureWrap('REPEAT', 'REPEAT');

        this.mainFish = new MyFish(this, 0.4, [1.0, 0.6863, 0.2510, 1.0], 'images/part-b-images/scales.png');
        this.movingFish = new MyMovingFish(this, this.mainFish, 3, 1, 0.25, this.rocks, this.nestX, this.nestZ, this.nestRadius);

        this.algae = new MyAlgaeSet(this, 3, 5, 150, 50, this.nestX, this.nestZ, this.nestRadius);

        this.waterSurface = new MyWaterSurf(this, 200, 50, 10);

        //Textura Pilares
        this.PillarMaterial = new CGFappearance(this);
        this.PillarMaterial.setAmbient(0.0, 0.0, 0.0, 1);
        this.PillarMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.PillarMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.PillarMaterial.setEmission(0.9, 0.9, 0.9, 1)
        this.PillarMaterial.setShininess(10.0);
        this.PillarMaterial.loadTexture('images/part-b-images/pillarWood.png');
        this.PillarMaterial.setTextureWrap('REPEAT', 'REPEAT');

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

        this.fishScales = [
            'images/part-b-images/scales2.jpg', 
            'images/part-b-images/scales3.jpg', //greyish sideway scales
            'images/part-b-images/scales4.jpg',
            'images/part-b-images/scales5.jpg'
        ];

        for(let fish = 0; fish < this.numAnimFish; fish++){
            this.fishX = (Math.random() * 40 - 20); //random number between -20 and 20
            this.fishY = (Math.random() * (5 - 2.5) + 2.5).toFixed(2); //Random Number between 2.5 and 5
            this.fishZ = (Math.random() * 40 - 20); //random number between -20 and 20

            this.period = (Math.random() * (20 - 10) + 10).toFixed(2); //random number between 10 and 20 (secs)

            this.bRatio = (Math.random() * (0.55 - 0.35) + 0.35).toFixed(2); //random number between 0.35 and 0.55

            this.r = (Math.random()).toFixed(2); //random number between 0 and 1
            this.g = (Math.random()).toFixed(2); //random number between 0 and 1
            this.b = (Math.random()).toFixed(2); //random number between 0 and 1

            this.scales = Math.floor(Math.random() * 4) //random integer number between 0 and 4

            this.moreFish.push(new MyAnimatedFish(this, this.bRatio, [this.r, this.g, this.b, 1.0], this.fishY, this.fishX, this.fishZ, this.period, this.fishScales[this.scales]));
        }


        this.lastUpdate = 0;

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.selectedTexture = 3;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.skyBoxTexture = { 'Test Cubemap': 0, 'Demo Cubemap': 1, 'Space Cubemap': 2, 'UnderWater Day': 3, 'Underwater Night': 4};
    }
    initLights() {
        this.setGlobalAmbientLight(0.0, 0.0, 0.0, 0.0);

        //Day Light
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
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
        this.camera = new CGFcamera2(1.7, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
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
            this.movingFish.update(t - this.lastUpdate);

            for(let i = 0; i < this.numAnimFish; i++){
                this.moreFish[i].update(t - this.lastUpdate);
            }

            this.night = 0;
            if(this.selectedTexture == 4 || this.selectedTexture == 2)
                this.night = 1;

            this.waterSurface.update(t, this.night);

            this.defaultShader.setUniformsValues({isNight : this.night});

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
        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        this.defaultAppearance.apply();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

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
        
        // ---- END Primitive drawing section
    }

    checkKeys() {

        var text = "Keys pressed : ";
        var keysPressed = false;
        
        if(this.gui.isKeyPressed("KeyW")){
            text += " W ";
            keysPressed = true;
            this.movingFish.accelerate(0.5);
        }

        if(this.gui.isKeyPressed("KeyS")){
            text += " S ";
            keysPressed = true;
            this.movingFish.accelerate(-0.5);
        }

        if(this.gui.isKeyPressed("KeyA")){
            text += " A ";
            keysPressed = true;
            this.movingFish.turn(Math.PI/16);
        }

        if(this.gui.isKeyPressed("KeyD")){
            text += " D ";
            keysPressed = true;
            this.movingFish.turn(-Math.PI/16);
        }

        if(this.gui.isKeyPressed("KeyR")){
            text += " R ";
            keysPressed = true;
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