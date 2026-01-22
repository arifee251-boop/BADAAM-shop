// --- لیست محصولات ---
const products = [
  { id: 1, name: { fa:"مغز بادام", ps:"بادام مغز", en:"Almond Kernels" }, price: 250 },
  { id: 2, name: { fa:"بادام کاغذی ستربایی", ps:"بادام کاغذی ستربایی", en:"Star Paper Almond" }, price: 250 },
  { id: 3, name: { fa:"بادام کاغذی مخملی", ps:"بادام کاغذی مخملی", en:"Velvet Paper Almond" }, price: 250 },
  { id: 4, name: { fa:"بادام کاغذی پسته‌ای", ps:"بادام کاغذی پسته‌ای", en:"Pistachio Paper Almond" }, price: 250 },
  { id: 5, name: { fa:"بادام سنگی با پوست", ps:"بادام سنگی پوستدار", en:"Stone Almond with Skin" }, price: 250 },
  { id: 6, name: { fa:"بادام کاغذی شاخ بُز", ps:"بادام کاغذی شاخ بز", en:"Goat Horn Paper Almond" }, price: 250 },
  { id: 7, name: { fa:"کشمش", ps:"کشمش", en:"Raisins" }, price: 120 },
  { id: 8, name: { fa:"خرمای خُشک", ps:"خرما خشک", en:"Dry Dates" }, price: 180 },
  { id: 9, name: { fa:"انجیر خُشک", ps:"انجیر خشک", en:"Dry Figs" }, price: 300 },
  { id: 10, name: { fa:"کِشته زردآلو(برگی)", ps:"زردآلو برگی", en:"Apricot Leaves" }, price: 220 },
  { id: 11, name: { fa:"کِشته زردآلو خسته‌دار", ps:"زردآلو خسته‌دار", en:"Apricot with Kernel" }, price: 220 },
  { id: 12, name: { fa:"کِشته غُلینگ خسته‌دار", ps:"غولینگ خسته‌دار", en:"Guling with Kernel" }, price: 250 }
];

let cart = [];
let lang = "fa"; // پیش فرض

// --- ترجمه متن‌های سایت ---
const texts = {
  fa: {
    cart: "سبد خرید / فاکتور",
    number: "شماره",
    product: "نام محصول",
    quantity: "مقدار (کیلو)",
    price: "فی کیلو",
    amount: "مبلغ",
    total: "جمع کل",
    form: "فرم ثبت سفارش",
    name: "نام و نام خانوادگی:",
    address: "آدرس:",
    phone: "شماره تماس:",
    payment: "نوع پرداخت:",
    cash: "نقدی",
    card: "کارت به کارت",
    submit: "ثبت سفارش"
  },
  ps: {
    cart: "د پیرود فاکتور",
    number: "شمېره",
    product: "د محصول نوم",
    quantity: "مقدار (کیلو)",
    price: "په کیلو نرخ",
    amount: "مقدار",
    total: "ټول",
    form: "د فرمایش فورم",
    name: "نوم او تخلص:",
    address: "پته:",
    phone: "د تماس شمېره:",
    payment: "د تادیې ډول:",
    cash: "نقد",
    card: "کارت"
  },
  en: {
    cart: "Cart / Invoice",
    number: "No.",
    product: "Product Name",
    quantity: "Quantity (kg)",
    price: "Price/kg",
    amount: "Amount",
    total: "Total",
    form: "Order Form",
    name: "Full Name:",
    address: "Address:",
    phone: "Phone:",
    payment: "Payment Method:",
    cash: "Cash",
    card: "Card",
    submit: "Submit Order"
  }
};

// --- انتخاب زبان ---
function setLanguage(selected) {
  lang = selected;
  document.getElementById("language-selection").style.display = "none";
  document.getElementById("main-site").style.display = "block";
  renderProducts();
  renderCartTable();
  updateTexts();
}

function updateTexts() {
  const t = texts[lang];
  document.getElementById("cart-title").innerText = t.cart;
  document.getElementById("th-number").innerText = t.number;
  document.getElementById("th-product").innerText = t.product;
  document.getElementById("th-quantity").innerText = t.quantity;
  document.getElementById("th-price").innerText = t.price;
  document.getElementById("th-amount").innerText = t.amount;
  document.getElementById("total-label").innerText = t.total;

  document.getElementById("form-title").innerText = t.form;
  document.getElementById("label-name").innerText = t.name;
  document.getElementById("label-address").innerText = t.address;
  document.getElementById("label-phone").innerText = t.phone;
  document.getElementById("label-payment").innerText = t.payment;
  document.getElementById("opt-cash").innerText = t.cash;
  document.getElementById("opt-card").innerText = t.card;
  document.getElementById("submit-order").innerText = t.submit;
}

// --- نمایش محصولات ---
function renderProducts() {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";
  products.forEach(p => {
    if (!p.quantity) p.quantity = 1;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <h3>${p.name[lang]}</h3>
      <p>${texts[lang].price}: ${p.price} افغانی</p>
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

// --- کم/زیاد کردن کیلو ---
function changeQuantity(id, delta) {
  let p = products.find(x => x.id === id);
  p.quantity = Math.max(0.25, (p.quantity + delta).toFixed(2));
  document.getElementById(`qty-${id}`).innerText = p.quantity;
}

// --- افزودن به سبد خرید ---
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

// --- رندر فاکتور ---
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
      <td>${item.name[lang]}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
      <td>${amount}</td>
    `;
    tbody.appendChild(tr);
  });
  document.getElementById("total-amount").innerText = total;
}

// --- نمایش فرم سفارش ---
document.getElementById("show-order-form").addEventListener("click", () => {
  if(cart.length === 0) {
    alert("سبد خرید خالی است!");
    return;
  }
  document.getElementById("order-form").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
});

// --- ثبت سفارش ---
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let phone = document.getElementById("phone").value;
  let payment = document.getElementById("payment").value;

  let orderSummary = `${texts[lang].form} ✅\n\n${texts[lang].name} ${name}\n${texts[lang].address} ${address}\n${texts[lang].phone} ${phone}\n${texts[lang].payment} ${payment}\n\nمحصولات:\n` +
    cart.map(x => `${x.name[lang]} : ${x.quantity} کیلو - ${x.price*x.quantity}`).join("\n") +
    `\n\n${texts[lang].total}: ${cart.reduce((sum, x)=> sum + x.price*x.quantity,0)}`;

  alert(orderSummary);

  cart = [];
  renderProducts();
  renderCartTable();
  document.getElementById("order-form").style.display = "none";
});
