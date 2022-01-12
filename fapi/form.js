// select elements
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");

// render products
function renderProdcuts() {
  products.forEach(function(product){
    productsEl.innerHTML += `
            <div class="item">
                <div class="item-img">
                    <img src="${product.imgSrc}" alt="${product.name}">
                </div>
                <div class="desc">
                    <div class="product-name">${product.name}</div>
                    <div class="price">${numExecution (product.price)} Kč</div>
                </div>
                <div class="add-to-cart" onclick="addToCart(${product.id})">
                    Do košíku
                </div>
                

            </div>
        `;
  });
}
renderProdcuts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}
 // show price in CZE 
function numExecution (num){
    var roundedNum = (Math.round(num * 100) / 100).toFixed(2);
    var numComma = roundedNum.toString().replace(".", ",");
    return numComma
  }

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
  });
 

  subtotalEl.innerHTML = `Mezisoučet: ${numExecution(totalPrice)}Kč`; 
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = "";
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <tr class="cart-item">
                <td class="cart-item-img" ><img src="${item.imgSrc}" alt="${item.name}"> </td>
                <td class="cart-item-name">${item.name}</td>
                <td class="unit-price">
                ${numExecution(item.price)}Kč
                </td>
                <td class="units">  
                  <div class="wrapper-of-units">   
                      <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                      <div class="number">${item.numberOfUnits}</div>
                      <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           

                  </div>
                </td>
                <td><div class="btn remove" onclick="removeItemFromCart(${item.id})"> Odebrat </div>
                </td>

        </tr>
      `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < 100) {
        numberOfUnits++;
      } 

    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}


// form validation
const form = document.getElementById("form");
const firstName = document.getElementById("fname");
const secondName = document.getElementById("sname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const adress = document.getElementById("adr");
const city = document.getElementById("city");
const zip = document.getElementById("zip");

form.addEventListener("submit", (e) => {
  let x = 0;

 const arrayValidationForm = [firstName, secondName, phone, adress, city, zip];
 arrayValidationForm.forEach(element => {
   validator(element);
 });
 
  validateNum(zip);
  validateNum(phone);

  if (!email.value.match(/\S+@\S+\.\S+/)){
    email.style.borderColor = "red";
    x++
  }
  else {
    email.style.borderColor = "initial"
  }

  // validate cart is empty 
  var tableRows = document.getElementById("cart-items").rows.length;
  if (tableRows == 0) {
    alert("Košík je prázdný!")
    x++
  }

  // prevent Default 
  if (x > 0) {
    e.preventDefault();
    }
  else {
      localStorage.setItem("firstName", firstName.value);
      localStorage.setItem("secondName", secondName.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("phone", phone.value);
      localStorage.setItem("adress", adress.value);
      localStorage.setItem("city", city.value);
      localStorage.setItem("zip", zip.value);
    }

  function validator(element) {
    if (element.value == "" || element == null){
        x ++;
        element.style.borderColor = "red";
        element.placeholder = "";
      }
    else {
        element.style.borderColor = "initial";
      }
    }

    function validateNum(element){
      const elementNum = parseInt(element.value, 10);
      if (isNaN(elementNum)){
        x ++;
        element.style.borderColor = "red";
        element.placeholder = "";
      }
      else {
        element.style.borderColor = "initial";  
      }
    }

})







