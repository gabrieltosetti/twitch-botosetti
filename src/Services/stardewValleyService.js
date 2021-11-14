const ocr = require('./ocrService');
const path = require('path');

exports.updateStreamTitleByInGameDaysCount = async function() {
    const image = path.resolve(__dirname, '../prints/10.png');

    text = await ocr.getTextFromImage(image);
    console.log(text);
};
