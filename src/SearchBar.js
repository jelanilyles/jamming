import { useState, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = props => {

    const last_term = localStorage.getItem('last_search') || '';

    const [term, setTerm] = useState(last_term);

    localStorage.setItem('last_search', term);

    const handleSearchTerm = useCallback((e) => {
        setTerm(e.target.value);
    },[]);

    const search = useCallback(() => {
        props.onSearch(term);
    },
    [props.onSearch, term]);

    return (
        <div className='form'>
            <input placeholder='Enter song title' onChange={handleSearchTerm} value={term} />
            <button type='submit' onClick={search}>Search</button>
        </div>
    );
}

export default SearchBar;