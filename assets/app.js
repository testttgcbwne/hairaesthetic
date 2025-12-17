const state = { cart: [], lang: 'UA' };

function scrollToId(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth'});
}

/* ===== CART ===== */
function openCart(){
  const d = document.getElementById('drawer');
  if(d) d.classList.add('on');
  renderCart();
}
function closeCart(){
  const d = document.getElementById('drawer');
  if(d) d.classList.remove('on');
}

function addToCart(name, price){
  state.cart.push({name, price});
  const c = document.getElementById('cartCount');
  if(c) c.textContent = state.cart.length;
  renderCart();
}
function removeItem(i){
  state.cart.splice(i,1);
  const c = document.getElementById('cartCount');
  if(c) c.textContent = state.cart.length;
  renderCart();
}
function renderCart(){
  const list = document.getElementById('cartList');
  const totalEl = document.getElementById('cartTotal');
  if(!list || !totalEl) return;

  list.innerHTML = '';
  let total = 0;

  state.cart.forEach((it, idx) => {
    total += it.price;
    const div = document.createElement('div');
    div.className = 'cartItem';
    div.innerHTML = `
      <div>
        <b>${it.name}</b>
        <div style="color:#6b6b6b;font-size:13px">€${it.price}</div>
      </div>
      <button class="btn" onclick="removeItem(${idx})">×</button>
    `;
    list.appendChild(div);
  });

  totalEl.textContent = total;
}

/* ===== LANG ===== */
const T = {
  UA:{
    lang:'UA',
    tagline:'Salon & Home Care',
    consultBtn:'Консультація',
    heroTitle:'Естетика волосся — догляд, що видно',
    heroDesc:'Салонний та домашній догляд. Каталог товарів, результати процедур та консультація.'
  },
  EN:{
    lang:'EN',
    tagline:'Salon & Home Care',
    consultBtn:'Consultation',
    heroTitle:'Hair aesthetic — visible care',
    heroDesc:'Salon & home care. Products, results and consultation.'
  }
};

function initLang(){
  const langBtn = document.getElementById('langBtn');
  if(!langBtn) return;

  langBtn.addEventListener('click',()=>{
    state.lang = state.lang === 'UA' ? 'EN' : 'UA';
    const L = T[state.lang];
    langBtn.textContent = L.lang;

    const tg = document.getElementById('tagline');
    const cb = document.getElementById('consultBtn');
    const ht = document.getElementById('heroTitle');
    const hd = document.getElementById('heroDesc');

    if(tg) tg.textContent = L.tagline;
    if(cb) cb.textContent = L.consultBtn;
    if(ht) ht.textContent = L.heroTitle;
    if(hd) hd.textContent = L.heroDesc;
  });
}

/* ===== INIT ===== */
window.addEventListener('DOMContentLoaded',()=>{
  const y = document.getElementById('y');
  if(y) y.textContent = new Date().getFullYear();
  initLang();
});
