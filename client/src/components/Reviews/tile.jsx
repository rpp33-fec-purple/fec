import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let view;
    if (this.props.reviews.results) {
      let currentReview = this.props.reviews.results[0];
      let date = new Date(currentReview.date).toLocaleDateString();
      console.log(date);
      view =
      <div>
        <div>{currentReview.reviewer_name}, {date}</div>
        <div><b>{currentReview.summary}</b></div>
        <div>{currentReview.body}</div>
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