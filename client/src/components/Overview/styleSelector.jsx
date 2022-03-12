import React from 'react';
import styled from 'styled-components';
const StyleSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .8em;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: .7em;
  height: 3em;
  width: 19em;
`;
const StyledImageContainer = styled.div`
  height: 3em;
  width: 3em;
  overflow: hidden;
`;
const SelectedStyledImageContainer = styled.div`
  position: relative;
  height: 3em;
  width: 3em;
  overflow: hidden;
  display: inline-block;
  ::before {
    z-index: 1;
    position: absolute;
    left: 27%;
    top: 47%;
    height: 25%;
    width: .2em;
    background-color: #000000;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
  }
  ::after {
    position: absolute;
    left: 30%;
    bottom: 30%;
    height: .2em;
    width: 50%;
    background-color: #000000;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
  }
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: solid;
`;
const SelectedStyledImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 50%;
  object-fit: cover;
  border-radius: 50%;
  border: solid;
`;
const StyleText = styled.span`
  color: #808080;
`;

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    var index = 0;
    var styleImages1 = [];
    var styleImages2 = [];
    var styleImages3 = [];
    while (index < this.props.styleInfo.length) {
      if (index < 4) {
        if (this.props.currentStyleIndex === index) {
          styleImages1.push(<SelectedStyledImageContainer key={index}><SelectedStyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url} alt="http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text="/></SelectedStyledImageContainer>);
        } else {
          styleImages1.push(<StyledImageContainer key={index}><StyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url} alt="http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text="/></StyledImageContainer>);
        }
      } else if (index < 8) {
        if (this.props.currentStyleIndex === index) {
          styleImages2.push(<SelectedStyledImageContainer key={index}><SelectedStyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url} alt="http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text="/></SelectedStyledImageContainer>);
        } else {
          styleImages2.push(<StyledImageContainer key={index}><StyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url} alt="http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text="/></StyledImageContainer>);
        }
      } else {
        if (this.props.currentStyleIndex === index) {
          styleImages3.push(<SelectedStyledImageContainer key={index}><SelectedStyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url} alt="http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text="/></SelectedStyledImageContainer>);
        } else {
          styleImages3.push(<StyledImageContainer key={index}><StyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url} alt="http://via.placeholder.com/640x360/FFFFFF/FFFFFF?Text="/></StyledImageContainer>);
        }
      }
      index++;
    }
    return (
      <StyleSelectorContainer>
        <div>
          <b>STYLE > </b>
          <StyleText>{this.props.styleInfo[this.props.currentStyleIndex].name.toUpperCase()}</StyleText>
        </div>
        <Row key='Row1'>
          {styleImages1}
        </Row>
        <Row key='Row2'>
          {styleImages2}
        </Row>
        <Row key='Row3'>
          {styleImages3}
        </Row>
      </StyleSelectorContainer>
    );
  }
}

export default StyleSelector;