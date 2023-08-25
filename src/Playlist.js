import { useState } from 'react';
import Tracklist from './Tracklist.js';
// import './Playlist.css';

const Playlist = props => {

    const handleSubmit = () => {

    }

    return (
        <>
            <h2>Playlist</h2>
            <div className='list'>
                <Tracklist tracklist={props.playlist} type='playlist' removeSong={props.removeSong} />
            </div>
            {props.playlist.length > 0 ? <button onClick={handleSubmit}>Add to Spotify</button> : ''}
        </>
    )
}

export default Playlist;