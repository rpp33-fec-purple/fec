import React from 'react';
import Tile from './tile.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewsDisplayed: 2
    }
  }

  render() {
    let view;
    let meta = this.props.meta;
    let reviews = this.props.reviews;
    if (reviews.results) {
      view =
      <div>
       <label>{reviews.results.length} reviews, sorted by </label>
       <select name="sort" id="sort">
         <option value="relevance">relevance</option>
         <option value="helpfulness">helpfulness</option>
         <option value="newest">newest</option>
       </select>
       <Tile productID={this.props.productID} reviews={this.props.reviews} meta={this.props.meta}/>
     </div>

    } else {
      view = null;
    }

    return (
      <>
        <div>{view}</div>
        <button>MORE REVIEWS</button>
        <button>ADD A REVIEW +</button>
      </>
    )
  }
}

export default List;
