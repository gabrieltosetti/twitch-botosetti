export default interface ObsClientInterface {
    rotateCamera(rotation: number): Promise<void>;
}