import { useState } from 'react';

const Track = props => {

    const id = props.track.id;
    const artists = props.track.artists.reduce((pre, cur) => pre + ', ' + cur);
    const [added, setAdded] = useState(props.listOfIds.inlcudes(id));

    const addToPlaylist = () => {
        props.addSong(props.track);
    }

    const removeFromPlaylist = () => {
        props.removeSong(props.track);
    }

    return (
        <div className='track'>
            <div className='track-info'>
                <img src={props.track.album.images[2].url} alt={props.alt}/>
                <h4>{props.track.name} - {artists}</h4>
                <button onClick={addToPlaylist}></button>
            </div>
            <audio src={props.preview} controls />
        </div>
    );
}

export default Track;