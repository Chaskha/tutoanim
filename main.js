// imports
import { cPalette } from "./classPalette.js";
import { cPixel } from "./classPixel.js";

// Affichage d'une image
const cnv = document.getElementById("myCanvas");
const ctx = cnv.getContext('2d');

const imgSprite = new Image();
imgSprite.addEventListener('load', () => {
   // Define the number of columns and rows in the sprite
let numColumns = 4;
let numRows = 3;

imgFiole.addEventListener('load', () => {
    ctx.drawImage(imgFiole, 50,50, 200, 100);
}, false);
imgFiole.src = "ressources/fiole.png";

function afficheCanvas() { // On inscrit les cases dans le carré du canvas
    ctx.drawImage(imgFiole, 10, 30);
}


function burn() {
    let couleurDepart = new cPixel(255,200,0,255);
    let couleurFinale = new cPixel(0, 0, 0, 255);
    const iPaletteSize = 250;
    let firePalette = new cPalette(couleurDepart,couleurFinale,iPaletteSize);
    const iWidth = 400;
    const iHeight = 400;
    let imgData = ctx.createImageData(iWidth,iHeight);

    // randomize two lines of color index of the fire palette
    let fireArray = [];
    for (let j = 0; j < iWidth * 2; j++) {
        fireArray[j] = Math.floor(Math.random() * 40);
    }
    
    //
    
    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] = 255;
        imgData.data[i + 1] = 0;
        imgData.data[i + 2] = 0;
        imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 10, 10);
}

document.querySelector('button[name=bouton]').addEventListener('click', burn()); 
// Define the size of a frame
let frameWidth = imgSprite.width / numColumns;
let frameHeight = imgSprite.height / numRows;

// The sprite image frame starts from 0
let currentFrame = 0;

setInterval(function()
{
    // Pick a new frame
    currentFrame++;

    // Make the frames loop
    let maxFrame = numColumns * numRows - 3;
    if (currentFrame > maxFrame){
        currentFrame = 0;
    }

    // Update rows and columns
    let column = currentFrame % numColumns;
    let row = Math.floor(currentFrame / numColumns);

    // Clear and draw
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(imgSprite, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 10, 30, frameWidth/3, frameHeight/3);

//Wait for next step in the loop
}, 300);
     
}, false);
    imgSprite.src = "ressources/spriteSoucoupes.png";
