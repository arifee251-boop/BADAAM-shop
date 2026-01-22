const products = [
  { id: 1, name: "مغز بادام فی‌کیلو", price: 250 },
  { id: 2, name: "بادام کاغذی ستربایی فی‌کیلو", price: 250 },
  { id: 3, name: "بادام کاغذی مخملی فی‌کیلو", price: 250 },
  { id: 4, name: "بادام کاغذی پسته‌ای فی‌کیلو", price: 250 },
  { id: 5, name: "بادام سنگی با پوست فی‌کیلو", price: 250 },
  { id: 6, name: "بادام کاغذی شاخ بُز فی‌کیلو", price: 250 },
  { id: 7, name: "کشمش فی‌کیلو", price: 120 },
  { id: 8, name: "خرمای خُشک", price: 180 },
  { id: 9, name: "انجیر خُشک فی‌کیلو", price: 300 },
  { id: 10, name: "کِشته زردآلو(برگی) فی‌کیلو", price: 220 },
  { id: 11, name: "کِشته زردآلو خسته‌دار فی‌کیلو", price: 220 },
  { id: 12, name: "کِشته غُلینگ خسته‌دار فی‌کیلو", price: 250 }
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
      <p>قیمت: ${p.price} افغانی فی‌کیلو</p>
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
  alert(`${p.name} اضافه شد (${p.quantity} کیلو)`);
}

document.getElementById("preview-order").addEventListener("click", () => {
  if(cart.length === 0) {
    alert("سبد خرید خالی است!");
    return;
  }
  let items = cart.map(x => `${x.name} : ${x.quantity} کیلو - ${x.price*x.quantity} افغانی`).join("\n");
  if(confirm("پیش‌نمایش سفارش:\n\n"+items+"\n\nادامه می‌دهی؟")) {
    document.getElementById("order-form").style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
  }
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let phone = document.getElementById("phone").value;
  let payment = document.getElementById("payment").value;

  let orderSummary = `سفارش ثبت شد ✅\n\nنام: ${name}\nآدرس: ${address}\nتلفن: ${phone}\nپرداخت: ${payment}\n\nمحصولات:\n` + 
    cart.map(x => `${x.name} : ${x.quantity} کیلو`).join("\n");

  alert(orderSummary);

  // پاک کردن سبد خرید
  cart = [];
  renderProducts();
  document.getElementById("order-form").style.display = "none";
});

renderProducts();
