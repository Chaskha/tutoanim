const cnv = document.getElementById("myCanvas");
const ctx = cnv.getContext('2d');

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