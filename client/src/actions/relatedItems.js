var changeProduct = (product) => ({

  type: 'change_product',
  payload: product

  //Probably add some async api calls to get new product data

})

export default changeProduct;