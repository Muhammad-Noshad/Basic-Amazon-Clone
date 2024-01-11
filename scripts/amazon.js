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
        <select>
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

      <div class="added-to-cart">
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

      // Finding matching item (if any)
      let matchingItem = undefined;

      cart.forEach((item) => {
        if(productId === item.productId){
          matchingItem = item;
        }
      });

      if(matchingItem){   // Matching found -> increment it's quantity by 1
        matchingItem.quantity++;
      }
      else{   // Otherwise -> push it into cart
        cart.push({
          productId: productId,
          quantity: 1
        });
      }

      // For the shopping cart (Top right)
      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      // Making cart quantity interactive
      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
    });
  });