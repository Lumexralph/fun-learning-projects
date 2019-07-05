import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
    // use arrow function to avoid this
    // this.handleInputChange = this.handleInputChange.bind(this);
  }
  render() {
    return(
      <div className="search-bar">
        <input 
          value={this.state.term}
          onChange={event => this.handleInputChange(event.target.value)}
         />
      </div>
    ) ;
  }

  handleInputChange =  (term) => {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;