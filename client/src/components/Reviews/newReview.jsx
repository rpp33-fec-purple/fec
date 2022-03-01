import React from 'react';
import styled from 'styled-components';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return(
      <form>
        <h2>Write your review</h2>
        <h4>About the [product name here]</h4>
        <ul>
          <li>
            <label for=""></label>
            <input type="" id="" name=""></input>
          </li>
          <li>
            <label for=""></label>
            <input type="" id="" name=""></input>
          </li>
          <li>
            <label for=""></label>
            <input type="" id="" name=""></input>
          </li>
          <li>
            <label for=""></label>
            <input type="" id="" name=""></input>
          </li>
        </ul>
      </form>
    )
  }
}

export default NewReview;