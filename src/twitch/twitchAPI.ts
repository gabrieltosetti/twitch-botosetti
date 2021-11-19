const axios = require('axios').default;

const channelID = process.env.CHANNEL_ID;
const oauthToken = process.env.BOT_OAUTH_TOKEN_ONLY_KEY;

export const setStreamTitle = async function(newChanelTitle: string) {
    try {
        const res = await axios.put(
            'https://api.twitch.tv/kraken/channels/' + channelID,
            {
                channel: {
                    status: newChanelTitle,
                }
            },
            {
                headers: {
                    Accept: 'application/vnd.twitchtv.v5+json',
                    Authorization: 'OAuth ' + oauthToken
                }
            }
        );
    } catch (e) {
        console.log(e);
    }
};

export const getChannel = async function() {
    try {
        const res = await axios.get(
            'https://api.twitch.tv/kraken/channels/' + channelID,
            {
                headers: {
                    Accept: 'application/vnd.twitchtv.v5+json',
                    Authorization: 'OAuth ' + oauthToken
                }
            }
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};