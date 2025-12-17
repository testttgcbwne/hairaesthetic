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
