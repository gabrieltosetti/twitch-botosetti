const stardewValleyService = require('./../Services/stardewValleyService');

const start = function() {
    stardewValleyService.updateStreamTitleByInGameDaysCount();
    setTimeout(start, 5000);
}
start();