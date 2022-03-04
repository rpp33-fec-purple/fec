import React from 'react';
import QuestionModal from './Modals/addQuestionModal.jsx';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  // box-sizing: border-box;
  // margin: 0;
  // padding: 0;
  // font-family: 'Arial', sans-serif;
`

const Button = styled.button`
  min-width: 80px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  // background: #141414;
  background: #724060;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
`

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShowing: false
    }
    this.changeModalVisibilityState = this.changeModalVisibilityState.bind(this);
  }

  changeModalVisibilityState() {
    this.setState({
      isModalShowing: !this.state.isModalShowing
    }, ()=> {
      // console.log('is modal showing in changestate func', this.state.isModalShowing)
      this.props.questionAdded();
    })
  }


  render() {
    return (
      <Container>
        <Button onClick={this.changeModalVisibilityState}>ADD A QUESTION +</Button>
        <QuestionModal productID={this.props.productID} productName={this.props.productName} isModalShowing={this.state.isModalShowing} changeModalState={this.changeModalVisibilityState}/>
        {/* <GlobalStyle/> */}
      </Container>
    )
  }
}

export default AddQuestion;




// const Button = styled.button`
//   min-width: 100px;
//   padding: 16px 32px;
//   border-radius: 4px;
//   border: none;
//   background: #141414;
//   color: #fff;
//   font-size: 24px;
//   cursor: pointer;
// `



// FOR POST REQUEST
// $.ajax({
//   url: `http://localhost:3000/qa/answers/${reviewID}/helpful`,
//   // data: {
//   //   // 'body': question,
//   //   // 'name': nickname,
//   //   // 'email': email
//   //   // 'product_id': 64620
//   //   // sku_id: 2313078
//   // },
//   method: 'POST',
//   success: (data) => {
//     // this.props.changeModalState()
//   },
//   error: (err) => {
//     console.log('Error with POST request:', err);
//     this.props.changeModalState()
//   }
// })



 // testingPostRoute() {
  //   var question = 'this should be an answer';
  //   var nickname = 'purpleParrots';
  //   var email = 'jajaj@gmail.com';
  //   var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   if (question.length === 0) {
  //     alert('You must enter the following: Question')
  //   } else if (nickname.length === 0) {
  //     alert('You must enter the following: Nickname')
  //   } else if (email.length === 0) {
  //     alert('You must enter the following: Email')
  //   } else if (!email.match(validRegex)) {
  //     alert('The email address provided is not in correct email format')
  //   } else {

  //     var reviewID = 1116182;
  //     $.ajax({
  //       url: `http://localhost:3000/reviews/${reviewID}/helpful`,
  //       data: {
  //         review_id: 1116182
  //       },
  //       method: 'PUT',
  //       success: (data) => {
  //       },
  //       error: (err) => {
  //         console.log('Error with POST request:', err);
  //         this.props.changeModalState()
  //       }
  //     })
  //   }
  // }