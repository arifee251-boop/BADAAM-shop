function toggleComments(id){
  const el = document.getElementById(`comments-${id}`);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
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
        <div class="comment-btn" onclick="toggleComments(${p.id})">💬</div>
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
