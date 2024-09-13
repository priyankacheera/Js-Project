
// function displayCartItems() {
//     const cartItemsContainer = document.getElementById('cartItemsContainer');
//     cartItemsContainer.innerHTML = '';
//     total = 0;  // Reset total to calculate dynamically

//     let totalQuantity = 0;  // Initialize total quantity

//     if (cartItems.length === 0) {
//         cartItemsContainer.innerHTML =
//         `<div id="cartdiv">
//         <p id="cartpara">Your Cart is Empty</p>
//         <a href="./index.html"><button><i class="fa-solid fa-arrow-left"></i> Continue Shopping</button></a>
//        </div>`
        
//         return;
//     }

//     cartItems.forEach((item, index) => {
//         const quantity = item.quantity || 1;
//         const price = parseFloat(item.price) || 0;
//         const subtotal = quantity * price;
//         total += subtotal;
//         totalQuantity += quantity;  // Add the item quantity to total quantity

//         const cartItem = document.createElement('div');
//         cartItem.className = 'cart-item';
//         cartItem.innerHTML = `
//             <img src="${item.image}" alt="${item.title}" style="width: 100px;">
//             <div>
//                 <h3>${item.title}</h3>
//                 <p>Price: $${item.price}</p>
//                 <p>Subtotal: $${subtotal.toFixed(2)}</p>
//                 <button onclick="decrement(${index})">-</button>
//                 <span id='quantity-${index}'>${quantity}</span>
//                 <button onclick="increment(${index})">+</button>
              
//             </div>
//             <hr>
//         `;
//         cartItemsContainer.appendChild(cartItem);  // Append to cartItemsContainer
//     });

//     // Update order summary with correct product count based on totalQuantity
//     const orderDetails = document.createElement('div');
//     orderDetails.classList.add('order-details');
//     orderDetails.innerHTML = `
//         <h2>Order Summary</h2>
//         <table>
//             <tr><td>Products (${totalQuantity}) <span class="spn">$${total.toFixed(2)}</span></td></tr>
//             <tr><td>Total Amount <b><span class="spn">$${total.toFixed(2)}</span></b></td></tr>
//         </table>
//     `;
//     cartItemsContainer.appendChild(orderDetails);
// }
























const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let total = 0;

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();  // Display cart items on page load
    updateCartCount();   // Update cart count on page load
});

// Display cart items in table format
function displayCartItems() {
    const cartedItems = document.getElementById('carteditems');
    cartedItems.innerHTML = '';  // Clear existing cart items
    total = 0;  // Reset total to calculate dynamically

    if (cartItems.length === 0) {
        cartedItems.innerHTML = `
            <div id="cartdiv">
                <p id="cartpara">Your Cart is Empty</p>
                <a href="./index.html"><button><i class="fa-solid fa-arrow-left"></i> Continue Shopping</button></a>
            </div>`;
        document.getElementById('ordereddescription').innerHTML = ''; // Clear order summary
        return;
    }

    const table = document.createElement('table');
    table.classList.add('cart-table');

    // Table header
    const tableHeader = `
        <thead>
            <tr>
                <th colspan="4">Itemlist</th>
            
        </thead>
        <tbody>
    `;
    table.innerHTML = tableHeader;

    cartItems.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const price = parseFloat(item.price) || 0;
        const subtotal = quantity * price;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.title}" class="product-image"></td>
            <td>${item.title}</td>
            <td>
                <div class="quantity-control">
                    <span class="decrement" onclick="decrement(${index})">&#8722;</span>
                    <span id='quantity-${index}'>${quantity}</span>
                    <span class="increment" onclick="increment(${index})">&#43;</span>
                </div>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        table.appendChild(row);
    });

    table.innerHTML += '</tbody>';
    cartedItems.appendChild(table);

    // Display order summary
    displayOrderSummary();
}

function displayOrderSummary() {
    const orderedDescription = document.getElementById('ordereddescription');
    orderedDescription.innerHTML = ''; // Clear existing order summary

    const orderDetails = document.createElement('div');
    orderDetails.classList.add('order-details');
    orderDetails.innerHTML = `
        <h2>Order Summary</h2>
        <table>
            <tr><td>Products (${cartItems.reduce((sum, item) => sum + item.quantity, 0)}) <span class="spn">$${total.toFixed(2)}</span></td></tr>
            <tr><td>Shipping <p>$30</p></td></tr>
            <tr><td>Total Amount <b><span class="spn">$${(total + 30).toFixed(2)}</span></b></td></tr>
        </table>
        <div class="checkout-btn-container">
            <button id="checkoutButton" class="checkout-btn">Go to Checkout</button>
        </div>
    `;
    orderedDescription.appendChild(orderDetails);
}

// Increment quantity in cart
function increment(index) {
    cartItems[index].quantity += 1;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();  // Re-render cart items
    updateCartCount();   // Update cart count
}

// Decrement quantity in cart
function decrement(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    } else {
        cartItems.splice(index, 1);  // Remove item if quantity becomes 0
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();  // Re-render cart items
    updateCartCount();   // Update cart count
}

// Update cart count in header (only count distinct items, not quantities)
function updateCartCount() {
    const cartButton = document.querySelector("#headerbtn a[href='./cart.html'] button");
    const distinctItemCount = cartItems.length;  // Count distinct products
    cartButton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart(${distinctItemCount})`;
}




















