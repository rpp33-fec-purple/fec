import React from 'react';
import TestRenderer from 'react-test-renderer';
import RelatedItems from './wrapper';

describe('render the component RelatedItems', () => {
const testRenderer = TestRenderer.create(<RelatedItems />);
const testInst = testRenderer.root;
it('should contain a h2 element ', () => {
  expect(testRenderer.toJSON().type).toBe('h2');
})

it('should return the right inner text of the existing element ', () => {
  expect(testInst.findByProps({className:'Related Items'}).children[0]).toEqual('Related Items and Outfit Component');
})

// it('the component should match the saved snapshot', () => {
//   expect(testRenderer.toJSON()).toMatchSnapshot();
// })

})
