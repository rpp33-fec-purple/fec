import React from 'react';
import Tile from './tile.jsx';
import styled from 'styled-components';


const ScrollableList = styled.div`
      margin: 0 auto;
      height: 250px;
      width: 800px;
      overflow: auto;
  `;

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewsToDisplay: 2
    }

    this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this);
  }

  handleMoreButtonClick = () => {
    this.setState({reviewsToDisplay: this.state.reviewsToDisplay += 2})
  }

  render() {
    let view;
    let meta = this.props.meta;
    let reviews = this.props.reviews;
    let reviewsDisplayed = 0;
    if (reviews.results) {
      view =
      <div>
       <label>{reviews.results.length} reviews, sorted by </label>
       <select name="sort" id="sort">
         <option value="relevance">relevance</option>
         <option value="helpfulness">helpfulness</option>
         <option value="newest">newest</option>
       </select>
       <ScrollableList>
          {reviews.results.map((review) => {
            while (reviewsDisplayed < this.state.reviewsToDisplay) {
              let reviewIndex = reviewsDisplayed;
              reviewsDisplayed++;
              return (
                <Tile key={reviewIndex} productID={this.props.productID} reviewIndex={reviewIndex} reviews={this.props.reviews} meta={this.props.meta}/>
              )
            }
          })}
       </ScrollableList>
       <button style={{display: reviews.results.length > reviewsDisplayed ?  'inline' : 'none'}}onClick={this.handleMoreButtonClick}>MORE REVIEWS</button>
     </div>

    } else {
      view = null;
    }

    return (
      <>
        {view}
        <button>ADD A REVIEW +</button>
      </>
    )
  }
}

export default List;
