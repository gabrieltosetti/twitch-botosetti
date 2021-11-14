const Tesseract = require('tesseract.js');

exports.getTextFromImage = async function(image) {
    data = await Tesseract.recognize(
        image,
        'eng',
        // { logger: m => console.log(m) }
    );
    return data.data.text;
}
