document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();

  document
    .getElementById("continueShopping")
    .addEventListener("click", function () {
      console.log("continueShopping button clicked");
      window.location.assign("product.php"); // Navigate back to the products page
    });

  // Example checkout button functionality - adjust according to your needs
  document.getElementById("checkOut").addEventListener("click", function () {
    // Logic to handle checkout could go here

    


    window.location.href = "thankYou.php"; // Redirect to a thank you page
  });
});
function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const cartContainer = document.getElementById("cartItemsContainer");
  cartContainer.innerHTML = ""; // Clear existing items

  Object.keys(cart).forEach((productId) => {
    const { name, price, quantity } = cart[productId];
    const itemCost = price * quantity;
    const itemRow = document.createElement("tr");
    itemRow.innerHTML = `
        <td>${name}</td>
        <td><input type="number" value="${quantity}" min="1" class="cart-quantity" data-product-id="${productId}"></td>
        <td class="item-total">$${(price * quantity).toFixed(2)}</td>
        <td><button onclick="removeFromCart('${productId}')">Remove</button></td>
    `;

    cartContainer.appendChild(itemRow);
  });


  const totalCost = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
        <td colspan="2">Total Cost</td>
        <td>$${totalCost.toFixed(2)}</td>
        <td></td>
    `;
  cartContainer.appendChild(totalRow);
}



  const cartContainer = document.getElementById("cartItemsContainer");
  
  cartContainer.addEventListener("change", function(event) {
      if (event.target.classList.contains("cart-quantity")) {
          const productId = event.target.dataset.productId;
          const newQuantity = parseInt(event.target.value, 10);
          updateCartQuantity(productId, newQuantity);
      }
  });


function updateCartQuantity(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (cart[productId] && quantity >= 1) {
      cart[productId].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems(); // Re-render the cart to update totals
  }
}

// function renderCartItems() {
//   const cart = JSON.parse(localStorage.getItem("cart")) || {};
//   const cartContainer = document.getElementById("cartContainer");
//   cartContainer.innerHTML = ""; // Clear existing cart contents

//   let totalCost = 0;

//   Object.keys(cart).forEach((productId) => {
//     const product = cart[productId];

//     // Corrected placement for product data check
//     if (!product || typeof product.price === "undefined") {
//       console.warn(
//         `Product data for ID ${productId} is missing or incomplete.`
//       );
//       return; // Skip this iteration
//     }

//     const itemCost = product.price * product.quantity;
//     totalCost += itemCost;

//     const itemElement = document.createElement("div");
//     itemElement.innerHTML = `
//     <p>${product.name}
//         Quantity: ${product.quantity}
//         Price: $${product.price.toFixed(2)}</p>

//         <button onclick="removeFromCart('${productId}')">Remove from Cart</button>
//       `;
//     cartContainer.appendChild(itemElement);
//   });

//   // Display the total cost
//   const totalElement = document.createElement("p");
//   totalElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
//   cartContainer.appendChild(totalElement);
// }

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (cart[productId]) {
    delete cart[productId];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems(); // Re-render the cart to reflect the removed item
  }
}
