import { imgCanvas } from "./data.js";
import { extractQRData } from "./extract.js";
import { queryImages } from "./query.js";

export function scan(target = document.body, query = queryImages, convert = imgCanvas, extract = extractQRData) {
    return Promise.resolve(query(target))
        .then(elements => Promise.all(elements.map(element =>
            convert(element).then(result => ({
                ...result,
                element
            }))
        )))
        .then(targets => Promise.all(targets.map(target =>
            extract(target.data).then(result => ({
                element: target.element,
                data: result
            }))
        )))
        .then(results => results.filter(result => !!result.data));
}
