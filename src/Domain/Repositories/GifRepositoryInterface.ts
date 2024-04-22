export default interface GifRepositoryInterface {
    findByTitleWithPhrase(searchPhrase: string, resultIndex: number): Promise<string>;
}