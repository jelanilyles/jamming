// import { useState } from 'react';
import Track from './Track.js';
import './Tracklist.css';

const Tracklist = props => {

    const tracks = props.tracklist.map((song, i) => <Track track={song} key={'searchresult_'+i} type={props.type} addSong={props.addSong} removeSong={props.removeSong} index={i}/>);


    return (
        <div className='tracks'>
            {tracks}
        </div>
    );
}

export default Tracklist;