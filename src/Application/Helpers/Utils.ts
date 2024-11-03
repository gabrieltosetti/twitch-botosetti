import * as path from 'node:path';

export default class Utils {
    static activeResponse: WebSocket;
    static date: Date = new Date("2021-01-01T00:00:00Z");

    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static responseWrite(data: string) {
        this.activeResponse.send(`data: ${data}\n\n`);
    }

    static getAudioFile(file: string): string {
        return path.resolve(Deno.cwd(), '..', '..', '..', 'assets', 'audios', file);
    }
}