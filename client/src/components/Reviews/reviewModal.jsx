import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const checkMark = <FontAwesomeIcon icon={faXmark} />

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
`;

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
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalReview = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: #fff;
`;

const CloseModalButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Container>
        <Background>
          <ModalWrapper>
            <CloseModalButton onClick={this.props.closeReviewModal}><FontAwesomeIcon size="2x" icon={faXmark} /></CloseModalButton>
            <ModalReview>
              {this.props.form}
            </ModalReview>
          </ModalWrapper>
        </Background>
      </Container>
    )
  }
}

export default ReviewModal;