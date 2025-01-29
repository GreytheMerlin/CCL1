import { global } from "../modules/global.js";
import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { Projectile } from "./projectile.js";

class Wizard extends BaseGameObject{
    
    name = "Wizard";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;
    ignoreAutomovement = true;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 7,
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
    
    update = function() {
        

        this.x += this.xVelocity * global.deltaTime;
        this.screenWrap();

        
        if(!this.physicsData.isGrounded && this.animationData.currentSpriteIndex == 6) {
            this.switchCurrentSprites(0,0);
        }

        
        
    }
    applyGravity = function () {

        if (!this.useGravityForces)
            return;
       
        this.physicsData.fallVelocity += global.gravityForce * global.deltaTime * global.pixelToMeter;
        

        if (this.physicsData.jumpForce > 0) {

            this.physicsData.fallVelocity += -(global.gravityForce * global.deltaTime * global.pixelToMeter) + (global.gravityForce * global.deltaTime * global.pixelToMeter) * this.physicsData.jumpForceDecay;
            if (this.physicsData.isGrounded == true) {
               this.physicsData.fallVelocity = -this.physicsData.jumpForce * global.pixelToMeter;
               this.physicsData.prevFallingVelocity = this.physicsData.fallVelocity * global.deltaTime;
            }
    
            this.physicsData.isGrounded = false;
            
            if (this.physicsData.fallVelocity >= 0) {
             
                this.physicsData.jumpForce = 0;
            }
            
        }
 
        if (this.physicsData.fallVelocity > this.physicsData.terminalVelocity * global.pixelToMeter) {
            this.physicsData.fallVelocity = this.physicsData.terminalVelocity  * global.pixelToMeter;
        }

        this.y += (this.physicsData.fallVelocity * global.deltaTime + this.physicsData.prevFallingVelocity) / 2;
        this.physicsData.prevFallingVelocity = this.physicsData.fallVelocity  * global.deltaTime;

        for (let i = 0; i < global.allGameObjects.length; i++) {
            let otherObject = global.allGameObjects[i];
            if (otherObject.active == true && otherObject.blockGravityForces == true) {
                let collisionHappened = global.detectBoxCollision(this, otherObject);
                if (collisionHappened) {
                    
                    if(this.physicsData.jumpForce> 0 && this.name == "Wizard" && (this.getBoxBounds().top< otherObject.getBoxBounds().bottom)){
                        return;
                    }
                        if (this.physicsData.fallVelocity > 0 && this.name == "Wizard" && (this.getBoxBounds().bottom - (this.y + this.height)) < otherObject.getBoxBounds().top) {
                            this.physicsData.isGrounded = true;
                            this.y = otherObject.getBoxBounds().top - this.height - (this.getBoxBounds().bottom - (this.y + this.height))
                        }
                        else if (this.physicsData.fallVelocity < 0) {
                          //  this.y = otherObject.getBoxBounds().bottom - (this.getBoxBounds().top - this.y);
                        }
                        this.physicsData.jumpForce = 0;
                        this.physicsData.fallVelocity = 0;
                        this.physicsData.prevFallingVelocity = 0;
                        this.physicsData.jumpForceStart = 0;
                }
            }   
        }    
    };

    

    screenWrap = function () {
        let objectBox = this.getBoxBounds();
        let canvasBox = global.getCanvasBounds();

        if (objectBox.left >= canvasBox.right) {
            this.x = canvasBox.left - this.width;
        }
        else if (objectBox.right <= canvasBox.left) {
            this.x = canvasBox.right;
        }
        else if (objectBox.bottom <= canvasBox.top) {
            this.y = canvasBox.bottom;
        }
        else if (objectBox.top >= canvasBox.bottom) {
            this.y = canvasBox.top - this.height;
        }
        
    }
    reactToCollision = function(collidingObject) {
        
        if (collidingObject.name == "Jumppad" || collidingObject.name == "MoveCloud") {
            if(this.physicsData.isGrounded && this.animationData.currentSpriteIndex == 0) {
                this.switchCurrentSprites(1,6);
                setTimeout(() => {
                    document.getElementById("audiojump").play();
                    global.playerObject.setJumpForce(8.2);

                 }, 200);
            }

           
  
           
            
        }
        
    }
    

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/Wizard_sprite.png", 8, 1);
       
    }

}
export{Wizard}