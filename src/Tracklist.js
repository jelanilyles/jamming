// import { useState } from 'react';
import Track from './Track.js';

const Tracklist = props => {

    return (
        <>
            {props.tracklist.map(song => <Track track={song} addSong/>)}
        </>
    );
}

export default Tracklist;