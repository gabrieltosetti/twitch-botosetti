const screenshot = require('screenshot-desktop')

exports.saveScreenShotFromPrimaryDisplay = async function(imagePath) {
    const primaryDisplayId = (await screenshot.listDisplays())[0].id;
    const screenOptions = {
        screen: primaryDisplayId,
        filename: imagePath
    };

    await screenshot(screenOptions);
    console.log('print!');
    return;
};
