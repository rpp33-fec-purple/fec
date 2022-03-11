import React from 'react';
import styled from 'styled-components';
import StarRating from './starRating.jsx';

const ProductInformationContainer = styled.span`
  display: flex;
  flex-flow: column;
  gap: .5em;
`;
const Strikethrough = styled.span`
  text-decoration: line-through;
`;
const Underline = styled.span`
  text-decoration: underline;
  font-weight: bold;
  font-size: .5em;
  color: #737373;
  &:hover {
    background-color: lightblue;
    cursor: pointer;
  }
`;
const Category = styled.span`
  color: #808080;
  font-size: .8em;
`;
const Price = styled.span`
  color: #808080;
  font-size: .8em;
  margin-bottom: 1em;
`;

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  moveToReviews() {
    document.getElementsByClassName('ratingsAndReviews')[0].scrollIntoView();
  }

  render() {
    var price;
    if (this.props.styleInfo[this.props.currentStyleIndex].sale_price !== null) {
      price =
        <div className='price'>
          <Strikethrough>${this.props.styleInfo[this.props.currentStyleIndex].original_price}</Strikethrough>
          <span> ${this.props.styleInfo[this.props.currentStyleIndex].sale_price}</span>
        </div>;
    } else {
      price =
        <Price>${this.props.styleInfo[this.props.currentStyleIndex].original_price}</Price>
    }
    return (
      <ProductInformationContainer>
        <div>
          <StarRating avgRating={this.props.avgRating}/>
          <span> </span>
          <Underline onClick={this.moveToReviews.bind(this)}>Read all reviews</Underline>
        </div>
        <Category>{this.props.productInfo.category ? this.props.productInfo.category.toUpperCase() : ''}</Category>
        <h1>{this.props.productInfo.name}</h1>
        {price}
        </ProductInformationContainer>
    );
  }
}

export default ProductInformation;