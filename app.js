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

// انتخاب زبان
function setLanguage(lang){
  language=lang;
  document.getElementById('language-overlay').style.display='none';
  renderProducts();
  renderCart();
}

// نمایش محصولات با دکمه کم و زیاد
function renderProducts(){
  const c=document.getElementById('products-container');
  c.innerHTML='';
  products.forEach(p=>{
    c.innerHTML+=`
      <div class="product">
        <h3>${p.name}</h3>
        <p>${p.price} افغانی / کیلو</p>
        <div>
          <button onclick="changeQty(${p.id},-0.5)">-</button>
          <input type="number" id="qty-${p.id}" value="1" min="0.5" step="0.5">
          <button onclick="changeQty(${p.id},0.5)">+</button>
        </div>
        <button onclick="addToCart(${p.id})">افزودن به سبد</button>
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

function changeQty(id,val){
  const el=document.getElementById(`qty-${id}`);
  let newVal=parseFloat(el.value)+val;
  if(newVal<0.5)newVal=0.5;
  el.value=newVal;
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

// نمایش سبد خرید / فاکتور
function renderCart(){
  const body=document.getElementById('cart-body');
  body.innerHTML='';
  let total=0;
  const rtl=(language==='fa'||language==='ps');
  body.parentElement.className=rtl?'rtl':'ltr';
  cart.forEach((c,i)=>{
    const amount=c.price*c.qty;
    total+=amount;
    const qtyUnit=(language==='en')?'Kgr':'کیلو';
    const priceUnit=(language==='en')?'AFS':'افغانی';
    body.innerHTML+=`<tr>
      <td>${i+1}</td><td>${c.name}</td><td>${c.qty} ${qtyUnit}</td><td>${c.price} ${priceUnit}</td><td>${amount} ${priceUnit}</td>
    </tr>`;
  });
  document.getElementById('cart-total').innerText=total + ((language==='en')?' AFS':' افغانی');
}

// بقیه کدهای پرداخت آنلاین، نظرات و ارسال سفارش همان نسخه قبل بدون تغییر
