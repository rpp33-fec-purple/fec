import React from 'react';
import styled from 'styled-components';
const StyleSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5em;

`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: .7em;
  height: 3em;
  width: 18em;
`;
const StyledImageContainer = styled.div`
  height: 3em;
  width: 3em;
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
        styleImages1.push(<StyledImageContainer key={index}><StyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url}/></StyledImageContainer>);
      } else if (index < 8) {
        styleImages2.push(<StyledImageContainer key={index}><StyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url}/></StyledImageContainer>);
      } else {
        styleImages3.push(<StyledImageContainer key={index}><StyledImage key={index} id={this.props.styleInfo[index].style_id} onClick={this.props.updateStyleId} src={this.props.styleInfo[index].photos[0].thumbnail_url}/></StyledImageContainer>);
      }
      index++;
    }
    return (
      <StyleSelectorContainer>
        <div>
          <b>Style > </b>
          <span>{this.props.styleInfo[this.props.currentStyleIndex].name}</span>
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