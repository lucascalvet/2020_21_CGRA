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
    constructor(scene, bodyRatio, color, yHeight, xCenterMov, zCenterMov, PeriodMov) {
		super(scene);

        this.init(new MyFish(scene, bodyRatio, color));
        this.y = yHeight;
        this.x = xCenterMov;
        this.z = zCenterMov;

        this.PMov = PeriodMov;
        this.alpha = 0;
        this.velocity = 0;

        this.turnState = TURNSTATES.IDLE;
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

        this.object.update(t, this.velocity, this.turnState);
        this.turnState = TURNSTATES.IDLE;
    }

    turn(val){

        if(val > 0)
            this.turnState = TURNSTATES.LEFT;
        else if( val < 0)
            this.turnState = TURNSTATES.RIGHT;
    }

}