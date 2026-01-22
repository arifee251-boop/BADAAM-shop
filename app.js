let lang = "fa";
let cart = [];

const products = [
  { id: 1, name: "مغز بادام", price: 250 },
  { id: 2, name: "بادام کاغذی", price: 250 },
  { id: 3, name: "کشمش", price: 120 },
  { id: 4, name: "خرمای خشک", price: 180 },
  { id: 5, name: "انجیر خشک", price: 300 }
];

function setLanguage(l) {
  lang = l;
  document.getElementById("langOverlay").style.display = "none";
  renderProducts();
}

function renderProducts() {
  const box = document.getElementById("products");
  box.innerHTML = "";
  products.forEach(p => {
    box.innerHTML += `
      <div class="product">
        <strong>${p.name}</strong> (${p.price} Afs)
        <div class="qty">
          <button onclick="addToCart(${p.id}, -1)">−</button>
          <span id="qty-${p.id}">0</span>
          <button onclick="addToCart(${p.id}, 1)">+</button>
        </div>
      </div>
    `;
  });
}

function addToCart(id, delta) {
  let item = cart.find(i => i.id === id);
  if (!item && delta > 0) {
    item = { id, qty: 0 };
    cart.push(item);
  }
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    document.getElementById("qty-" + id).innerText = item ? item.qty : 0;
  }
  renderInvoice();
}

function renderInvoice() {
  const tbody = document.querySelector("#invoiceTable tbody");
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
  document.getElementById("grandTotal").innerText =
    "جمع کل: " + sum + " Afs";
}

function showPaymentInfo() {
  const v = document.getElementById("paymentType").value;
  const box = document.getElementById("paymentInfo");
  if (v === "online") {
    box.innerHTML = `
      حساب‌پی / اورم‌پی: 0798963007<br>
      اتوما‌پی: 0778609717
    `;
  } else if (v === "usdt") {
    box.innerHTML = `
      USDT (BNB Smart Chain)<br>
      0x9a5c21c1bf5596885f72431d6d1ff46fa59e5252
    `;
  } else {
    box.innerHTML = "";
  }
}

function sendOrder() {
  alert("سفارش ثبت شد و به تلگرام ارسال می‌شود");
}
