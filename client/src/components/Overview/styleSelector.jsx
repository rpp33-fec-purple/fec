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
      <div className='styleSelector'>
        Style > <span>{this.props.styleInfo[this.props.currentStyleIndex].name}</span>
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