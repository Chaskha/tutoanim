// Affichage d'un pion sous forme d'un cercle
const cnv = document.getElementById("myCanvas");
const ctx = cnv.getContext('2d');

const imgFiole = new Image();

imgFiole.addEventListener('load', () => {
    ctx.drawImage(imgFiole, 0,0, 200, 100);
}, false);
imgFiole.src = "ressources/fiole.png";

function afficheCanvas() { // On inscrit les cases dans le carré du canvas
    
    
    
    ctx.drawImage(imgFiole, 10, 30);
}
document.querySelector('button[name=bouton]').addEventListener('click', afficheCanvas()); 
