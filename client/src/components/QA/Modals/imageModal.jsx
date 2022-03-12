import React, {useRef, useEffect, useCallBack} from 'react';
import {useSpring, animated} from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';


// const Background = styled.div`
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 1000;
//   display: flex;
//   background: rgba(0, 0, 0, 0.8);
//   justify-content: center;
//   align-items: center;
// `;

// const ModalWrapper = styled.div`
//   width: 600px;
//   height: 385px;
//   box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
//   background: #fdf3f3;
//   color: #000;
//   display: grid;
//   position: relative;
//   z-index: 10;
//   border-radius: 10px;
// `;

// const ModalContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   line-height: 1.8;
//   color: #141414;
//   font-size: 12px;
// `;



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

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 10px 10px;
  background: white;
`;

const CloseImageModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;



class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }


  }

  render() {
    console.log('image source', this.props.imageSrc)
    return (
      <>{this.props.isImageModalShowing ? (
        <Container>
          <Background>
            <ModalWrapper>
              <ModalImg src={this.props.imageSrc}></ModalImg>
              <CloseImageModalButton aria-label='Close modal' onClick={()=> {this.props.changeImageModalState(false)}} />
            </ModalWrapper>
          </Background>
        </Container>
      ) : null
      } </>
    )
  }
}

export default ImageModal;