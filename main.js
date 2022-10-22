// imports
import { cPalette } from "./classPalette.js";
import { cPixel } from "./classPixel.js";
import { burn } from "./fireStuff.js"
import { cnv, ctx} from "./config.js"

// Affichage d'une image


const imgSprite = new Image();
imgSprite.addEventListener('load', () => {
    // Define the number of columns and rows in the sprite
    let numColumns = 4;
    let numRows = 3;
    // Define the size of a frame
    let frameWidth = imgSprite.width / numColumns;
    let frameHeight = imgSprite.height / numRows;
    // The sprite image frame starts from 0
    let currentFrame = 0;
    // animation function
    setInterval(function () {
        // Pick a new frame
        currentFrame++;
        // Make the frames loop
        let maxFrame = numColumns * numRows - 3;
        if (currentFrame > maxFrame) {
            currentFrame = 0;
        }
        // Update rows and columns
        let column = currentFrame % numColumns;
        let row = Math.floor(currentFrame / numColumns);
        // Clear and draw
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        // redraw 
        ctx.drawImage(imgSprite, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 10, 30, frameWidth / 3, frameHeight / 3);
        //Wait for next step in the loop
    }, 300);
}, false);
imgSprite.src = "ressources/spriteSoucoupes.png";


/* ---------- * ---------- * ---------- * ---------- */
/* 
const imgFiole = new Image();
imgFiole.addEventListener('load', () => {
    ctx.drawImage(imgFiole, 50,50, 200, 100);
}, false);
imgFiole.src = "ressources/fiole.png";

function afficheCanvas() { // On inscrit les cases dans le carré du canvas
    ctx.drawImage(imgFiole, 10, 30);
}
*/

// call to fireStuff
// window.requestAnimationFrame(burn);
