import React from 'react';
import TestRenderer from 'react-test-renderer';
import productInformation from './productInformation.jsx';

describe('render the component productInformation', () => {
const testRenderer = TestRenderer.create(<productInformation />);
const testInst = testRenderer.root;
it('should contain a h2 element ', () => {
  expect(testRenderer.toJSON().type).toBe('div');
})

// it('should return the right inner text of the existing element ', () => {
//   expect(testInst.findByProps({className:'Overview'}).children[0]).toEqual('Product Overview Component');
// })

})