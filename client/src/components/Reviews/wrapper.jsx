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
      sortBy: 'relevant'
    }
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange = (newSortByValue) => {
    this.setState({sortBy: newSortByValue});
  };

  render() {
    return (
      <div>
        <h4 className='Review'>RATINGS & REVIEWS</h4>
        <List productID={this.props.productID} reviews={this.state.reviews} meta={this.state.meta} sortBy={this.state.sortBy} updateSort={this.handleSortChange}/>
        <Breakdown productID={this.props.productID} reviews={this.state.reviews} meta={this.state.meta}/>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('PREVIOUS STATE', prevState);
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
          this.setState({reviews: data});
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