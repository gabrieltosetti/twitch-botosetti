export default interface TenorHttpClientInterface {
    searchGifFromPhrase(searchPhrase: string, resultIndex: number): Promise<string>;
}