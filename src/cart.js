let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

//console.log(shopItemsData) //retrieving data from data.js

let basket = JSON.parse(localStorage.getItem("data")) || [] ;  //array which carries the all of our selected items products


//to display the total number of selected items on the shopping cart icon
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")  //selecting the icon and storing the selection inside a variable
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y, 0);  //using reduce function to add all the numbers
    
      //using reduce function to add all the numbers
  }
  
  calculation();  //Every time the application loads,a quick calculation is done




  let generateCartItems = () => {
if (basket.length !== 0){
    return shoppingCart.innerHTML = basket
    .map((x) =>{
        
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
        <div class="cart-item">
        <img width="60" src=${search.img} alt="" />
        <div class ="details">
          <div class ="title-price-x">
          <h4 class="title-price">
            <p>${search.name}</p>
            <p class="cart-item-price">$ ${search.price}</p>
          </h4>
          <i onclick="removeItem (${id})" class="bi bi-x-lg"></i>
          </div>
          
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div>

          <h3>$ ${item * search.price}</h3>
        </div>
        </div>
        `;
    }) .join("")// x targets the selected items one by one
    
}
else{
    shoppingCart.innerHTML = ``
    label.innerHTML = `
    <h2>Cart is empty</h2> 
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `
}
  }
  generateCartItems(); //invoking the function

  let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id) //passing x as an argument so that it checks all the objects one by one
  
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      })
    } else {
      search.item += 1;
    }
  
    //pushing the basket inside the local storage so that the browser can remember it what has been selected
    localStorage.setItem("data", JSON.stringify(basket))
    generateCartItems();
    update(selectedItem.id);
  };
  
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id) //passing x as an argument so that it checks all the objects one by one
  
    if (search === undefined) return;
   else if (search.item === 0) return; //it shouldn't go beyond zero items, return statement stops the process.
       else {
      search.item -= 1;
    }
    
    
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);  //selecting all the objects that has no zero on the item
    generateCartItems();
   localStorage.setItem("data", JSON.stringify(basket))
  };

  let update = (id) => {
    let search = basket.find((x) => x.id === id) //quick search iff the item exists,the number will increase
    //console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount()  //invoking the function so it can update the total amount on the total bill
  };

  let removeItem = (id) => {
let selectedItem = id;
//console.log(selectedItem.id)
basket = basket.filter((x) => x.id !== selectedItem.id) //whenever you click on the cross,the item will be removed from the basket cart and update the basket
generateCartItems();
totalAmount()  //invoking the function
calculation();
localStorage.setItem("data", JSON.stringify(basket))
  };

  //clearing the entire cart
  let clearCart = () => {
basket = []
generateCartItems()  //removing all the items from the cart
calculation();
  localStorage.setItem("data", JSON.stringify(basket))  //updating the local storage
}

  let totalAmount = ()=>{
    if (basket.length !== 0) {
      let amount = basket.map((x)=>{
        let {item, id } = x  //destructuring x
        let search = shopItemsData.find((y) => y.id === id) || []; //using the id to match the database
        return item * search.price;
      }).reduce((x, y) => x + y, 0)   //adding the totals together
      //console.log(amount);
      label.innerHTML = `
      <h2>Total Bill: $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    }
    else return
  }
  totalAmount()  //invoking the function


  