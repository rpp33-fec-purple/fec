import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const AddToCartForm = styled.form`
  padding: 0;
  margin: 0;
`;
const AddToCartContainer = styled.div`
  display: flex;
  flex-flow: row;
`;
const QuantityDropDown = styled.select`
  text-align: center;
  margin-bottom: 1em;
  margin-right: 1em;
  width: 9em;
  background-color: #724060;
  color: #fff;
  padding: 16px 32px;
`;
const SizeDropDown = styled.select`
  text-align: center;
  margin-bottom: 1em;
  margin-right: 1em;
  width: 16em;
  background-color: #724060;
  color: #fff;
  padding: 16px 32px;
`;
const AddToCartButton = styled.button`
  font-size:
  text-align: center;
  width: 17em;
  margin-bottom: 1em;
  margin-right: 1em;
  background: #724060;
  color: #fff;
  cursor: pointer;
  padding: 16px 32px;
`;
const AddToCartButtonHidden = styled.button`
  text-align: center;
  border-radius: 4px;
  border: none;
  background: #724060;
  visibility: hidden;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
`;
const FavoriteButton = styled.button`
  width: 4em;
  margin-bottom: 1em;
  margin-right: 1em;
  background: #724060;
  color: #fff;
  cursor: pointer;
  padding: 16px 32px;
  text-align: center;
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
  addToCart() {

  //   var selectedSize = document.getElementById('selectedSize').value;
  //   var selectedQuantity = document.getElementById('selectedQuantity').value;
  var sku_id;
    if (selectedSize !== 'DEFAULT') {
      if (selectedQuantity !== 'DEFAULT') {
          for (var i = 0; i < Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus).length; i++) {
            if (Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus)[i].size === selectedSize) {
              sku_id = Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus)[i];
              break;
            }
          }
      }
    }
  //   if (selectedSize === 'DEFAULT' && selectedQuantity === 'DEFAULT') {
  //     OpenSelectMenu(document.getElementById('selectedSize'), 3).open();
  //     const tooltip = document.getElementById('sizeTooltipText');
  //     tooltip.style.visibility = 'visible';

  //     const tooltip2 = document.getElementById('quantityTooltipText');
  //     tooltip2.style.visibility = 'visible';
  //   }
  }
  render() {
    var addToCart;
    var favoriteButton;
    favoriteButton =
    <FavoriteButton type="button" onClick={this.favorite.bind(this)}><AiOutlineStar/></FavoriteButton>

    var sizeDropDown;
    // Creates size dropdown based on sizes available
    if(Object.keys(this.props.styleInfo[this.props.currentStyleIndex].skus)[0] === 'null') {
      addToCart = <AddToCartButtonHidden type="button">ADD TO BAG &nbsp;&nbsp;&nbsp; +</AddToCartButtonHidden>
      sizeDropDown =
      <SizeDropDown id='selectedSize'>
        <option disabled>OUT OF STOCK</option>
      </SizeDropDown>;
    } else {
      addToCart = <AddToCartButton type="button" onClick={addToCart}>ADD TO BAG &nbsp;&nbsp;&nbsp; +</AddToCartButton>
      sizeDropDown =
      <SizeDropDown id='selectedSize' onChange={this.props.renderQuantityDropDown}>
        <option value='DEFAULT' hidden>SELECT SIZE</option>
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
        <option hidden> - </option>
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
      <React.Fragment>
        <AddToCartForm>
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
        </AddToCartForm>
      </React.Fragment>
    );
  }
}

export default AddToCart;