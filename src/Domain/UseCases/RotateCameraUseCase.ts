import { autoInjectable, inject } from "tsyringe";
import ObsClientInterface from "../Contracts/ObsClientInterface.ts";

@autoInjectable()
export default class RotateCameraUseCase {

    // TODO: Descobrir porque "constructor(@inject("ObsClientInterface") private obsClient: ObsClientInterface)"
    // nao funciona mais
    // @inject("ObsClientInterface")
    // private obsClient: ObsClientInterface;

    // constructor(obsClient: ObsClientInterface)
    // {
    //     this.obsClient = obsClient;
    // }

    constructor(@inject("ObsClientInterface") private obsClient: ObsClientInterface)

    public async execute(rotation: number) {
        await this.obsClient.rotateCamera(rotation);
        setTimeout(() => this.obsClient.rotateCamera(0), 30 * 1000);
    }
}