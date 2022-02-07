import React from 'react';
import Overview from './Overview/wrapper.jsx';
import Reviews from './Reviews/wrapper.jsx';
import RelatedItems from './RelatedItems/wrapper.jsx';
import QAndA from './QA/wrapper.jsx';



var App = () => (
  <div>
    <h1>Product Detail Page</h1>
    <Overview/>
    <RelatedItems/>
    <QAndA/>
    <Reviews/>
  </div>
)

export default App;