
var firstName = localStorage.getItem("firstName");
var secondName = localStorage.getItem("secondName");
var email = localStorage.getItem("email");
var phone = localStorage.getItem("phone");
var adress = localStorage.getItem("adress");
var city = localStorage.getItem("city");
var zip = localStorage.getItem("zip");

document.getElementById("data1").innerHTML = ` ${email} <br> ${phone}`;
var summary = ` ${firstName} ${secondName} <br> ${adress} <br> ${city} <br> ${zip}`;
document.getElementById("data4").innerHTML = summary;

var cart = JSON.parse(localStorage.getItem("CART"));
var cartItemsEl = document.getElementById("data2");

function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <tr class="cart-item">
                <td class="cart-item-img" ><img src="${item.imgSrc}" alt="${item.name}"> </td>
                <td class="cart-item-name">${item.name}</td>
                <td class="units">  ${item.numberOfUnits}x</td>
                <td class="unit-price"> ${item.price.toFixed(2)}</td>
                <td>= ${(item.price * item.numberOfUnits).toFixed(2)} Kč</td>
        </tr>

      `;
  });
}

renderCartItems();

function renderSubtotal() {
  let totalPrice = 0

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
  });
  cartItemsEl.innerHTML += `<tr class="total-price"><td></td><td></td><td></td><td></td><td>${totalPrice.toFixed(2)} Kč</td></tr>`;

}
renderSubtotal();

//https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt