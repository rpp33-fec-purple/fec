import React from 'react';
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

    };
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
  render() {

    return (
      <div className='Overview'>
        <ProductInformation/>
        <ImageGallery/>
        <StyleSelector styleInfo={this.state.styleInfo}/>
        <AddToCart/>
      </div>
    );
  }
}

export default Overview;