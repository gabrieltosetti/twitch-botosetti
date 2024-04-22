import { RefreshingAuthProvider } from '@twurple/auth';
import { promises as fs } from 'fs';
import { singleton } from 'tsyringe';

@singleton()
export default class AuthProvider {
    private authProvider?: RefreshingAuthProvider;

    public async authenticate() {
        const clientId = process.env.BOT_CLIENT_ID || '';
        const clientSecret = process.env.BOT_CLIENT_SECRET || '';

        const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'UTF-8' as BufferEncoding));
        this.authProvider = new RefreshingAuthProvider(
            {
                clientId,
                clientSecret,
                onRefresh: async newTokenData => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8' as BufferEncoding)
            },
            tokenData
        );

        console.log('INFO: AuthProvider autenticado');
    }

    public getAuthProvider(): RefreshingAuthProvider {
        if (!this.authProvider) throw new Error('No auth provider');
        return this.authProvider;
    }
}