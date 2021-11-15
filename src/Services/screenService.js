const screenshot = require('screenshot-desktop')
const path = require('path');


screenshot.listDisplays().then((displays) => {
    // displays: [{ id, name }, { id, name }]

    console.log(displays);
    screenOptions = {
        screen: displays[displays.length - 1].id,
        filename: path.resolve(__dirname, '../prints/screen.png')
    };
    screenshot(screenOptions)
        .then((img) => {
            // img: Buffer of screenshot of the last display
        });
})