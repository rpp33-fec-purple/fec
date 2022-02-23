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
      url: 'http://localhost:3000/products/64620',
      // data: {
      //   page: 1,
      //   count: 5
      // },
      method: 'GET',
      success: (data) => {
        console.log('data in client', data);
        this.setState({basicProductInfo: data});
        console.log('GET request to http://localhost:3000/products/64620 successful!');
      },
      error: (err) => {
        console.log('Error with GET request:', err);
      }
    });
  }
  render() {

    let overviewDiv = this.state.basicProductInfo.id ? <Overview basicProductInfo={this.state.basicProductInfo}/> : <div/>;
    return (
      <div>
        <h1 className= 'App'>Product Detail Page</h1>
        {overviewDiv}
        <RelatedItems productID = {this.state.basicProductInfo.id}/>
        <QA productID={this.state.basicProductInfo.id}/>
        <Reviews productID={this.state.basicProductInfo.id}/>
      </div>
    )
  }
}


export default App;


