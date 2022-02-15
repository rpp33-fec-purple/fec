import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let view;
    if (this.props.reviews.results) {
      let date = new Date(this.props.reviews.results[0].date).toLocaleDateString();
      console.log(date);
      view =
      <div>
        <div>{this.props.reviews.results[0].reviewer_name}, {date}</div>
      </div>
    } else {
      view = <div>No Reviews Yet</div>
    }
    return (<div>{view}</div>)
  }

  componentDidUpdate(prevProps) {

  }
}

export default Tile;