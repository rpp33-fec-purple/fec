import React from 'react';
import QuestionModal from './Modals/addQuestionModal.jsx';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const Button = styled.button`
  min-width: 80px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #724060;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
`;

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
      this.props.questionAdded();
    })
  }


  render() {
    return (
      <Container>
        <Button onClick={this.changeModalVisibilityState}>ADD A QUESTION +</Button>
        <QuestionModal productID={this.props.productID} productName={this.props.productName} isModalShowing={this.state.isModalShowing} changeModalState={this.changeModalVisibilityState}/>
      </Container>
    )
  }
}

export default AddQuestion;