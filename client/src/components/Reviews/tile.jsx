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

const ActionDiv = styled.div`
  display: inline;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
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
  this.handleHelpfulClick = this.handleHelpfulClick.bind(this);
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
          <div>{withinLimit}
            <span style={{display: this.state.isBodyExpanded ?  'inline' : 'none'}}>{overLimit}</span>
            <ActionDiv onClick={this.handleShowMore} style={{display: this.state.isBodyExpanded ?  'block' : 'inline'}}>...Show More</ActionDiv>
          </div>
        </div>
      )
    }
  };

  handleShowMore = (e) => {
    this.setState({isBodyExpanded: !this.state.isBodyExpanded}, () => {
      if (this.state.isBodyExpanded) {
        e.target.innerHTML = 'Show Less'
      } else {
        e.target.innerHTML = '...Show More'
      }
    });
  }

  handleHelpfulClick = (e) => {
    $.ajax({
      url: `http://localhost:3000/reviews/${e.target.id}/helpful`,
      data: {
        review_id: e.target.id
      },
      method: 'PUT',
      success: (data) => {
        console.log('Successfully voted helpul');
        this.setState({meta: data});
      },
      error: (err) => {
        console.log('Error with helpful PUT request:', err);
      }
    });
  }

  handleReportClick = (e) => {
    $.ajax({
      url: `http://localhost:3000/reviews/${e.target.id}/report`,
      data: {
        review_id: e.target.id
      },
      method: 'PUT',
      success: (data) => {
        console.log('Successfully reported review');
        this.setState({meta: data});
      },
      error: (err) => {
        console.log('Error with reporting review:', err);
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
    let view;
    if (this.props.reviews.results) {
      let currentReview = this.props.reviews.results[this.props.reviewIndex];
      console.log('current review', currentReview);
      const checkMark = <FontAwesomeIcon icon={faCheck}/>
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
        {this.shorten(currentReview.body, 250, currentReview.id)}
        {photos}
        {currentReview.recommend ? <div>{checkMark} I recommend this product</div> : null}
        {currentReview.response ? <div>Response: {currentReview.response}</div>: null}
        <div>Helpful? <ActionDiv id={currentReview.review_id} onClick={this.handleHelpfulClick}>Yes</ActionDiv>({currentReview.helpfulness})  |  <ActionDiv id={currentReview.review_id} onClick={this.handleReportClick}>Report</ActionDiv></div>
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