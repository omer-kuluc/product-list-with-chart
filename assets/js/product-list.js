let desserts = [
  {

      "name": "Waffle with Berries",

      "category": "Waffle",

      "price": "$6.50",

      "image" : "/assets/img/waffle.png"
  },
  {

    "name": "Vanilla Bean Crème Brûlée",

    "category": "Crème Brûlée",

    "price": "$7.00",

    "image" : "/assets/img/creme-brulee.png"


  },

  {

    "name": "Macaron Mix of Five",

    "category": "Macaron",

    "price": "$8.00",

    "image" : "/assets/img/macaron.png"



  },

  {

    "name": "Classic Tiramisu",

    "category": "Tiramisu",

    "price": "$5.50",

    "image" : "/assets/img/tiramisu.png"



  },

  {

    "name": "Pistachio Baklava",

    "category": "Baklava",

    "price": "$4.00",

    "image" : "/assets/img/baklava.png"



  },

  {

    "name": "Lemon Meringue Pie",

    "category": "Pie",

    "price": "$5.00",

    "image" : "/assets/img/lemon-pie.png"



  }, 

  {

    "name": "Red Velvet Cake",

    "category": "Cake",

    "price": "$4.50",

    "image" : "/assets/img/red-velvet.png"



  }, 


  {

    "name": "Salted Caramel Brownie",

    "category": "Brownie",

    "price": "$5.50",

    "image" : "/assets/img/brownie.png"



  }, 

  {
  
    "name": "Vanilla Panna Cotta",
  
    "category": "Panna Cotta",
  
    "price": "$6.50",

    "image" : "/assets/img/panna-cotta.png"


  
  },

];


for (const dessert of desserts) {
  dessertsList.innerHTML +=
  `<li class="dessert-card">
      <div class="card-inner">
    <img class="dessert-image" src= ${dessert.image} alt="xxx">
    <button class="add-btn" data-isim = "${dessert.name}"> <img src="/assets/img/shopping-car.svg" alt="">Add to cart </button>

    </div>
    <h3 class="category-name">${dessert.category}</h3>
    <h4 class="dessert-name">${dessert.name}</h4>
    <p class = "price">${dessert.price}</p>
   </li>`

}

const addBtns = document.querySelectorAll('.add-btn');

let orders = [];

for (const btn of addBtns) {
  btn.addEventListener('click',handleAddButtons);
}

function handleAddButtons(e) {
  e.stopPropagation();
  const dessertName = e.target.dataset.isim || e.target.parentElement.dataset.isim;
  let searchedOrder = orders.find (order => order.name === dessertName);

  if(searchedOrder) {
    searchedOrder.quantity++;
  }
  else {
    orders.push({
      name : dessertName,
      quantity : 1
    });
  }

  renderOrders();

}

let totalQuantity = 0;
let totalPrice = 0;

const dessertCounter = document.querySelector('.dessert-counter');

const fullCart = document.querySelector('.full-cart');
fullCart.classList.add('d-none');

const emptyCart = document.querySelector('.empty-cart');

const totalOrderPrice = document.querySelector('.total-order-price');

const orderList = document.querySelector('.order-list');

function renderOrders() {
  totalQuantity = 0;
  totalPrice = 0;
  dessertCounter.innerText = '';
  totalOrderPrice.innerText = '';
  orderList.innerHTML = '';

  for (const order of orders) {
    // console.log(order);
   totalQuantity += Number(order.quantity);
   let dessert = desserts.find(d => d.name === order.name);
   const perPrice = Number(dessert.price.slice(1));
   const totalPerPrice = Number((perPrice * order.quantity).toFixed(2)); 
   totalPrice += totalPerPrice;
    
   orderList.innerHTML+= `
      <li class="order-cart">
        <div class="order-info">
          <h4>${order.name}</h4>
          <div class="sub-info">
            <span class="quantity-span">${order.quantity}x</span>
            <div class="price">
              <span class="orjPrice">@${dessert.price}</span>
              <span class="lastPrice">$${totalPerPrice}</span>
            </div>
          </div>
        </div>
        <div class="deleteBtn" data-name = "${order.name}">
          <img src="/assets/img/remove-btn.svg" alt="Remove Button Icon">
        </div>
      </li>
    `;
  }

  dessertCounter.innerText = totalQuantity;
  totalOrderPrice.innerText = `$${totalPrice}`

  const dltBtns = document.querySelectorAll('.deleteBtn');
  for (const btn of dltBtns) {
   btn.addEventListener('click', handleDeleteButtons);   
  }

  if(dessertCounter.innerText == 0) {
    fullCart.classList.remove('d-block');
    emptyCart.classList.remove('d-none');
    emptyCart.classList.add('d-block');
  }
  else {
    fullCart.classList.add('d-block');
    emptyCart.classList.remove('d-block');
    emptyCart.classList.add('d-none');
  }

}


function handleDeleteButtons() {
  let dessertIndex = -1;

  for(let i = 0; i<orders.length; i++) {
    if(orders[i].name == this.dataset.name) {
      dessertIndex = i;
    }
  }

  orders.splice(dessertIndex,1);
  this.parentElement.remove();
  renderOrders();
}