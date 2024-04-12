let basket = JSON.parse(localStorage.getItem("data")) || [] ;

//to display the total number of selected items on the shopping cart icon
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount")  //selecting the icon and storing the selection inside a variable
  cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y, 0);  //using reduce function to add all the numbers
  
    //using reduce function to add all the numbers
}

calculation();  //Every time the application loads,a quick calculation is done


let calculation = () => {
  let cartIcon = document.getElementById("cartAmount") }