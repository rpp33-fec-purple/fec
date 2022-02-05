import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/wrapper.jsx';
import Reviews from './Reviews/wrapper.jsx';
import RelatedItems from './RelatedItems/wrapper.jsx';
import QAndA from './QA/wrapper.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
      <h1>Product Detail Page</h1>
      <Overview/>
      <RelatedItems/>
      <QAndA/>
      <Reviews/>
      </>
    )
  }
}

ReactDOM.render(
    <App/>,
  document.getElementById('app')
);