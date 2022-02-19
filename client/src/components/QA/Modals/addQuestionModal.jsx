import React, {useRef, useEffect, useCallBack} from 'react';
import {useSpring, animated} from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalWrapper = styled.div`
  width: 600px;
  height: 300px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: lavender;
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
  font-size: 10px;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
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
`

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
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
    var question = this.state.question;
    console.log('question length', question.length)
    var nickname = this.state.nickname;
    var email = this.state.email;
    if (question.length === 0) {
      alert('You must enter the following: Question')
    } else if (nickname.length === 0) {
      alert('You must enter the following: Nickname')
    } else if (email.length === 0) {
      alert('You must enter the following: Email')
    } else {
      this.props.changeModalState()
    }
  }


  render() {

    return (
      <>{this.props.isModalShowing ? (
        <Background>
            <ModalWrapper isModalShowing={this.props.isModalShowing}>
              <ModalContent>
                <h1>Ask Your Question</h1>
                <h2>About the {this.props.productName}</h2>
                <form>
                  <label htmlFor='question'>Your Question *</label><br></br>
                  <textarea id='question' name='question' maxLength='1000' rows="4" cols="50" onChange={this.handleChange}></textarea><br></br>
                  <label htmlFor='nickname'>What is your nickname *</label><br></br>
                  <input id='nickname' name='nickname' placeholder="Example: jackson11!" maxLength='60' onChange={this.handleChange}></input><br></br>
                  <>For privacy reasons, do not use your full name or email address</><br></br>
                  <label htmlFor='email'>Your email *</label><br></br>
                  <input id='email' name='email' maxLength='60' onChange={this.handleChange}></input><br></br>
                  <>For authentication reasons, you will not be emailed</><br></br>
                  <button aria-label='Close modal' onClick={this.handleSubmit}>Submit question</button>
                </form>
              </ModalContent>
              <CloseModalButton aria-label='Close modal' onClick={this.props.changeModalState} />
            </ModalWrapper>
        </Background>
        ) : null
      } </>
    )
  }
}

export default QuestionModal;
