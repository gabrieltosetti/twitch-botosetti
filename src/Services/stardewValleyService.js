const ocr = require('./ocrService');
const path = require('path');

exports.updateStreamTitleByInGameDaysCount = async function() {
    const image = path.resolve(__dirname, '../prints/10.png');

    let text = await ocr.getTextFromImage(image)
    console.log(text);
    
    let days = new Number(text);
    console.log(days);
};
