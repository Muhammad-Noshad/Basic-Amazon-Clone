export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  let cart = [{
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1,
    deliveryOptionId: '1'
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1,
    deliveryOptionId: '2'
  }];
}

export function addToCart(productId, productQuantity){
  // Finding matching item (if any)
  let matchingItem = undefined;

  cart.forEach((cartItem) => {
    if(productId === cartItem.id){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){   // Matching found -> increment it's quantity
    matchingItem.quantity += productQuantity;
  }
  else{   // Otherwise -> push it into cart
    cart.push({
      id: productId,
      quantity: productQuantity,
      deliveryOptionId: '1'
    });
  }

  saveCartToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.id !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveCartToStorage();
}

export function saveCartToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartQuantity(){
  // For the shopping cart (Top right) and checkout page
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId){
  cart.forEach((cartItem) => {
    if(cartItem.id === productId){
      cartItem.deliveryOptionId = deliveryOptionId;
    }
  });

  saveCartToStorage();
}