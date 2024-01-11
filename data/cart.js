export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [];
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
      quantity: productQuantity
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
  })

  cart = newCart;

  saveCartToStorage();
}

export function saveCartToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}