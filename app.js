let language = 'fa';
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

function setLanguage(lang){
  language = lang;
  document.getElementById('language-overlay').style.display='none';
  renderProducts();
  renderCart();
}

function renderProducts(){
  const c = document.getElementById('products-container');
  c.innerHTML = '';
  products.forEach(p=>{
    c.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>${p.price} افغانی / کیلو</p>
        <input type="number" min="0.5" step="0.5" value="1" id="qty-${p.id}">
        <button onclick="addToCart(${p.id})">افزودن</button>
        <div style="cursor:pointer" onclick="toggleComments(${p.id})">💬 نظرات</div>
        <div id="comments-${p.id}" style="display:none;">
          <input placeholder="نام" id="rn-${p.id}">
          <input placeholder="نظر" id="rt-${p.id}">
          <button onclick="addReview(${p.id})">ثبت</button>
          <div id="reviews-list-${p.id}"></div>
        </div>
      </div>
    `;
  });
}

function toggleComments(id){
  const el=document.getElementById(`comments-${id}`);
  el.style.display = el.style.display==='none'?'block':'none';
}

function addToCart(id){
  const qty=parseFloat(document.getElementById(`qty-${id}`).value);
  const prod=products.find(p=>p.id===id);
  const exist=cart.find(c=>c.id===id);
  if(exist){exist.qty+=qty;}else{cart.push({...prod,qty});}
  renderCart();
}

function renderCart(){
  const body=document.getElementById('cart-body');
  body.innerHTML='';
  let total=0;
  cart.forEach((c,i)=>{
    const amount=c.price*c.qty;
    total+=amount;
    body.innerHTML+=`<tr>
      <td>${i+1}</td><td>${c.name}</td><td>${c.qty}</td><td>${c.price}</td><td>${amount}</td>
    </tr>`;
  });
  document.getElementById('cart-total').innerText=total;
}

// پرداخت آنلاین
function showPaymentOptions(){
  const type=document.getElementById('payment-type').value;
  document.getElementById('online-options').style.display=type==='online'?'block':'none';
  updatePaymentDetails();
}

function updatePaymentDetails(){
  const method=document.getElementById('online-method').value;
  const total=cart.reduce((sum,c)=>sum+c.price*c.qty,0);
  let details='';
  switch(method){
    case 'hesabpay': details=`شماره حساب: 0798963007، مبلغ: ${total} افغانی`; break;
    case 'ormpay': details=`شماره حساب: 0798963007، مبلغ: ${total} افغانی`; break;
    case 'automapay': details=`شماره حساب: 0778609717، مبلغ: ${total} افغانی`; break;
    case 'tether': 
      const rate=150; 
      const tAmount=(total/rate).toFixed(4);
      details=`آدرس والت تتر: 0x9a5c21c1bf5596885f72431d6d1ff46fa59e5252، مبلغ تقریبی: ${tAmount} USDT`; 
      break;
    case 'binance': details=`بایننس آیدی: 472363873، مبلغ: ${total} افغانی`; break;
  }
  document.getElementById('payment-details').innerText=details;
}

// ثبت سفارش
function submitOrder(){
  const name=document.getElementById('customer-name').value;
  const addr=document.getElementById('customer-address').value;
  const phone=document.getElementById('customer-phone').value;
  const payment=document.getElementById('payment-type').value;
  const onlineMethod=document.getElementById('online-method').value;

  let msg=`سفارش جدید:\nنام: ${name}\nآدرس: ${addr}\nشماره: ${phone}\n\nسبد خرید:\n`;
  cart.forEach((c,i)=>{msg+=`${i+1}. ${c.name} - ${c.qty} کیلو - ${c.price*c.qty} افغانی\n`;});
  const total=cart.reduce((sum,c)=>sum+c.price*c.qty,0);
  msg+=`جمع کل: ${total} افغانی\n\n`;

  if(payment==='online'){
    msg+=`پرداخت آنلاین: ${onlineMethod}\n`;
    msg+=document.getElementById('payment-details').innerText;
  } else {msg+='پرداخت نقدی هنگام تحویل';}

  // واتساپ
  const wa=`https://wa.me/93798963007?text=${encodeURIComponent(msg)}`;
  window.open(wa,'_blank');

  // تلگرام
  const tg=`https://t.me/BADAMMdriedfruitbot?text=${encodeURIComponent(msg)}`;
  window.open(tg,'_blank');

  alert('سفارش ارسال شد!');
}

// نظرات کاربران
function addReview(id){
  const n=document.getElementById(`rn-${id}`).value;
  const t=document.getElementById(`rt-${id}`).value;
  if(!reviews[id]) reviews[id]=[];
  reviews[id].push({name:n,text:t});
  renderReviews(id);
}

function renderReviews(id){
  const container=document.getElementById(`reviews-list-${id}`);
  container.innerHTML='';
  if(reviews[id]){
    reviews[id].forEach(r=>{
      container.innerHTML+=`<div><b>${r.name}:</b> ${r.text}</div>`;
    });
  }
}
