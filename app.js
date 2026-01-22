let lang = 'fa';

const products = [
  { id: 1, name: "مغز بادام", price: 250 },
  { id: 2, name: "کشمش", price: 120 },
  { id: 3, name: "انجیر خشک", price: 300 }
];

let cart = [];

function setLanguage(l) {
  lang = l;
  document.getElementById("langOverlay").style.display = "none";
  renderProducts();
}

function renderProducts() {
  const box = document.getElementById("productList");
  box.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>قیمت: ${p.price} افغانی</p>

      <div class="qty-box">
        <button onclick="changeQty(${p.id}, -1)">➖</button>
        <span id="qty-${p.id}">1</span> کیلو
        <button onclick="changeQty(${p.id}, 1)">➕</button>
      </div>

      <button onclick="addToCart(${p.id})">افزودن</button>
    `;
    box.appendChild(div);
  });
}

function changeQty(id, delta) {
  const el = document.getElementById(`qty-${id}`);
  let v = parseInt(el.innerText);
  v += delta;
  if (v < 1) v = 1;
  el.innerText = v;
}

function addToCart(id) {
  const qty = parseInt(document.getElementById(`qty-${id}`).innerText);
  const p = products.find(x => x.id === id);

  cart.push({ ...p, qty });
  renderCart();
}

function renderCart() {
  const body = document.getElementById("cartBody");
  body.innerHTML = "";
  let total = 0;

  cart.forEach((c, i) => {
    const sum = c.qty * c.price;
    total += sum;

    body.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${c.name}</td>
        <td>${c.qty}</td>
        <td>${c.price}</td>
        <td>${sum}</td>
      </tr>
    `;
  });

  document.getElementById("total").innerText = total;
}
