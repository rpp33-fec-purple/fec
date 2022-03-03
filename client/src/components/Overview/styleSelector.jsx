import React from 'react';
import styled from 'styled-components';
const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  height: 45px;
  width: 200px;
`;
const StyledImageContainer = styled.div`
  height: 45px;
  width: 45px;
  overflow: hidden;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  padding-right: .2em;
  padding-bottom: .2em;
  object-fit: cover;
  border-radius: 50%;
`;
const SelectedStyledImage = styled.img`
  width: 100%;
  height: 100%;
  padding-right: .2em;
  padding-bottom: .2em;
  object-fit: cover;
  border: 5px solid rgb(150, 157, 212);
  border-radius: 50%;
  --borderWidth: 4px;
  --height: 3px;
  --width: 3px;
  --borderColor: rgb(27, 44, 23);
  box-shadow: 0 0 12px rgb(230, 221, 221);
  transform: rotate(45deg);
  height: var(--height);
  width: var(--width);
  border-bottom: var(--borderWidth) solid var(--borderColor);
  border-right: var(--borderWidth) solid var(--borderColor);
  position: relative;
  left: 65%;
  top: -140%;
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
        if (index === this.props.currentStyleIndex) {
          styleImages1.push(<StyledImageContainer key={index}><SelectedStyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url}/></StyledImageContainer>);
        } else {
          styleImages1.push(<StyledImageContainer key={index}><StyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url}/></StyledImageContainer>);
        }
      } else if (index < 8) {
        styleImages2.push(<StyledImageContainer key={index}><StyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url}/></StyledImageContainer>);
      } else {
        styleImages3.push(<StyledImageContainer key={index}><StyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url}/></StyledImageContainer>);
      }
      index++;
    }
    return (
      <div className='styleSelector'>
        <b>Style > </b>
        <span>{this.props.styleInfo[this.props.currentStyleIndex].name}</span>
        <Row key='Row1'>
          {styleImages1}
        </Row>
        {styleImages2.length !== 0 ?
        <Row key='Row2'>
          {styleImages2}
        </Row> :
        ''}
        {styleImages3.length !== 0 ?
        <Row key='Row3'>
          {styleImages3}
        </Row> :
        ''}
      </div>
    );
  }
}

export default StyleSelector;