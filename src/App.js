import { useState, useCallback } from 'react';
import './App.css';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';
import Spotify from './Spotify.js';

// const getInitialState = str => {
//   const state = localStorage.getItem(str);

//   return state;
// }

// const setInitialState = (str, val) => {
//   localStorage.setItem(str, val);
// }


const App = () => {
  const [playlistTracks, setPlaylistTracks] = useState(localStorage.getItem('playlist_tracks') && localStorage.getItem('playlist_tracks') !== '[]' ? JSON.parse(localStorage.getItem('playlist_tracks')) : []);
  const [playlistName, setPlaylistName] = useState(localStorage.getItem('playlist_name') ? localStorage.getItem('playlist_name') : 'New Playlist');
  const [searchResults, setSearchResults] = useState(localStorage.getItem('search_results') && localStorage.getItem('search_results') !== '[]' ? JSON.parse(localStorage.getItem('search_results')) : []);

  if(playlistTracks) { localStorage.setItem('playlist_tracks', JSON.stringify(playlistTracks)); }
  if(searchResults) { localStorage.setItem('search_results', JSON.stringify(searchResults)); }

  Spotify.getAccessToken();

  // const search = useCallback((term) => {
  //   const results = Spotify.search(term);
  //   setSearchResults(results);
  //   console.log(searchResults);
  // }, []);


  const search = async (term) => {
    const results = await Spotify.search(term);
    console.log('results: '+results);
    setSearchResults(results);
  }

  const addTrack = useCallback((song) => {
      setPlaylistTracks(prev => { return [...prev, song] });
  }, []);

  const removeTrack = useCallback((index) => {
    setPlaylistTracks(prev => { prev.toSpliced(index,1) });
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name, sessionStorage.setItem('playlist_name', playlistName));
  }, [playlistName]);

  const savePlaylist = () => {
    const uris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName,uris);
    setPlaylistTracks([]);
    setPlaylistName('');
    sessionStorage.removeItem('playlist_name');
    sessionStorage.removeItem('playlist_tracks');
  }

  return (
    <>
      <div className="App">
        <header>
          <SearchBar onSearch={search} />
        </header>
        <section id='results'>
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
        </section>
        <section id='playlist'>
          <Playlist 
            playListName={playlistName}
            playlistTracks={playlistTracks} 
            onNameChange={updatePlaylistName}
            onRemove={removeTrack} 
            onSave={savePlaylist}
          />
        </section>
      </div>
    </>
  );
};

export default App;
