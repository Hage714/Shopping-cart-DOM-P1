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
        console.log(x);
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
          <i class="bi bi-x-lg"></i>
          </div>

          <div class ="cart-buttons"></div>

          <h3></h3>
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