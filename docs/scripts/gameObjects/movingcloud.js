import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class MoveCloud extends BaseGameObject {

    name = "MoveCloud";
    xVelovity = 100;


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
    update = function () {
            
            // Adjusted cloud movement logic with margin
            this.x += this.xVelovity * global.deltaTime; // Move cloud horizontally
        
            // Check bounds and reverse direction if necessary
            if (this.x > global.getCanvasBounds().right - this.width) {
                this.xVelovity = -Math.abs(this.xVelovity); // Ensure movement is negative
            } else if (this.x + this.width < global.getCanvasBounds().left + this.width) {
                this.xVelovity = Math.abs(this.xVelovity); // Ensure movement is positive
            }
        
        
    };
    reactToCollision = function (collidingObject) {
        

    }




    constructor(x, y, width, height, yVelocity) {
        super(x, y, width, height, yVelocity);
        this.yVelocity = this.yVelocity;
        this.loadImages(["./images/cloud.png"]);

    }
}
export { MoveCloud };