// Add type="module" attribute
// Add export to the concerned js file
// Add import to the concerned js file
// '../' Go back
// import only works with live server
import {cart, addToCart} from '../data/cart.js';
//import {cart as myCart} from '../data/cart.js';
import {products} from '../data/products.js';

// 1. Save the data
// Saved in data/products.js

// 2. Generate the HTML
// 2.1 Initialize the HTML
let productsHTML = '';

products.forEach((product) => {
  // * by 10 because the name of image is 40 and 45 not 4.0 or 4.5
  // toFixed(number) => Shows upto specified decimal places
  // Accumulator Pattern
   productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
  </div>
  `;
});
// DATA Attributes:
// Like normal attributes e.g. class.
// Must start with "data-"
// Syntax : data-XXXXX="XXXXX"
// e.g. data-product-name="${product.name}"

// 2.2 Put it in the HTML file
document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

// 3. Make it interactive (Add to cart button)
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // Getting dataset 'data-product-id' from the button
      const productId = button.dataset.productId;
     
      // Getting the product quantity selected by the user
      // Number() because the value returned by DOM is string
      const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      addToCart(productId, productQuantity);
      updateCartQuantity();
      displayCartMessage(productId);
    });
  });

  function updateCartQuantity(){
    // For the shopping cart (Top right)
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    // Making cart quantity interactive
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }
  
  // For managing timeout
  let timeOutId = undefined;
  let timeOutProductId = undefined;
  
  function displayCartMessage(productId){
    document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = 1;
  
        // User has clicked add to cart button multiple times, then keep only the most recent timeout event by deleting the previous one
        if(timeOutId != undefined && timeOutProductId === productId){
          clearTimeout(timeOutId);
        }
  
        timeOutProductId = productId;   // Saving the product id of the timed out product to manage later 
        timeOutId = setTimeout(() => {  // Saving the time out id of the timed out product
          document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = 0;
        }, 2000);
  }
  