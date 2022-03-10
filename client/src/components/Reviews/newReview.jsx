import React from 'react';
import styled from 'styled-components';
import baseUrl from './../../../../config.js';

const Button = styled.button`
    display:inline-block;
    padding:0.35em 1.2em;
    border:0.2em solid #a070a1;
    margin:0 0.3em 0.3em 0;
    border-radius: 5px;
    box-sizing: border-box;
    text-decoration:none;
    font-weight:300;
    color:#FFFFFF;
    background-color: #a070a1;
    text-align:center;
    transition: all 0.2s;
    min-width: 10ch;
    min-height: 30px;


    &:hover {
      color:#000000;
      background-color:#FFFFFF;
    }
`;

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      summary: null,
      body: null,
      recommend: null,
      name: null,
      email: null,
      photos: [],
      characteristics:{}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRecommendationChange = this.handleRecommendationChange.bind(this);
    this.handleCharChange = this.handleCharChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
  }

  characteristicOptions = {
    Size: {
      1: "A size too small",
      2: "1/2 a size too small",
      3: "Perfect",
      4: "1/2 a size too big",
      5: "A size too big"
    },
    Width: {
      1: "Too narrow",
      2: "Slightly narrow",
      3: "Perfect",
      4: "Slightly wide",
      5: "Too wide"
    },
    Comfort: {
      1: "Uncomfortable",
      2: "Slightly uncormfortable",
      3: "Ok",
      4: "Comfortable",
      5: "Perfect"
    },
    Quality: {
      1: "Poor",
      2: "Below average",
      3: "What I expected",
      4: "Pretty great",
      5: "Perfect"
    },
    Length: {
      1: "Runds short",
      2: "Runs slightly short",
      3: "Perfect",
      4: "Runs slightly long",
      5: "Runs long"
    },
    Fit: {
      1: "Runs tight",
      2: "Runs slightly tight",
      3: "Perfect",
      4: "Runs slightly long",
      5: "Runs long"
    },
  }

  handleSubmit = (event) => {
    console.log('Submitted!', this.state);
    event.preventDefault();

    $.ajax({
      url: `${baseUrl}/reviews/`,
      data: {
        product_id: this.props.productID,
        rating: this.state.rating,
        summary: this.state.summary,
        body: this.state.body,
        recommend: this.state.recommend,
        name: this.state.name,
        email: this.state.email,
        photos: null,
        characteristics: this.state.characteristics
      },
      method: 'POST',
      success: (data) => {
        console.log('SUBMITTED A REVIEW!!', data);
        this.props.close();
      },
      error: (err) => {
        console.log('ERROR SUBMITTING REVIEW: ', err);
      }
    });
  }

  handleRecommendationChange = (event) => {
    if (event.target.value === 'yes') {
      this.setState({recommend: true})
    } else {
      this.setState({recommend: false})
    }
  }

  handleCharChange = (event) => {
    let charStateCopy = this.state.characteristics;
    charStateCopy[event.target.id] = event.target.value;
    this.setState({characteristics: charStateCopy});
  }

  handleSummaryChange = (event) => {
    this.setState({summary: event.target.value})
  }

  handleBodyChange = (event) => {
    this.setState({body: event.target.value})
  }

  handleNicknameChange = (event) => {
    this.setState({name: event.target.value})
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  handleStarClick = (event, star) => {
    this.setState({rating: event.target.id})
  }


  render() {
    //build characteristics rating radio inputs based on current product characteristics
    let characteristics = [];
    for (var key in this.props.meta.characteristics) {
      characteristics.push(key);
    }
    let characteristicRating = characteristics.map((char) => {
      let id = this.props.meta.characteristics[char].id;
      return (
        <li key={char} onChange={this.handleCharChange}>
          <label>{char}: </label>
          <input type="radio" id={id} name={char} value="1" required/>
          <label htmlFor={char} style={{margin: "0 5px 0 0"}}>{this.characteristicOptions[char][1]}</label>
          <input type="radio" id={id} name={char} value="2"/>
          <label htmlFor={char} style={{margin: "0 5px 0 0"}}>{this.characteristicOptions[char][2]}</label>
          <input type="radio" id={id} name={char} value="3"/>
          <label htmlFor={char} style={{margin: "0 5px 0 0"}}>{this.characteristicOptions[char][3]}</label>
          <input type="radio" id={id} name={char} value="4"/>
          <label htmlFor={char} style={{margin: "0 5px 0 0"}}>{this.characteristicOptions[char][4]}</label>
          <input type="radio" id={id} name={char} value="5"/>
          <label htmlFor={char} style={{margin: "0 5px 0 0"}}>{this.characteristicOptions[char][5]}</label>
        </li>
      )
    })

    //configure current review star rating display
    let stars = [1, 2, 3, 4, 5];
    let starRatingComponent = stars.map((star) => {
      if (star <= this.state.rating) {
        return (
          <div id={star} onClick={this.handleStarClick} className="rating-stars-outer">
            <div id={star} className={"rating-stars-inner" + star} style={{width: "100%"}}></div>
          </div>
        )
      } else {
        return (
          <div id={star} onClick={this.handleStarClick} className="rating-stars-outer">
            <div id={star} className={"rating-stars-inner" + star}></div>
          </div>
        )
      }
    })


    return(
      <form onSubmit={this.handleSubmit}>
        <h2>Write your review</h2>
        <h4>About the {this.props.name}</h4>
        <ul style={{listStyleType: "none"}}>
          <li className="formInput">
            <label htmlFor="rating">Overall Rating*</label>
            {starRatingComponent}
          </li>
          <li className="formInput" onChange={this.handleRecommendationChange}>
            <label htmlFor="">Do you recommend this product?* </label>
            <input type="radio" id="yes" name="recommend" value="yes" required/>
            <label htmlFor="yes">Yes</label>
            <input type="radio" id="no" name="recommend" value="no"/>
            <label htmlFor="no">No</label>
          </li>
          <label>Characteristics*</label>
          {characteristicRating}
          <li className="formInput">
            <label htmlFor="summary">Review summary</label>
            <textarea id="summary" style={{display: "block"}} onChange={this.handleSummaryChange} name="summary" maxLength="60"rows="3" cols="100" placeholder="Example: Best purchase ever!"/>
          </li>
          <li className="formInput">
            <label htmlFor="body">Review body*</label>
            <textarea id="body" style={{display: "block"}} onChange={this.handleBodyChange} name="body" minLength="50" maxLength="1000"rows="8" cols="100" placeholder="Why did you like the product or not?" required/>
          </li>
          <li className="formInput">
            <label>Upload your photos</label>
          </li>
          <li className="formInput">
            <label htmlFor="nickname">What is your nickname?* </label>
            <input type="text" id="nickname" onChange={this.handleNicknameChange} name="nickname" maxLength="60" placeholder="Example: jackson11!" required/>
            <label htmlFor="nickname" style={{fontSize: "0.8em"}}>  For privacy reasons, do not use your full name or email address</label>
          </li>
          <li className="formInput">
            <label htmlFor="email">Your email* </label>
            <input type="email" id="email" onChange={this.handleEmailChange} name="email" maxLength="60" placeholder="Example: jackson11@email.com" required/>
            <label htmlFor="email" style={{fontSize: "0.8em"}}>  For authentication reasons, you will not be emailed</label>
          </li>
          <li className="formInput">
            <Button type="submit" id="submit" name="">Submit</Button>
          </li>
        </ul>
      </form>
    )
  }
}

export default NewReview;
