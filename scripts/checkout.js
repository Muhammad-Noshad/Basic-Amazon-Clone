import {cart, removeFromCart, updateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let cartSummaryHTML = '';

// Radio button having the same name attribute can't be selected together (Only one of them can be selected)
// They had the same name="option-1" for all the products
// So I used name="option-${matchingProduct.id}" instead so that they could be selected individually 


cart.forEach((cartItem) => {
  const productId = cartItem.id;

  let matchingProduct;

  products.forEach((product) => {
    if(productId === product.id){
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="show-update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input type="number" class="hide-update-quantity-input js-update-quantity-input" data-product-id="${matchingProduct.id}">
            <span class="hide-update-quantity-save-link link-primary js-update-quantity-save-link" data-product-id="${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);  // Remove from cart
      document.querySelector(`.js-cart-item-container-${productId}`).remove();  // Remove from page

      updateCheckoutItems();
    });

    updateCheckoutItems();
  });

  function updateCheckoutItems(){
    document.querySelector('.js-checkout-items').innerHTML = updateCartQuantity() + ' items';
  }

// For update link
document.querySelectorAll('.js-update-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      
      console.log(`Before : ${link.classList}`);

      // Hiding update link
      link.classList.remove('show-update-quantity-link');
      link.classList.add('hide-update-quantity-link');

      console.log(`Before : ${link.classList}`);

      // For input field
      let inputField;

      // Finding the relevant input field
      document.querySelectorAll('.js-update-quantity-input')
      .forEach((input) => {
        if(input.dataset.productId === productId){
          inputField = input;
        }
      });

      // Showing the relevant field
      inputField.classList.remove('hide-update-quantity-input');
      inputField.classList.add('show-update-quantity-input');

      // For save link
      let saveLink;

      document.querySelectorAll('.js-update-quantity-save-link')
      .forEach((link) => {
        if(link.dataset.productId === productId){
          saveLink = link;
        }
      });

      // Showing the relevant save link
      saveLink.classList.remove('hide-update-quantity-save-link');
      saveLink.classList.add('show-update-quantity-save-link');

      // For save link
      saveLink.addEventListener('click', () => {
        // Hiding the relevant field
        inputField.classList.remove('show-update-quantity-input');
        inputField.classList.add('hide-update-quantity-input');
        
        // Hiding the relevant save link
        saveLink.classList.remove('show-update-quantity-save-link');
        saveLink.classList.add('hide-update-quantity-save-link');

        // Showing update link
        link.classList.remove('hide-update-quantity-link');
        link.classList.add('show-update-quantity-link');
      });
    });
  });