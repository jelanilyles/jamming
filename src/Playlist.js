import { useState } from 'react';
import Tracklist from './Tracklist.js';
// import './Playlist.css';

const Playlist = props => {

    const [name, setName] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/users/1212000590/playlists', {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    name: name,
                    public: true,
                    description: 'new playlist'
                })
            });

            if(response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
            }
        } catch(e) {
            console.log(e);
        }

    }

    return (
        <>
            <h2>Playlist</h2>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} name='playlist_name' />
            <div className='list'>
                <Tracklist tracklist={props.playlist} type='playlist' removeSong={props.removeSong} />
            </div>
            {props.playlist.length > 0 ? <button onClick={handleSubmit}>Add to Spotify</button> : ''}
        </>
    )
}

export default Playlist;