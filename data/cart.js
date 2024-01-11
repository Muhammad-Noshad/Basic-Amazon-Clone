export const cart = [];


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