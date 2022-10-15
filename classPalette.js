import { cPixel } from "./classPixel.js";
export class cPalette {
    constructor (startColor=cPixel(), endColor=cPixel,iLength=255) { // constructor with default values kicking in if none is provided at new()
        this.length = iLength;
        this.colors = [];
        let rgbaJumper= 0;
        const rStep = Math.abs(startColor.red - endColor.red) / iLength;
        const gStep = Math.abs(startColor.green - endColor.green) / iLength;
        const bStep = Math.abs(startColor.blue - endColor.blue) / iLength;
        const aStep = Math.abs(startColor.alpha - endColor.alpha) / iLength;
        let iRed    = startColor.red;
        let iGreen  = startColor.green;
        let iBlue   = startColor.blue;
        let iAlpha  = startColor.alpha;

        for (let i=0; i<=this.length;i++) { // spread the gradient from start to end color over the length requested
            this.colors[rgbaJumper] = iRed;
            this.colors[rgbaJumper+1] = iGreen;
            this.colors[rgbaJumper+2] = iBlue;
            this.colors[rgbaJumper+3] = iAlpha;
            iRed = Math.floor(iRed + i * rStep);
            iGreen = Math.floor(iGreen + i * gStep);
            iBlue = Math.floor(iBlue + i * bStep);
            iAlpha = Math.floor(iAlpha + i * aStep);
            rgbaJumper+=4;
        }
    }
}