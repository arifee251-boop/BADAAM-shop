const tg = window.Telegram.WebApp;
tg.ready();

const products = [
  { id: 1, name: "مغز بادام فی‌کیلو", price: 250 },
  { id: 1, name: "بادام کاغذی ستربایی فی‌کیلو", price: 250 },
  { id: 1, name: "بادام کاغذی مخملی فی‌کیلو", price: 250 },
  { id: 1, name: "بادام کاغذی پسته‌ای فی‌کیلو", price: 250 },
  { id: 1, name: "بادام سنگی با پوست فی‌کیلو", price: 250 },
  { id: 1, name: "بادام کاغذی شاخ بُز فی‌کیلو", price: 250 },
  { id: 2, name: "کشمش فی‌کیلو", price: 120 },
  { id: 3, name: "خرمای خُشک", price: 180 },
  { id: 4, name: "انجیر خُشک فی‌کیلو", price: 300 },
  { id: 5, name: "کِشته زردآلو(برگی) فی‌کیلو", price: 220 },
  { id: 6, name: "کِشته زردآلو خسته‌دار فی‌کیلو", price: 220 },
  { id: 1, name: "کِشته غُلینگ خسته‌دار فی‌کیلو", price: 250 }
];

let cart = [];

const productsDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");
const previewDiv = document.getElementById("preview");
const checkoutDiv = document.getElementById("checkout");

function renderProducts() {
  productsDiv.innerHTML = "";
  products.forEach(p => {
    productsDiv.innerHTML += `
      <div class="product">
        <b>${p.name}</b><br>
        قیمت: ${p.price} افغانی
        <button onclick="addToCart(${p.id})">افزودن به سبد خرید</button>
      </div>`;
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  renderCart();
}

function renderCart() {
  cartDiv.innerHTML = "";
  cart.forEach((c, i) => {
    cartDiv.innerHTML += `
      <div class="cart-item">
        ${c.name} - ${c.price} افغانی
      </div>`;
  });
}

function showPreview() {
  if (cart.length === 0) return alert("سبد خرید خالی است");

  let total = cart.reduce((s, i) => s + i.price, 0);

  previewDiv.innerHTML = `
    <h3>👀 پیش‌نمایش سفارش</h3>
    ${cart.map(i => `${i.name} - ${i.price}`).join("<br>")}
    <hr>
    <b>جمع کل: ${total} افغانی</b>
    <button onclick="confirmOrder()">تایید و ادامه</button>
  `;

  previewDiv.classList.remove("hidden");
}

function confirmOrder() {
  checkoutDiv.classList.remove("hidden");
}

function submitOrder() {
  const order = {
    customer: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    payment: document.getElementById("payment").value,
    items: cart
  };

  tg.sendData(JSON.stringify(order));
  alert("سفارش ثبت شد ✅");
}

renderProducts();
