document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();

  document
    .getElementById("continueShopping")
    .addEventListener("click", function () {
      console.log("continueShopping button clicked");
      window.location.assign("product.php"); // Navigate back to the products page
    });

  document.getElementById("checkOut").addEventListener("click", function () {
    var cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Calculate total cost from cart items
    const totalCost = Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Store the total order cost in Local Storage
    localStorage.setItem("orderTotal", totalCost.toFixed(2));

    console.log(JSON.stringify({ cart }));

    //for testing
    // var hardcodedJson = {
    //   cart: [
    //     { product_id: 1, quantity: 1, name: "The Duck", price: 24.99 },
    //     { product_id: 2, quantity: 1, name: "The Butterfly", price: 24.99 },
    //     { product_id: 4, quantity: 1, name: "The Forest", price: 24.99 },
    //   ],
    // };

    // var hardcodedJson = [
    //   { product_id: 1, quantity: 1, name: "The Duck", price: 24.99 },
    //   { product_id: 2, quantity: 1, name: "The Butterfly", price: 24.99 },
    //   { product_id: 4, quantity: 1, name: "The Forest", price: 24.99 },
    // ];

    $.ajax({
      url: "processCheckout.php",
      type: "POST",
      contentType: "application/json", // Specifies the content type.
      dataType: "json",

      //for testing
      // data: JSON.stringify({ hardcodedJson }),
      data: JSON.stringify({ cart }),
      // Converts the cart object to a JSON string.
      success: function (response) {
        // The request is successful and you can check the response from the server
        if (response.success) {
          // Handle successful checkout
          // localStorage.clear(); // Clears the localStorage
          window.location.href = "thankYou.php"; // Redirects to the thank you page
        } else {
          // Server responded with success: false
          console.error("Checkout failed:", response.message);
          alert("Checkout failed. Please try again.");
        }
      },
      error: function (xhr, status, error) {
        // There was an error with the request
        console.error("Error during fetch or processing:", error);
        alert("An error occurred. Please try again.");
      },
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

  cartContainer.addEventListener("change", function (event) {
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

  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[productId]) {
      delete cart[productId];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems(); // Re-render the cart to reflect the removed item
    }
  }
});
