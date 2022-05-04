import * as Ocr from './ocrService';
import path from 'path';
import * as twitchAPI from '../twitch/twitchAPI';
import * as screenShot from './screenShotService';

export const updateStreamTitleByInGameDaysCount = async function () {
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
    if (currentDay < 28) {
        currentDay += 28;
    }

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

function getTextFromImage(imagePath: string) {
    const area = {
        left: 1820,
        top: 29,
        width: 56,
        height: 41,
    };

    return Ocr.getTextFromImage(imagePath, area);
}

async function getStreamTitle() {
    const channelData = await twitchAPI.getChannel();
    return channelData.status;
}

function setStreamTitle(newStreamTitle: string) {
    return twitchAPI.setStreamTitle(newStreamTitle);
}

function getNewChannelTitle(oldStreamTitle: string, currenDay: number): string {
    // 'Contagem em tempo real: Dia 000/000! '
    const reg = /Contagem em tempo real: Dia [0-9]{1,3}\/[0-9]{1,3}! /;
    const newDailyCount = `Contagem em tempo real: Dia ${currenDay}/100! `;

    // Stream title already contains the day count
    if (reg.test(oldStreamTitle)) {
        return oldStreamTitle.replace(reg, newDailyCount);
    }

    return newDailyCount + oldStreamTitle;
}

function streamTitleNeedToBeUpdated(currentStreamTitle: string, currentDay: number): boolean {
    // match: '000/'
    const reg = /([0-9]{1,3})\//;
    const res = currentStreamTitle.match(reg);

    if (res === null) return true;

    const streamTitleDay = Number(res[1]);
    return streamTitleDay != currentDay;
}

function getNumberFromText(text: string): number {
    text = text.replace(/[ \n]/, '');

    // As vezes o numero 4 vem como 'y'
    if (text === 'y' || text === 'Y') {
        console.log(`text '${text}' => 4`);
        text = '4';
    }

    // As vezes o numero 6 vem como 'B'
    if (text === 'B') {
        console.log(`text '${text}' => 6`);
        text = '6';
    }

    // As vezes o numero 8 vem como 'G'
    if (text === 'G') {
        console.log(`text '${text}' => 8`);
        text = '8';
    }

    const number = Number(text);

    if (isNaN(number)) {
        console.log('getNumberFromText: Texto não é número');
        return 0;
    }

    if (number > 100 || number < 0) {
        console.log('getNumberFromText: Fora do range:', number);
    }

    return number;
}