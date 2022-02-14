import React from 'react';
import starRating from './starRating.jsx';
import price from './price.jsx';

class productInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='productInformation'>
        <starRating/> {/* shared folder? Pass in review data. Get svg for stars */}
        <p>Read all reviews<p/>
        <div className='productCategory'>
          <h2></h2>
        </div>

        <div className='productTitle'>

        </div>

        <div className='price'>
          <p>{this.props.price}</p> {/* strike original price if discounted */}
        </div>

      </div>
    )
  }
}

export default productInformation;