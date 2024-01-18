import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary(){
  // First we save the data
  let itemsQuantity = 0.00;
  let cartTotal = 0.00;
  let shippingCost = 0.00;
  let totalWithoutTax = 0.00;
  const taxPercentage = 10;
  let taxCost = 0.00;
  let totalWithTax = 0.00;

  cart.forEach((cartItem) => {
    let productId = cartItem.id;

    let matchingProduct = getProduct(productId);    // Getting the matching product

    itemsQuantity += Number(cartItem.quantity);   // For items quantity

    cartTotal += (matchingProduct.priceCents * cartItem.quantity);    // Cart total without shipping and tax

    let matchingDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingCost += matchingDeliveryOption.priceCents;
  });

  cartTotal = formatCurrency(cartTotal);
  shippingCost = formatCurrency(shippingCost);

  totalWithoutTax = (Number(cartTotal) + Number(shippingCost)).toFixed(2);

  taxCost = (Number(totalWithoutTax) * (taxPercentage/100)).toFixed(2);

  totalWithTax = (Number(totalWithoutTax) + Number(taxCost)).toFixed(2);

  // Now we will generate the HTML
  document.querySelector('.js-payment-summary')
    .innerHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${itemsQuantity}):</div>
          <div class="payment-summary-money">$${cartTotal}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${shippingCost}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${totalWithoutTax}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (${taxPercentage}%):</div>
          <div class="payment-summary-money">$${taxCost}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${totalWithTax}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `;
}