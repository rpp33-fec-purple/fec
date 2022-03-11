import React from 'react';
import styled from 'styled-components';
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineExpand } from 'react-icons/ai';

const ImageGalleryContainer = styled.div`
  height: 30em;
  width: 38em;
  display: flex;
  flex-direction: row;
  background-color: rgb(231, 229, 229);
  box-shadow: 0 0 30px rgb(0, 0, 0, 0.15);
`;
const ImageGalleryContainerExpanded = styled.div`
  height: 30em;
  width: 38em;
  display: flex;
  flex-direction: row;
  background-color: rgb(231, 229, 229);
  box-shadow: 0 0 30px rgb(0, 0, 0, 0.15);
`;
const ThumbnailCarouselContainer = styled.div`
  z-index: 1;
  display: flex;
  flex-flow: column;
  height: 30em;
  width: 4em;
`;
const VerticalThumbnailContainer = styled.div`
  height: 30em;
  border: .2em dotted rgb(78, 78, 47);
`;
const CenterDownArrowContainer = styled.div`
  margin-left: .7em;
  margin-bottom: .8em;
  height: 3em;
  width: 3em;
  text-align: center;
`;
const MainImageCarouselContainer = styled.div`
  position: absolute;
  display: flex;
  flex-flow: row;
  height: 30em;
  width: 38em;
  background-color: rgb(231, 229, 229);
`;
const FullscreenMainImageCarouselContainer = styled.div`
  height: 35em;
  width: 65.5em;
  display: flex;
  flex-flow: row;
  background-color: rgb(231, 229, 229);
  position: relative;
`;
const MainImage = styled.img`
  height: 30em;
  width: 100%;
  object-fit: cover;
  cursor: zoom-in;
  filter: drop-shadow(0px 0px 5px rgba(0,0,0,1))
          drop-shadow(0px 0px 50px rgba(0,0,0,.3));
`;
const MainImageExpanded = styled.img`
  height: 30em;
  width: 100%;
  object-fit: cover;
  cursor: zoom-in;
  filter: drop-shadow(0px 0px 5px rgba(0,0,0,1))
          drop-shadow(0px 0px 50px rgba(0,0,0,.3));
`;
const FullscreenMainImage = styled.img`
  height: 35em;
  width: 65.5em;
  object-fit: contain;
  /* border: .3em solid black; */
  transition: width .5s;
  filter: drop-shadow(0px 0px 5px rgba(0,0,0,.3))
          drop-shadow(0px 0px 50px rgba(0,0,0,.3));
`;
const LeftArrow = styled.button`
  position: absolute;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  padding: 0;
  opacity: 50%;
  margin-top: 6.6em;
  margin-left: 2em;
  height: 1.5em;
  width: 1.5em;
`;
const RightArrow = styled.button`
  position: absolute;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  padding: 0;
  opacity: 50%;
  margin-top: 6.6em;
  margin-left: 17.4em;
  height: 1.5em;
  width: 1.5em;
`;
const UpArrow = styled.button`
  margin-left: .8em;
  margin-top: .8em;
  height: 3em;
  width: 3em;
  text-align: center;
  margin: .2em;
  opacity: 50%;
  cursor: pointer;
`;
const DownArrow = styled.button`
  margin-left: .8em;
  margin-bottom: .8em;
  height: 3em;
  width: 3em;
  text-align: center;
  margin: .2em;
  opacity: 50%;
  cursor: pointer;
`;
const ArrowPlaceholder = styled.div`
  margin-left: .8em;
  margin-bottom: .8em;
  height: 3em;
  width: 3em;
  text-align: center;
  margin: .2em;
`;
const ExpandButton = styled.button`
  position: absolute;
  cursor: pointer;
  margin-left: 19.6em;
  height: 1.5em;
  width: 1.5em;
  font-size: 1.8em;
  opacity: 50%;
  z-index: 1;
`;

