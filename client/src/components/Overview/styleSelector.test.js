import React from 'react';
import TestRenderer from 'react-test-renderer';
import styleSelector from './styleSelector';

describe('render the component Overview', () => {
const testRenderer = TestRenderer.create(<styleSelector />);
const testInst = testRenderer.root;
it('should contain an img element ', () => {
  expect(testRenderer.toJSON().type).toBe('img');
})

// it('should return the right inner text of the existing element ', () => {
//   expect(testInst.findByProps({className:'Overview'}).children[0]).toEqual('Product Overview Component');
// })

})