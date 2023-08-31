let accessToken;
const client_id = '5a0432382920484a8e0536a62123dfd0';
const redirect_uri = 'http://localhost:3000/callback';

const Spotify = {
    getAccessToken() {
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
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?q='+${term}+'&type=track`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                cover: track.album.images[2].url,
                uri: track.uri,
                preview: track.preview_url
            }));
        });
    },
    savePlaylist(name, uris) {
        if(!name || !uris){
            return;
        }

        const accessToken = Spotify.getAccessToken();
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