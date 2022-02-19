import React from 'react';
import QuestionModal from './Modals/addQuestionModal.jsx';
import styled from 'styled-components';
import GlobalStyle from './globalStyles/globalStyles.jsx'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 10vh;
`

const Button = styled.button`
  min-width: 80px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
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
    this.addAQ = this.addAQ.bind(this);
    this.changeModalVisibilityState = this.changeModalVisibilityState.bind(this);
  }

  changeModalVisibilityState() {
    this.setState({
      isModalShowing: !this.state.isModalShowing
    }, ()=> {
      console.log('is modal showing in changestate func', this.state.isModalShowing)
    })
  }

  addAQ(){
    console.log('Add a question clicked!')
  }


  render() {
    return (
      <Container>
        <Button onClick={this.changeModalVisibilityState}>ADD A QUESTION +</Button>
        <QuestionModal productName={this.props.productName} isModalShowing={this.state.isModalShowing} changeModalState={this.changeModalVisibilityState}/>
        <GlobalStyle/>
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