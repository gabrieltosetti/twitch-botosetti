const ocr = require('./ocrService');
const path = require('path');
const twitchAPI = require('../twitch/twitchAPI');
const screenShot = require('./screenShotService');

exports.updateStreamTitleByInGameDaysCount = async function () {
    console.log('-------------------------------');
    const imagePath = await getScreenShot();

    const text = await getTextFromImage(imagePath)
    console.log(`Image Text: '${text}'`);

    let currentDay = getNumberFromText(text);
    console.log('Number from text', currentDay);

    if (!currentDay) {
        return;
    }

    // verao
    // currentDay += 28;
    // console.log('Soma do verão para:', currentDay);

    const currentStreamTitle = await getStreamTitle();
    console.log('Titulo agora:', currentStreamTitle);

    if (!streamTitleNeedToBeUpdated(currentStreamTitle, currentDay)) {
        console.log('xNão precisa alterar o título');
        return;
    }

    const newChannelTitle = getNewChannelTitle(currentStreamTitle, currentDay);
    console.log('Titulo novo:', newChannelTitle);

    await setStreamTitle(newChannelTitle);
    console.log('título atualizado');
    return;
};

async function getScreenShot() {
    const imagePath = path.resolve(__dirname, '../prints/screen.png');
    await screenShot.saveScreenShotFromPrimaryDisplay(imagePath);
    return imagePath;
}

function getTextFromImage(imagePath) {
    const area = {
        left: 1816,
        top: 29,
        width: 56,
        height: 41,
    };

    return ocr.getTextFromImage(imagePath, area);
}

async function getStreamTitle() {
    const channelData = await twitchAPI.getChannel();
    return channelData.status;
}

function setStreamTitle(newStreamTitle) {
    return twitchAPI.setStreamTitle(newStreamTitle);
}

function getNewChannelTitle(oldStreamTitle, currenDay) {
    // 'Contagem em tempo real: Dia 000/000! '
    const reg = /Contagem em tempo real: Dia [0-9]{1,3}\/[0-9]{1,3}! /;
    const newDailyCount = `Contagem em tempo real: Dia ${currenDay}/100! `;

    // Stream title already contains the day count
    if (reg.test(oldStreamTitle)) {
        return oldStreamTitle.replace(reg, newDailyCount);
    }

    return newDailyCount + oldStreamTitle;
}

function streamTitleNeedToBeUpdated(currentStreamTitle, currentDay) {
    // match: '000/'
    const reg = /([0-9]{1,3})\//;
    const res = currentStreamTitle.match(/([0-9]{1,3})\//);

    if (res === null) return true;

    const streamTitleDay = Number(res[1]);
    return streamTitleDay != currentDay;
}

function getNumberFromText(text) {
    if (isNaN(text)) {
        console.log('getNumberFromText: Texto não é número');
        return 0;
    }

    const number = Number(text);

    if (number > 100 || number < 0) {
        console.log('getNumberFromText: Fora do range:', number);
    }

    return number;
}