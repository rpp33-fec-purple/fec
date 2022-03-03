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
      expandedImageURL: null,
      isBodyExpanded: false
    }
  this.expandImg = this.expandImg.bind(this);
  this.closeImgModal = this.closeImgModal.bind(this);
  this.shorten = this.shorten.bind(this);
  this.handleShowMore = this.handleShowMore.bind(this);
  }


  shorten = (string, charLimit, id) => {
    //count characters in string
    var charCount = string.length;
    //if string is less than maxChars return whole string
    if (charCount <= charLimit) {
      return <p>{string}</p>
    } else {
    // split string and format element to enable show/hide
      var withinLimit = string.slice(0, charLimit);
      var overLimit = string.slice(charLimit, string.length);

      return (
        <div className="reviewBody">
          <p>{withinLimit}
            <span style={{display: this.state.isBodyExpanded ?  'inline' : 'none'}}>{overLimit}</span>
            <button className="showMore" onClick={this.handleShowMore} style={{display: this.state.isBodyExpanded ?  'block' : 'inline'}}>Show More</button>
          </p>
        </div>
      )
    }
  };

  handleShowMore = (e) => {
    this.setState({isBodyExpanded: !this.state.isBodyExpanded}, () => {
      if (this.state.isBodyExpanded) {
        e.target.innerHTML = 'Show Less'
      } else {
        e.target.innerHTML = 'Show More'
      }
    });
  }

  expandImg = (e) => {
    this.setState({isImageExpanded: true, expandedImageURL: e.target.src});
  }

  closeImgModal = () => {
    this.setState({isImageExpanded: false, expandedImageURL: null})
  }

  render() {
    return ''; // Added because reading undefined for 'reviewer_name' when switching to productId 64627 - Jakob
    let view;
    let testString = `Relevant - Relevance will be determined by a combination of both the date that the review was submitted as well as ‘helpfulness’ feedback received.  This combination should weigh the two characteristics such that recent reviews appear near the top, but do not outweigh reviews that have been found helpful.  Similarly, reviews that have been helpful should appear near the top, but should yield to more recent reviews if they are older.`
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
        {this.shorten(testString, 250, currentReview.id)}
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