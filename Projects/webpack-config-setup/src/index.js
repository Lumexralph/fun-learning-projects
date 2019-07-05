import _ from 'lodash';
import './style.css';
import { cube } from './math.js';
import printMe from './print';

function component() {
  // let element = document.createElement('div');
  var btn = document.createElement('button');
  var element = document.createElement('pre');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');

  //  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());