import React from 'react';
import styled from 'styled-components';
import Zoom from 'react-img-zoom';
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
  z-index: 999;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 30px rgb(0, 0, 0, 0.15);
`;
const ImageGalleryContainerZoomed = styled.div`
  z-index: 2;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 30px rgb(0, 0, 0, 0.15);
`;
const ThumbnailCarouselContainer = styled.div`
  z-index: 1;
  display: flex;
  flex-flow: column;
  height: 30em;
  width: 4em;
`;
const ThumbnailCarouselContainerExpanded = styled.div`
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
const VerticalThumbnailContainerExpanded = styled.div`
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
const MainImageCarouselContainerExpanded = styled.div`
  position: absolute;
  margin: auto;
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
`;
const MainImageCarouselContainerZoomed = styled.div`
  position: absolute;
  cursor: zoom-out;
  margin: auto;
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
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
  height: 100vh;
  width: auto;
  object-fit: cover;
  cursor: crosshair;
  filter: drop-shadow(0px 0px 5px rgba(0,0,0,1))
          drop-shadow(0px 0px 50px rgba(0,0,0,.3));
`;
const MainImageZoomed = styled.img`
  z-index: 999;
  position: fill;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  cursor: crosshair;
  filter: drop-shadow(0px 0px 5px rgba(0,0,0,1))
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
const LeftArrowExpanded = styled.button`
  z-index: 1;
  position: fixed;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  padding: 0;
  opacity: 50%;
  margin-top: 50vh;
  margin-left: 1vw;
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
const RightArrowExpanded = styled.button`
  position: fixed;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  padding: 0;
  opacity: 50%;
  margin-top:50vh;
  margin-left: 90vw;
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
const UpArrowExpanded = styled.button`
  margin-left: .8em;
  margin-top: .8em;
  height: 2em;
  width: 2em;
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
const DownArrowExpanded = styled.button`
  margin-left: .8em;
  margin-bottom: .8em;
  height: 2em;
  width: 2em;
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
const ArrowPlaceholderExpanded = styled.div`
  margin-left: .8em;
  margin-bottom: .8em;
  height: 2em;
  width: 2em;
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
const ExpandButtonExpanded = styled.button`
  position: fixed;
  cursor: pointer;
  margin-left: 91vw;
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
  filter: grayscale(100%);
