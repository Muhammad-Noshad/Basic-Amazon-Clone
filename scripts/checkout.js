import {cart, removeFromCart, updateCartQuantity, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

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

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
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
          ${deliveryOptionsHTML(matchingProduct.id, cartItem)}
        </div>
      </div>
    </div>
  `;
});


function deliveryOptionsHTML(productId, cartItem){
  let optionsHTML = '';
  
  deliveryOptions.forEach((delivery) => {
    const today = dayjs();
    const deliveryDate = today.add(delivery.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = delivery.priceCents === 0? 'FREE - ' : `$${formatCurrency(delivery.priceCents)} - `;
    
    const isChecked = delivery.id === cartItem.deliveryOptionId ? 'checked' : '';

    optionsHTML += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${productId}"
      data-delivery-option-id="${delivery.id}">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${productId}" ${isChecked}>
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}Shipping
          </div>
        </div>
      </div>
    `
  });

  return optionsHTML;
}

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

      // Hiding update link
      link.classList.remove('show-update-quantity-link');
      link.classList.add('hide-update-quantity-link');

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

document.querySelectorAll('.js-delivery-option')
  .forEach((option) => {
    option.addEventListener('click', () => {
      const {productId, deliveryOptionId} = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
    });
  });