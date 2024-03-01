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


// write cart entries array to datalayer
    adobeDataLayer.push({ 'event': 'order_confirmation', 'product': cart });
    console.log(cart);

// clear local storage
localStorage.removeItem("cart_entries");
console.log("local storage cleared");