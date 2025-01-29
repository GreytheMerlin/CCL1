import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Invisible extends BaseGameObject {

    name = "Invisible";

    blockGravityForces = true;

    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };

    reactToCollision = function (collidingObject) {
        
        if (collidingObject.name == "Wizard") {
            document.getElementById("gameContainer").style.display = "none";
        document.getElementById("menu").style.display = "none";
        document.getElementById("Lost-screen").style.display = "none";
        document.getElementById("Win-screen").style.display = "";
        document.getElementById("audiobackground").pause();
        document.getElementById("audiovictory").play();
        document.getElementById("audiojump").pause();
        global.ctx.clearRect(0, 0, canvas.width, canvas.height);
        global.score = 0;
        cancelAnimationFrame(global.animationcancel);
        global.gamestate = "win";
            
        }
    }
    // draw = function () {
        
    //     global.ctx.fillRect(this.x, this.y, this.width, this.height);
    // };



    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Egg.png"]);

    }
}
export { Invisible };