import React from 'react';
import TestRenderer from 'react-test-renderer';
import RelatedItems from './components/RelatedItems/wrapper';


it('render the component RelatedItems ', () => {
  const testRenderer = TestRenderer.create(<RelatedItems />);
  expect(testRenderer.toJSON().type).toBe('h2');
})