import React from 'react';
import styled from 'styled-components';
import {formatDate, shorten} from '../../utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


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
      <div>{avgRating}</div>
    }
    return(
      <div>{view}</div>
    )
  }
}

export default Breakdown;