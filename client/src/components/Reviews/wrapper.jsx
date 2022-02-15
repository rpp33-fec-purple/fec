import React from 'react';
import List from './list.jsx';
import Tile from './tile.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 'relevant'
    }

  }

  render() {
    if (this.props.productID) {
      //get all reviews for current product
      $.ajax({
        url: `http://localhost:3000/reviews/`,
        data: {
          product_id: this.props.productID,
          page: 1,
          count: 100
        },
        method: 'GET',
        success: (data) => {
          console.log('REVIEWS', data);
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
        },
        error: (err) => {
          console.log('Error with GET request:', err);
        }
      });
    }
    return (
      <div>
        <h2>Review Component</h2>
        <List/>
        <Tile productID={this.props.productID}/>
      </div>
    )
  }

  componentDidMount() {};
}

export default Reviews;