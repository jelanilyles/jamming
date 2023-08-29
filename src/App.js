import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}


const client_id = '5a0432382920484a8e0536a62123dfd0'
const client_secret = 'b991801b42454006895774d3eb250f58';
const redirect_uri = 'http://localhost:3000/callback';

function App() {

  // const [token, setToken] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // let results = [];


  const authorize = async () => {
    
    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then(code_challenge => {
      let state = generateRandomString(16);
      let scope = 'playlist-read-private playlist-modify-private user-read-private';

      localStorage.setItem('code_verifier', codeVerifier);

      let args = new URLSearchParams({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
        state,
        code_challenge_method: 'S256',
        code_challenge
      });

      window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    let code_verifier = localStorage.getItem('code_verifier');

    const getToken = async () => {
      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        client_id,
        code_verifier
      });

      try{
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body
        });

        if(response.ok) {
          const json = await response.json();
          localStorage.setItem('access_token', json.refresh_token ? json.refresh_token : json.access_token);
          // setToken(true);
        }
      } catch(e) {
        console.log(e);
      }
    }

    if(code) {
      console.log('code::: '+code);
      getToken();
      console.log('token::: '+localStorage.getItem('access_token'));
    }

  }, []);

  const handleInput = e => {
    setSearchTerm(e.target.value);
  }

  const handleResults = async (e) => {
    
    e.preventDefault();
    const endpoint = 'https://api.spotify.com/v1/search?q='+searchTerm+'&type=track';
    const token = localStorage.getItem('access_token');

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
            // setResults(jsonResponse.tracks.items);
            // console.log(jsonResponse.tracks.items);
            setResults(()=> [...jsonResponse.tracks.items]);

            console.log(jsonResponse);
        }
    } catch(e) {
        console.log(e);
    }
  }

  const addToPlaylist = song => {
    setPlaylist(prev => [...prev, song]);
  }

  const removeFromPlaylist = index => {
    setPlaylist(prev => prev.toSpliced(index,1));
  }

  if(localStorage.getItem('access_token')) {
    return (
      <>
        <div className="App">
          <header>
            <SearchBar input={searchTerm} onInput={handleInput} onSearch={handleResults} />
          </header>
          <section id='results'>
            <SearchResults results={results} addSong={addToPlaylist} searchTerm={searchTerm} />
          </section>
          <section id='playlist'>
            <Playlist playlist={playlist} removeSong={removeFromPlaylist} user_id='1212000590' token={localStorage.getItem('access_token')} />
          </section>
        </div>
        <div>
          <p>{localStorage.getItem('access_token')}</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id='auth'>
          <h3>Enter:</h3>
          <button onClick={authorize}>Authorize</button>
        </div>
        <div>
          <p>{localStorage.getItem('access_token')}</p>
      </div>
      </>
    );
  }
}

export default App;
