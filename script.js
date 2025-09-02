const PRODUCTS = [
  { id: 1, name: "Smartphone X10", category: "Electronics", price: 300000, stock: 10, rating: 4.5, image: "phone.jpg" },
  { id: 2, name: "Running Shoes", category: "Fashion", price: 75000, stock: 20, rating: 4.2, image: "shoes.jpg" },
  { id: 3, name: "Laptop Pro 15", category: "Electronics", price: 1200000, stock: 5, rating: 4.8, image: "laptop.jpg" },
  { id: 4, name: "Wrist Watch", category: "Accessories", price: 50000, stock: 15, rating: 4.0, image: "watch.jpg" }
];

let cart = [];

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";
  PRODUCTS.forEach(product => {
    const item = document.createElement("div");
    item.className = "border rounded p-4 bg-white shadow";
    item.innerHTML = `
      <img src="images/${product.image}" alt="${product.name}" class="mb-2 w-full h-32 object-cover rounded">
      <h2 class="font-semibold">${product.name}</h2>
      <p class="text-gray-600">Price: ${product.price.toLocaleString("en-TZ")} TSh</p>
      <p class="text-sm">In stock: ${product.stock}</p>
      <button onclick="addToCart(${product.id})" class="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Add to Cart</button>
    `;
    container.appendChild(item);
  });
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product || product.stock <= 0) return alert("Out of stock!");
  cart.push(product);
  product.stock--;
  renderProducts();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart");
  container.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const el = document.createElement("div");
    el.className = "flex justify-between border-b py-2";
    el.innerHTML = `
      <span>${item.name} - ${item.price.toLocaleString("en-TZ")} TSh</span>
      <button onclick="removeFromCart(${index})" class="text-red-500">Remove</button>
    `;
    container.appendChild(el);
  });
  document.getElementById("total").textContent = total.toLocaleString("en-TZ") + " TSh";
}

function removeFromCart(index) {
  const product = cart[index];
  product.stock++;
  cart.splice(index, 1);
  renderProducts();
  renderCart();
}

window.onload = () => {
  renderProducts();
  renderCart();
};
