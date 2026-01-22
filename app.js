const products = [
  { id: 1, name: "مغز بادام", price: 250 },
  { id: 2, name: "بادام کاغذی ستربایی", price: 250 },
  { id: 3, name: "بادام کاغذی مخملی", price: 250 },
  { id: 4, name: "بادام کاغذی پسته‌ای", price: 250 },
  { id: 5, name: "بادام سنگی با پوست", price: 250 },
  { id: 6, name: "بادام کاغذی شاخ بُز", price: 250 },
  { id: 7, name: "کشمش", price: 120 },
  { id: 8, name: "خرمای خُشک", price: 180 },
  { id: 9, name: "انجیر خُشک", price: 300 },
  { id: 10, name: "کِشته زردآلو(برگی)", price: 220 },
  { id: 11, name: "کِشته زردآلو خسته‌دار", price: 220 },
  { id: 12, name: "کِشته غُلینگ خسته‌دار", price: 250 }
];

let cart = [];

function renderProducts() {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";
  products.forEach(p => {
    if (!p.quantity) p.quantity = 1;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>قیمت: ${p.price} افغانی</p>
      <div>
        <button onclick="changeQuantity(${p.id}, -0.25)">➖</button>
        <span id="qty-${p.id}">${p.quantity}</span> کیلو
        <button onclick="changeQuantity(${p.id}, 0.25)">➕</button>
      </div>
      <button onclick="addToCart(${p.id})">افزودن به سبد خرید</button>
    `;
    productsDiv.appendChild(div);
  });
}

function changeQuantity(id, delta) {
  let p = products.find(x => x.id === id);
  p.quantity = Math.max(0.25, (p.quantity + delta).toFixed(2));
  document.getElementById(`qty-${id}`).innerText = p.quantity;
}

function addToCart(id) {
  let p = products.find(x => x.id === id);
  let existing = cart.find(x => x.id === id);
  if (existing) {
    existing.quantity = (parseFloat(existing.quantity) + parseFloat(p.quantity)).toFixed(2);
  } else {
    cart.push({ ...p });
  }
  renderCartTable();
}

function renderCartTable() {
  const tbody = document.querySelector("#cart-table tbody");
  tbody.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const amount = item.price * item.quantity;
    total += amount;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index+1}</td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
      <td>${amount}</td>
    `;
    tbody.appendChild(tr);
  });
  document.getElementById("total-amount").innerText = total;
}

document.getElementById("show-order-form").addEventListener("click", () => {
  if(cart.length === 0) {
    alert("سبد خرید خالی است!");
    return;
  }
  document.getElementById("order-form").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let phone = document.getElementById("phone").value;
  let payment = document.getElementById("payment").value;

  let orderSummary = `سفارش ثبت شد ✅\n\nنام: ${name}\nآدرس: ${address}\nتلفن: ${phone}\nپرداخت: ${payment}\n\nمحصولات:\n` +
    cart.map(x => `${x.name} : ${x.quantity} کیلو - ${x.price*x.quantity}`).join("\n") +
    `\n\nجمع کل: ${cart.reduce((sum, x)=> sum + x.price*x.quantity,0)}`;

  alert(orderSummary);

  cart = [];
  renderProducts();
  renderCartTable();
  document.getElementById("order-form").style.display = "none";
});

renderProducts();
renderCartTable();
