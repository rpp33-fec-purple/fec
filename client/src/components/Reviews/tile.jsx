import React from 'react';
import styled from 'styled-components';
import {formatDate, shorten} from '../../utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import ImgModal from './imgModal.jsx';

const Thumbnail = styled.img`
width: 100px;
height: 100px;
`;

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isImageExpanded: false,
      expandedImageURL: null
    }
  this.expandImg = this.expandImg.bind(this);
  this.closeImgModal = this.closeImgModal.bind(this);
  }

  expandImg = (e) => {
    this.setState({isImageExpanded: true, expandedImageURL: e.target.src});
  }

  closeImgModal = () => {
    this.setState({isImageExpanded: false, expandedImageURL: null})
  }

  render() {
    let view;
    if (this.props.reviews.results) {
      let currentReview = this.props.reviews.results[2];
      const checkMark = <FontAwesomeIcon icon={faCheck} />
      let photos;
      if (currentReview.photos) {
        photos = currentReview.photos.map((photo) => {
          return <Thumbnail src={photo.url} key={photo.id} onClick={this.expandImg}></Thumbnail>
        })
      }
      view =
      <div>
        {this.state.isImageExpanded ? <ImgModal url={this.state.expandedImageURL} closeImgModal={this.closeImgModal}></ImgModal> : null}
        <div>{currentReview.reviewer_name}, {formatDate(currentReview.date)}</div>
        <div><b>{currentReview.summary}</b></div>
        <div className="more">{currentReview.body}</div>
        {photos}
        {currentReview.recommend ? <div>{checkMark} I recommend this product</div> : null}
        {currentReview.response ? <div>Response: {currentReview.response}</div>: null}
        <div>Helpful? Yes({currentReview.helpfulness})  |  Report</div>
      </div>

      // let currentReview = this.props.reviews.results[1];
      // const checkMark = <FontAwesomeIcon icon={faCheck} />
      // // let photos;
      // // if (currentReview.photos) {
      // //   photos = currentReview.photos.map((photo) => {
      // //     return <Thumbnail src={photo.url} key={photo.id} onClick={this.expandImg}></Thumbnail>
      // //   })
      // // }
      // view =
      // this.props.reviews.results.map((review) => {
      //   let photos;
      //   if (review.photos) {
      //     photos = review.photos.map((photo) => {
      //     return <Thumbnail src={photo.url} key={photo.id} onClick={this.expandImg}></Thumbnail>
      //   })
      // }
      //   return (
      //    <div>
      //     {this.state.isImageExpanded ? <ImgModal url={this.state.expandedImageURL} closeImgModal={this.closeImgModal}></ImgModal> : null}
      //     <div>{review.reviewer_name}, {formatDate(review.date)}</div>
      //     <div><b>{review.summary}</b></div>
      //     <div className="more">{review.body}</div>
      //     {photos}
      //     {review.recommend ? <div>{checkMark} I recommend this product</div> : null}
      //     {review.response ? <div>Response: {review.response}</div>: null}
      //     <div>Helpful? Yes({review.helpfulness})  |  Report</div>
      //   </div>
      //   )
      // })
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