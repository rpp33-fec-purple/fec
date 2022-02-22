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
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
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

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
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

class ImgModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Container>
        <Background>
          <ModalWrapper>
            <CloseModalButton onClick={this.props.closeImgModal}><FontAwesomeIcon icon={faXmark} /></CloseModalButton>
            <ModalImg src={this.props.url}/>
          </ModalWrapper>
        </Background>
      </Container>
    )
  }
}

export default ImgModal;