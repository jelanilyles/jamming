let accessToken;
const client_id = '5a0432382920484a8e0536a62123dfd0';
const redirect_uri = 'https://zippy-druid-2409d7.netlify.app/callback'; // 'http://localhost:3000/callback';

const Spotify = {
    getAccessToken(term='') {
        
        // let mount = true;
        if(accessToken){
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            // mount = false;
            console.log('call');
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
            window.location = accessUrl;
        }
    },

    async search(term) {
        const accessToken = await Spotify.getAccessToken(term);
        // console.log(accessToken);

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q='+${term}+'&type=track`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });
            if(response.ok) {
                const jsonResponse = await response.json();
                // console.log(jsonResponse);
                if(!jsonResponse.tracks) {
                    return [];
                }
                const results = await jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    cover: track.album.images[2].url,
                    uri: track.uri,
                    preview: track.preview_url
                }));

                console.log('data: '+results);
                return results;
            }
        } catch(e) {
            console.log(e);
        }
    },

    async savePlaylist(name, uris) {
        // console.log('call');
        if(!name || !uris){
            return;
        }

        const accessToken = await Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};

        return fetch(`https://api.spotify.com/v1/me`, {
            method: 'GET',
            headers: headers
        })
        .then(
            (response) => { return response.json(); 
        })
        .then(
            (json) => { 
                const user_id = json.id;
                return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({name})
                })
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    const playlist_id = json.id;
                    return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,{
                        method: 'POST',
                        headers,
                        body: JSON.stringify({uris})
                    }).then((response) => {
                        const json = response.json();
                        console.log(json);
                    });
                });
            } 
        );

    }
}

export default Spotify;