`;
const ThumbnailImageExpanded = styled.img`
  object-fit: cover;
  height: 2.0em;
  width: 2.0em;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.15);
  border-radius: 12px;
  cursor: pointer;
  margin: .2em;
  filter: grayscale(100%);
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
const CurrentThumbnailImageExpanded = styled.img`
  object-fit: cover;
  height: 2.0em;
  width: 2.0em;
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
  toggleZoom() {
    if (this.state.screenState === 'expanded') {
      this.setState({
        screenState: 'zoomed'
      });
    } else {
      this.setState({
        screenState: 'expanded'
      });
    }
  }

  render() {
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
      <ExpandButton onClick={this.toggleFullScreen.bind(this)}><AiOutlineExpand/></ExpandButton>;
      if (this.state.currentIndex >= this.props.styleInfo[this.props.currentStyleIndex].photos.length) {
        mainImage =
        <MainImage onClick={this.toggleFullScreen.bind(this)} src={this.props.styleInfo[this.props.currentStyleIndex].photos[this.props.styleInfo[this.props.currentStyleIndex].photos.length - 1].url} alt='mainImage'/>;
      } else {
        mainImage =
        <MainImage onClick={this.toggleFullScreen.bind(this)} src={this.props.styleInfo[this.props.currentStyleIndex].photos[this.state.currentIndex].url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text='/>;
      }
      if (this.props.styleInfo[this.props.currentStyleIndex].photos.length <= 7) {
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
      leftArrow =
      <LeftArrowExpanded id='leftArrow' onClick={this.leftArrowClick.bind(this)}><AiOutlineArrowLeft/></LeftArrowExpanded>;
      rightArrow =
      <RightArrowExpanded id='rightArrow' onClick={this.rightArrowClick.bind(this)}><AiOutlineArrowRight/></RightArrowExpanded>;
      <UpArrowExpanded><AiOutlineArrowUp/></UpArrowExpanded>;
      downArrow =
      <DownArrowExpanded><AiOutlineArrowDown/></DownArrowExpanded>;
      expandButton =
      <ExpandButtonExpanded onClick={this.toggleFullScreen.bind(this)}><AiOutlineExpand/></ExpandButtonExpanded>;
      if (this.state.currentIndex >= this.props.styleInfo[this.props.currentStyleIndex].photos.length) {
        mainImage =
        <MainImageExpanded src={this.props.styleInfo[this.props.currentStyleIndex].photos[this.props.styleInfo[this.props.currentStyleIndex].photos.length - 1].url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text='/>;
      } else {
        mainImage =
        <MainImageExpanded onClick={this.toggleZoom.bind(this)} src={this.props.styleInfo[this.props.currentStyleIndex].photos[this.state.currentIndex].url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text='/>;
      }
      if (this.props.styleInfo[this.props.currentStyleIndex].photos.length <= 7) {
        console.log(this.props.styleInfo[this.props.currentStyleIndex].photos);
        thumbnailList = this.props.styleInfo[this.props.currentStyleIndex].photos.map((photo, index) => {
          if (index !== this.state.currentIndex) {
            return <ThumbnailImageExpanded key={index} src={photo.thumbnail_url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text=' onClick={this.changeMainImage.bind(this)} id={index}/>
          } else {
            return <CurrentThumbnailImageExpanded key={index} src={photo.thumbnail_url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text=' id={index}/>
          }
        });
        thumbnailCarousel =
        <ThumbnailCarouselContainerExpanded>
          {thumbnailList}
        </ThumbnailCarouselContainerExpanded>
      } else if (this.props.styleInfo[this.props.currentStyleIndex].photos.length > 7) {
        var thumbnailId = this.state.currentThumbnailScrollIndex - 1;
          thumbnailList = this.props.styleInfo[this.props.currentStyleIndex].photos.slice(this.state.currentThumbnailScrollIndex, this.state.currentThumbnailScrollIndex + 7).map((photo, index) => {
            thumbnailId++;
            if (thumbnailId !== this.state.currentIndex) {
              return <ThumbnailImageExpanded key={index} src={photo.thumbnail_url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text=' onClick={this.changeMainImage.bind(this)} id={thumbnailId}/>
            } else {
              return <CurrentThumbnailImageExpanded key={index} src={photo.thumbnail_url} alt='http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text=' id={thumbnailId}/>
            }
          });
        if (this.state.currentThumbnailScrollIndex === 0) {
          thumbnailCarousel =
            <ThumbnailCarouselContainerExpanded>
              <ArrowPlaceholderExpanded></ArrowPlaceholderExpanded>
              {thumbnailList}
              <DownArrowExpanded onClick={this.downArrowClick.bind(this)}><AiOutlineArrowDown/></DownArrowExpanded>
            </ThumbnailCarouselContainerExpanded>;
        } else if (this.state.currentThumbnailScrollIndex + 7 === this.props.styleInfo[this.props.currentStyleIndex].photos.length) {
          thumbnailCarousel =
            <ThumbnailCarouselContainerExpanded>
              <UpArrowExpanded onClick={this.upArrowClick.bind(this)}><AiOutlineArrowUp/></UpArrowExpanded>
              {thumbnailList}
            </ThumbnailCarouselContainerExpanded>;
        } else {
          thumbnailCarousel =
          <ThumbnailCarouselContainerExpanded>
            <UpArrowExpanded onClick={this.upArrowClick.bind(this)}><AiOutlineArrowUp/></UpArrowExpanded>
            {thumbnailList}
            <DownArrowExpanded onClick={this.downArrowClick.bind(this)}><AiOutlineArrowDown/></DownArrowExpanded>
          </ThumbnailCarouselContainerExpanded>;
        }
      }
      mainCarousel =
        <MainImageCarouselContainerExpanded>
          {mainImage}
        </MainImageCarouselContainerExpanded>;

      imageGallery =
      <ImageGalleryContainerExpanded>
        {mainCarousel}
        {thumbnailCarousel}
        {expandButton}
        {leftArrow}
        {rightArrow}
      </ImageGalleryContainerExpanded>;
    } else if (this.state.screenState ==='zoomed') {
      if (this.state.currentIndex >= this.props.styleInfo[this.props.currentStyleIndex].photos.length) {
        mainImage =
        <Zoom
          onClick={this.toggleZoom.bind(this)}
          img={this.props.styleInfo[this.props.currentStyleIndex].photos[this.props.styleInfo[this.props.currentStyleIndex].photos.length - 1].url}
          zoomScale={2.5}
          width={1000}
          height={1000}
        />
      } else {
        if(this.props.styleInfo[this.props.currentStyleIndex].photos[this.state.currentIndex].url) {
          mainImage =
          <Zoom
            id='zoomedImage'
            onClick= {this.toggleZoom.bind(this)}
            img={this.props.styleInfo[this.props.currentStyleIndex].photos[this.state.currentIndex].url}
            zoomScale={2.5}
            width={1000}
            height={1000}
          />
        }
      }
      mainCarousel =
        <MainImageCarouselContainerZoomed onClick={this.toggleZoom.bind(this)}>
          {mainImage}
        </MainImageCarouselContainerZoomed>;
      imageGallery =
        <ImageGalleryContainerZoomed id ='imageGalleryContainer'>
          {mainCarousel}
        </ImageGalleryContainerZoomed>;
    }
    return (
      <React.Fragment>
        {imageGallery}
      </React.Fragment>    )
  }
}

export default ImageGallery;