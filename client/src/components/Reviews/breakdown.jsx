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
  width: 70%;

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
      console.log(this.props.meta.ratings)
      for (let key in this.props.meta.ratings) {
        totalRating += (parseInt(key) * this.props.meta.ratings[key]);
      }
      avgRating = (totalRating / reviewCount).toFixed(1);

      view =
      <>
        <h3>{avgRating}</h3>
        <h4>Rating Breakdown</h4>
        <Wrapper>
          <ProgressBar><ProgressBarFill></ProgressBarFill></ProgressBar>
          <ProgressBar><ProgressBarFill></ProgressBarFill></ProgressBar>
          <ProgressBar><ProgressBarFill></ProgressBarFill></ProgressBar>
          <ProgressBar><ProgressBarFill></ProgressBarFill></ProgressBar>
          <ProgressBar><ProgressBarFill></ProgressBarFill></ProgressBar>
        </Wrapper>
      </>
    }
    return(
      <div>{view}</div>
    )
  }
}

export default Breakdown;