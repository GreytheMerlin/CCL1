import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class MoveTrigger extends BaseGameObject {
    backGroundDiv = null;
    ignoreAutomovement = true;

    update = function () {
        //this.backGroundDiv.style.backgroundPositionY = global.backgroundShift + "px";
        //global.canvas.style.marginTop =  -global.backgroundShift  + "px";
    }

    draw = function () {
        //global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Wizard" && this == global.playerMoveTrigger) {

            global.score++;
            

            for (let i = 0; i < global.allGameObjects.length; i++) {

                if (global.allGameObjects[i].ignoreAutomovement == false) {
                    global.allGameObjects[i].y += 10;
                }
            }
            
            if (collidingObject.name == "Wizard") {
                collidingObject.y += 7;
            }


        }


        if (collidingObject.name == "Jumppad" && this == global.bottomMoveTrigger || collidingObject.name == "Projectile" && this == global.topMoveTrigger || collidingObject.name == "Enemy" && this == global.bottomMoveTrigger || collidingObject.name == "Trampolin" && this == global.bottomMoveTrigger || collidingObject.name == "MoveCloud" && this == global.bottomMoveTrigger || collidingObject.name == "Potion" && this == global.bottomMoveTrigger || collidingObject.name == "Invisible" && this == global.bottomMoveTrigger ) {

            collidingObject.active = false;
            console.log("delete");

        }

        if (collidingObject.name == "Wizard" && this == global.bottomMoveTrigger) {
            collidingObject.active = false;
           
            global.gameover();
        }


    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.backGroundDiv = document.querySelector("#background");
    }
}

export { MoveTrigger }