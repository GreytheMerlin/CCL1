const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.backgroundShift = 0;
global.gravityForce = 9.81;
global.pixelToMeter = 100;
global.playerMoveTrigger;
global.topMoveTrigger;
global.bottomMoveTrigger;
global.score = 0;
global.colliding;
global.gamestate = "Start";
global.animationcancel = null;
global.Enemycount = 0;
global.Plattformcount = 0;
global.projectile = false;
global.switchkeys = false;
global.shooting = true;

global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = 0; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}

global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}

global.gameover = function(){
    if(global.gamestate != "win"){

   
    document.getElementById("gameContainer").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("Lost-screen").style.display = "";
    document.getElementById("score").innerHTML = "Score: " + this.score; 
    document.getElementById("audiobackground").pause();
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.score = 0;
    cancelAnimationFrame(global.animationcancel);
    global.gamestate = "gameover";
}
}


export { global }