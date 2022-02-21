import React from 'react';
import Overview from './Overview/wrapper.jsx';
import QA from './QA/wrapper.jsx';
import RelatedItems from './RelatedItems/wrapper.jsx';
import Reviews from './Reviews/wrapper.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basicProductInfo: {}
    }
  }
  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/products/64621',
      // data: {
      //   page: 1,
      //   count: 5
      // },
      method: 'GET',
      success: (data) => {
        console.log('data in client', data);
        this.setState({basicProductInfo: data});
        console.log('GET request to http://localhost:3000/products/64621 successful!');
      },
      error: (err) => {
        console.log('Error with GET request:', err);
      }
    });
  }
  render() {
    let qaDiv = this.state.basicProductInfo.id ? <QA product={this.state.basicProductInfo}/> : <div/>
    return (
      <div>
        <h1 className= 'App'>Product Detail Page</h1>
        <Overview basicProductInfo={this.state.basicProductInfo}/>
        <RelatedItems productID = {this.state.basicProductInfo.id}/>
        <div>{qaDiv}</div>
        <Reviews productID={this.state.basicProductInfo.id}/>
      </div>
    )
  }
}


export default App;


