import { useState } from 'react';
import Tracklist from './Tracklist.js';
// import './Playlist.css';

const Playlist = props => {

    const handleName = e => {
        props.onNameChange(e.target.value);
    }

    return (
        <>
            <input value={props.playlistName} onChange={handleName} placeholder='Name your playlist'/>
            <button onClick={props.onSave}>Save</button>
            <div className='list'>
                <Tracklist tracklist={props.playlistTracks} type='playlist' removeTrack={props.onRemove} />
            </div>
        </>
    )
}

export default Playlist;