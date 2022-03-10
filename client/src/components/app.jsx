import React from 'react';
import Overview from './Overview/wrapper.jsx';
import QA from './QA/wrapper.jsx';
import RelatedItems from './RelatedItems/wrapper.jsx';
import Reviews from './Reviews/wrapper.jsx';
import GlobalStyle from './globalStyles.jsx';
import styled from 'styled-components';
import baseUrl from './../../../config.js';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basicProductInfo: {}
    }
  }
  componentDidMount() {
    console.log(baseUrl);
    $.ajax({
      url: `${baseUrl}/products/64622`,
      method: 'GET',
      success: (data) => {
        // console.log('data in client', data);
        this.setState({basicProductInfo: data});
        console.log('product data', data);
        // console.log('GET request to http://localhost:3000/products/64620 successful!');
      },
      error: (err) => {
        console.log('Error with GET request:', err);
      }
    });
  }
  render() {
    let qaDiv = this.state.basicProductInfo.id ? <QA product={this.state.basicProductInfo}/> : <div/>
    let overviewDiv = this.state.basicProductInfo.id ? <Overview basicProductInfo={this.state.basicProductInfo}/> : <div/>;
    return (
      <div>
        <h1 className= 'App'>Product Detail Page</h1>
        {overviewDiv}
        <RelatedItems productID = {this.state.basicProductInfo.id}/>
        <div>{qaDiv}</div>
        <Reviews productID={this.state.basicProductInfo.id} name={this.state.basicProductInfo.name}/>
        <GlobalStyle/>
      </div>
    )
  }
}


export default App;


