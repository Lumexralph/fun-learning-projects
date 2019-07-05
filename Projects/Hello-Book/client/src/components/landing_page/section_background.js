import React, { Component } from 'react';

import SectionOne from './section_1';
import SectionTwo from './section_2';
import SectionThree from './section_3';
import SectionFour from './section_4';
import SectionFive from './section_5';
import SectionSix from './section_6';
import SectionSeven from './section_7';


class SectionBackground extends Component {
  render() {
    return(
      <div>
        <SectionOne />
        <hr />
        <SectionTwo />
        <hr />
        <SectionThree />
        <hr />
        <SectionFour />
        <hr />
        <SectionFive />
        <hr />
        <SectionSix />
        <hr />
        <SectionSeven />
      </div>
    );
  }
}

export default SectionBackground;