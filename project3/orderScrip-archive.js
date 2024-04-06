document.addEventListener('DOMContentLoaded', function() {
    fetchOrders();
});

function fetchOrders() {
    fetch('getOrders.php')
        .then(response => response.json())
        .then(data => {
            displayOrders(data);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

function displayOrders(orders) {
    const ordersContainer = document.getElementById('ordersContainer');

    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order');

        let totalCost = 0;

        const header = document.createElement('h2');
        header.textContent = `Order #${order.order_id} - Date: ${order.date_ordered}`;
        orderDiv.appendChild(header);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>Product ID</th><th>Quantity</th><th>Price</th><th>Subtotal</th></tr>`;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        order.items.forEach(item => {
            const tr = document.createElement('tr');
            const subtotal = item.quantity * item.price;
            totalCost += subtotal;
            tr.innerHTML = `<td>${item.product_id}</td><td>${item.quantity}</td><td>$${item.price.toFixed(2)}</td><td>$${subtotal.toFixed(2)}</td>`;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        orderDiv.appendChild(table);

        const totalCostP = document.createElement('p');
        totalCostP.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
        orderDiv.appendChild(totalCostP);

        ordersContainer.appendChild(orderDiv);
    });
}
