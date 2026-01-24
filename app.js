let language='fa',cart=[];
const products=[
{id:1,name:"مغز بادام",price:250,desc:"مغز بادام تازه و اعلا",images:["img1.jpg","img2.jpg"]},
{id:2,name:"بادام کاغذی ستربایی",price:250,desc:"بادام با پوست نازک",images:["img3.jpg","img4.jpg"]},
{id:3,name:"بادام کاغذی مخملی",price:250,desc:"بادام خوش‌طعم",images:["img5.jpg"]},
{id:4,name:"بادام کاغذی پسته‌ای",price:250,desc:"بادام صادراتی",images:["img6.jpg"]},
{id:5,name:"بادام سنگی",price:250,desc:"بادام محلی",images:["img7.jpg"]},
{id:6,name:"بادام شاخ بز",price:250,desc:"بادام خاص",images:["img8.jpg"]},
{id:7,name:"کشمش",price:120,desc:"کشمش شیرین",images:["img9.jpg"]},
{id:8,name:"خرمای خشک",price:180,desc:"خرمای مرغوب",images:["img10.jpg"]},
{id:9,name:"انجیر خشک",price:300,desc:"انجیر اعلا",images:["img11.jpg"]},
{id:10,name:"کشته زردآلو برگی",price:220,desc:"زردآلو خشک",images:["img12.jpg"]},
{id:11,name:"کشته زردآلو هسته‌دار",price:220,desc:"زردآلو محلی",images:["img13.jpg"]},
{id:12,name:"کشته غلینگ",price:250,desc:"محصول سنتی",images:["img14.jpg"]}
];

function setLanguage(lang){
language=lang;
document.getElementById('language-overlay').style.display='none';
document.body.dir=(lang==='en')?'ltr':'rtl';
renderProducts();
renderInvoice();
}

function renderProducts(){
const box=document.getElementById('products-container');box.innerHTML='';
products.forEach(p=>{
box.innerHTML+=`
<div class="product">
<img src="${p.images[0]}" onclick="openProductPage(${p.id})">
<div class="product-info">
<h3>${p.name}</h3>
<p>${p.price} ${language==='en'?'AFS':'افغانی'}</p>
<div class="qty-box">
<button onclick="changeQty(${p.id},-1)">−</button>
<span id="qty-${p.id}">1</span>
<button onclick="changeQty(${p.id},1)">+</button>
<button class="add-cart" onclick="addToCart(${p.id})">افزودن به سبد خرید</button>
</div>
</div>
</div>`});
}

function changeQty(id,val){const el=document.getElementById(`qty-${id}`);el.innerText=Math.max(1,Number(el.innerText)+val)}

function addToCart(id){
const qty=Number(document.getElementById(`qty-${id}`).innerText);
const p=products.find(x=>x.id===id);
cart.push({...p,qty});
renderInvoice();
}

function renderInvoice(){
const body=document.getElementById('invoice-body');body.innerHTML='';let total=0;
cart.forEach((c,i)=>{let sum=c.price*c.qty;total+=sum;body.innerHTML+=`<tr><td>${i+1}</td><td>${c.name}</td><td>${c.qty} ${language==='en'?'Kgr':'کیلو'}</td><td>${c.price}</td><td>${sum}</td></tr>`});
document.getElementById('invoice-total').innerText=total;
}

function confirmInvoice(){document.getElementById('order-section').style.display='block';alert('فاکتور تایید شد')}

function showPaymentOptions(){
const type=document.getElementById('payment-type').value;
document.getElementById('online-options').style.display=(type==='online')?'block':'none';
updatePaymentDetails();
}

function updatePaymentDetails(){
const method=document.getElementById('online-method').value;
const total=cart.reduce((sum,c)=>sum+c.price*c.qty,0);
let details='';
switch(method){
case 'hesabpay':details=`شماره حساب: 0798963007، مبلغ: ${total} افغانی`;break;
case 'ormpay':details=`شماره حساب: 0798963007، مبلغ: ${total} افغانی`;break;
case 'automapay':details=`شماره حساب: 0778609717، مبلغ: ${total} افغانی`;break;
case 'tether':const rate=150;const tAmount=(total/rate).toFixed(4);details=`آدرس والت تتر: 0x9a5c21c1bf5596885f72431d6d1ff46fa59e5252، مبلغ تقریبی: ${tAmount} USDT`;break;
case 'binance':details=`بایننس آیدی: 472363873، مبلغ: ${total} افغانی`;break;}
document.getElementById('payment-details').innerText=details;
}

function submitOrder(){
const name=document.getElementById('customer-name').value;
const address=document.getElementById('customer-address').value;
const phone=document.getElementById('customer-phone').value;
const payment=document.getElementById('payment-type').value;
const onlineMethod=document.getElementById('online-method').value;

let message=`سفارش جدید:\nنام: ${name}\nآدرس: ${address}\nشماره: ${phone}\n\nسبد خرید:\n`;
cart.forEach((c,idx)=>{message+=`${idx+1}. ${c.name} - ${c.qty} کیلو - ${c.price} - ${c.price*c.qty}\n`;});
const total=cart.reduce((sum,c)=>sum+c.price*c.qty,0);
message+=`جمع کل: ${total} افغانی\n\n`;

if(payment==='online'){message+=`پرداخت آنلاین: ${onlineMethod}\n`;message+=document.getElementById('payment-details').innerText}
else{message+='پرداخت نقدی هنگام تحویل';}

window.open(`https://wa.me/93798963007?text=${encodeURIComponent(message)}`,'_blank');
window.open(`https://t.me/BADAMMdriedfruitbot?text=${encodeURIComponent(message)}`,'_blank');
alert('سفارش ارسال شد!');
}

// صفحه محصول کامل
function openProductPage(id){
document.getElementById('products-container').style.display='none';
document.getElementById('product-page').style.display='block';
const p=products.find(x=>x.id===id);
const container=document.getElementById('product-details');
container.innerHTML=`
<h2>${p.name}</h2>
<p>${p.price} ${language==='en'?'AFS':'افغانی'}</p>
<p>${p.desc}</p>
<div class="gallery">${p.images.map(i=>`<img src="${i}" style="width:100px;margin:5px;">`).join('')}</div>
<div class="qty-box">
<button onclick="changeQty(${p.id},-1)">−</button>
<span id="qty-${p.id}">1</span>
<button onclick="changeQty(${p.id},1)">+</button>
<button class="add-cart" onclick="addToCart(${p.id})">افزودن به سبد خرید</button>
</div>
`;

}

function closeProductPage(){
document.getElementById('product-page').style.display='none';
document.getElementById('products-container').style.display='flex';
}
