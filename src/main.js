let shop = document.getElementById('shop');
console.log(shop);



  //For storing selected items in the basket
  let basket = JSON.parse(localStorage.getItem("data")) || [] ;

let generateShop = () => {  //defining the function
    return shop.innerHTML = shopItemsData.map((x) => {
let { id, name, price, desc, img } = x;
let search = basket.find((x) => x.id === id) || []

      return `
      <div id=product-id-${id}class="item">
            <img src=${img}>
            <div class="details">
              <h3>${name}</h3>
              <p>${desc}</p>
              <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">
                  ${search.item === undefined ? 0 : search.item}
                  </div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
              </div>
            </div>
          </div>
      `
    })
    .join('');
};  //ES6 fxn-arrow function

generateShop(); //invoking the function

//increment and decrement function (Increasing and decreasing number of items selected)
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
  //console.log(basket)
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
  //console.log(basket)
 localStorage.setItem("data", JSON.stringify(basket))
};

let update = (id) => {
  let search = basket.find((x) => x.id === id) //quick search iff the item exists,the number will increase
  //console.log(search.item)
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

//to display the total number of selected items on the shopping cart icon
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount")  //selecting the icon and storing the selection inside a variable
  cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y, 0);  //using reduce function to add all the numbers
  
    //using reduce function to add all the numbers
}

calculation();  //Every time the application loads,a quick calculation is done


