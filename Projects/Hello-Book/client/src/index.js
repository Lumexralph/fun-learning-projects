import React from 'react';
import ReactDOM from 'react-dom';

import SectionBackground from './components/landing_page/section_background';

// create a new component to produce html
const App = () => {
       return (
        <div>
          <SectionBackground />
        </div>
      );
};

// take these components' generated html
// and put on the page
ReactDOM.render(<App />, document.querySelector('.container'));