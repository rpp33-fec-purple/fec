import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log('in tile',this.props);
    return (
      <div>Review Tile</div>
    )
  }
}

export default Tile;