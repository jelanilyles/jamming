import { useState } from 'react';
import Tracklist from './Tracklist.js';

const Playlist = props => {

    const [playlist, setPlaylist] = useState([]);

    const handleSubmit = () => {

    }

    return (
        <>
            <Tracklist tracklist={playlist} />
            <button>Add to Spotify</button>
        </>
    )
}

export default Playlist;