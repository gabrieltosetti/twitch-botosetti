export interface TrenorHttpClientInterface {
    searchGifFromPhrase(searchPhrase: string, resultIndex: number): Promise<string>;
}