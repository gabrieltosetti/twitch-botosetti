'use strict';

import OBSWebSocket from 'obs-websocket-js';

class ObsClient {
    private obs?: OBSWebSocket;

    public async connect() {
        this.obs = new OBSWebSocket();

        try {
            await this.obs.connect({ address: 'localhost:4444', password: 'bestpassever' });
        } catch (e) {
            console.log(e);
        }

        // You must add this handler to avoid uncaught exceptions.
        this.obs.on('error', (err: any) => {
            console.error('socket error:', err);
        });
    }

    public getObs(): OBSWebSocket {
        if (!this.obs) throw new Error('OBS client nao conectado.');
        return this.obs;
    }

    public async rodarCamera(rotation: number = 0) {
        let alignment = 0;
        const nomeCamera = 'camera';

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

        let props = await this.getObs().send('GetSceneItemProperties', { item: { name: nomeCamera } });

        props.rotation = rotation;
        props.position.alignment = alignment;

        await this.getObs().send(
            'SetSceneItemProperties',
            {
                item: { name: props.name },
                rotation: props.rotation,
                position: props.position,
                scale: props.scale,
                crop: props.crop,
                bounds: props.bounds,
            }
        );
    }
}

export const obsClient = new ObsClient();