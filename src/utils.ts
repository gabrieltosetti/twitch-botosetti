import { Response } from 'express';

export default class Utils {
    static activeResponse: Response;

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

    static getRandomGifPos(posicaoAtual: number, min: number, max: number): number {
        let posicaoAleatoria = this.getRandomInt(min, max);

        if (posicaoAleatoria === posicaoAtual) {
            return this.getRandomGifPos(posicaoAleatoria, min, max);
        }

        return posicaoAleatoria;
    }

    static responseWrite(data: any) {
        this.activeResponse.write(`data: ${data}\n\n`);
    }
}