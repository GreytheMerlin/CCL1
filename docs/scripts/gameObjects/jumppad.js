import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Jumppad extends BaseGameObject {

    name = "Jumppad";

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
        
        //if (collidingObject.name == "Wizard") {
        //    collidingObject.y = collidingObject.previousY;
            
        //}
    }
    // draw = function () {

    //     global.ctx.fillRect(this.x, this.y, this.width, this.height);
    // };



    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Jumppad.png"]);

    }
}
export { Jumppad };