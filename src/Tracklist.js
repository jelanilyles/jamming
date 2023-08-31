// import { useState } from 'react';
import Track from './Track.js';
import './Tracklist.css';

const Tracklist = props => {

    const tracks = props.tracklist.map((song, i) => <Track track={song} key={song.id} type={props.type} addTrack={props.addTrack} removeTrack={props.removeTrack} index={i}/>);


    return (
        <div className='tracks'>
            {tracks}
        </div>
    );
}

export default Tracklist;