import screenshot from 'screenshot-desktop'; 

export const saveScreenShotFromPrimaryDisplay = async function(imagePath: String) {
    // TODO: pegar o ID do monitor FullHD sozinho
    const primaryDisplayId = (await screenshot.listDisplays())[1].id;
    const screenOptions = {
        screen: primaryDisplayId,
        filename: imagePath
    };

    await screenshot(screenOptions);
    console.log('print!');
};
