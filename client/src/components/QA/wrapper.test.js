import React from 'react';
import TestRenderer from 'react-test-renderer';
import QA from './wrapper';

describe('render the component Questions and Answers', () => {
var product = {
  product: {
    campus: "hr-rpp",
    category: "Jackets",
    created_at: "2022-01-28T00:20:03.466Z",
    default_price: "140.00",
    description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    id: 64620,
    name: "Camo Onesie",
    slogan: "Blend in to your crowd",
    updated_at: "2022-01-28T00:20:03.466Z"
  }
};

const testRenderer = TestRenderer.create(<QA product={product}/>);
const testInst = testRenderer.root;
it('should contain a div element ', () => {
  expect(testRenderer.toJSON().type).toBe('div');
})

it('should return the right inner text of the existing element ', () => {
  expect(testInst.findByProps({className:'QA'}).children[0]).toEqual('Questions and Answers Component');
})

// it('the component should match the saved snapshot', () => {
//   expect(testRenderer.toJSON()).toMatchSnapshot();
// })

})
