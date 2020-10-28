import jsQR from "jsqr";

export function extractQRData(imageData, width, height) {
    return new Promise(resolve => {
        const code = jsQR(imageData, width, height);
        resolve(code ? code.data : null);
    });
}
