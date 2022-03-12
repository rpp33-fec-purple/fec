import React from 'react';
import styled from 'styled-components';

const StarsOuter = styled.div`
display: inline-block;
position: relative;
font-family: FontAwesome;
font-size: .6em;
`;

const StarRating = ({avgRating}) => {
  let stars = [1, 2, 3, 4, 5];
  if (avgRating === 0) {
    return stars.map((star) => {
      <div className="stars-outer" key={star}>
        <div className={'breakdown-stars-inner' + star}></div>
      </div>
    });
  }
  return stars.map((star) => {
    if (star <= avgRating) {
      return (
        <div className="stars-outer" key={star}>
          <div className={'breakdown-stars-inner' + star} style={{width: "100%"}}></div>
        </div>
      );
    } else if (star - avgRating < 1) {
      let starPercent = `${((avgRating % 1).toFixed(2)) * 100}%`;
      return (
        <div className="stars-outer" key={star}>
          <div className={'breakdown-stars-inner' + star} style={{width: starPercent}}></div>
        </div>
      );
    } else {
      return (
        <div className="stars-outer" key={star}>
          <div className={'breakdown-stars-inner' + star}></div>
        </div>
      );
    }
  });
}

export default StarRating;