const screenshot = require('screenshot-desktop')

exports.saveScreenShotFromPrimaryDisplay = async function(imagePath) {
    // TODO: pegar o ID do monitor FullHD sozinho
    const primaryDisplayId = (await screenshot.listDisplays())[2].id;
    const screenOptions = {
        screen: primaryDisplayId,
        filename: imagePath
    };

    await screenshot(screenOptions);
    console.log('print!');
    return;
};
