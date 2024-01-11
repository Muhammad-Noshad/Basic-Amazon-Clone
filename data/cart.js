export const cart = [{
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
},
{
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];


export function addToCart(productId, productQuantity){
  // Finding matching item (if any)
  let matchingItem = undefined;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){   // Matching found -> increment it's quantity by 1
    matchingItem.quantity += productQuantity;
  }
  else{   // Otherwise -> push it into cart
    cart.push({
      productId: productId,
      quantity: productQuantity
    });
  }
}