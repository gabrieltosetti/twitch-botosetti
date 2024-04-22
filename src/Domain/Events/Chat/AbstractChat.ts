export default abstract class AbstractChat {
    public abstract isValid(message: string, user: string): boolean;
    public abstract handle(message: string, user: string): void;
}