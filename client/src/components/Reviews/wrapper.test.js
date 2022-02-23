
import React from 'react';
import TestRenderer from 'react-test-renderer';
import Review from './wrapper';

describe('render the component Reviews', () => {
const testRenderer = TestRenderer.create(<Review />);
const testInst = testRenderer.root;
it('should contain a div element ', () => {
  expect(testRenderer.toJSON().type).toBe('div');
})

it('should return the right inner text of the existing element ', () => {
  expect(testInst.findByProps({className:'Review'}).children[0]).toEqual('Review Component');
})

it('the component should match the saved snapshot', () => {
  expect(testRenderer.toJSON()).toMatchSnapshot();
})

})

