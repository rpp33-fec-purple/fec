import React from 'react';
import Overview from './Overview/wrapper.jsx';
import QA from './QA/wrapper.jsx';
import RelatedItems from './RelatedItems/wrapper.jsx';
import Reviews from './Reviews/wrapper.jsx';




class App extends React.Component {
  constructor(props) {
    super(props);
  }
  ComponentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/products',
      method: 'GET',
      success: (data) => {
        // console.log('data from api:', data);
      },
      error: (err) => {
        // console.log('Error with GET request: ', err);
      }
    });
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