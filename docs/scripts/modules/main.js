import { global } from "./global.js";
import { Wizard } from "../gameObjects/wizard.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { Jumppad } from "../gameObjects/jumppad.js";
import { Enemy } from "../gameObjects/Enemy.js";
import { Trampolin } from "../gameObjects/Trampolin.js";
import { MoveCloud } from "../gameObjects/movingcloud.js";
import { Potion } from "../gameObjects/Item_Potion.js";
import { Invisible } from "../gameObjects/invisible.js";


function gameLoop(totalRunningTime) {
    
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {

            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }
    
    
        global.animationcancel = requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
        

}

function setupGame() {
    document.getElementById("audiostory").pause();
    document.getElementById("audiovictory").pause();
    document.getElementById("audiobackground").play();
    document.getElementById("audiobackground").volume = 0.7;
    global.playerObject = new Wizard(350, 490, 60, 60);

    global.playerMoveTrigger = new MoveTrigger(0, 300, 700, 60);
    global.topMoveTrigger = new MoveTrigger(0, 0, 700, 5);
    global.bottomMoveTrigger = new MoveTrigger(0, 975, 700, 5);
    new Jumppad(350, 850, 60, 20);
    new MoveCloud(0,500,60,20);
    new Invisible(0,350,60,20);

    let previousXPlattform = 0;
    let XEnemy = 0;
    let previousYPlattform = 850;
    let maxwidth = 695;
    let maxcreation = 300;
    let randomspeed = 100;
    
    for (let i = 0; maxcreation >= i; i++) {
        previousXPlattform += Math.floor(Math.random() * maxwidth);

        previousYPlattform = previousYPlattform - 100;
        global.Plattformcount++
        if (previousXPlattform >= maxwidth) {
            previousXPlattform = previousXPlattform -maxwidth;
        }
        if(global.Plattformcount>= 100){
            previousYPlattform = previousYPlattform -100;
            
            
        }
        if(global.Plattformcount>= 250){
            previousYPlattform = previousYPlattform -200;
            
            
        }
        if(global.Plattformcount % 5 == 0 && global.Plattformcount>= 10){
            randomspeed = Math.floor(Math.random()*100) +100;
            
            new MoveCloud(previousXPlattform, previousYPlattform, 60, 20, randomspeed);
            
        }else{
            new Jumppad(previousXPlattform, previousYPlattform, 60, 20);
            if(global.Enemycount % 40 == 0 && global.Plattformcount> 40){
                new Potion(previousXPlattform+20,previousYPlattform-35,15,20);
            }
            if(global.Enemycount % 15 == 0){
                    new Trampolin(previousXPlattform+20,previousYPlattform-20,20,20);
            }
        }
            
        
        global.Enemycount++
        if(global.Enemycount %5 == 0 && global.Plattformcount>= 50){
            XEnemy += Math.floor(Math.random() * maxwidth);
        
        
        
        if (XEnemy >= maxwidth) {
            XEnemy = XEnemy -maxwidth;
        }
            new Enemy(XEnemy,previousYPlattform-10,60,60);
            
        }
        
        
       

    }
    
}
document.getElementById("mute").addEventListener("click",function(){
    document.getElementById("audiostory").muted = true;
})

document.addEventListener("keypress", Keestart);

function Keestart(event){
    
    if(event.key == "Enter" && global.gamestate == "Start"){
        global.gamestate = "playing";
        setupGame();
    }

}
//setupGame();

requestAnimationFrame(gameLoop);
         
        
    





