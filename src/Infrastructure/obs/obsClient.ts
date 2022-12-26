'use strict';

import OBSWebSocket from 'obs-websocket-js';
import ObsClientInterface from '../../Domain/Contracts/ObsClientInterface';

class ObsClient implements ObsClientInterface {
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

    public async getActiveScene(): Promise<string> {
        const scenes = await this.getObs().call('GetSceneList');
        return scenes.currentProgramSceneName;
    }

    public async getSceneItemList(sceneName: string): Promise<{
        /**
         * Array of scene items in the scene
         */
        sceneItems: JsonObject[];
    }> {
        return await this.getObs().call('GetSceneItemList', {sceneName});
    }

    public async getActiveCameraId(): Promise<number> {
        const sceneItems = await this.getSceneItemList(await this.getActiveScene());
        const camera = sceneItems.sceneItems.find((item) => item.name.includes('dshow_input'));
        if (!camera) throw new Error('Camera nao encontrada');
        return camera.sceneItemId;
    }

    public async rotateCamera(rotation: number = 0): Promise<void> {
        let alignment = 0;
        let cameraSourceId = 0;

        console.log(tttt);

        const activeScene = await this.getActiveScene();
        switch (activeScene) {
            case 'centro-E':
                cameraSourceId = 22;
                break;
            case 'centro-E 2':
                cameraSourceId = 22;
                break;
            default:
                throw new Error(`Rodar camera, scene nao definida: ${activeScene}`);
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

        await this.getObs().call(
            'SetSceneItemTransform',
            {
                sceneName: activeScene,
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