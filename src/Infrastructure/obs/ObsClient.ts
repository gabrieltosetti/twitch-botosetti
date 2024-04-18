'use strict';

import OBSWebSocket from 'obs-websocket-js';
import ObsClientInterface from '../../Domain/Contracts/ObsClientInterface';

class ObsClient implements ObsClientInterface {
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

    public async getsSceneItems(sceneName: string) {
        console.log(await this.getObs().call(
            'GetSceneItemList',
            {
                sceneName
            }
            ));
    }

    public async rotateCamera(rotation: number = 0) {
        let alignment = 0;
        const cameraSourceId = 27;
        const sceneName = process.env.SCENE_NAME || '';

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
    }
}

export const obsClient = new ObsClient();