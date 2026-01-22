// ===== داده‌ها =====
let language = 'fa'; // پیش‌فرض
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
let reviews = {};

// ===== انتخاب زبان =====
function setLanguage(lang){
  language = lang;
  document.getElementById('language-overlay').style.display = 'none';
  renderProducts();
  renderCart();
}

// ===== نمایش محصولات =====
function renderProducts(){
  const container = document.getElementById('products-container');
  container.innerHTML = '';
  products.forEach((p, idx) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>قیمت: ${p.price} افغانی</p>
      <label>تعداد (کیلو): </label>
      <input type="number" id="qty-${p.id}" value="1" min="1">
      <button onclick="addToCart(${p.id})">افزودن به سبد</button>
      <div id="reviews-${p.id}">
        <h4>نظرات</h4>
        <div id="reviews-list-${p.id}"></div>
        <input type="text" id="review-name-${p.id}" placeholder="نام">
        <input type="text" id="review-text-${p.id}" placeholder="نظر">
        <button onclick="addReview(${p.id})">ثبت نظر</button>
      </div>
    `;
    container.appendChild(div);
    renderReviews(p.id);
  });
}

// ===== افزودن به سبد خرید =====
function addToCart(id){
  const qty = parseInt(document.getElementById(`qty-${id}`).value);
  const product = products.find(p=>p.id===id);
  const existing = cart.find(c=>c.id===id);
  if(existing){ existing.qty += qty; } 
  else { cart.push({...product, qty}); }
  renderCart();
}

// ===== نمایش سبد خرید =====
function renderCart(){
  const body = document.getElementById('cart-body');
  body.innerHTML = '';
  let total = 0;
  cart.forEach((c, idx)=>{
    const row = document.createElement('tr');
    const amount = c.price * c.qty;
    total += amount;
    row.innerHTML = `<td>${idx+1}</td><td>${c.name}</td><td>${c.qty}</td><td>${c.price}</td><td>${amount}</td>`;
    body.appendChild(row);
  });
  document.getElementById('cart-total').innerText = total;
}

// ===== پرداخت آنلاین =====
function showPaymentOptions(){
  const type = document.getElementById('payment-type').value;
  document.getElementById('online-options').style.display = type==='online'?'block':'none';
  updatePaymentDetails();
}

function updatePaymentDetails(){
  const method = document.getElementById('online-method').value;
  const total = cart.reduce((sum,c)=>sum+c.price*c.qty,0);
  let details = '';
  switch(method){
    case 'hesabpay': details = `شماره حساب: 0798963007، مبلغ: ${total} افغانی`; break;
    case 'ormpay': details = `شماره حساب: 0798963007، مبلغ: ${total} افغانی`; break;
    case 'automapay': details = `شماره حساب: 0778609717، مبلغ: ${total} افغانی`; break;
    case 'tether': 
      const rate = 150; // نرخ تقریبی افغانی → تتر
      const tAmount = (total/rate).toFixed(4);
      details = `آدرس والت تتر: 0x9a5c21c1bf5596885f72431d6d1ff46fa59e5252، مبلغ تقریبی: ${tAmount} USDT`;
      break;
    case 'binance':
      details = `بایننس آیدی: 472363873، مبلغ: ${total} افغانی`;
      break;
  }
  document.getElementById('payment-details').innerText = details;
}

// ===== ثبت سفارش و ارسال به تلگرام و واتساپ =====
function submitOrder(){
  const name = document.getElementById('customer-name').value;
  const address = document.getElementById('customer-address').value;
  const phone = document.getElementById('customer-phone').value;
  const payment = document.getElementById('payment-type').value;
  const onlineMethod = document.getElementById('online-method').value;

  let message = `سفارش جدید:\nنام: ${name}\nآدرس: ${address}\nشماره: ${phone}\n\nسبد خرید:\n`;
  cart.forEach((c,idx)=>{message += `${idx+1}. ${c.name} - ${c.qty} کیلو - ${c.price} افغانی - ${c.price*c.qty}\n`;});
  const total = cart.reduce((sum,c)=>sum+c.price*c.qty,0);
  message += `جمع کل: ${total} افغانی\n\n`;

  if(payment==='online'){
    message += `پرداخت آنلاین: ${onlineMethod}\n`;
    message += document.getElementById('payment-details').innerText;
  } else { message += 'پرداخت نقدی هنگام تحویل'; }

  // لینک واتساپ
  const waLink = `https://wa.me/93798963007?text=${encodeURIComponent(message)}`;
  window.open(waLink, '_blank');

  // لینک تلگرام
  const tgLink = `https://t.me/BADAMMdriedfruitbot?text=${encodeURIComponent(message)}`;
  window.open(tgLink, '_blank');

  alert('سفارش ارسال شد!');
}

// ===== نظرات کاربران =====
function addReview(id){
  const rName = document.getElementById(`review-name-${id}`).value;
  const rText = document.getElementById(`review-text-${id}`).value;
  if(!reviews[id]) reviews[id]=[];
  reviews[id].push({name: rName, text: rText});
  renderReviews(id);
}

function renderReviews(id){
  const container = document.getElementById(`reviews-list-${id}`);
  container.innerHTML = '';
  if(reviews[id]){
    reviews[id].forEach(r=>{
      const div = document.createElement('div');
      div.innerHTML = `<b>${r.name}:</b> ${r.text}`;
      container.appendChild(div);
    });
  }
}

// ===== ارسال پیام تماس با ما =====
function sendContactMessage(){
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const text = document.getElementById('contact-message').value;
  alert(`پیام شما ارسال شد!\nنام: ${name}\nایمیل: ${email}\nپیام: ${text}`);
}
