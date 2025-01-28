import { global } from "./global.js";
import { Projectile } from "../gameObjects/projectile.js";

function move(event) {

    

    //Example Movement for the PacMan Game
    switch(event.key) {
        case "d":

            global.playerObject.xVelocity = 400;
            if(global.switchkeys){

                global.playerObject.xVelocity = -400;
            }
            
            
            break;
        case "a":

            global.playerObject.xVelocity = -400;
            if(global.switchkeys){

                global.playerObject.xVelocity = 400;
            }
            
            break;
        case "w":
            if(global.shooting == true){

                document.getElementById("audioprojectile").play();
                new Projectile(global.playerObject.x+30,global.playerObject.y-20,30,30);
                global.shooting = false; // Schießen blockieren
                
                setTimeout(() => global.shooting = true, 150); // 200 ms warten, bevor erneut geschossen werden kann
             

            }
                
           
            
            
            break;
        case "Enter":
            document.getElementById("menu").style.display = "none";
            document.getElementById("Lost-screen").style.display = "none";
            document.getElementById("Win-screen").style.display = "none";
            document.getElementById("gameContainer").style.display = "";
           
        
        if(global.gamestate === "gameover" || global.gamestate === "win"){
            location.reload(true);
        } 
           
            break;

 
            
           
        
    }
    
}

function stop(event) {

    //if you just want to move as long as the player presses a key
   
    switch(event.key) {
        case "d":
            global.playerObject.xVelocity = 0;
            break;
        case "a":
            global.playerObject.xVelocity = 0;
            break;   
       
    }

}

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);