import React, { Suspense } from 'react';
// import Overview from './Overview/wrapper.jsx';
// import QA from './QA/wrapper.jsx';
// import RelatedItems from './RelatedItems/wrapper.jsx';
// import Reviews from './Reviews/wrapper.jsx';
import GlobalStyle from './globalStyles.jsx';
import styled from 'styled-components';
import baseUrl from './../../../config.js';
import { wrapWithParams } from './wrapWithParams.jsx';

const Reviews = React.lazy(() => import('./Reviews/wrapper.jsx'));
const Overview = React.lazy(() => import('./Overview/wrapper.jsx'));
const QA = React.lazy(() => import('./QA/wrapper.jsx'));


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basicProductInfo: {}
    }
  }
  componentDidMount() {
    console.log('props params', this.props.params);
    console.log(baseUrl);
    $.ajax({
      url: `${baseUrl}/products/${this.props.params.product_id}`,
      method: 'GET',
      success: (data) => {
        // console.log('data in client', data);
        this.setState({basicProductInfo: data});
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
        <Suspense fallback={<div>Loading...</div>}>

        <h1 className= 'App'>Product Detail Page</h1>
        {overviewDiv}
        {/* <RelatedItems productID = {this.state.basicProductInfo.id}/> */}
        <div>{qaDiv}</div>
        <Reviews productID={this.state.basicProductInfo.id} name={this.state.basicProductInfo.name}/>
        <GlobalStyle/>
        </Suspense>
      </div>
    )
  }
}


export default wrapWithParams(App);


