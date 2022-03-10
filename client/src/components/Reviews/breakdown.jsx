import React from 'react';
import styled from 'styled-components';
import {formatDate, shorten} from '../../utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'

const BreakdownContainer = styled.div`
display: flex;
flex-direction: column;
`;

const Wrapper = styled.div`
  margin-top: 10px;
  width: 250px;
`;

const RatingBar = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  padding: 1px;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2);
  &:hover {
    cursor: pointer;
    background-color: #aaa;
  }
`;

const RatingBarFill = styled.span`
  display: block;
  height: 8px;
  background-color: #a070a1;
  border-radius: 3px;
  width: 0%;
`;

const ActionDiv = styled.div`
  display: inline;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

const RatingBarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-top: 10px;
  // font-size: 30px;
`;

const RecommendBar = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  height: 8px;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2);
`;

const RecommendBarPercent = styled.span`
  display: block;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2);
  width: 0%;
  position: relative;
`;

const RecommendMetricsDisplay = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 0.8em;
`;

const recommendChars = {
  Size: ['too small', 'perfect', 'too big'],
  Width: ['too narrow', 'perfect', 'too wide'],
  Comfort: ['uncomfortable', 'ok', 'perfect'],
  Quality: ['poor', 'what I expected', 'perfect'],
  Length: ['runs short', 'perfect', 'runs long'],
  Fit: ['runs tight', 'perfect', 'runs loose']
}


class Breakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingsSelected: {
        5: false,
        4: false,
        3: false,
        2: false,
        1: false
      }
    };
    this.handleRatingClick = this.handleRatingClick.bind(this);
    this.handleRemoveAllStarFilterClick = this.handleRemoveAllStarFilterClick.bind(this);
  }

  handleRatingClick = (event) => {
    let rating = event.target.attributes.value.value;
    let ratingsCopy = this.state.ratingsSelected;
    ratingsCopy[rating] = !ratingsCopy[rating];
    this.setState({
      ratingsSelected: ratingsCopy
    });
    this.props.updateRatingsToFilter(ratingsCopy);
  }

  handleRemoveAllStarFilterClick = (event) => {
    const clearRatingFilters = {
      5: false,
      4: false,
      3: false,
      2: false,
      1: false
    }
    this.setState({ratingsSelected: clearRatingFilters});
    this.props.updateRatingsToFilter(clearRatingFilters);
  };

  render() {
    let breakdownView;
    let avgRating;


    //Configure view if we have a current product from app component
    if (this.props.reviews.results && this.props.meta.ratings) {
      let reviewCount = this.props.reviews.results.length;
      let totalRating = 0;
      let meta = this.props.meta;
      let ratings = this.props.meta.ratings;
      for (let key in this.props.meta.ratings) {
        totalRating += (parseInt(key) * this.props.meta.ratings[key]);
      }

      // Get average rating
      if (this.props.rating) {
        avgRating = this.props.rating;
      }
      let numOfRatings = 0;
      for (var key in this.props.meta.ratings) {
        numOfRatings += parseInt(this.props.meta.ratings[key]);
      }

      let ratingFilterLabels = [];
      for (let key in this.state.ratingsSelected) {
        if (this.state.ratingsSelected[key]) {
          ratingFilterLabels.push(key)
        }
      }
      let ratingFilterView;
      if (ratingFilterLabels.length) {
        ratingFilterLabels.sort(function(a, b) {
          return b - a;
        });
        ratingFilterView =
        <div style={{fontSize: ".8em", margin: "10px 0 0 0"}}>Ratings filtered by star(s): {ratingFilterLabels.map((label) => {
          return (`${label} `)
        })} <ActionDiv onClick={this.handleRemoveAllStarFilterClick}>Remove all filters</ActionDiv>
        </div>
      } else {
        ratingFilterView = <></>
      }

      //calculate recommendation %
      const recommend = parseInt(meta.recommended.true);
      const dontRecommend = parseInt(meta.recommended.false);
      let recommendedPercent = Math.trunc((recommend / (dontRecommend + recommend)) * 100)

      //calculate recommendation characteristics display
      let recommendDisplay
      let productChars = [];
      for (var key in meta.characteristics) {
        productChars.push(key);
      }
      recommendDisplay = productChars.map((char) => {
        let charPercent = `${(parseInt(meta.characteristics[char].value) / 5) * 100}%`;
        return (
          <Wrapper key={meta.characteristics[char].id}>
            <div>{char}</div>
            <RecommendBar><RecommendBarPercent style={{width: charPercent}}><FontAwesomeIcon icon={faCaretUp} style={{position: "absolute", right: "0", top: "0"}}/></RecommendBarPercent></RecommendBar>
            <RecommendMetricsDisplay>
              <div>{recommendChars[char][0]}</div>
              <div>{recommendChars[char][1]}</div>
              <div>{recommendChars[char][2]}</div>
            </RecommendMetricsDisplay>
          </Wrapper>
        )
      })

      //build star rating display
      let stars = [1, 2, 3, 4, 5];
      let starRatingDisplay = stars.map((star) => {
        if (star <= avgRating) {
          return (
            <div className="stars-outer">
              <div className={'breakdown-stars-inner' + star} style={{width: "100%"}}></div>
            </div>
          )
        } else if (star - avgRating < 1) {
          let starPercent = `${((avgRating % 1).toFixed(2)) * 100}%`;
          return (
            <div className="stars-outer">
              <div className={'breakdown-stars-inner' + star} style={{width: starPercent}}></div>
            </div>
          )
        } else {
          return (
            <div className="stars-outer">
              <div className={'breakdown-stars-inner' + star}></div>
            </div>
          )
        }
      })


      breakdownView =
      <>
        <div style={{display: "flex"}}>
          <h2 style={{fontSize: "3em"}}>{avgRating}</h2>
          {starRatingDisplay}
        </div>
        <p style={{fontSize: "1vw"}}>{recommendedPercent}% of reviews recommend this product</p>
        <>{ratingFilterView}</>
        <Wrapper>
          <RatingBarContainer><ActionDiv value={5} onClick={this.handleRatingClick} style={{fontSize: "1.5vh"}}>5 stars<span>({ratings[5]})</span></ActionDiv><RatingBar value={5} onClick={this.handleRatingClick}><RatingBarFill style={{width: `${(ratings[5] / numOfRatings) * 100}%`}}></RatingBarFill></RatingBar></RatingBarContainer>
          <RatingBarContainer><ActionDiv value={4} onClick={this.handleRatingClick} style={{fontSize: "1.5vh"}}>4 stars<span>({ratings[4]})</span></ActionDiv><RatingBar value={4} onClick={this.handleRatingClick}><RatingBarFill style={{width: `${(ratings[4] / numOfRatings) * 100}%`}}></RatingBarFill></RatingBar></RatingBarContainer>
          <RatingBarContainer><ActionDiv value={3} onClick={this.handleRatingClick} style={{fontSize: "1.5vh"}}>3 stars<span>({ratings[3]})</span></ActionDiv><RatingBar value={3} onClick={this.handleRatingClick}><RatingBarFill style={{width: `${(ratings[3] / numOfRatings) * 100}%`}}></RatingBarFill></RatingBar></RatingBarContainer>
          <RatingBarContainer><ActionDiv value={2} onClick={this.handleRatingClick} style={{fontSize: "1.5vh"}}>2 stars<span>({ratings[2]})</span></ActionDiv><RatingBar value={2} onClick={this.handleRatingClick}><RatingBarFill style={{width: `${(ratings[2] / numOfRatings) * 100}%`}}></RatingBarFill></RatingBar></RatingBarContainer>
          <RatingBarContainer><ActionDiv value={1} onClick={this.handleRatingClick} style={{fontSize: "1.5vh"}}>1 stars<span>({ratings[1]})</span></ActionDiv><RatingBar value={1} onClick={this.handleRatingClick}><RatingBarFill style={{width: `${(ratings[1] / numOfRatings) * 100}%`}}></RatingBarFill></RatingBar></RatingBarContainer>
        </Wrapper>
        <div>{recommendDisplay}</div>
      </>
    }
    return(
      <BreakdownContainer>{breakdownView}</BreakdownContainer>
    )
  }
}

export default Breakdown;