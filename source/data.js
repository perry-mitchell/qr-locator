export function imgCanvas(imageElement) {
    return new Promise(resolve => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");;
        const width = imageElement.naturalWidth || imageElement.width;
        const height = imageElement.naturalHeight || imageElement.height;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(imageElement, 0, 0);
        resolve({
            data: context.getImageData(0, 0, width, height),
            width,
            height
        });
    });
}

export function imgOfflineCanvas(imageElement) {
    return new Promise(resolve => {
        const response = await fetch(imageElement.src);
        const raw = await response.blob();
        const bitmap = await createImageBitmap(raw);
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
        const context = canvas.getContext("2d");
        context.drawImage(bitmap, 0, 0);
        resolve({
            data: context.getImageData(0, 0, bitmap.width, bitmap.height),
            width: bitmap.width,
            height: bitmap.height
        });
    });
}
