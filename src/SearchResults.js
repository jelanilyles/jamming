import Tracklist from './Tracklist.js';

const SearchResults = props => {

    return (
        <>
            <Tracklist tracklist={props.searchResults} type='results' addTrack={props.onAdd} />
        </>
    );
}

export default SearchResults;