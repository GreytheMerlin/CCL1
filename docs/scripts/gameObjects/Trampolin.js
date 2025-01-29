import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Trampolin extends BaseGameObject {

    name = "Trampolin";

    blockGravityForces = true;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 1,
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
    update = function() {
        

       this.switchCurrentSprites(0,0);
        

        
        
    }

    reactToCollision = function (collidingObject) {
        
        if (collidingObject.name == "Wizard") {
            this.switchCurrentSprites(1,1);
            document.getElementById("audiospring").play();
            global.playerObject.setJumpForce(12.2);
        }
    }
    // draw = function () {

    //     global.ctx.fillRect(this.x, this.y, this.width, this.height);
    // };



    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/Trampolin_Sprite.png", 2, 1)

    }
}
export { Trampolin };