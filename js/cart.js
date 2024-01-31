// this function returns the items added to cart
    // fetch items in localStorage
    const ul = document.querySelector('ul');
    let cartArray = JSON.parse(localStorage.getItem('cart_entries'));
    
//display the items in localStorage
if (cartArray !== null) {
    cartArray.forEach(element => {
        const li = document.createElement('li');
        li.textContent = element.name;
        ul.appendChild(li)
    });   
    }

// retrieve items from the cart
    let cart = JSON.parse(localStorage.getItem("cart_entries")) || [];
    let overallPrice = 0;

    if (cart.length) {
    // using the forEach method, calculate the total price of each item within our cart array
    cart.forEach((element) => {
        overallPrice += parseInt(element.unitPrice);
    });
    }
    document.getElementById(
    "total-price"
    ).innerHTML = `Overall Price: $${overallPrice} USD`;

    // adds an event listener to clear our cart
    document.getElementById("clear-cart").addEventListener("click", () => {
    localStorage.removeItem("cart_entries");
        console.log("Cart is cleared!");
        // reload page
        window.location.reload();
    });

// adds an event listener to the checkout button
document.getElementById("checkout-cart").addEventListener("click", () => {
    if (overallPrice > 0) {
            document.location.href="../cart/confirmation.html"
    } else {
        alert("Add items to cart to enable purchase");
        }
    })

// write cart entries array to datalayer
adobeDataLayer.push({ 'event': 'cart_view', 'product': cart })
    
