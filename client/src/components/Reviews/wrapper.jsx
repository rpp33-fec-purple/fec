import React from 'react';
import List from './list.jsx';
import Tile from './tile.jsx';
import Breakdown from './breakdown.jsx';
import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyles.js';

const Container = styled.div`
display: grid;
grid-template-columns: 1fr 2fr;
`;

const Header = styled.h4`
  margin: 5px 0;
`;

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: {},
      meta: {},
      sortBy: 'relevant',
      filteredReviews: {}
    }
    this.handleSortChange = this.handleSortChange.bind(this);
    this.filterStarRatings = this.filterStarRatings.bind(this);
  }

  handleSortChange = (newSortByValue) => {
    this.setState({sortBy: newSortByValue});
  };

  filterStarRatings = (ratings) => {
    var filteredReviews = {product: this.state.reviews.product, results: []};
    var filterSelected = false;
    for (var i = 0; i < Object.keys(ratings).length; i++) {
      if (ratings[i + 1]) {
        filterSelected = true;
        break;
      }
    }
    if (!filterSelected) {
      this.setState({filteredReviews: this.state.reviews});
      return;
    }
    for (var i = 0; i < this.state.reviews.results.length; i++) {
      if (ratings[this.state.reviews.results[i].rating]) {
        filteredReviews.results.push(this.state.reviews.results[i]);
      }
    }

    this.setState({filteredReviews: filteredReviews})
  };

  render() {
    let avgRating;
    if (this.state.reviews.results) {
      let reviewCount = this.state.reviews.results.length;
      let totalRating = 0;
      for (let key in this.state.meta.ratings) {
        totalRating += (parseInt(key) * this.state.meta.ratings[key]);
      }
      avgRating = (totalRating / reviewCount).toFixed(1);
      console.log(avgRating)
    }


    return (
      <div className="ratingsAndReviews">
        <Header>RATINGS & REVIEWS</Header>
        <Container>
          <Breakdown productID={this.props.productID} reviews={this.state.filteredReviews} meta={this.state.meta} rating={avgRating} updateRatingsToFilter={this.filterStarRatings}/>
          <List productID={this.props.productID} reviews={this.state.filteredReviews} meta={this.state.meta} sortBy={this.state.sortBy} updateSort={this.handleSortChange}/>
        </Container>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productID !== this.props.productID || prevState.sortBy !== this.state.sortBy) {
      $.ajax({
        url: `http://localhost:3000/reviews/`,
        data: {
          product_id: this.props.productID,
          page: 1,
          count: 100,
          sort: this.state.sortBy
        },
        method: 'GET',
        success: (data) => {
          console.log('REVIEWS', data);
          this.setState({reviews: data, filteredReviews: data});
        },
        error: (err) => {
          console.log('Error with GET request:', err);
        }
      });

      //Get meta data for current product
      $.ajax({
        url: `http://localhost:3000/reviews/meta`,
        data: {
          product_id: this.props.productID
        },
        method: 'GET',
        success: (data) => {
          console.log('REVIEWS METADATA', data);
          this.setState({meta: data});
        },
        error: (err) => {
          console.log('Error with GET request:', err);
        }
      });
    }
  }
}

export default Reviews;