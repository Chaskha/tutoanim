import { cPixel } from "./classPixel.js";

export class cPalette {
    constructor (startColor=cPixel, endColor=cPixel,iLength=255) { // constructor with default values kicking in if none is provided at new()
        this.couleurs = []; // array de pixels RGBa
        const rStep = (endColor.red - startColor.red) / iLength;
        const gStep = (endColor.green - startColor.green) / iLength;
        const bStep = (endColor.blue - startColor.blue) / iLength;
        const aStep = (endColor.alpha - startColor.alpha) / iLength;
        for (let i=0; i<=iLength;i++) { // spread the gradient from start to end color over the length requested
            let iRed = Math.floor(startColor.red + (i * rStep));
            let iGreen = Math.floor(startColor.green + i * gStep);
            let iBlue = Math.floor(startColor.blue + i * bStep);
            let iAlpha = Math.floor(startColor.alpha + i * aStep);
            let pix = new cPixel (iRed, iGreen, iBlue, iAlpha);
            this.couleurs[i] = pix;
        }
    }
    getLength () {
        return this.couleurs.length;
    }

    static add(palette1, palette2){   
        let idx=0;
        let ip1Length=palette1.getLength();
        let ip2Length = palette2.getLength();
        let extPalette = new cPalette(palette1.couleurs[0], palette1.couleurs[0], ip1Length + ip2Length -2);
        for (let i=0;i<ip1Length-1; i++){
            extPalette.couleurs[idx] = palette1.couleurs[i];
            idx++;
        }
        for (let j = 0; j < ip2Length-1; j++) {
            extPalette.couleurs[idx] = palette2.couleurs[j];
            idx++;
        }
        return extPalette;
    }
} // endoOfClass