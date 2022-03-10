import React from 'react';
import Tile from './tile.jsx';
import styled from 'styled-components';
import NewReview from './newReview.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReviewModal from './reviewModal.jsx';


const ScrollableList = styled.div`
  margin: 0 auto;
  height: 400px;
  width: auto;
  overflow: auto;
`;

const Button = styled.button`
display:inline-block;
padding:0.35em 1.2em;
border:0.2em solid #724060;
margin:0 0.3em 0.3em 0;
border-radius: 5px;
box-sizing: border-box;
text-decoration:none;
font-weight:300;
color:#FFFFFF;
background-color: #724060;
text-align:center;
transition: all 0.2s;
min-width: 10ch;
min-height: 44px;


&:hover {
  color:#000000;
  background-color:#FFFFFF;
}
`;

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewsToDisplay: 2,
      displayReviewForm: false,
      isReviewExpanded: false
    }

    this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.addNewReview = this.addNewReview.bind(this);
    this.closeReview = this.closeReview.bind(this);
  }

  handleMoreButtonClick = () => {
    this.setState({reviewsToDisplay: this.state.reviewsToDisplay += 2})
  }

  handleSortChange = (event) => {
    this.props.updateSort(event.target.value);
    this.setState({reviewsToDisplay: 2});
  };

  addNewReview = () => {
    this.setState({displayReviewForm: true});
  }

  closeReview = () => {
    this.setState({displayReviewForm: false})
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
        <>
        <div>
          <label>{reviews.results.length} reviews, sorted by </label>
          <select name="sort" id="sort" value={this.props.sortBy} onChange={this.handleSortChange} style={{border: "none", borderBottom: "1px solid black", margin: "0 0 10px 0"}}>
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
        </div>
        <Button style={{display: reviews.results.length > reviewsDisplayed ?  'inline' : 'none'}}onClick={this.handleMoreButtonClick}>MORE REVIEWS</Button>
        </>
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
      newReviewForm = <NewReview meta={this.props.meta} productID={this.props.productID} name={this.props.name} close={this.closeReview}/>
    } else {
      newReviewForm = null
    }

    return (
      <div>
        {view}
        <Button onClick={this.addNewReview}>ADD A REVIEW +</Button>
        {this.state.displayReviewForm ? <ReviewModal form={newReviewForm} closeReviewModal={this.closeReview}></ReviewModal> : null}
      </div>
    )
  }
}

export default List;
