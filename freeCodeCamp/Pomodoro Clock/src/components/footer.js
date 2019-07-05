import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { year: new Date() };
  }

  componentDidMount() {
    // get year every month
    this.timerID = setInterval(
      () => this.tick(),
      2592000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }  

  tick() {
    this.setState({
      year: new Date()
    });
  }

  render() {
    const year = this.state.year.getFullYear();
    return (
      <div>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/ogundeleolumide/" target="_blank">
              <i className="fa fa-linkedin-square" aria-hidden="true"></i>
            </a>
        </li>
          <li>
            <a href="https://www.freecodecamp.org/lumexralph" target="_blank">
              <i className="fa fa-free-code-camp" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/Lumexralph" target="_blank">
              <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
        <p>Lumex Creations <span>&copy;</span>{year}</p>
    </div>
    );
  }
  
}

export default Footer;