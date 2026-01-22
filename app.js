let cart = [];

const products = [
  { id: 1, name: "مغز بادام", price: 250 },
  { id: 2, name: "بادام کاغذی ستربایی", price: 250 },
  { id: 3, name: "بادام کاغذی مخملی", price: 250 },
  { id: 4, name: "بادام سنگی با پوست", price: 250 },
  { id: 5, name: "کشمش", price: 120 },
  { id: 6, name: "انجیر خشک", price: 300 }
];

function setLanguage() {
  document.getElementById("languageScreen").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
  renderProducts();
}

function renderProducts() {
  const box = document.getElementById("products");
  box.innerHTML = "";
  products.forEach(p => {
    box.innerHTML += `
      <div class="product">
        <strong>${p.name}</strong>
        <span class="comment-icon" onclick="toggleComment(${p.id})">💬</span>
        <div class="qty">
          <button onclick="changeQty(${p.id}, -1)">−</button>
          <span id="qty-${p.id}">0</span>
          <button onclick="changeQty(${p.id}, 1)">+</button>
        </div>
        <div id="comment-${p.id}" class="comment-box">
          <textarea placeholder="نظر خود را بنویسید"></textarea>
        </div>
      </div>
    `;
  });
}

function changeQty(id, delta) {
  let item = cart.find(i => i.id === id);
  if (!item && delta > 0) {
    item = { id, qty: 0 };
    cart.push(item);
  }
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    document.getElementById("qty-" + id).innerText = item ? item.qty : 0;
  }
  renderInvoice();
}

function renderInvoice() {
  const tbody = document.getElementById("invoice");
  tbody.innerHTML = "";
  let sum = 0;
  cart.forEach((c, i) => {
    const p = products.find(x => x.id === c.id);
    const total = p.price * c.qty;
    sum += total;
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${p.name}</td>
        <td>${c.qty}</td>
        <td>${p.price}</td>
        <td>${total}</td>
      </tr>
    `;
  });
  document.getElementById("total").innerText = "جمع کل: " + sum + " افغانی";
}

function toggleComment(id) {
  const box = document.getElementById("comment-" + id);
  box.style.display = box.style.display === "block" ? "none" : "block";
}
