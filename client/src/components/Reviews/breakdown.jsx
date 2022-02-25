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
`;

const ProgressBarFill = styled.span`
  display: block;
  height: 10px;
  background-color: #8db600;
  border-radius: 3px;
  width: 0%;

  transition: width 500ms ease-in-out;
`;


class Breakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let view;
    let avgRating;
    if (this.props.reviews.results && this.props.meta.ratings) {
      let reviewCount = this.props.reviews.results.length;
      let totalRating = 0;
      let ratings = this.props.meta.ratings;
      for (let key in this.props.meta.ratings) {
        totalRating += (parseInt(key) * this.props.meta.ratings[key]);
      }
      avgRating = (totalRating / reviewCount).toFixed(1);
      let numOfRatings = 0;
      for (var key in this.props.meta.ratings) {
        numOfRatings += parseInt(this.props.meta.ratings[key]);
      }
      console.log('ratings of 5', ratings[5]);
      console.log('num of ratings', numOfRatings);
      console.log('5 star percent', (ratings[5] / numOfRatings) * 100);


      view =
      <>
        <h2>{avgRating}</h2>
        <h4>Rating Breakdown</h4>
        <Wrapper>
          <span>5 Star</span><span>({ratings[5]})</span><ProgressBar><ProgressBarFill style={{width: `${(ratings[5] / numOfRatings) * 100}%`}}></ProgressBarFill></ProgressBar>
          <span>4 Star</span><span>({ratings[4]})</span><ProgressBar><ProgressBarFill style={{width: `${(ratings[4] / numOfRatings) * 100}%`}}></ProgressBarFill></ProgressBar>
          <span>3 Star</span><span>({ratings[3]})</span><ProgressBar><ProgressBarFill style={{width: `${(ratings[3] / numOfRatings) * 100}%`}}></ProgressBarFill></ProgressBar>
          <span>2 Star</span><span>({ratings[2]})</span><ProgressBar><ProgressBarFill style={{width: `${(ratings[2] / numOfRatings) * 100}%`}}></ProgressBarFill></ProgressBar>
          <span>1 Star</span><span>({ratings[1]})</span><ProgressBar><ProgressBarFill style={{width: `${(ratings[1] / numOfRatings) * 100}%`}}></ProgressBarFill></ProgressBar>
        </Wrapper>
      </>
    }
    return(
      <div>{view}</div>
    )
  }
}

export default Breakdown;