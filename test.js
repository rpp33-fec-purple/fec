import React from 'react';
import ReactDOM from 'react-dom';
import RelatedItemsContainer from './client/src/containers/RelatedItemsContainer.js';


it('render the component RelatedItems ', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RelatedItemsContainer/>, div)
  expect(true).toBe(true);
})