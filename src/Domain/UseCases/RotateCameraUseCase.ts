import { inject, injectable } from "inversify";
import { TYPES } from "../../Application/Configs/Types.ts";
import type { ObsClientInterface } from "../Contracts/ObsClientInterface.ts";

@injectable()
export class RotateCameraUseCase {
    constructor(
        @inject(TYPES.ObsClientInterface) private obsClient: ObsClientInterface,
    ) {}

    public async execute(rotation: number) {
        await this.obsClient.rotateCamera(rotation);
        setTimeout(() => this.obsClient.rotateCamera(0), 30 * 1000);
    }
}
