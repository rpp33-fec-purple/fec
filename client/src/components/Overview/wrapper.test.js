import React from 'react';
import TestRenderer from 'react-test-renderer';
import Overview from './wrapper';
import sampleData from './sampleData.js';

describe('render the component Overview', () => {
const testRenderer = TestRenderer.create(<Overview productInfo={sampleData.basicProductInfo}/>);
const testInst = testRenderer.root;
it('should contain a div element ', () => {
  expect(testRenderer.toJSON()).toBe('div');
})

// it('should return the right inner text of the existing element ', () => {
//   expect(testInst.findByProps({className:'Overview'}).children[0]).toEqual('Product Overview Component');
// })

})
