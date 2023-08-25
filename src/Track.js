import { useState } from 'react';
import './Track.css';

const Track = props => {

    const track = props.track;
    const id = track.id;
    const artists = props.track.artists.reduce((pre, cur) => { 
        if(cur.name != props.track.artists[0].name) {
            return pre + ', ' + cur.name;
        } else {
            return pre;
        }}, props.track.artists[0].name);


    const addToPlaylist = () => {
        props.addSong(props.track);
    }

    const removeFromPlaylist = () => {
        props.removeSong(props.index);
    }

    return (
        <div className='track'>
            <div className='track-info'>
                <img src={track.album.images[2].url} alt={'cover art for '+track.name} />
                <audio src={track.preview_url} controls />
                <button onClick={props.type === 'results' ? addToPlaylist : removeFromPlaylist}>{props.type === 'results' ? 'Add' : 'Remove'}</button>
            </div>
            <h4>{track.name} - {artists}</h4>
        </div>
    );
}

export default Track;