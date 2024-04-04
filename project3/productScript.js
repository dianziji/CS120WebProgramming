document.addEventListener("DOMContentLoaded", () => {
  // Handle "More" button clicks to toggle product descriptions
  document.querySelectorAll(".more-info-btn").forEach((button) => {
    button.addEventListener("click", function () {
      console.log("More button clicked");
      const description = this.nextElementSibling;
      description.style.display =
        description.style.display === "none" ? "block" : "none";
    });
  });

  // Handle "Add to Cart" button clicks
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id");
      const productItem = this.closest(".product");
      const quantitySelector = productItem.querySelector(".quantity-select");
      const quantity = parseInt(quantitySelector.value, 10);
      const name = productItem.querySelector("h2").textContent; 
      const priceText = productItem.querySelector("p").textContent;
      const price = parseFloat(priceText.replace("$", ""));

      // Retrieve the existing cart from local storage or initialize a new one
      let cart = JSON.parse(localStorage.getItem("cart")) || {};

      if (!cart[productId]) {
        cart[productId] = {
          quantity: quantity,
          name: name,
          price: price,
        };
      }

      console.log(JSON.stringify(cart));
      // Save the updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(cart));
      // change button color and text after click
      this.style.backgroundColor = "#415c54";
      this.style.color = "#fff";
      this.textContent = "Added";

      this.disabled = true;
    });
  });
});
