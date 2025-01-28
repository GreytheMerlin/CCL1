import { global } from "../modules/global.js";
import { BaseGameObject } from "../gameObjects/baseGameObject.js";


class Enemy extends BaseGameObject{
    
    name = "Enemy";

    blockGravityForces = true;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.11,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 4,
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
    }


    
    
    

   
    reactToCollision = function(collidingObject) {
        if(collidingObject.name == "Wizard"){
            collidingObject.active = false;
            global.gameover();
        }
        if(collidingObject.name == "Projectile"){

            this.active = false;
        }
        
    }
    

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/Bat_Sprite.png", 5, 1);
       
    }

}
export{Enemy}