const products = [
  {id:1,category:'Гайды',icon:'🏦',name:'Гид по ВТБ',description:'Авторская инструкция и полезные подсказки.',price:199},
  {id:2,category:'Гайды',icon:'💬',name:'Гид по VK',description:'Подборка советов по использованию VK.',price:149},
  {id:3,category:'Гайды',icon:'💳',name:'Гид по Т-Банку',description:'Авторский справочный материал.',price:199},
  {id:4,category:'iPhone',icon:'🎨',name:'Пакет иконок iOS',description:'Набор иконок для оформления экрана.',price:249},
  {id:5,category:'iPhone',icon:'🌌',name:'Обои для iPhone',description:'Подборка обоев для смартфона.',price:99},
  {id:6,category:'Чек-листы',icon:'📋',name:'Чек-лист iPhone',description:'Удобный список полезных настроек.',price:129}
];
let category = 'Все';
let cart = [];
const money = n => `${n} ₽`;

function render() {
  const query = document.querySelector('#search').value.toLowerCase();
  const shown = products.filter(p =>
    (category === 'Все' || p.category === category) &&
    (p.name + ' ' + p.description).toLowerCase().includes(query)
  );
  document.querySelector('#productCount').textContent = `${shown.length} товаров`;
  document.querySelector('#products').innerHTML = shown.map(p => `
    <article class="product">
      <div class="art">${p.icon}</div><small>${p.category}</small>
      <h3>${p.name}</h3><p>${p.description}</p>
      <div class="product-bottom"><span class="price">${money(p.price)}</span>
      <button class="add" data-add="${p.id}">Добавить</button></div>
    </article>`).join('') || '<p>Ничего не найдено.</p>';
  document.querySelector('#cartCount').textContent = cart.reduce((s,x) => s+x.qty, 0);
  renderCart();
}
function renderCart() {
  document.querySelector('#cartItems').innerHTML = cart.map(x =>
    `<div class="cart-line"><span>${x.name} × ${x.qty}</span><b>${money(x.price*x.qty)}</b></div>`
  ).join('') || '<p>Корзина пока пуста.</p>';
  document.querySelector('#cartTotal').textContent =
    `Итого: ${money(cart.reduce((s,x) => s+x.price*x.qty, 0))}`;
}
document.querySelector('#categories').addEventListener('click', e => {
  if (!e.target.dataset.category) return;
  category = e.target.dataset.category;
  document.querySelectorAll('#categories button').forEach(b => b.classList.toggle('active', b === e.target));
  render();
});
document.querySelector('#products').addEventListener('click', e => {
  const id = Number(e.target.dataset.add);
  if (!id) return;
  const p = products.find(x => x.id === id);
  const item = cart.find(x => x.id === id);
  if (item) item.qty++; else cart.push({...p, qty:1});
  render();
});
document.querySelector('#search').addEventListener('input', render);
document.querySelector('#cartButton').onclick = () => document.querySelector('#cartPanel').classList.remove('hidden');
document.querySelector('#closeCart').onclick = () => document.querySelector('#cartPanel').classList.add('hidden');
document.querySelector('#checkout').onclick = () => alert('Это демонстрационная версия. Оплата и оформление заказов ещё не подключены.');
render();
