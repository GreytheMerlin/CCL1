import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Projectile extends BaseGameObject {

    name = "Projectile";
    yVelocity = 900;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 3,
        "currentSpriteIndex": 0
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };
    update = function () { 

        this.y -= this.yVelocity * global.deltaTime; 
        
        if(global.playerObject.physicsData.jumpForce>= 12){
            this.yVelocity =1400;
            
        }
    };

    reactToCollision = function (collidingObject) {
        
        //if (collidingObject.name == "Wizard") {
        //    collidingObject.y = collidingObject.previousY;
            
        //}
    }



    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/Orb_Sprite.png", 4, 1)

    }
}
export { Projectile };