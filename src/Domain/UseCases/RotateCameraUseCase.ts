import { autoInjectable, inject } from "tsyringe";
import ObsClientInterface from "../Contracts/ObsClientInterface";

@autoInjectable()
export default class RotateCameraUseCase {
    constructor(@inject("ObsClientInterface") private obsClient: ObsClientInterface)
    { }

    public async execute(rotation: number) {
        await this.obsClient.rotateCamera(rotation);
        setTimeout(() => this.obsClient.rotateCamera(0), 30 * 1000);
    }
}