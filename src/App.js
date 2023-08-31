import { useState, useCallback } from 'react';
import './App.css';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';
import Spotify from './Spotify.js';

const App = () => {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [searchResults, setSearchResults] = useState([]);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const addTrack = useCallback((song) => {
      setPlaylistTracks(prev => [...prev, song]);
  }, []);

  const removeTrack = useCallback((index) => {
    setPlaylistTracks(prev => prev.toSpliced(index,1));
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = () => {
    const uris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName,uris);
    setPlaylistTracks([]);
    setPlaylistName('');
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
