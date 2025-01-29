import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Potion extends BaseGameObject {

    name = "Potion";

    

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
           this.active = false;
            global.switchkeys = true;
            let audio = document.getElementById("audioschlurf");
            audio.play();
            audio.playbackRate=1.75;
            setTimeout(()=>{

                global.switchkeys = false;

            },4000);
        }
    }
    // draw = function () {

    //     global.ctx.fillRect(this.x, this.y, this.width, this.height);
    // };



    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Potion.png"]);

    }
}
export { Potion };