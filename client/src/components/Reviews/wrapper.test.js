
import React from 'react';
import TestRenderer from 'react-test-renderer';
import Review from './wrapper';

describe('render the component RelatedItems', () => {
const testRenderer = TestRenderer.create(<Review />);
const testInst = testRenderer.root;
it('should contain a h2 element ', () => {
  expect(testRenderer.toJSON().type).toBe('h2');
})

it('should return the right inner text of the existing element ', () => {
  expect(testInst.findByProps({className:'Review'}).children[0]).toEqual('Review Component');
})

// it('the component should match the saved snapshot', () => {
//   expect(testRenderer.toJSON()).toMatchSnapshot();
// })

})

// it('render the component Q&A', () => {
//   const testRenderer = TestRenderer.create(<QA />);
//   expect(testRenderer.toJSON().children[0]).toEqual('Questions and Answers Component')
//   expect(testRenderer.toJSON()).toMatchSnapshot();
// })