const ThumbnailImage = styled.img`
  object-fit: cover;
  height: 2.5em;
  width: 2.5em;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.15);
  border-radius: 12px;
  cursor: pointer;
  margin: .2em;
`;
const CurrentThumbnailImage = styled.img`
  object-fit: cover;
  height: 2.5em;
  width: 2.5em;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.15);
  border-radius: 12px;
  border: .1em solid rgb(36, 32, 32);
  margin: .2em;
`;

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      screenState: 'default',
      productId: 0,
      currentThumbnailScrollIndex: 0
    }
  }
  componentDidUpdate() {

  }
  changeMainImage(event) {
    if (this.state.currentIndex !== event.target.id) {
      console.log(event.target.id);
      this.setState({
        currentIndex: Number(event.target.id)
      });
    }
  }
  leftArrowClick() {
    if (this.state.currentIndex !== 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    }
  }
  rightArrowClick() {
    if (this.state.currentIndex !== this.props.styleInfo[this.props.currentStyleIndex].photos.length - 1) {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }
  downArrowClick() {
      this.setState({
        currentThumbnailScrollIndex: this.state.currentThumbnailScrollIndex + 1
      });
  }
  upArrowClick() {
    this.setState({
      currentThumbnailScrollIndex: this.state.currentThumbnailScrollIndex - 1
    });
  }
  toggleFullScreen() {
    if (this.state.screenState === 'default') {
      this.setState({
        screenState: 'expanded'
      });
    } else {
      this.setState({
        screenState: 'default'
      });
    }
  }

  render() {
    console.log('CurrentIndex --> ', this.state.currentIndex);
    if (this.state.currentIndex >= this.props.styleInfo[this.props.currentStyleIndex].photos.length) {
      this.setState({
        currentIndex: this.props.styleInfo[this.props.currentStyleIndex].photos.length - 1
      })
    }
    var imageGallery;
    var mainImage;
    var leftArrow;
    var rightArrow;
    var upArrow;
    var downArrow;
    var thumbnailList;
    var thumbnailCarousel;
    var mainCarousel;
    var expandButton;
    if (this.state.screenState === 'default') {
      leftArrow =
      <LeftArrow id='leftArrow' onClick={this.leftArrowClick.bind(this)}><AiOutlineArrowLeft/></LeftArrow>;
      rightArrow =
      <RightArrow id='rightArrow' onClick={this.rightArrowClick.bind(this)}><AiOutlineArrowRight/></RightArrow>;
      upArrow =
      <UpArrow>↑</UpArrow>;
      downArrow =
      <DownArrow>↓</DownArrow>;
      expandButton =
      <ExpandButton><AiOutlineExpand/></ExpandButton>;
      if (this.state.currentIndex >= this.props.styleInfo[this.props.currentStyleIndex].photos.length) {
        mainImage =
      <MainImage src={this.props.styleInfo[this.props.currentStyleIndex].photos[this.props.styleInfo[this.props.currentStyleIndex].photos.length - 1].url} alt='mainImage'/>;
      } else {
        mainImage =
        <MainImage src={this.props.styleInfo[this.props.currentStyleIndex].photos[this.state.currentIndex].url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text='/>;
      }
      if (this.props.styleInfo[this.props.currentStyleIndex].photos.length <= 7) {
        console.log(this.props.styleInfo[this.props.currentStyleIndex].photos);
        thumbnailList = this.props.styleInfo[this.props.currentStyleIndex].photos.map((photo, index) => {
          if (index !== this.state.currentIndex) {
            return <ThumbnailImage key={index} src={photo.thumbnail_url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text=' onClick={this.changeMainImage.bind(this)} id={index}/>
          } else {
            return <CurrentThumbnailImage key={index} src={photo.thumbnail_url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text=' id={index}/>
          }
        });
        thumbnailCarousel =
        <ThumbnailCarouselContainer>
          {thumbnailList}
        </ThumbnailCarouselContainer>
      } else if (this.props.styleInfo[this.props.currentStyleIndex].photos.length > 7) {
        var thumbnailId = this.state.currentThumbnailScrollIndex - 1;
          thumbnailList = this.props.styleInfo[this.props.currentStyleIndex].photos.slice(this.state.currentThumbnailScrollIndex, this.state.currentThumbnailScrollIndex + 7).map((photo, index) => {
            thumbnailId++;
            if (thumbnailId !== this.state.currentIndex) {
              return <ThumbnailImage key={index} src={photo.thumbnail_url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text=' onClick={this.changeMainImage.bind(this)} id={thumbnailId}/>
            } else {
              return <CurrentThumbnailImage key={index} src={photo.thumbnail_url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text=' id={thumbnailId}/>
            }
          });
        if (this.state.currentThumbnailScrollIndex === 0) {
          thumbnailCarousel =
            <ThumbnailCarouselContainer>
              <ArrowPlaceholder></ArrowPlaceholder>
              {thumbnailList}
              <DownArrow onClick={this.downArrowClick.bind(this)}><AiOutlineArrowDown/></DownArrow>
            </ThumbnailCarouselContainer>;
        } else if (this.state.currentThumbnailScrollIndex + 7 === this.props.styleInfo[this.props.currentStyleIndex].photos.length) {
          thumbnailCarousel =
            <ThumbnailCarouselContainer>
              <UpArrow onClick={this.upArrowClick.bind(this)}><AiOutlineArrowUp/></UpArrow>
              {thumbnailList}
            </ThumbnailCarouselContainer>;
        } else {
          thumbnailCarousel =
          <ThumbnailCarouselContainer>
            <UpArrow onClick={this.upArrowClick.bind(this)}><AiOutlineArrowUp/></UpArrow>
            {thumbnailList}
            <DownArrow onClick={this.downArrowClick.bind(this)}><AiOutlineArrowDown/></DownArrow>
          </ThumbnailCarouselContainer>;
        }
      }
        mainCarousel =
        <MainImageCarouselContainer>
          {mainImage}
          {leftArrow}
          {rightArrow}
        </MainImageCarouselContainer>;

        imageGallery=
        <ImageGalleryContainer>
          {mainCarousel}
          {thumbnailCarousel}
          {expandButton}
        </ImageGalleryContainer>;
    } else if (this.state.screenState ==='expanded') {

    }
    return (
      <React.Fragment>
        {imageGallery}
      </React.Fragment>    )
  }
}

export default ImageGallery;