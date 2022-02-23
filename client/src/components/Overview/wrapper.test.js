import React from 'react';
import TestRenderer from 'react-test-renderer';
import Overview from './wrapper';

describe('render the component RelatedItems', () => {
const testRenderer = TestRenderer.create(<Overview />);
const testInst = testRenderer.root;
it('should contain a h2 element ', () => {
  expect(testRenderer.toJSON().type).toBe('h2');
})

it('should return the right inner text of the existing element ', () => {
  expect(testInst.findByProps({className:'Overview'}).children[0]).toEqual('Product Overview Component');
})

})
