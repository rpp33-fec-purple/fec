import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';

const AddToCartContainer = styled.div`
  display: flex;
  flex-flow: row;
`;
const QuantityDropDown = styled.select`
  margin-bottom: 1em;
  margin-right: 1em;
  width: 9em;
  background-color: #141414;
  color: #fff;
  padding: 16px 32px;
`;
const SizeDropDown = styled.select`
  margin-bottom: 1em;
  margin-right: 1em;
  width: 16em;
  background-color: #141414;
  color: #fff;
  padding: 16px 32px;
`;
const AddToCartButton = styled.button`
  width: 17em;
  margin-bottom: 1em;
  margin-right: 1em;
  background: #141414;
  color: #fff;
  cursor: pointer;
  padding: 16px 32px;
`;
const AddToCartButtonHidden = styled.button`
  border-radius: 4px;
  border: none;
  background: #141414;
  visibility: hidden;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
`;
const FavoriteButton = styled.button`
  width: 4em;
  margin-bottom: 1em;
  margin-right: 1em;
  background: #141414;
  color: #fff;
  cursor: pointer;
  padding: 16px 32px;
`;
const Tooltip = styled.div`
  top: -2.8em;
  left: 2.2em;
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
`;
const Tooltip2 = styled.div`
  top: -2.8em;
  left: 11.7em;
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
`;
const TooltipText = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
`;


class AddToCart extends React.Component {
  constructor(props) {
    super(props);

  }
  favorite() {

  }
  // addToCart() {
  //   const OpenSelectMenu = (element, maxSize) => {
  //     const preventDefault = (event) => {
  //       event.preventDefault();
  //       event.stopPropagation();
  //     };

  //     let isOpen = false;

  //     const open = function() {
  //       if (!isOpen) {
  // //        element.size = maxSize;
  // //        element.removeEventListener('mousedown', preventDefault);
  //         element.focus();
  //         isOpen = true;
  //       }
  //     };

  //     const close = () => {
  //       if (isOpen) {
  //         element.size = 1;
  //         element.addEventListener('mousedown', preventDefault);
  //         isOpen = false;
  //       }
  //     };
  //     element.addEventListener('mousedown', preventDefault);
  //     element.addEventListener('blur', close);
  //     element.addEventListener('click', () => {
  //       if (isOpen) {
  //         close();
  //       } else {
  //         open();
  //       }
  //     });
  //     return { open: open, close: close };
  //   };

    var selectedSize = document.getElementById('selectedSize').value;
    var selectedQuantity = document.getElementById('selectedQuantity').value;
    if (selectedSize !== 'DEFAULT') {
      if (selectedQuantity !== 'DEFAULT') {
        this.props.onAddToCart(skuId, selectedSize, selectedQuantity, () => {
          let productName = document.getElementsByClassName('productName')[0].innerText;
          let style = this.props.styleNames[this.props.currentStyleIndex];
          this.openSuccessModal(productName, style, selectedSize, selectedQuantity);
        });
      }
    }
    if (selectedSize === 'DEFAULT' && selectedQuantity === 'DEFAULT') {
      OpenSelectMenu(document.getElementById('selectedSize'), 3).open();
      const tooltip = document.getElementById('sizeTooltipText');
      tooltip.style.visibility = 'visible';

      const tooltip2 = document.getElementById('quantityTooltipText');
      tooltip2.style.visibility = 'visible';
    }
  }
  render() {
    var addToCart;
    var favoriteButton;
    favoriteButton =
    <FavoriteButton type="button" onClick={this.favorite.bind(this)}>*</FavoriteButton>

    var sizeDropDown;
    // Creates size dropdown based on sizes available
    if(Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus)[0] === 'null') {
      addToCart = <AddToCartButtonHidden type="button">ADD TO BAG &nbsp;&nbsp;&nbsp; +</AddToCartButtonHidden>
      sizeDropDown =
      <SizeDropDown id='selectedSize'>
        <option disabled>OUT OF STOCK</option>
      </SizeDropDown>;
    } else {
      addToCart = <AddToCartButton type="button" >ADD TO BAG &nbsp;&nbsp;&nbsp; +</AddToCartButton>
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
          <Tooltip>
            <TooltipText id='sizeTooltipText'>Please select a size</TooltipText>
          </Tooltip>
          <Tooltip2>
          <TooltipText id='quantityTooltipText'>Please select a quantity</TooltipText>
          </Tooltip2>

          <AddToCartContainer>
            {sizeDropDown}
            {quantityDropDown}
          </AddToCartContainer>
          <AddToCartContainer>
            {addToCart}
            {favoriteButton}
          </AddToCartContainer>
        </form>
      </div>
    );
  }
}

export default AddToCart;