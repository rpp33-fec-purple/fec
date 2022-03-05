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
  &:hover {
    background-color: lightblue;
    cursor: pointer;
  }
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
        <div>
          <span>${this.props.styleInfo[this.props.currentStyleIndex].original_price}</span>
        </div>;
    }
    return (
      <ProductInformationContainer>
        <div>
          <span/>* * * * *<span/>
          <Underline onClick={this.moveToReviews.bind(this)}> Read all reviews</Underline>
        </div>
        <span>{this.props.productInfo.category}</span>
        <h1>{this.props.productInfo.name}</h1>
        {price}
        </ProductInformationContainer>
    );
  }
}

export default ProductInformation;