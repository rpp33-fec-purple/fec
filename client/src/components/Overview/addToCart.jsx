import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';


class AddToCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var sizeDropDown;
    // Creates size dropdown based on sizes available
    if(Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus)[0] === 'null') {
      sizeDropDown =
      <select>
        <option disabled>OUT OF STOCK</option>
      </select>;
    } else {

      sizeDropDown =
      <select onChange={this.props.renderQuantityDropDown}>
        <option value='DEFAULT'>SELECT SIZE</option>
        {_.map(Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus), (item, index) => {
          return <option key={index}>{this.props.styleInfo[this.props.currentStyleIndex].skus[item].size}</option>
        })}
      </select>
    }

    var quantityDropDown;
    if (!this.props.currentQuantity) {
      quantityDropDown =
      <select disabled>
        <option disabled> - </option>
      </select>;
    } else if (this.props.currentQuantity < 15) {
      var quantityCount = [];
      for (var i = 1; i <= this.props.currentQuantity; i++) {
        quantityCount.push(i);
      }
      quantityDropDown =
        <select>
          <option value='DEFAULT' disabled> - </option>
          {_.map(quantityCount, (count, index) => {
            return <option key={index}>{count}</option>
          })}
        </select>;
    } else {
      var quantityCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      quantityDropDown =
        <select>
          <option value='DEFAULT' disabled> - </option>
          {_.map(quantityCount , (count, index) => {
            return <option key={index}>{count}</option>
          })}
        </select>;
    }
    return (
      <div className='addToCart'>
        <form>
          {sizeDropDown}
          {quantityDropDown}
          <button>ADD TO BAG</button>
        </form>
      </div>
    );
  }
}

export default AddToCart;