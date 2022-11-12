import ObsClientInterface from "../Contracts/ObsClientInterface";

export class RotateCameraUseCase {
    private obsClient: ObsClientInterface;

    constructor(obsClient: ObsClientInterface) {
        this.obsClient = obsClient;
    }

    public async execute(rotation: number) {
        await this.obsClient.rotateCamera(rotation);
        setTimeout(() => this.obsClient.rotateCamera(0), 30 * 1000);
    }
}