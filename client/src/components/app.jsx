import React from 'react';
import Overview from './Overview/wrapper.jsx';
import QA from './QA/wrapper.jsx';
import RelatedItems from './RelatedItems/wrapper.jsx';
import Reviews from './Reviews/wrapper.jsx';




class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1 className= 'App'>Product Detail Page</h1>
        <Overview/>
        <RelatedItems/>
        <QA/>
        <Reviews/>
      </div>
    )
  }
}


export default App;