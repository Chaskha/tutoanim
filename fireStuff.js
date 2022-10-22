
/*
<style>body {width: 100%;margin: 0; overflow: hidden;cursor: move;}</style></head > <body translate="no"><canvas id="c2">
    <script id="rendered-js">var c = document.getElementById("c2");var $ = c.getContext("2d");var w = c.width = window.innerWidth;
        var h = c.height = window.innerHeight;var msX= w / 2,msY = h / 2;var t;var n = [];var m= Math.random;var f = Math.floor;A();
        function A() {$.globalCompositeOperation = "source-over"; $.fillStyle = "rgba(11,2,2, 1)";$.fillRect(0, 0, w, h);
        $.globalCompositeOperation = "lighter";for (var i =0; i <50; i++) {var p = { };p.x = msX;p.y = msY;p.vx = m() *10 - 5;p.vy = m() *10 - 7;
 p.s = m() * 70 + 5;p.r = f(m() *25 + 10);p.g =m() *5;p.b =m() * 45;p.dx = msX;n.push(p);}
        i = n.length;while (i--) {p = n[i];p.x += p.vx; p.y += p.vy;p.vy -= 0.2;p.vx += (p.dx - p.x) / p.s/2;p.s -= 1.8; if (p.s < 1) {n.splice(i, 1);continue;} $.beginPath();var g1= "rgba(200,188,2,1)";var g2="rgba("+p.r+","+p.g+ "," +p.b+",0)";var g= $.createRadialGradient(p.x,p.y,0,p.x,p.y,p.s);
    g.addColorStop(0, g1);g.addColorStop(1, g2);$.fillStyle = g;$.arc(p.x, p.y, p.s, 0,8,0); $.fill(); }
        window.requestAnimationFrame(A); t = "FIRE!!! 1.5kb".split("").join(String.fromCharCode(0x2004));$.font = "5.5em Permanent Marker";
  $.fillStyle = 'rgba(211, 15,5,1)';$.fillText(t,155,250);}
        window.addEventListener('resize', function () {c.width = w = window.innerWidth;c.height = h = window.innerHeight;});
        document.body.addEventListener('mousemove', function (e) {msX = e.clientX;msY = e.clientY;});</script>
*/

import { cPalette } from "./classPalette.js";
import { cPixel } from "./classPixel.js";
import { cnv, ctx } from "./config.js"

// Préparation des dégradés de couleurs
let couleurDepart = new cPixel(0, 0, 0, 255);
let couleurFinale = new cPixel(4, 4, 32, 240);
let iPaletteSize = 40;
let palBlack2Blue = new cPalette(couleurDepart, couleurFinale, iPaletteSize);
couleurDepart = couleurFinale;
couleurFinale = new cPixel(40, 4, 4, 240);
iPaletteSize = 20;
let palBlue2Brown = new cPalette(couleurDepart, couleurFinale, iPaletteSize);
couleurDepart = couleurFinale;
couleurFinale = new cPixel(240, 176, 16, 240);
iPaletteSize = 100;
let palBrown2Orange = new cPalette(couleurDepart, couleurFinale, iPaletteSize);
couleurDepart = couleurFinale;
couleurFinale = new cPixel(240, 192, 240, 240);
iPaletteSize = 40;
let palOrange2LightPink = new cPalette(couleurDepart, couleurFinale, iPaletteSize);
couleurDepart = couleurFinale;
couleurFinale = new cPixel(0, 0, 0, 255);
iPaletteSize = 20;
let palPink2Black = new cPalette(couleurDepart, couleurFinale, iPaletteSize);

// put the gradients together
let startPalette = cPalette.add(palBlack2Blue, palBlue2Brown);
let bpPalette = cPalette.add(palBrown2Orange, palOrange2LightPink);
let endPalette = cPalette.add(bpPalette, palPink2Black);
let firePalette = cPalette.add(startPalette, endPalette);
// aggregate
iPaletteSize = firePalette.getLength();
/*
let ryPalette = cPalette.add(redPalette,yellowPalette);
let bbPalette = cPalette.add(bluePalette, blackPalette);
let rbPalette = cPalette.add(redPalette, blackPalette);
let jbPalette = cPalette.add(rbPalette, bbPalette);
let firePalette = cPalette.add(bbPalette,ryPalette);
*/
//let firePalette = new cPalette(couleurDepart, couleurFinale, iPaletteSize);
//firePalette = cPalette.add(redPalette,bluePalette);
const iWidth = 800;
const iHeight = 800;
let imgData = ctx.createImageData(iWidth, iHeight);
let rndHeight = 6;
console.log("taille de la firePalette:" + firePalette.getLength());

export function burn() {
    let fireArray = [];

    setInterval(function () {

        // randomize two lines of color index of the fire palette
        for (let j = 0; j <= rndHeight * iWidth; j++) {
            fireArray[j] = Math.min(Math.floor(Math.random() * iPaletteSize) + iPaletteSize >> 1, iPaletteSize);
        }

        // Make the frames loop
        let idx = 0;
        let fireIndex = 0;
        for (let l = 0; l < iHeight; l++) {
            // Pour chaque pixel de la ligne
            for (let y = 0; y < iWidth; y++) {
                // le nouveau pixel est la somme des deux précedents en ligne-1 et ligne-2 divisé par deux
                fireIndex = ((rndHeight - 1) * iWidth) + idx + 1;
                fireArray[fireIndex] = Math.max(
                    ((fireArray[idx + iWidth - 1] + fireArray[idx + iWidth] + fireArray[idx + iWidth + 1] +
                        fireArray[idx + 2 * iWidth + 1]
                    ) >> 2)
                    - 1, 0);

                // On ajoute la couleur du pixel correspondant dans la matrice de l'image à générer
                imgData.data[idx * 4 + 0] = firePalette.couleurs[fireArray[fireIndex]].red;
                imgData.data[idx * 4 + 1] = firePalette.couleurs[fireArray[fireIndex]].green;
                imgData.data[idx * 4 + 2] = firePalette.couleurs[fireArray[fireIndex]].blue;
                imgData.data[idx * 4 + 3] = firePalette.couleurs[fireArray[fireIndex]].alpha;
                // Explode

                let rndEplode = Math.floor(Math.random() * 10);
                if (rndEplode == 10) {
                    imgData.data[idx * 4 + 0] = 255;
                    imgData.data[idx * 4 + 1] = 255;
                    imgData.data[idx * 4 + 2] = 255;
                    imgData.data[idx * 4 + 3] = 150;
                }
                // On passe au pixel suivant
                idx++;
            }
        }
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        // redraw 
        ctx.putImageData(imgData, 0, 0);
        //Wait for next step in the loop
    }, 1000 / 60); // 1000/framerate
    // Pour chaque ligne de l'image
}


