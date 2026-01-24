let lang = 'fa';
let cart = [];

const products = [
  {id:1, name:"مغز بادام", price:250},
  {id:2, name:"کشمش", price:120},
  {id:3, name:"انجیر خشک", price:300}
];

function setLang(l){
  lang = l;
  document.getElementById('lang-overlay').style.display = 'none';
  document.body.dir = (l === 'en') ? 'ltr' : 'rtl';
  renderProducts();
}

function renderProducts(){
  const box = document.getElementById('products');
  box.innerHTML = '';
  products.forEach(p=>{
    box.innerHTML += `
      <div class="product">
        <img>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p>${p.price} ${lang==='en'?'AFS':'افغانی'}</p>
          <div class="qty-box">
            <button onclick="add(${p.id},-1)">−</button>
            <span id="q-${p.id}">0</span>
            <button onclick="add(${p.id},1)">+</button>
            <button onclick="addCart(${p.id})">افزودن</button>
          </div>
        </div>
      </div>`;
  });
}

function add(id,val){
  let el = document.getElementById(`q-${id}`);
  let q = Math.max(0, Number(el.innerText)+val);
  el.innerText = q;
}

function addCart(id){
  let q = Number(document.getElementById(`q-${id}`).innerText);
  if(!q) return;
  let p = products.find(x=>x.id===id);
  cart.push({...p, qty:q});
  renderInvoice();
}

function renderInvoice(){
  let body = document.getElementById('invoice-body');
  body.innerHTML = '';
  let total = 0;
  cart.forEach((c,i)=>{
    let sum = c.qty*c.price;
    total += sum;
    body.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${c.name}</td>
        <td>${c.qty} ${lang==='en'?'Kgr':'کیلو'}</td>
        <td>${c.price}</td>
        <td>${sum}</td>
      </tr>`;
  });
  document.getElementById('total').innerText = total;
}
