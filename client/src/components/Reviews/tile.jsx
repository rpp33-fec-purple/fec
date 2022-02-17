import React from 'react';
import styled from 'styled-components';
import {formatDate} from '../../utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Thumbnail = styled.img`
width: 100px;
height: 100px;
`;

class Tile extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let view;
    if (this.props.reviews.results) {
      let currentReview = this.props.reviews.results[2];
      let recommend;
      let photos;
      if (currentReview.recommend) {
        recommend = <div><FontAwesomeIcon icon={faCheck} /> I recommend this product</div>
      }
      if (currentReview.photos) {
        photos = currentReview.photos.map((photo) => {
          return <Thumbnail src={photo.url} key={photo.id}></Thumbnail>
        })
      }
      view =
      <div>
        <div>{currentReview.reviewer_name}, {formatDate(currentReview.date)}</div>
        <div><b>{currentReview.summary}</b></div>
        <div>{currentReview.body}</div>
        {photos}
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