import React from 'react';
import ReactDOM from 'react-dom';

import PomodoroApp from './components/app';

const YouTubeAPIKey = 'AIzaSyD5QLwhk6Bd3HkHS3QIMaDM8yRlbYKVjls';

// create a new component to produce some html
const App = () => {
       return (
        <div>
            <PomodoroApp />
        </div>
      );
};

// take these components' generated html
// and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));