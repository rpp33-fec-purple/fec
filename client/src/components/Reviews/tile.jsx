import React from 'react';
import {formatDate} from '../../utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

class Tile extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let view;
    if (this.props.reviews.results) {
      let currentReview = this.props.reviews.results[1];
      let recommend;
      if (currentReview.recommend) {
        recommend = <div><FontAwesomeIcon icon={faCheck} /> I recommend this product</div>
      }
      view =
      <div>
        <div>{currentReview.reviewer_name}, {formatDate(currentReview.date)}</div>
        <div><b>{currentReview.summary}</b></div>
        <div>{currentReview.body}</div>
        <div>{recommend}</div>
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


{/* <FontAwesomeIcon icon={faCheck} /> */}