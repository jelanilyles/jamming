// import { useState } from 'react';
import './SearchBar.css';

const SearchBar = props => {

    return (
        <form onSubmit={props.onSearch}>
            <label htmlFor="search">Search a Song:</label>
            <input type='text' id='search' name='search' value={props.input} onChange={props.onInput} />
            <button type='submit'>Submit Search</button>
        </form>
    );
}

export default SearchBar;