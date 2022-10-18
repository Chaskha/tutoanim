// imports
import { cPalette } from "./classPalette.js";
import { cPixel } from "./classPixel.js";

// Affichage d'une image
const cnv = document.getElementById("myCanvas");
const ctx = cnv.getContext('2d');

/*
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
*/

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
/*



*/

let couleurDepart = new cPixel(0, 0, 0, 255);
let couleurFinale = new cPixel(200, 50, 0, 255);
let iPaletteSize = 100;
let redPalette = new cPalette(couleurDepart, couleurFinale, iPaletteSize);
couleurDepart = new cPixel(200, 50, 0, 255);
couleurFinale = new cPixel(200, 200, 0, 255);
iPaletteSize = 150;
let yellowPalette = new cPalette(couleurDepart, couleurFinale, iPaletteSize);
couleurDepart = new cPixel(200, 200, 0, 255);
couleurFinale = new cPixel(0, 0, 200, 200);
iPaletteSize = 200;
let bluePalette = new cPalette(couleurDepart, couleurFinale, iPaletteSize);
couleurDepart = new cPixel(0, 0, 200, 150);
couleurFinale = new cPixel(0, 0, 0, 50);
iPaletteSize = 150;
let blackPalette = new cPalette(couleurDepart, couleurFinale, iPaletteSize);

// aggregate
iPaletteSize = 500;

let ryPalette = cPalette.add(redPalette,yellowPalette);
let bbPalette = cPalette.add(bluePalette, blackPalette);
let firePalette = cPalette.add(ryPalette,bbPalette);
//let firePalette = new cPalette(couleurDepart, couleurFinale, iPaletteSize);
//firePalette = cPalette.add(redPalette,bluePalette);
const iWidth = 800;
const iHeight = 1200;
let imgData = ctx.createImageData(iWidth, iHeight);
console.log ("taille de la firePalette:"+ firePalette.getLength());
function burn() {    
    let fireArray = [];

    setInterval(function () {

        // randomize two lines of color index of the fire palette
        for (let j = 0; j <= 2*iWidth+2; j++) {
            fireArray[j] = Math.floor(Math.random() * 200)+300;
        }
        
        // Make the frames loop
        let idx = 0;
        let fireIndex=0;
        for (let l = 0; l < iHeight; l++) {
            // Pour chaque pixel de la ligne
            for (let y = 0; y < iWidth; y++) {
                // le nouveau pixel est la somme des deux précedents en ligne-1 et ligne-2 divisé par deux
                fireIndex = (2 * iWidth) + idx;
                fireArray[fireIndex] = Math.max(Math.floor(((fireArray[iWidth + idx] + fireArray[1 + idx] + fireArray[2 + idx] + fireArray[idx])>>2)) - 1, 0);

                // On ajoute la couleur du pixel correspondant dans la matrice de l'image à générer
                imgData.data[idx * 4 + 0] = firePalette.couleurs[fireArray[fireIndex]].red;
                imgData.data[idx * 4 + 1] = firePalette.couleurs[fireArray[fireIndex]].green;
                imgData.data[idx * 4 + 2] = firePalette.couleurs[fireArray[fireIndex]].blue;
                imgData.data[idx * 4 + 3] = firePalette.couleurs[fireArray[fireIndex]].alpha;
                //console.log("index dans la firePalette:" + fireIndex);
                // On passe au pixel suivant
                idx++;
            }
        }
        //ctx.clearRect(0, 0, cnv.width, cnv.height);
        // redraw 
        ctx.putImageData(imgData, 0, 0);
        //Wait for next step in the loop
    }, 1000/60); // 1000/framerate
    
    // Pour chaque ligne de l'image
    
    
    
    
    
}

document.querySelector('button[name=bouton]').addEventListener('click', burn(), false);

for (let k=0;k<100;k++){
    burn();
}