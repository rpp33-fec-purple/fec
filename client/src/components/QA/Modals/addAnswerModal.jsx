import React, {useRef, useEffect, useCallBack} from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import baseUrl from './../../../../../config.js';



const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  background: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 600px;
  height: 385px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fdf3f3;
  color: #000;
  display: grid;
  // grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  font-size: 12px;

  input {
    padding: 3px;
  }

  h2 {
    padding-left: 15px;
    padding-right: 10px;
  }

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;

  }
`;

const TextArea = styled.textarea`
  resize: none;
  padding: 3px;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      nickname: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    e.preventDefault();
    console.log('should be id', e.target.id)
    console.log('should be value', e.target.value)


    this.setState({
      [e.target.id]: e.target.value
    }, ()=> {
      console.log('this is the prop in state after setting', this.state)
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    var answer = this.state.answer;
    var nickname = this.state.nickname;
    var email = this.state.email;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (answer.length === 0) {
      alert('You must enter the following: Answer')
    } else if (nickname.length === 0) {
      alert('You must enter the following: Nickname')
    } else if (email.length === 0) {
      alert('You must enter the following: Email')
    } else if (!email.match(validRegex)) {
      alert('The email address provided is not in correct email format')
    } else {
      $.ajax({
        url: `${baseUrl}/qa/questions/${this.props.questionID}/answers`,
        data: {
          body: answer,
          name: nickname,
          email: email,
        },
        method: 'POST',
        success: (data) => {
          this.props.changeModalState(true)
        },
        error: (err) => {
          console.log('Error with POST request:', err);
          this.props.changeModalState()
        }
      })
    }
  }

  render() {

    return (
      <>{this.props.isModalShowing ? (
          <Background>
              <ModalWrapper isModalShowing={this.props.isModalShowing}>
                <ModalContent>
                  <h1>Submit your Answer</h1>
                  <h2 id='questionHeader'>{this.props.productName}: {this.props.question}</h2>
                  <form>
                    <label htmlFor='answer'>Your Answer *</label><br></br>
                    <TextArea id='answer' name='answer' maxLength='1000' rows="4" cols="50" onChange={this.handleChange}></TextArea><br></br>
                    <label htmlFor='nickname'>What is your nickname *</label><br></br>
                    <input id='nickname' name='nickname' placeholder="Example: jack543!" maxLength='60' onChange={this.handleChange}></input><br></br>
                    <>For privacy reasons, do not use your full name or email address</><br></br>
                    <label htmlFor='email'>Your email *</label><br></br>
                    <input id='email' name='email' maxLength='60' size='28' onChange={this.handleChange} placeholder="Example: jack@email.com"></input><br></br>
                    <>For authentication reasons, you will not be emailed</><br></br>
                    <button aria-label='Close modal' onClick={this.handleSubmit}>Submit answer</button>
                  </form>
                </ModalContent>
                <CloseModalButton aria-label='Close modal' onClick={()=> {this.props.changeModalState(false)}} />
              </ModalWrapper>
          </Background>
        ) : null
      } </>
    )
  }
}







export default AnswerModal;