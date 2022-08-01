import React from 'react';

const test = () => {
  const fetchCartItems = async () => {
    const response = await getCart();
    console.log(response.data)
  };
  return <div>
    {carts?.map(item => (<div>
        <h1>Name: ${item?.product?.name}</h1>
        <h1>Size: ${item?.product?.size}</h1>
        <h1>Quantity: ${item?.quantity}</h1>
        <h1>Description: ${item?.product?.description}</h1>
    </div>))}
  </div>;
};

export default test;
