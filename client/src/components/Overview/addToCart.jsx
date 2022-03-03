import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';

const AddToCartContainer = styled.div`
  display: grid;
  grid-template-columns: repeats(10, 1fr);
  gap: 1em;
`;
const QuantityDropDown = styled.select`
  grid-row: 1;
  grid-column: 8/10;
  gap: 3em;
  background-color: #141414;
  color: #fff;
  padding: 16px 32px;
`;
const SizeDropDown = styled.select`
  grid-row: 1;
  grid-column: 1/7;
  background-color: #141414;
  color: #fff;
  padding: 16px 32px;
`;
const AddToCartButton = styled.button`
  grid-row: 2;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
`;
const AddToCartButtonHidden = styled.button`
  grid-row: 2;
  border-radius: 4px;
  border: none;
  background: #141414;
  visibility: hidden;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
`;

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
  }

  addToCart(event) {
    if (this.props.currentSize ) {

    }
  }
  render() {
    var addToCart;

    var sizeDropDown;
    // Creates size dropdown based on sizes available
    if(Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus)[0] === 'null') {
      addToCart = <AddToCartButtonHidden>ADD TO BAG    +</AddToCartButtonHidden>
      sizeDropDown =
      <SizeDropDown id='selectedSize'>
        <option disabled>OUT OF STOCK</option>
      </SizeDropDown>;
    } else {
      addToCart = <AddToCartButton onClick={this.addToCart.bind(this)}>ADD TO BAG    +</AddToCartButton>
      sizeDropDown =
      <SizeDropDown id='selectedSize' onChange={this.props.renderQuantityDropDown}>
        <option value='DEFAULT'>SELECT SIZE</option>
        {_.map(Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus), (item, index) => {
          if (this.props.styleInfo[this.props.currentStyleIndex].skus[item].quantity !== 0) {
            return <option key={index}>{this.props.styleInfo[this.props.currentStyleIndex].skus[item].size}</option>
          }
          return;
        })}
      </SizeDropDown>
    }

    // Creates quantity dropdown based on selected size
    var quantityDropDown;
    if (!this.props.currentQuantity) {
      quantityDropDown =
      <QuantityDropDown id='selectedQuantity' disabled>
        <option disabled> - </option>
      </QuantityDropDown>;
    } else if (this.props.currentQuantity < 15) {
      var quantityCount = [];
      for (var i = 1; i <= this.props.currentQuantity; i++) {
        quantityCount.push(i);
      }
      quantityDropDown =
        <QuantityDropDown id='selectedQuantity'>
          <option value='DEFAULT' disabled> - </option>
          {_.map(quantityCount, (count, index) => {
            return <option key={index}>{count}</option>
          })}
        </QuantityDropDown>;
    } else {
      var quantityCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      quantityDropDown =
        <QuantityDropDown id='selectedQuantity'>
          <option value='DEFAULT' disabled> - </option>
          {_.map(quantityCount , (count, index) => {
            return <option key={index}>{count}</option>
          })}
        </QuantityDropDown>;
    }


    return (
      <div className='addToCart'>
        <form>
          <AddToCartContainer>
            {sizeDropDown}
            {quantityDropDown}
            {addToCart}
          </AddToCartContainer>
        </form>
      </div>
    );
  }
}

export default AddToCart;