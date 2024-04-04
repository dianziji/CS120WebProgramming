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
      const quantitySelector =
        this.previousElementSibling.previousElementSibling; // Assuming the select element is two elements before the button
      const quantity = parseInt(quantitySelector.value);

      // Retrieve the existing cart from local storage or initialize a new one
      let cart = JSON.parse(localStorage.getItem("cart")) || {};

      // Update the cart. If the product is already in the cart, increase the quantity; otherwise, add the new product
      if (cart[productId]) {
        cart[productId] += quantity;
      } else {
        cart[productId] = quantity;
      }

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
