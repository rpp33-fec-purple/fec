import React from 'react';
import styled from 'styled-components';
import ProductInformation from './productInformation.jsx';
import ImageGallery from './imageGallery.jsx';
import StyleSelector from './styleSelector.jsx';
import AddToCart from './addToCart.jsx';
import sampleData from './sampleData.js'


class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: this.props.basicProductInfo,
      styleInfo: sampleData.styleInfo.results,
      currentStyleId: sampleData.styleInfo.results[0].style_id,
      currentStyleIndex: 0,
      currentQuantity: null,
      currentSize: null

    };
    this.renderQuantity = this.renderQuantityDropDown.bind(this);
  }


  componentDidMount() {
    {/* Get styles and reviews */}
    $.ajax({
      url: `http://localhost:3000/products/${this.state.productInfo.id}/styles`,

      method: 'GET',
      success: (data) => {
        console.log('data in client', data);
        this.setState({styleInfo: data.results});
        console.log(`GET request to http://localhost:3000/products/${this.state.productInfo.id}/styles successful!`);
      },
      error: (err) => {
        console.log('Error with GET request:', err);
      }
    })
  }

  updateStyleId(event) {
    for (var i = 0; i < this.state.styleInfo.length; i++) {
      if (this.state.styleInfo[i].style_id == event.target.id) {
        this.setState({
          currentStyleId: event.target.id,
          currentStyleIndex: i
        });
        break;
      }
    }
  }
  renderQuantityDropDown(event) {
    var selectedSize = event.currentTarget.value;
    for (var sku in this.state.styleInfo[this.state.currentStyleIndex].skus) {
      if (this.state.styleInfo[this.state.currentStyleIndex].skus[sku].size === selectedSize) {
        this.setState({
          currentQuantity: this.state.styleInfo[this.state.currentStyleIndex].skus[sku].quantity,
          currentSize: this.state.styleInfo[this.state.currentStyleIndex].skus[sku].size
        });
        break;
      }
    }
  }
  render() {

    return (
      <div className='Overview'>
        <ProductInformation productInfo={this.state.productInfo} currentStyleIndex={this.state.currentStyleIndex} styleInfo={this.state.styleInfo}/>
        <ImageGallery currentStyleIndex={this.state.currentStyleIndex} styleInfo={this.state.styleInfo}/>
        <StyleSelector styleInfo={this.state.styleInfo} currentStyleId={this.state.currentStyleId} currentStyleIndex={this.state.currentStyleIndex} updateStyleId={this.updateStyleId.bind(this)}/>
        <AddToCart currentStyleIndex={this.state.currentStyleIndex} currentStyleId={this.state.currentStyleId} styleInfo={this.state.styleInfo} currentQuantity={this.state.currentQuantity} currentSize={this.state.currentSize} renderQuantityDropDown={this.renderQuantityDropDown.bind(this)}/>
      </div>
    );
  }
}

export default Overview;