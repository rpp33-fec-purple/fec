import React from 'react';
import List from './list.jsx';
import Tile from './tile.jsx';
import Breakdown from './breakdown.jsx';
import { GlobalStyle } from './GlobalStyles.js';

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
      console.log(i);
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
    return (
      <div>
        <h4 className='Review'>RATINGS & REVIEWS</h4>
        <List productID={this.props.productID} reviews={this.state.filteredReviews} meta={this.state.meta} sortBy={this.state.sortBy} updateSort={this.handleSortChange}/>
        <Breakdown productID={this.props.productID} reviews={this.state.filteredReviews} meta={this.state.meta} updateRatingsToFilter={this.filterStarRatings}/>
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