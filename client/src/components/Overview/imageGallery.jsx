import React from 'react';
import styled from 'styled-components';

const MainImageContainer = styled.div`
  height: 300px;
  width: 300px;
  overflow: hidden;
`;
const MainImage = styled.img`
  width: 100%;
  height: 100%;
`;
class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      expanded: false
    }
  }

  render() {
    var mainImage;
    if (this.state.expanded) {

    } else {
      mainImage =
        <MainImageContainer>
          <MainImage src={this.props.styleInfo[this.props.currentStyleIndex].photos[0].url}/>
        </MainImageContainer>;

    }
    return (
      <div className='imageGallery'>
        {mainImage}
      </div>
    )
  }
}

export default ImageGallery;