import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';

const DropDownRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  height: 45px;
  width: 200px;
`;

const DropDownCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const DropDown = styled.select`
  background-color: grey;
  height: 45px;
  width: 200px;
`;
const AddToCartButton = styled.button`
  background-color: grey;
  height: 45px;
  width: 200px;
`;

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
  }

  addToCart(event) {
    //
    if (this.props.currentSize ) {

    }
  }
  render() {

    var sizeDropDown;
    // Creates size dropdown based on sizes available
    if(Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus)[0] === 'null') {
      sizeDropDown =
      <DropDown>
        <option disabled>OUT OF STOCK</option>
      </DropDown>;
    } else {

      sizeDropDown =
      <DropDown onChange={this.props.renderQuantityDropDown}>
        <option value='DEFAULT'>SELECT SIZE</option>
        {_.map(Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus), (item, index) => {
          return <option key={index}>{this.props.styleInfo[this.props.currentStyleIndex].skus[item].size}</option>
        })}
      </DropDown>
    }

    // Creates quantity dropdown based on selected size
    var quantityDropDown;
    if (!this.props.currentQuantity) {
      quantityDropDown =
      <DropDown disabled>
        <option disabled> - </option>
      </DropDown>;
    } else if (this.props.currentQuantity < 15) {
      var quantityCount = [];
      for (var i = 1; i <= this.props.currentQuantity; i++) {
        quantityCount.push(i);
      }
      quantityDropDown =
        <DropDown>
          <option value='DEFAULT' disabled> - </option>
          {_.map(quantityCount, (count, index) => {
            return <option key={index}>{count}</option>
          })}
        </DropDown>;
    } else {
      var quantityCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      quantityDropDown =
        <DropDown>
          <option value='DEFAULT' disabled> - </option>
          {_.map(quantityCount , (count, index) => {
            return <option key={index}>{count}</option>
          })}
        </DropDown>;
    }

    return (
      <div className='addToCart'>
        <form>
          <DropDownCol>
            <DropDownRow>
              {sizeDropDown}
              {quantityDropDown}
            </DropDownRow>
            <AddToCartButton onClick={this.addToCart}>ADD TO BAG    +</AddToCartButton>
          </DropDownCol>
        </form>
      </div>
    );
  }
}

export default AddToCart;