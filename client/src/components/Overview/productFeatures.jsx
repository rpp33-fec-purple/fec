import React from 'react';
import styled from 'styled-components';

const ProductFeaturesWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 600px 300px;
`;
const VerticalContainer = styled.div`
  display: grid;
  gap: 15px;
`;
const HorizontalContainer = styled.div`
  display: grid
  grid-template-columns: 100px auto;
`;
const Slogan = styled.h3`
  font-size: 15px;
`;
const Description = styled.p`
  font-size: 11px;
`;
const VerticalLine = styled.div`
  border-left: 3px solid black;
  height: auto
`;
const NoBulletList = styled.ul`
  list-style: none;
`;
const Feature = styled.li`
  font-size: 11px;
  margin-bottom: 15px;
`;

const ProductFeatures = (props) => (
  <ProductFeaturesWrapper>
    <VerticalContainer>
      <Slogan>{props.productInfo.slogan}</Slogan>
      <Description>{props.productInfo.description}</Description>
    </VerticalContainer>
    <HorizontalContainer>
      <VerticalLine/>
      <NoBulletList>
        {props.productInfo.features.map((item, index) => (
          <Feature key={index}>✔ {item.value}</Feature>
      ))}
      </NoBulletList>
    </HorizontalContainer>

  </ProductFeaturesWrapper>

);

export default ProductFeatures;