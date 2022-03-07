import React from 'react';
import styled from 'styled-components';
import ProductInformation from './productInformation.jsx';
import ImageGallery from './imageGallery.jsx';
import StyleSelector from './styleSelector.jsx';
import AddToCart from './addToCart.jsx';
import ProductFeatures from './productFeatures.jsx';
import sampleData from './sampleData.js';
import baseUrl from './../../../../config.js';

const OverviewWrapper = styled.div`
  display: flex;
  height: 48em;
  width: 70em;
  flex-flow: row wrap;
`;
const VerticalContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 1.5em;
  height: 30em;
  width: 20em;
`;
class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: this.props.basicProductInfo,
      styleInfo: sampleData.styleInfo.results,
      currentStyleId: sampleData.styleInfo.results[0].style_id,
      currentStyleIndex: 0,
      currentQuantity: null,
      currentSize: null,
      avgRating: 0
    };
    this.renderQuantity = this.renderQuantityDropDown.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      {/* Get styles and reviews */}
      $.ajax({
        url: `${baseUrl}/products/${this.props.basicProductInfo.id}/styles`,

        method: 'GET',
        success: (data) => {
          this.setState({
            productInfo: this.props.basicProductInfo,
            styleInfo: data.results,
            currenstStyleId: data.results[0].style_id
          });
          // console.log(`GET request to http://localhost:3000/products/${this.state.productInfo.id}/styles successful!`);
        },
        error: (err) => {
          console.log('Error with GET request:', err);
        }
      });

      $.ajax({
        url: `${baseUrl}/reviews/meta?product_id=${this.props.basicProductInfo.id}`,

        method: 'GET',
        success: (data) => {
          var ratingTotal = 0;
          var totalVotes = 0;
          for (var rating in data.ratings) {
            ratingTotal += Number(rating) * Number(data.ratings[rating]);
            totalVotes += Number(data.ratings[rating]);
          }
          this.setState({avgRating: (ratingTotal/totalVotes).toFixed(1)});
          // console.log(`GET request to http://localhost:3000/products/${this.state.productInfo.id}/styles successful!`);
        },
        error: (err) => {
          console.log('Error with GET request:', err);
        }
      });
    }
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
      <OverviewWrapper>
          <ImageGallery productId={this.state.productInfo.id} currentStyleIndex={this.state.currentStyleIndex} styleInfo={this.state.styleInfo}/>
          <VerticalContainer>
            <ProductInformation avgRating={this.state.avgRating} productInfo={this.state.productInfo} currentStyleIndex={this.state.currentStyleIndex} styleInfo={this.state.styleInfo}/>
            <StyleSelector styleInfo={this.state.styleInfo} currentStyleId={this.state.currentStyleId} currentStyleIndex={this.state.currentStyleIndex} updateStyleId={this.updateStyleId.bind(this)}/>
            <AddToCart currentStyleIndex={this.state.currentStyleIndex} currentStyleId={this.state.currentStyleId} styleInfo={this.state.styleInfo} currentQuantity={this.state.currentQuantity} currentSize={this.state.currentSize} renderQuantityDropDown={this.renderQuantityDropDown.bind(this)}/>
          </VerticalContainer>
        <ProductFeatures productInfo={this.state.productInfo}/>
      </OverviewWrapper>
    );
  }
}

export default Overview;