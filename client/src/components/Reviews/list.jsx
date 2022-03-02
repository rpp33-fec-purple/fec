import React from 'react';
import Tile from './tile.jsx';
import styled from 'styled-components';
import NewReview from './newReview.jsx';


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
      reviewsToDisplay: 2,
      displayReviewForm: false
    }

    this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.addNewReview = this.addNewReview.bind(this);
  }

  handleMoreButtonClick = () => {
    this.setState({reviewsToDisplay: this.state.reviewsToDisplay += 2})
  }

  handleSortChange = (event) => {
    this.props.updateSort(event.target.value);
    this.setState({reviewsToDisplay: 2});
  };

  addNewReview = () => {
    console.log('time to add a review');
    this.setState({displayReviewForm: true});
  }

  render() {
    let view;
    let meta = this.props.meta;
    let reviews = this.props.reviews;
    let reviewsDisplayed = 0;

    //check for props from initial api call
    if (reviews.results) {
      //If there are reviews for the item
      if (reviews.results.length > 0) {
        view =
        <div>
          <label>{reviews.results.length} reviews, sorted by </label>
          <select name="sort" id="sort" value={this.props.sortBy} onChange={this.handleSortChange}>
            <option value="relevant">relevance</option>
            <option value="helpful">helpfulness</option>
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
      //there are no reviews yet
      } else {
        view = null;
      }
    //Initial api call not finished yet
    } else {
      view = null;
    }

    let newReviewForm;
    if (this.state.displayReviewForm) {
      newReviewForm = <NewReview meta={this.props.meta}/>
    } else {
      newReviewForm = null
    }

    return (
      <>
        {view}
        <button onClick={this.addNewReview}>ADD A REVIEW +</button>
        <div>{newReviewForm}</div>
      </>
    )
  }
}

export default List;
