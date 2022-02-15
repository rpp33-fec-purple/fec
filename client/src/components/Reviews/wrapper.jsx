import React from 'react';
import List from './list.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Review Component</h2>
        <List/>
      </div>
    )
  }
}

export default Reviews;