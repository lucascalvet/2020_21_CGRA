import { MyMovingObject } from './MyMovingObject.js';


const YSTATES = { UP: "up", DOWN : "down", IDLE: "idle"};
Object.freeze(YSTATES);

const TURNSTATES = { LEFT: "left", RIGHT : "right", IDLE: "idle"};
Object.freeze(TURNSTATES);

const ROCKSTATES = { ROCK: "rock", NOROCK : "NOROCK"};
Object.freeze(ROCKSTATES);

/**
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingFish extends MyMovingObject {
	constructor(scene, fish, ymaxLimit, yminLimit, boyancyVel, rockSet, nestX, nestZ, nestRadius) {
		super(scene);
		this.init(fish);
        this.y = ymaxLimit;

        this.maxLimit = ymaxLimit;
        this.minLimit = yminLimit;

        this.yState = YSTATES.IDLE;
        this.yVel = boyancyVel;

        this.turnState = TURNSTATES.IDLE;

        this.rockState = ROCKSTATES.NOROCK;
        this.fishRock = -1;
        this.rockSet = rockSet;

        this.centerXNest = (nestX + nestRadius);
        this.centerZNest = (nestZ + nestRadius);
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
        super.update(t);

        if(this.yState == YSTATES.UP){
            this.y += ( this.yVel * t/1000.0) * this.scene.speedFactor;

            if(this.y >= this.maxLimit){
                this.y = this.maxLimit;
                this.yState = YSTATES.IDLE; 
            }
        }
        else if (this.yState == YSTATES.DOWN) {
            this.y -= ( this.yVel * t/1000.0) * this.scene.speedFactor;
            
            if(this.y <= this.minLimit){
                this.y = this.minLimit;
                this.yState = YSTATES.IDLE; 
            }
        }

        if(this.fishRock != -1)
            this.rockSet.fishRockPos = [this.x + Math.sin(this.alpha) * 0.7 + 0.3, this.y - 0.1, this.z + Math.cos(this.alpha) * 0.7 + 0.3];

        this.object.update(t, this.velocity, this.turnState);
        this.turnState = TURNSTATES.IDLE;
    }

    up() {
        if(this.yState == YSTATES.IDLE)
            this.yState = YSTATES.UP;
    }

    down() {
        if(this.yState == YSTATES.IDLE)
            this.yState = YSTATES.DOWN;
    }

    turn(val){
        super.turn(val);

        if(val > 0)
            this.turnState = TURNSTATES.LEFT;
        else if( val < 0)
            this.turnState = TURNSTATES.RIGHT;
    }

    interact(){

        //Catch Rock
        if(this.rockState != ROCKSTATES.ROCK && this.y == this.minLimit){
                var dist;
                var minDist = 9999;
                for (let i = 0; i < this.rockSet.nrRocks; i++) {
                    dist = Math.sqrt(Math.pow(this.x - this.rockSet.positions[i][0], 2) + Math.pow(this.y - this.rockSet.positions[i][1], 2));
                    if (dist < minDist) {
                        minDist = dist;
                        this.fishRock = i;
                    }
                }
                if (this.fishRock != -1) {
                    this.rockSet.fishRockIdx = this.fishRock;
                    this.rockState = ROCKSTATES.ROCK; 
                }
        }
        else if(this.rockState == ROCKSTATES.ROCK && this.y == this.minLimit){ //Drop Rock
            this.fishRock = -1;
            this.rockSet.fishRockIdx = this.fishRock;
            this.rockState = ROCKSTATES.NOROCK;

            // if((this.x >= this.centerXNest - nestRadius && this.x <= this.centerXNest + nestRadius) && (this.z >= this.centerZNest - nestRadius && this.z <= this.centerZNest + nestRadius)){
                
            // }
        }
    }

    reset(){
        this.alpha = 0;
        this.velocity = 0;
        this.x = 0;
        this.y = this.maxLimit;
        this.z = 0;

        this.yState = YSTATES.IDLE; 
        this.turnState = TURNSTATES.IDLE;

        if(this.rockState == ROCKSTATES.ROCK){
            this.fishRock = -1;
            this.rockSet.fishRockIdx = this.fishRock;
            this.rockState = ROCKSTATES.NOROCK;
        }
    }
}
