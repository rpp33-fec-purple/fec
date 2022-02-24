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
      meta: {}
    }

  }

  render() {
    return (
      <div>
        <h4 className='Review'>RATINGS & REVIEWS</h4>
        <List productID={this.props.productID} reviews={this.state.reviews} meta={this.state.meta}/>
        <Breakdown productID={this.props.productID} reviews={this.state.reviews} meta={this.state.meta}/>
      </div>
    )
  }

  componentDidMount() {};

  componentDidUpdate(prevProps) {
    if (prevProps.productID !== this.props.productID) {
      $.ajax({
        url: `http://localhost:3000/reviews/`,
        data: {
          product_id: this.props.productID,
          page: 1,
          count: 100,
          sort: 'relevant'
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