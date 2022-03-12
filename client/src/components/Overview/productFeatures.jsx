import React from 'react';
import styled from 'styled-components';

const ProductFeaturesWrapper = styled.div`
  display: flex;
  margin-top: 2em;
  margin-bottom: 2em;
`;
const LeftContainer = styled.div`
  width: 40em;
  height: auto;
  margin-right: 1em;
`;
const RightContainer = styled.div`
  margin-left: 1em;
`;
const Slogan = styled.h3`
  font-size: 1.1em;
  margin-bottom: 1.5em;
`;
const Description = styled.p`
  font-size: .8em;
  margin-bottom: 1.5em;
`;
const VerticalLine = styled.div`
  border-left: 2px solid black;
  height: auto
`;
const NoBulletList = styled.ul`
  list-style: none;
`;
const Feature = styled.li`
  font-size: .7em;
  margin-bottom: 1.5em;
`;

const ProductFeatures = (props) => (
  <ProductFeaturesWrapper>
    <LeftContainer>
      <Slogan>{props.productInfo.slogan}</Slogan>
      <Description>{props.productInfo.description}</Description>
    </LeftContainer>
    <VerticalLine/>
    <RightContainer>
      <NoBulletList>
        {props.productInfo.features ?
        props.productInfo.features.map((item, index) => (
          <Feature key={index}>✔ {item.value}</Feature>
        )) :
          ''
      }
      </NoBulletList>
    </RightContainer>

  </ProductFeaturesWrapper>

);

export default ProductFeatures;