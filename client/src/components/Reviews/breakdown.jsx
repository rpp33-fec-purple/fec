import React from 'react';
import styled from 'styled-components';
import {formatDate, shorten} from '../../utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  width: 250px;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  padding: 3px;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2);
  &:hover {
    cursor: pointer;
    background-color: #aaa;
  }
`;

const ProgressBarFill = styled.span`
  display: block;
  height: 10px;
  background-color: #8db600;
  border-radius: 3px;
  width: 0%;

  transition: width 500ms ease-in-out;
`;

const ActionDiv = styled.div`
  display: inline;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;


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
        <div>Ratings filtered by star(s): {ratingFilterLabels.map((label) => {
          return (`${label} `)
        })} <ActionDiv onClick={this.handleRemoveAllStarFilterClick}>Remove all filters</ActionDiv>
        </div>
      } else {
        ratingFilterView = <div></div>
      }

      //calculate recommendation %
      const recommend = parseInt(meta.recommended.true);
      const dontRecommend = parseInt(meta.recommended.false);
      let recommendedPercent = Math.trunc((recommend / (dontRecommend + recommend)) * 100)

      breakdownView =
      <>
        <h2>{avgRating}</h2>
        <h4>Rating Breakdown</h4>
        <>{ratingFilterView}</>
        <Wrapper>
          <ActionDiv value={5} onClick={this.handleRatingClick}>5 Star</ActionDiv><span>({ratings[5]})</span><ProgressBar value={5} onClick={this.handleRatingClick}><ProgressBarFill style={{width: `${(ratings[5] / numOfRatings) * 100}%`}}></ProgressBarFill></ProgressBar>
          <ActionDiv value={4} onClick={this.handleRatingClick}>4 Star</ActionDiv><span>({ratings[4]})</span><ProgressBar value={4} onClick={this.handleRatingClick}><ProgressBarFill style={{width: `${(ratings[4] / numOfRatings) * 100}%`}}></ProgressBarFill></ProgressBar>
          <ActionDiv value={3} onClick={this.handleRatingClick}>3 Star</ActionDiv><span>({ratings[3]})</span><ProgressBar value={3} onClick={this.handleRatingClick}><ProgressBarFill style={{width: `${(ratings[3] / numOfRatings) * 100}%`}}></ProgressBarFill></ProgressBar>
          <ActionDiv value={2} onClick={this.handleRatingClick}>2 Star</ActionDiv><span>({ratings[2]})</span><ProgressBar value={2} onClick={this.handleRatingClick}><ProgressBarFill style={{width: `${(ratings[2] / numOfRatings) * 100}%`}}></ProgressBarFill></ProgressBar>
          <ActionDiv value={1} onClick={this.handleRatingClick}>1 Star</ActionDiv><span>({ratings[1]})</span><ProgressBar value={1} onClick={this.handleRatingClick}><ProgressBarFill style={{width: `${(ratings[1] / numOfRatings) * 100}%`}}></ProgressBarFill></ProgressBar>
        </Wrapper>
        <p>{recommendedPercent}% of reviews recommend this product</p>
      </>
    }
    return(
      <div>{breakdownView}</div>
    )
  }
}

export default Breakdown;