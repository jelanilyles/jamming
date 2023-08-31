import { useState } from 'react';
import './Track.css';

const Track = props => {

    const track = props.track;
    const id = track.id;


    const addToPlaylist = () => {
        props.addTrack(props.track);
    }

    const removeFromPlaylist = () => {
        props.removeTrack(props.index);
    }

    return (
        <div className='track'>
            <div className='track-info'>
                <img src={track.cover} alt={'cover art for '+track.name} />
                <audio src={track.preview} controls />
                <button onClick={props.type === 'results' ? addToPlaylist : removeFromPlaylist}>{props.type === 'results' ? 'Add' : 'Remove'}</button>
            </div>
            <h4>{track.name} - {track.artist}</h4>
        </div>
    );
}

export default Track;