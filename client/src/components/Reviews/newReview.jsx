import React from 'react';
import styled from 'styled-components';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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


  render() {
    //build characteristics rating radio inputs
    let characteristics = [];
    for (var key in this.props.meta.characteristics) {
      characteristics.push(key);
    }
    let characteristicRating = characteristics.map((char) => {
      return (
        <li key={char}>
          <label>{char}</label>
          <input type="radio" id={char} name={char} value="1" required/>
          <label htmlFor={char}>{this.characteristicOptions[char][1]}</label>
          <input type="radio" id={char} name={char} value="2"/>
          <label htmlFor={char}>{this.characteristicOptions[char][2]}</label>
          <input type="radio" id={char} name={char} value="3"/>
          <label htmlFor={char}>{this.characteristicOptions[char][3]}</label>
          <input type="radio" id={char} name={char} value="4"/>
          <label htmlFor={char}>{this.characteristicOptions[char][4]}</label>
          <input type="radio" id={char} name={char} value="5"/>
          <label htmlFor={char}>{this.characteristicOptions[char][5]}</label>
        </li>
      )
    })


    return(
      <form>
        <h2>Write your review</h2>
        <h4>About the [product name here]</h4>
        <ul>
          <li>
            <label htmlFor="rating">Overall Rating*</label>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
          </li>
          <li>
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
            <textarea id="summary" name="summary" maxLength="60"rows="3" cols="33" placeholder="Example: Best purchase ever!"/>
          </li>
          <li>
            <label htmlFor="body">Review body*</label>
            <textarea id="body" name="body" minLength="50" maxLength="1000"rows="8" cols="33" placeholder="Why did you like the product or not?" required/>
          </li>
          <li>
            <label>Upload your photos</label>
          </li>
          <li>
            <label htmlFor="nickname">What is your nickname*</label>
            <input type="text" id="nickname" name="nickname" maxLength="60" placeholder="Example: jackson11!" required/>
            <label htmlFor="nickname">For privacy reasons, do not use your full name or email address</label>
          </li>
          <li>
            <label htmlFor="email">Your email*</label>
            <input type="email" id="email" name="email" maxLength="60" placeholder="Example: jackson11@email.com" required/>
            <label htmlFor="nickname">For authentication reasons, you will not be emailed</label>
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