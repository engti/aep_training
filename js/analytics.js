/* Accept on click parameters: populate datalayer and local storage */
function writeCartEntries(analyticsEventName, productName, productUnits, productUnitPrice) {
    if (analyticsEventName === "addToCart") {
        // send data to datalayer
        adobeDataLayer.push({ 'event': analyticsEventName, 'product': { 'name': productName, 'unit': productUnits, 'price': productUnitPrice } })

        console.log("hello")

        // check if cart_entry is present
        const current_cart = localStorage.getItem('cart_entries');
        console.log(current_cart)

        // create cart entry
        interim_cart_entry = {
            name: productName,
            unit: Number(productUnits),
            unitPrice: parseFloat(productUnitPrice)
        }

        // if local storage cart entry is not present
        if (current_cart === null) {
            console.log("no ls found");
            interim_cart = [];
            /* interim_cart_entry = {
                name: productName,
                unit: Number(productUnits),
                unitPrice: parseFloat(productUnitPrice)
            }; */
            interim_cart.push(interim_cart_entry);
            // write to local storage
            localStorage.setItem('cart_entries', JSON.stringify(interim_cart))
            console.log(interim_cart);
        } else {
            // if local storage cart entry is present
            console.log("ls found");
            interim_cart = JSON.parse(localStorage.getItem('cart_entries'));
            interim_cart.push(interim_cart_entry);
            // stringify array and write to local storage 
            localStorage.setItem('cart_entries',JSON.stringify(interim_cart))
        }
        
    }
}



function writeAnalyticsData(analyticsEventName, productName, productUnits, productUnitPrice) {
    adobeDataLayer.push({ 'event': analyticsEventName, 'product': { 'name': productName, 'unit': productUnits, 'price': productUnitPrice } })
    
    // json stuff here to create local storage array
    if (typeof (Storage) !== "undefined") {
        appendToStorageArray('cart_productName', productName);
        appendToStorageArray('cart_productUnits', productUnits);
        appendToStorageArray('cart_productPrice', productUnitPrice);
    } else {
        console.log("local storage not available")
    }
}


function writeCartEntries2(analyticsEventName, productName, productUnits, productUnitPrice) {
    if (analyticsEventName === "addToCart") {
        // write data to adobe data layer
        adobeDataLayer.push({ 'event': analyticsEventName, 'product': { 'name': productName, 'unit': productUnits, 'price': productUnitPrice } })


        // make the input into a json array 
        const cart_entry = JSON.stringify({
            'product': productName,
            'unit': Number(productUnits),
            'unitPrice': parseFloat(productUnitPrice)
        })
        
        console.log('cart entry', typeof (cart_entry));
        console.log('next', JSON.parse(cart_entry));
        // json stuff here to create local storage array
        if (typeof (Storage) !== "undefined") {
            appendCart(cart_entry);
        } else {
            console.log("local storage not available")
        }
    }

}

function appendCart(cart_entry) {
    // check if cart_entries exists
    const current_cart = localStorage.cart_entries;
    console.log('current value: ',current_cart)
    // if null
    if (current_cart === null) {
        let working_cart = [];
        working_cart.push(cart_entry);
        localStorage.setItem('cart_entries',working_cart)
    }


}


function appendToStorageArray(key,item) {
    // fetch current value of cart
    var oldValue = localStorage.getItem(key);
    // if cart is ...
    if (oldValue === null) {
        // empty then create
        oldValue = []  
        oldValue.push(item)
        // let newValue = JSON.stringify(oldValue)
        localStorage.setItem(key,oldValue)
    } else {
        // populated then append
            // convert to array from string then push 
        let parseValue = JSON.parse(oldValue);
        parseValue.push(item);
            // convert string to array and put in localStorage
        stringValue = JSON.stringify(parseValue); 
        localStorage.setItem(key, stringValue);
    }
}