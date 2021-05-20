import { MyMovingFish } from "./MyMovingFish.js"
import { MyFish } from "./MyFish.js";

const TURNSTATES = { LEFT: "left", RIGHT : "right", IDLE: "idle"};
Object.freeze(TURNSTATES);


/**
 * MyAnimatedFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
 export class MyAnimatedFish extends MyMovingFish {
    constructor(scene, bodyRatio, color, yHeight, xCenterMov, zCenterMov, PeriodMov, textureFish) {
		super(scene);

        this.init(new MyFish(scene, bodyRatio, color, textureFish));
        this.y = yHeight;
    
        this.PMov = PeriodMov;
        this.radiusTraj = 5;
        this.theta = 0;
        this.turnState = TURNSTATES.LEFT;

        this.xC = xCenterMov;
        this.zC = zCenterMov;
    
        this.x = this.xC;
        this.z = this.zC + this.radiusTraj;

        this.alpha = Math.PI/2;
        this.velocity = 2 * Math.PI * this.radiusTraj/this.PMov/1000;;
    }

    
	init(fish) {
        this.object = fish;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.alpha, 0, 1, 0);
        this.object.display();
        this.scene.popMatrix();
    }

    update(t){
        this.th_Intv = 2 * Math.PI/this.PMov * t/1000 * this.scene.speedFactor;

        if(this.turnState == TURNSTATES.LEFT)
            this.turn(this.th_Intv);
        else if (this.turnState == TURNSTATES.RIGHT)
            this.turn(-this.th_Intv);

        //update theta
        this.theta += this.th_Intv;

        this.x = this.xC + this.radiusTraj * Math.sin(this.theta);
        this.z = this.zC + this.radiusTraj * Math.cos(this.theta);

        this.object.update(t, this.velocity, this.turnState);
    }
}