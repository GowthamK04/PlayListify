import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar.js'
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js';
import { Spotify }  from '../../util/Spotify.js';
import logo from '../App/playlistify_logo.jpg'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "Playlist Name",
      playlistTracks: [],  
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);

  }

  addTrack(track){
    const foundTrack = this.state.playlistTracks.find(
      (playlistTrack)=>playlistTrack.id === track.id
    );

    const newTrack = this.state.playlistTracks.concat(track);

    foundTrack ? console.log("Track already exists") : this.setState({playlistTracks: newTrack});
    
  }

  removeTrack(track){
    const isPresent = this.state.playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );

    this.setState({playlistTracks: isPresent});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map((track)=>track.uri);
    const name = this.state.playlistName;
    Spotify.savePlaylist(name, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      })
    })
  }

  search(term){
    console.log(term);
    Spotify.search(term).then(result => {
      this.setState({searchResults: result});
    })
    
  }

  handleTermChange(e){
    this.setState({term: e.target.value});
  }



  render(){
    return (
      <div>
        <div className='title'>
          <img src={logo} alt='Logo' className='logo'/>
          <h1>Play<span className="highlight">Listify</span></h1>
        </div>
        <div className="App">
          <SearchBar 
            onSearch = {this.search}
          />
          <div className="App-playlist">
            <SearchResults 
            searchResults={this.state.searchResults} 
            onAdd = {this.addTrack}
            />
            <Playlist 
              playlistName = {this.state.playlistName} 
              playlistTracks = {this.state.playlistTracks} 
              onRemove = {this.removeTrack}
              onNameChange = {this.updatePlaylistName}
              onSave = {this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
