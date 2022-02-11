import React from 'react';
import TestRenderer from 'react-test-renderer';
import RelatedItems from './client/src/components/RelatedItems/wrapper';
import QA from './client/src/components/qa/wrapper';


it('render the component RelatedItems ', () => {
  const testRenderer = TestRenderer.create(<RelatedItems />);
  console.log('TEST: ',testRenderer.root)
  console.log('instance: ',)
  expect(testRenderer.toJSON().type).toBe('h2');
  expect(testRenderer.toJSON().children[0]).toEqual('Related Items and Outfit Component')
  expect(testRenderer.toJSON()).toMatchSnapshot();
})

it('render the component Q&A', () => {
  const testRenderer = TestRenderer.create(<QA />);
  expect(testRenderer.toJSON().children[0]).toEqual('Questions and Answers Component')
  expect(testRenderer.toJSON()).toMatchSnapshot();
})