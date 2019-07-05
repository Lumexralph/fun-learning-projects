import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const YouTubeAPIKey = 'AIzaSyD5QLwhk6Bd3HkHS3QIMaDM8yRlbYKVjls';

class App extends Component {
constructor(props) {
  super(props);
  
  this.state = { 
    videos: [],
    selectedVideo: null
   };

   this.videoSearch('surfboards');
  
}

videoSearch(term) {
  YTSearch({key: YouTubeAPIKey, term: term}, (videos) => this.setState({ 
    videos,
    selectedVideo: videos[0]
   })
  );
}

render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
      
};

ReactDOM.render(<App />, document.querySelector('.container'));