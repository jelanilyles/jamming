import { useState, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = props => {

    const [term, setTerm] = useState('');
    

    const handleSearchTerm = useCallback((e) => {
        setTerm(e.target.value);
    },[]);

    const search = useCallback(() => {
        props.onSearch(term);
    },
    [props.onSearch, term]);

    return (
        <div className='form'>
            <input placeholder='Enter song title' onChange={handleSearchTerm} />
            <button type='submit' onClick={search}>Search</button>
        </div>
    );
}

export default SearchBar;