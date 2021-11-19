import Tesseract from 'tesseract.js';

export const getTextFromImage = async function (image: string, area: Tesseract.Rectangle) {
    const worker = Tesseract.createWorker();

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const data = await worker.recognize(image, { rectangle: area });
    await worker.terminate();

    return data.data.text;
}
