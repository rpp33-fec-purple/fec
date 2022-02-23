import React from 'react';
import styled from 'styled-components';
import StarRating from './starRating.jsx';
const Strikethrough = styled.span`
  text-decoration: line-through;
`;
const Underline = styled.span`
  text-decoration: underline;
  &:hover {
    background-color: lightblue;
  }
`;

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
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
      <div className='productInformation'>
        <div className='reviewRating'>
        <span/>* * * * *<span/> {/* shared folder? Pass in review data. Get svg for stars */}
        <Underline> Read all reviews</Underline>
        </div>
        <div className='productCategory'>
          <span>Category > {this.props.productInfo.category}</span>
        </div>

        <div className='productTitle'>
          <h1>{this.props.productInfo.name}</h1>
        </div>

        {price} {/* strike original price if discounted */}
      </div>
    );
  }
}

export default ProductInformation;