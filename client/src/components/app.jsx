import React from 'react';
import OverviewContainer from '../containers/OverviewContainer.js';
import QAContainer from '../containers/QAContainer.js';
import RelatedItemsContainer from '../containers/RelatedItemsContainer.js';
import ReviewsContainer from '../containers/ReviewsContainer.js';




var App = () => (
  <div>
    <h1 className= 'App'>Product Detail Page</h1>
    <OverviewContainer/>
    <RelatedItemsContainer/>
    <QAContainer/>
    <ReviewsContainer/>
  </div>
)

export default App;