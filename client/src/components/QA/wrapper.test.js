import React from 'react';
import TestRenderer from 'react-test-renderer';
import QA from './wrapper.jsx';

describe('render the component RelatedItems', () => {
const testRenderer = TestRenderer.create(<QA />);
const testInst = testRenderer.root;
it('should contain a h2 element ', () => {
  expect(testRenderer.toJSON().type).toBe('h2');
})

it('should return the right inner text of the existing element ', () => {
  expect(testInst.findByProps({className:'QA'}).children[0]).toEqual('Questions and Answers Component');
})

// it('the component should match the saved snapshot', () => {
//   expect(testRenderer.toJSON()).toMatchSnapshot();
// })

})
