'use strict';

import OBSWebSocket from 'obs-websocket-js';

class ObsClient {
    private obs?: OBSWebSocket;

    public async connect() {
        this.obs = new OBSWebSocket();

        try {
            await this.obs.connect('ws://localhost:4455', 'xwIPN2NhB5siezdR'); 
        } catch (e) {
            console.error('Error conecting OBS Websocket: ', e);
        }

        console.log('OBS Websocket conected.');
    }

    public getObs(): OBSWebSocket {
        if (!this.obs) throw new Error('OBS client nao conectado.');
        return this.obs;
    }

    public async rodarCamera(rotation: number = 0) {
        let alignment = 0;
        const cameraSourceId = 22;
        const sceneName = 'centro-E';

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