import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class HomePage extends Component {
  render() {
    return (
      <div>
        <p>This will be the homepage</p>
        <Link to="about">Learn More..</Link>
      </div>
    );
  }
}

export default HomePage;
