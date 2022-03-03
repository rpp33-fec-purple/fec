import React from 'react';
import styled from 'styled-components';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
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
      url: `http://localhost:3000/reviews/`,
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
          <label>{char}</label>
          <input type="radio" id={id} name={char} value="1" required/>
          <label htmlFor={char}>{this.characteristicOptions[char][1]}</label>
          <input type="radio" id={id} name={char} value="2"/>
          <label htmlFor={char}>{this.characteristicOptions[char][2]}</label>
          <input type="radio" id={id} name={char} value="3"/>
          <label htmlFor={char}>{this.characteristicOptions[char][3]}</label>
          <input type="radio" id={id} name={char} value="4"/>
          <label htmlFor={char}>{this.characteristicOptions[char][4]}</label>
          <input type="radio" id={id} name={char} value="5"/>
          <label htmlFor={char}>{this.characteristicOptions[char][5]}</label>
        </li>
      )
    })


    return(
      <form onSubmit={this.handleSubmit}>
        <h2>Write your review</h2>
        <h4>About the [product name here]</h4>
        <ul>
          <li>
            <label htmlFor="rating">Overall Rating*</label>
            <div className="stars-outer _1">
               <div className="stars-inner _1"></div>
            </div>
            <div className="stars-outer _2">
               <div className="stars-inner _2"></div>
            </div>
            <div className="stars-outer _3">
               <div className="stars-inner _3"></div>
            </div>
            <div className="stars-outer _4">
               <div className="stars-inner _4"></div>
            </div>
            <div className="stars-outer _5">
               <div className="stars-inner _5"></div>
            </div>
          </li>
          <li onChange={this.handleRecommendationChange}>
            <label htmlFor="">Do you recommend this product?*</label>
            <input type="radio" id="yes" name="recommend" value="yes" required/>
            <label htmlFor="yes">Yes</label>
            <input type="radio" id="no" name="recommend" value="no"/>
            <label htmlFor="no">No</label>
          </li>
          <label>Characteristics*</label>
          {characteristicRating}
          <li>
            <label htmlFor="summary">Review summary</label>
            <textarea id="summary" onChange={this.handleSummaryChange} name="summary" maxLength="60"rows="3" cols="33" placeholder="Example: Best purchase ever!"/>
          </li>
          <li>
            <label htmlFor="body">Review body*</label>
            <textarea id="body" onChange={this.handleBodyChange} name="body" minLength="50" maxLength="1000"rows="8" cols="33" placeholder="Why did you like the product or not?" required/>
          </li>
          <li>
            <label>Upload your photos</label>
          </li>
          <li>
            <label htmlFor="nickname">What is your nickname*</label>
            <input type="text" id="nickname" onChange={this.handleNicknameChange} name="nickname" maxLength="60" placeholder="Example: jackson11!" required/>
            <label htmlFor="nickname">For privacy reasons, do not use your full name or email address</label>
          </li>
          <li>
            <label htmlFor="email">Your email*</label>
            <input type="email" id="email" onChange={this.handleEmailChange} name="email" maxLength="60" placeholder="Example: jackson11@email.com" required/>
            <label htmlFor="email">For authentication reasons, you will not be emailed</label>
          </li>
          <li>
            <input type="submit" id="submit" name=""/>
          </li>
        </ul>
      </form>
    )
  }
}

export default NewReview;

{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg> */}


            // <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
            //   <mask id="half">
            //     <rect x="50%" y="0" width="24" height="24" fill="white" />
            //     {/* <rect x="50%" y="0" width="24" height="24" fill="black" /> */}
            //   </mask>
            //   <symbol id="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="star">
            //     <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
            //   </symbol>
            // </svg>
            // <svg className="star active" width="24" height="24" viewBox="0 0 32 32">
            //   <use href="#star" mask="url(#half)"></use>
            // </svg>
            // <svg className="star" width="24" height="24">
            //   <use href="#star"></use>
            // </svg>
            // <svg className="star" width="24" height="24">
            //   <use href="#star"></use>
            // </svg>
            // <svg className="star" width="24" height="24">
            //   <use href="#star"></use>
            // </svg>
            // <svg className="star" width="24" height="24">
            //   <use href="#star"></use>
            // </svg>