export interface ObsClientInterface {
    rotateCamera(rotation: number): Promise<void>;
    connect(): Promise<void>;
}