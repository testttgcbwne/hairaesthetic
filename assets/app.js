const state = {
  cart: JSON.parse(localStorage.getItem("ha_cart") || "[]"),
  lang: localStorage.getItem("ha_lang") || "UA"
};

function saveCart(){
  localStorage.setItem("ha_cart", JSON.stringify(state.cart));
  syncBadges();
}

function syncBadges(){
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = state.cart.length;
}

function openCart(){
  const d = document.getElementById("drawer");
  if (d) d.classList.add("on");
  renderCart();
}
function closeCart(){
  const d = document.getElementById("drawer");
  if (d) d.classList.remove("on");
}

function addToCart(name, price){
  state.cart.push({name, price});
  saveCart();
  renderCart();
}

function removeItem(i){
  state.cart.splice(i,1);
  saveCart();
  renderCart();
}

function renderCart(){
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("cartTotal");
  if (!list || !totalEl) return;

  list.innerHTML = "";
  let total = 0;

  state.cart.forEach((it, idx) => {
    total += Number(it.price || 0);
    const div = document.createElement("div");
    div.className = "cartItem";
    div.innerHTML = `
      <div>
        <b>${it.name}</b>
        <div style="color:rgba(20,20,20,.55);margin-top:4px">€${it.price}</div>
      </div>
      <button class="btn" onclick="removeItem(${idx})">×</button>
    `;
    list.appendChild(div);
  });

  totalEl.textContent = total;
}

function applyLang(){
  localStorage.setItem("ha_lang", state.lang);
  const langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.textContent = state.lang;

  // Тут можно расширять перевод позже (по всем страницам)
  const tagline = document.getElementById("tagline");
  if (tagline) tagline.textContent = "Salon & Home Care";

  const consultBtn = document.getElementById("consultBtn");
  if (consultBtn && consultBtn.tagName === "A") {
    consultBtn.textContent = (state.lang === "UA") ? "Консультація" : "Consultation";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  syncBadges();
  applyLang();

  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      state.lang = (state.lang === "UA") ? "EN" : "UA";
      applyLang();
    });
  }
});
// ===== MENU DRAWER =====
function openMenu(){
  const d = document.getElementById('menuDrawer');
  if(d) d.classList.add('on');
}
function closeMenu(){
  const d = document.getElementById('menuDrawer');
  if(d) d.classList.remove('on');
}

// ===== LANG BUTTON IN MENU (optional sync) =====
(function syncSecondLangBtn(){
  const b1 = document.getElementById('langBtn');
  const b2 = document.getElementById('langBtn2');

  if(!b2) return;

  // set initial text same as main
  if(b1) b2.textContent = b1.textContent;

  b2.addEventListener('click', () => {
    // trigger existing logic if it exists
    if(b1) b1.click();
    // after toggle, sync label
    if(b1) b2.textContent = b1.textContent;
  });
})();
// ===== MOBILE MENU (drawer) =====
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const menuDrawer = document.getElementById('menuDrawer');
  const menuClose = document.getElementById('menuClose');
  const menuBackdrop = document.getElementById('menuBackdrop');

  if (!menuBtn || !menuDrawer || !menuClose || !menuBackdrop) {
    console.warn('Menu elements not found:', {
      menuBtn, menuDrawer, menuClose, menuBackdrop
    });
    return;
  }

  function openMenu() {
    menuDrawer.classList.add('on');
    document.documentElement.classList.add('noScroll');
    document.body.classList.add('noScroll');
  }

  function closeMenu() {
    menuDrawer.classList.remove('on');
    document.documentElement.classList.remove('noScroll');
    document.body.classList.remove('noScroll');
  }

  menuBtn.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuBackdrop.addEventListener('click', closeMenu);

  // закрытие по ESC (для компа/браузера)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();
// TEST: menu button wired
console.log('app.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menuBtn');
  const drawer = document.getElementById('menuDrawer');

  console.log('menuBtn:', !!btn, 'menuDrawer:', !!drawer);

  btn?.addEventListener('click', () => {
    console.log('menu clicked');
    drawer?.classList.add('on');
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const menuDrawer = document.getElementById('menuDrawer');
  const menuClose = document.getElementById('menuClose');
  const menuBackdrop = document.getElementById('menuBackdrop');

  if(!menuBtn || !menuDrawer) return;

  const open = () => menuDrawer.classList.add('on');
  const close = () => menuDrawer.classList.remove('on');

  menuBtn.addEventListener('click', open);
  menuClose?.addEventListener('click', close);
  menuBackdrop?.addEventListener('click', close);
});
