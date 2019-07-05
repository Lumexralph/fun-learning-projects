import React from 'react';
import { connect } from 'react-redux';

// will recive the props from the store and return the data
const mapStateToProps = state => {
  return { articles: state.articles };
};

// componnet that will consume the state returned as props
const ConnectedList = ({articles}) => (
  <ul className="list-group list-group-flush">
    {articles.map(el => (
      <li className="list-group-item" key={el.id}>
      {el.title}
    </li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;