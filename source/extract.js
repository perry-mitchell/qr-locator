import jsQR from "jsqr";

export function extractQRData(imageData) {
    return new Promise(resolve => {
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        resolve(code ? code.data : null);
    });
}
