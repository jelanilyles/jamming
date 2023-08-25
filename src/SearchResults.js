import { useState } from 'react';
import Tracklist from './Tracklist.js';

const SearchResults = props => {

    const [results, setResults] = useState([]);

    return (
        <>
            <h2>Results for: {props.searchTerm}</h2>
            <Tracklist tracklist={props.results} type='results' addSong={props.addSong} />
        </>
    );
}

export default SearchResults;