const Tesseract = require('tesseract.js');

// exports.getTextFromImage = async function(image, area) {
//     data = await Tesseract.recognize(
//         image,
//         'eng',
//         { logger: m => console.log(m), rectangle: area }
//     );
//     return data.data.text;
// }
exports.getTextFromImage = async function (image, area) {
    const worker = Tesseract.createWorker();

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const data = await worker.recognize(image, { rectangle: area });
    await worker.terminate();

    return data.data.text;
}
