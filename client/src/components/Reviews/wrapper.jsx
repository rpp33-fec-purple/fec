import React from 'react';
import List from './list.jsx';
import Tile from './tile.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Review Component</h2>
        <List/>
        <Tile productID={this.props.productID}/>
      </div>
    )
  }
}

export default Reviews;