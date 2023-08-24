// import { useState } from 'react';
import Tracklist from './Tracklist.js';

const SearchResults = props => {

    return (
        <>
            <Tracklist tracklist={props.results}/>
        </>
    );
}

export default SearchResults;