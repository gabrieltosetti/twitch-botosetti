import OBSWebSocket from 'obs-websocket-js';
import type { JsonObject } from 'type-fest';
import ObsClientInterface from '../../Domain/Contracts/ObsClientInterface';
import { singleton } from 'tsyringe';

@singleton()
export default class ObsClient implements ObsClientInterface {
    private obs?: OBSWebSocket;

    public async connect() {
        this.obs = new OBSWebSocket();
        const OBSWebSocketURL = process.env.OBS_WEBSOCKET_URL || '';
        const OBSWebSocketPassword = process.env.OBS_WEBSOCKET_PASSWORD || '';

        try {
            await this.obs.connect(OBSWebSocketURL, OBSWebSocketPassword); 
        } catch (e) {
            console.error('Error conecting OBS Websocket: ', e);
            return;
        }

        console.log('OBS Websocket conected.');
    }

    public getObs(): OBSWebSocket {
        if (!this.obs) throw new Error('OBS client nao conectado.');
        return this.obs;
    }

    private async getsSceneItems(sceneName: string) {
        const items = await this.getObs().call(
            'GetSceneItemList',
            {sceneName}
        );
        return items.sceneItems;
    }

    public async rotateCamera(rotation: number = 0) {
        let alignment = 0;

        const sceneName = await this.getActiveScene();
        const cameraSourceId = await this.getCameraItemId(sceneName);

        if (!cameraSourceId) {
            console.error('Camera nao encontrada');
            return;
        }

        switch (rotation) {
            case 180:
                alignment = 10
                break;
            case 0:
                alignment = 5
                break;
            default:
                throw new Error('Rodar camera, rotacao nao definida');
        }

        try {
            await this.getObs().call(
                'SetSceneItemTransform',
                {
                    sceneName: sceneName,
                    sceneItemId: cameraSourceId,
                    sceneItemTransform: {
                        rotation: rotation,
                        alignment: alignment
                    },
                }
            );
        } catch (e) {
            console.error('Error rotating camera: ', e);
        }

    }

    private async getActiveScene(): Promise<string> {
        const response = await this.getObs().call('GetCurrentProgramScene');
        return response.sceneName;
    }

    private async getGroupItems(sceneUuid: string): Promise<JsonObject[]> {
        const items = await this.getObs().call(
            'GetGroupSceneItemList',
            {sceneUuid}
        );
        return items.sceneItems;
    }

    private async getCameraItemId(sceneName: string): Promise<number|undefined> {
        const activeItems = await this.getsSceneItems(sceneName);

        let activeCamera = activeItems
            .filter((item: any) => item.inputKind === 'dshow_input')
            .map((item: any) => Number(item.sceneItemId))
            .shift();

        if (activeCamera) {
            return activeCamera;
        }

        return activeItems
            .filter((item: any) => item.isGroup)
            .map(async (item: any) => (await this.getGroupItems(item.sourceUuid))
                .filter(groupItem => groupItem.inputKind === 'dshow_input')
                .map(item => Number(item.sceneItemId))
                .shift())
            .shift();
    }
}