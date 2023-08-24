import { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';

function App() {

  const [token, setToken] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const authorize = async (e) => {
    e.preventDefault();
    const endpoint = 'https://accounts.spotify.com/api/token';
    const client_id = '5a0432382920484a8e0536a62123dfd0'
    const client_secret = 'b991801b42454006895774d3eb250f58';
    
    try{
      const response = await fetch(endpoint,{
        method: 'POST',
        body: 'grant_type=client_credentials&client_id='+client_id+'&client_secret='+client_secret,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // "Authorization": btoa(client_id+':'+client_secret),
          // 'grant_type': 'client_credentials',
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
          // "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"
        }
      });

      if(response.ok) {
        const jsonResponse = await response.json();
        setToken(jsonResponse.access_token);
      }
    } catch(e) {
      console.log(e);
    }
  }

  const handleInput = e => {
    setSearchTerm(e.target.value);
  }

  const handleResults = async (e) => {
    
    e.preventDefault();
    const endpoint = 'https://api.spotify.com/v1/search?q='+searchTerm+'&type=track';
    
    try{
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });

        if(response.ok) {
            const jsonResponse = await response.json();
            setResults(jsonResponse.tracks.items);
            console.log(jsonResponse.tracks.items);
        }
    } catch(e) {
        console.log(e);
    }
  }

  if(token) {
    return (
      <div className="App">
        <SearchBar input={searchTerm} onInput={handleInput} onSearch={handleResults} />
        <SearchResults searchTerms={searchTerm} results={results} />
        <Playlist playlist={playlist} />
        <div>
          <span>Playlist: {playlist}</span>
          <span>Results: {results}</span>
          <span>Search Term: {searchTerm}</span>
        </div>
      </div>
    );
  } else {
    return (
      <button onClick={authorize}>Authorize</button>
    );
  }
}

export default App;
