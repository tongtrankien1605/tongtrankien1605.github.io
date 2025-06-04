let intl = new Intl.NumberFormat("vi-VN");

let fadeTime = 200;

/*let intervalHeight = setInterval(() => {
    jQuery(".swp-item-product-name").css("height", "auto");
    let heights = jQuery(".swp-item-product-name").map(function () {
        return jQuery(this).height();
    }).get();

    let maxHeight = Math.max.apply(null, heights);
    if (maxHeight) {
        jQuery(".swp-item-product-name").css("height", maxHeight);
        // clearInterval(intervalHeight);
    }
}, 1000);*/

let htmlLoading = `<svg xmlns="http://www.w3.org/2000/svg" style="display: inherit;"  viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <g transform="rotate(0 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(30 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(60 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(90 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(120 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(150 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(180 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(210 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(240 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(270 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(300 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
      </rect>
    </g><g transform="rotate(330 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#262323">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
      </rect>
    </g>
</svg>`;

let settingsRequestAddress = {
    url: DOMAIN_CRM + "/api/address",
    method: "POST",
    timeout: 0,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
};

let settingsRequestOrder = {
    url: DOMAIN_CRM + "/api/order",
    method: "POST",
    timeout: 0,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
};

function turnOnLoading(selector) {
    let element = document.getElementById(selector);
    if (element) {
        element.innerHTML = htmlLoading;
    }
}

function turnOffLoading(selector) {
    let element = document.getElementById(selector);
    if (element) {
        element.innerHTML = "";
    }
}
/**
 * Begin Cart And List Product Box ============================================
 */

function openPopupCart() {
    let el = document.querySelector(".swp-modal-cart");
    if (el) {
        el.classList.toggle("swp-modal-cart-show");
    }
}

function closePopupCart() {
    let el = document.querySelector(".swp-modal-cart");
    if (el) {
        el.classList.toggle("swp-modal-cart-show");
    }
}

function openCart() {
    openPopupCart();
}

function closeCart() {
    closePopupCart();
}

function Item(productId, image, name, price, count, description, currency, currencyPos, textRemove) {
    this.productId = productId;
    this.image = image;
    this.name = name;
    this.price = price;
    this.count = count;
    this.description = description;
    this.currency = currency;
    this.currencyPos = currencyPos;
    this.textRemove = textRemove;
}

let shoppingCart = (function () {
    let cart = [];

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
    }
    if (localStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    let obj = {};

    obj.loadCart = function () {
        return cart;
    };

    obj.addItemToCart = function (productId, image, name, price, count, description, currency, currencyPos, textRemove) {
        for (let item of cart) {
            if (item.productId === productId) {
                item.count++;
                saveCart();
                return;
            }
        }
        let item = new Item(productId, image, name, price, count, description, currency, currencyPos, textRemove);
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function (name, count) {
        for (let item of cart) {
            if (item.name === name) {
                item.count = count;
                break;
            }
        }
        saveCart();
    };

    obj.removeItemFromCart = function (name) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };

    obj.clearCart = function () {
        cart = [];
        saveCart();
    };

    obj.totalCount = function () {
        let totalCount = 0;
        for (let item of cart) {
            totalCount += item.count;
        }
        return totalCount;
    };

    obj.totalCart = function () {
        let totalCart = 0;
        for (let item of cart) {
            totalCart += item.price * item.count;
        }
        return Number(totalCart.toFixed(2));
    };

    return obj;
})();

function listenToEventsProductBox() {
    jQuery(".add-to-cart").click(function (event) {
        event.preventDefault();
        let productId = jQuery(this).data("id");
        let image = jQuery(this).data("image");
        let name = jQuery(this).data("name");
        let description = jQuery(this).data("description");
        let price = Number(jQuery(this).data("price"));
        let currency = jQuery(this).data("currency");
        let currencyPos = jQuery(this).data("currencypos");
        let textRemove = jQuery(this).data("textremove");
        shoppingCart.addItemToCart(productId, image, name, price, 1, description, currency, currencyPos, textRemove);
        displayCart();
        jQuery(this).closest(".swp-item-product").find(".swp-added-to-cart").removeClass("hidden");
    });
}
listenToEventsProductBox();

function displayCart() {
    let cartArray = shoppingCart.loadCart();
    let output = "",
        formatPrice = "",
        formatTotalAPrice = "",
        forrmatSubTotal = "";

    if (cartArray && cartArray.length > 0) {
        for (let i in cartArray) {
            forrmatSubTotal = '<span class="swp-modal-cart-product-subtotal">' + intl.format(cartArray[i].price * cartArray[i].count) + "</span>";
            if (cartArray[i].currencyPos === "left") {
                formatPrice = cartArray[i].currency + intl.format(cartArray[i].price);
                formatTotalAPrice = cartArray[i].currency + forrmatSubTotal;
            } else if (cartArray[i].currencyPos === "left_spacing") {
                formatPrice = cartArray[i].currency + " " + intl.format(cartArray[i].price);
                formatTotalAPrice = cartArray[i].currency + " " + forrmatSubTotal;
            } else if (cartArray[i].currencyPos === "right") {
                formatPrice = intl.format(cartArray[i].price) + cartArray[i].currency;
                formatTotalAPrice = forrmatSubTotal + cartArray[i].currency;
            } else {
                formatPrice = intl.format(cartArray[i].price) + " " + cartArray[i].currency;
                formatTotalAPrice = forrmatSubTotal + " " + cartArray[i].currency;
            }
            output +=
                ' <div class="swp-modal-cart-product">\n' +
                '           <div class="swp-modal-cart-product-image">\n' +
                '                <img src="' +
                cartArray[i].image +
                '" alt="' +
                cartArray[i].name +
                '">\n' +
                "           </div>\n" +
                '            <div class="swp-modal-cart-product-details">\n' +
                '                 <div class="swp-modal-cart-product-title">' +
                cartArray[i].name +
                "</div>\n" +
                '                 <p class="swp-modal-cart-product-description"> ' +
                cartArray[i].description +
                " </p>\n" +
                "            </div>\n" +
                '            <div class="swp-modal-cart-product-price">' +
                formatPrice +
                "</div>\n" +
                '            <div class="swp-modal-cart-product-quantity">\n' +
                '                  <span class="swp-modal-cart-price-x-quantity"> x </span>' +
                '                  <input type="number" min="1" data-name="' +
                cartArray[i].name +
                '" data-price="' +
                cartArray[i].price +
                '" value="' +
                cartArray[i].count +
                '">\n' +
                "            </div>\n" +
                '            <div class="swp-modal-cart-product-removal">\n' +
                '                   <button class="swp-modal-cart-remove-product" data-name="' +
                cartArray[i].name +
                '">\n' +
                '                        <span class="swp-modal-cart-span-delete"><span class="swp-modal-cart-text-delete">' +
                cartArray[i].textRemove +
                "</span></span> \n" +
                "                    </button>\n" +
                "            </div>\n" +
                '             <div class="swp-modal-cart-product-line-price">' +
                formatTotalAPrice +
                "</div>\n" +
                "        </div>";
        }
    }

    jQuery(".swp-modal-cart-show-list-product").html(output);
    jQuery(".total-cart").html(shoppingCart.totalCart());
    jQuery(".total-count").html(shoppingCart.totalCount());

    updateCountCartShop();

    listenToEventsCart();

    recalculateCart();
}

function Order(name, email, phone, provinceCode, provinceName, districtCode, districtName, wardCode, wardName, address, note, payment) {
    this.name = name;
    this.email = email;
    this.phone = phone;

    this.provinceCode = provinceCode;
    this.provinceName = provinceName;

    this.districtCode = districtCode;
    this.districtName = districtName;

    this.wardCode = wardCode;
    this.wardName = wardName;

    this.address = address;
    this.note = note;
    this.payment = payment;
}

let orderInfo = (function () {
    let order = new Order();

    function saveOrder() {
        localStorage.setItem("order", JSON.stringify(order));
    }

    function loadOrder() {
        order = JSON.parse(localStorage.getItem("order"));
    }
    if (localStorage.getItem("order") != null) {
        loadOrder();
    }

    let obj = {};

    obj.loadOrder = function () {
        return order;
    };

    obj.saveOrder = function (orderUpdate) {
        order = orderUpdate;
        saveOrder();
    };

    obj.removeOrder = function () {
        order = new Order();
        saveOrder();
    };

    return obj;
})();

displayCart();

function listenToEventsCart() {
    jQuery(".swp-modal-cart-product-quantity input").change(function () {
        updateQuantity(this);
    });

    jQuery(".swp-modal-cart-product-removal button").click(function () {
        removeItem(this);
    });
}

function recalculateCart() {
    let subtotal = 0;

    /* Sum up row totals */
    jQuery(".swp-modal-cart-product").each(function (index, element, event) {
        // let linePrice = jQuery(this).children(".swp-modal-cart-product-line-price").text();
        let linePrice = jQuery(this).find(".swp-modal-cart-product-subtotal").text();
        let lstNum = linePrice.split(".");

        linePrice = 0;
        for (let i = 0; i < lstNum.length; i++) {
            linePrice += lstNum[i];
        }
        linePrice = Number(linePrice);
        subtotal += Number(linePrice);
    });

    let optionCart = jQuery(".swp-products-crm-option-cart");
    let currencyCart = optionCart.data("currency");
    let currencyCartPos = optionCart.data("currencypos");
    let country = optionCart.data("hidenaddr");
    let offemail = optionCart.data("onoffemailcus");

    let order = orderInfo.loadOrder();
    order.country = country;
    order.offemail = offemail;
    orderInfo.saveOrder(order);

    let total = "";

    /* Calculate totals */
    if (currencyCartPos === "left") {
        total = currencyCart + intl.format(subtotal);
    } else if (currencyCartPos === "left_spacing") {
        total = currencyCart + " " + intl.format(subtotal);
    } else if (currencyCartPos === "right") {
        total = intl.format(subtotal) + currencyCart;
    } else {
        total = intl.format(subtotal) + " " + currencyCart;
    }

    /* Update totals display */
    jQuery(".swp-modal-cart-totals-value").fadeOut(300, function () {
        //jQuery("#cart-subtotal").html(intl.format(subtotal));
        jQuery(".swp-modal-cart-totals-value").html(total);
        if (subtotal === 0) {
            jQuery(".swp-modal-cart-open-order").fadeOut(fadeTime);
        } else {
            jQuery(".swp-modal-cart-open-order").fadeIn(fadeTime);
        }
        jQuery(".swp-modal-cart-totals-value").fadeIn(fadeTime);
    });

    updateCountCartShop();

    if (subtotal === 0) {
        jQuery(".swp-modal-cart-show-list-product").html(
            '<div class="swp-modal-cart-have-not-product swp-modal-cart-product"><span class="swp-modal-cart-have-not-product-span">Báº¡n chÆ°a thĂªm sáº£n pháº©m nĂ o giá» hĂ ng</pan></div>'
        );
    }
}

function updateCountCartShop() {
    let el = document.querySelector(".swp-cart-bell");
    if (el) {
        el.setAttribute("data-count", shoppingCart.totalCount());
        el.classList.remove("notify");
        el.offsetWidth = el.offsetWidth;
        el.classList.add("notify");
        //el.classList.add('show-count');
    }
}

function updateQuantity(quantityInput) {
    /* Calculate line price */
    let productRow = jQuery(quantityInput).parent().parent();
    let price = Number(jQuery(quantityInput).data("price"));
    let quantity = Number(jQuery(quantityInput).val());
    let linePrice = price * quantity;

    let name = jQuery(quantityInput).data("name");
    shoppingCart.setCountForItem(name, quantity);

    /* Update line price display and recalc cart totals */
    //productRow.children(".swp-modal-cart-product-line-price").each(function () {
    productRow.find(".swp-modal-cart-product-subtotal").each(function () {
        jQuery(this).fadeOut(fadeTime, function () {
            // $(this).text(linePrice.toFixed(2));
            jQuery(this).text(intl.format(linePrice));
            recalculateCart();
            jQuery(this).fadeIn(fadeTime);
        });
    });
}

function removeItem(removeButton) {
    // XoĂ¡ khá»i bá»™ nhá»›
    let name = jQuery(removeButton).data("name");
    shoppingCart.removeItemFromCart(name);

    let productRow = jQuery(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
}
/**
 * End Cart And List Product Box ===============================================
 */

/**
 * Begin Order ==========================================================
 */

function openPopupOrder() {
    let el = document.querySelector(".swp-modal-order");
    if (el) {
        el.classList.toggle("swp-modal-order-show");
    }
}

function closePopupOrder() {
    let el = document.querySelector(".swp-modal-order");
    if (el) {
        el.classList.toggle("swp-modal-order-show");
    }
}

function openOrder() {
    openPopupOrder();
    closeCart();
    let order = orderInfo.loadOrder();
    let optionCart = jQuery(".swp-products-crm-option-cart"),
        currencyCart = optionCart.data("currency");
    let currencyCartPos = optionCart.data("currencypos"),
        textOrderTotal = optionCart.data("ordertotal");
    let textOrdernameCus = optionCart.data("ordernamecus"),
        textPlacehdNameCus = optionCart.data("placehdnamecus");
    let textOrderemailCus = optionCart.data("orderemailcus"),
        textPlacehdEmailCus = optionCart.data("placehdemailcus");
    let textOrderphoneCus = optionCart.data("orderphonecus"),
        textPlacehdPhoneCus = optionCart.data("placehdphonecus");
    let textOrderaddressCus = optionCart.data("orderaddresscus"),
        textPlacehdAddressCus = optionCart.data("placehdaddresscus");
    let textOrdernoteCus = optionCart.data("ordernotecus"),
        textPlacehdNoteCus = optionCart.data("placehdnotecus");
    let hidenAddrCus = optionCart.data("hidenaddr"),
        onoffemailcus = optionCart.data("onoffemailcus");

    let customerName = '<label class="swp-label-order">' + textOrdernameCus + '<small class="swp-text-danger"> * </small></label>';
    if (order.name) {
        customerName += '<input type="text" maxlength="100" placeholder="' + textPlacehdNameCus + '" alt="customer" class="swp-input-order order-customer-name" value="' + order.name + '">';
    } else {
        customerName += '<input type="text" maxlength="100" placeholder="' + textPlacehdNameCus + '" alt="customer" class="swp-input-order order-customer-name">';
    }
    jQuery(".order-customer-name-outline").html(customerName);

    let customerEmail = '<label class="swp-label-order">' + textOrderemailCus + '<small class="swp-text-danger"> * </small></label>';
    if (order.email) {
        customerEmail += '<input type="text" maxlength="100" placeholder="' + textPlacehdEmailCus + '" alt="email" class="swp-input-order order-customer-email" value="' + order.email + '">';
    } else {
        customerEmail += '<input type="text" maxlength="100" placeholder="' + textPlacehdEmailCus + '" alt="email" class="swp-input-order order-customer-email">';
    }
    jQuery(".order-customer-email-outline").html(customerEmail);

    let customerPhone = '<label class="swp-label-order">' + textOrderphoneCus + '<small class="swp-text-danger"> * </small></label>';
    if (order.phone) {
        customerPhone += '<input type="tel" maxlength="100" placeholder="' + textPlacehdPhoneCus + '" alt="customer" class="swp-input-order order-customer-phone" value="' + order.phone + '">';
    } else {
        customerPhone += '<input type="tel" maxlength="100" placeholder="' + textPlacehdPhoneCus + '" alt="customer" class="swp-input-order order-customer-phone">';
    }
    jQuery(".order-customer-phone-outline").html(customerPhone);

    let tbodyTableProductOrder = "";
    let carts = shoppingCart.loadCart();
    let total = 0,
        intoMoney = 0,
        intoMoneyCur = "",
        totalCur = "";
    for (let cart of carts) {
        intoMoney = cart.count * cart.price;
        if (cart.currencyPos === "left") {
            intoMoneyCur = cart.currency + intl.format(intoMoney);
        } else if (cart.currencyPos === "left_spacing") {
            intoMoneyCur = cart.currency + " " + intl.format(intoMoney);
        } else if (cart.currencyPos === "right") {
            intoMoneyCur = intl.format(intoMoney) + cart.currency;
        } else {
            intoMoneyCur = intl.format(intoMoney) + " " + cart.currency;
        }
        tbodyTableProductOrder +=
            '<tr class="cart_item border-none" style="font-size: 0.9em">\n' +
            '                          <td style="font-style: oblique; font-weight: 500">\n' +
            '                              <span style="color: midnightblue; ">' +
            cart.name +
            "</span>&nbsp;\t\t\t\t\t\t  " +
            '                              <span style="float:right;">Ă—&nbsp;' +
            cart.count +
            "</span>\t\t\t\t\t\t\t\t\t\t\t\n" +
            "                          </td>\n" +
            '                          <td style="text-align: right">\n' +
            "                               <span>" +
            intoMoneyCur +
            "</span>\t\t\t\t\t\n" +
            "                          </td>\n" +
            "                      </tr>";

        total += intoMoney;
    }

    if (currencyCartPos === "left") {
        totalCur = currencyCart + intl.format(total);
    } else if (currencyCartPos === "left_spacing") {
        totalCur = currencyCart + " " + intl.format(total);
    } else if (currencyCartPos === "right") {
        totalCur = intl.format(total) + currencyCart;
    } else {
        totalCur = intl.format(total) + " " + currencyCart;
    }

    let tfootTableProductOrder =
        '<tr class="order-total">\n' +
        "                              <th>" +
        textOrderTotal +
        "</th>\n" +
        '                              <td style="text-align: right">' +
        "                                 <strong>" +
        "                                     <span>" +
        totalCur +
        "</span>" +
        "                                 </strong> " +
        "                              </td>\n" +
        "                          </tr>";

    jQuery(".tbody-table-product-order").html(tbodyTableProductOrder);
    jQuery(".tfoot-table-product-order").html(tfootTableProductOrder);

    let address = '<label class="swp-label-order">' + textOrderaddressCus + '<small class="swp-text-danger"> * </small></label>';
    if (order.address) {
        address += '<textarea rows="2" cols="2" placeholder="' + textPlacehdAddressCus + '" class="swp-text-area order-address">' + order.address + "</textarea>";
    } else {
        address += '<textarea rows="2" cols="2" placeholder="' + textPlacehdAddressCus + '" class="swp-text-area order-address"></textarea>';
    }
    jQuery(".order-address-outline").html(address);

    let note = '<label class="swp-label-order">' + textOrdernoteCus + '<small class="swp-text-danger"> * </small></label>';

    if (order.note) {
        note += ' <textarea rows="2" cols="2" placeholder="' + textPlacehdNoteCus + '" class="swp-text-area order-note">' + order.note + "</textarea>";
    } else {
        note += ' <textarea rows="2" cols="2" placeholder="' + textPlacehdNoteCus + '" class="swp-text-area order-note"></textarea>';
    }
    jQuery(".order-note-outline").html(note);
    if (hidenAddrCus === "no") {
        jQuery(".order-customer-province").hide();
        jQuery(".order-customer-district").hide();
        jQuery(".order-customer-ward").hide();
    }
    if (onoffemailcus === "yes") {
        jQuery(".order-customer-email-outline").hide();
    }

    listenToEventsOrder();
}

function closeOrder() {
    openCart();
    closePopupOrder();
}

let requestAddress = {};
requestAddress.getProvinces = function () {
    settingsRequestAddress.data = {
        function: "get_provinces",
    };
    return new Promise((resolve, reject) => {
        jQuery
            .ajax(settingsRequestAddress)
            .done(function (response) {
                resolve(response);
            })
            .fail(function (error) {
                reject(error);
            });
    });
};

requestAddress.getDistricts = function (provinceCode) {
    settingsRequestAddress.data = {
        function: "get_districts",
        provinceId: provinceCode,
    };

    return new Promise((resolve, reject) => {
        jQuery
            .ajax(settingsRequestAddress)
            .done(function (response) {
                resolve(response);
            })
            .fail(function (error) {
                reject(error);
            });
    });
};

requestAddress.getWards = function (provinceCode, districtCode) {
    settingsRequestAddress.data = {
        function: "get_wards",
        provinceId: provinceCode,
        districtId: districtCode,
    };

    return new Promise((resolve, reject) => {
        jQuery
            .ajax(settingsRequestAddress)
            .done(function (response) {
                resolve(response);
            })
            .fail(function (error) {
                reject(error);
            });
    });
};

requestAddress
    .getProvinces()
    .then((data) => {
        let lstProvinces = data.results;
        let order = orderInfo.loadOrder();
        let html = "";

        html = '<option value="">Chá»n Tá»‰nh/ThĂ nh phá»‘</option>';
        for (let province of lstProvinces) {
            if (order.provinceCode && order.provinceCode.length > 0 && order.provinceCode === province.code) {
                html += '<option value="' + province.code + '" selected>' + province.name + "</option>";
            } else {
                html += '<option value="' + province.code + '">' + province.name + "</option>";
            }
        }

        if (order.provinceCode) {
            turnOnLoading("orderLoadingDistrict");
            turnOnLoading("orderLoadingWard");
            requestAddress
                .getDistricts(order.provinceCode)
                .then((data) => {
                    let lstDistricts = data.results;

                    html = "";
                    if (!order.districtCode) {
                        html += '<option value="">Chá»n Quáº­n/Huyá»‡n</option>';
                        order.districtCode = null;
                    }

                    for (let district of lstDistricts) {
                        if (order.districtCode && order.districtCode === district.code) {
                            html += '<option value="' + district.code + '" selected>' + district.name + "</option>";
                        } else {
                            html += '<option value="' + district.code + '">' + district.name + "</option>";
                        }
                    }
                    jQuery(".order-select-district").html(html);
                    turnOffLoading("orderLoadingDistrict");

                    if (order.districtCode) {
                        turnOnLoading("orderLoadingWard");
                        requestAddress
                            .getWards(order.provinceCode, order.districtCode)
                            .then((data) => {
                                let lstWards = data.results;

                                html = "";
                                if (!order.wardCode) {
                                    html += '<option value="">Chá»n PhÆ°á»ng/XĂ£</option>';
                                    order.wardCode = null;
                                }

                                for (let ward of lstWards) {
                                    if (order.wardCode && order.wardCode === ward.code) {
                                        html += '<option value="' + ward.code + '" selected>' + ward.name + "</option>";
                                    } else {
                                        html += '<option value="' + ward.code + '">' + ward.name + "</option>";
                                    }
                                }
                                jQuery(".order-select-ward").html(html);
                                turnOffLoading("orderLoadingWard");
                            })
                            .catch((error) => {
                                turnOffLoading("orderLoadingWard");
                                console.log(error);
                            });
                    } else {
                        html = "";
                        html += '<option value="">Cáº§n chá»n Quáº­n/Huyá»‡n</option>';
                        jQuery(".order-select-ward").html(html);
                        turnOffLoading("orderLoadingWard");
                    }
                })
                .catch((error) => {
                    turnOffLoading("orderLoadingDistrict");
                    turnOffLoading("orderLoadingWard");
                    console.log(error);
                });
        }

        jQuery(".order-select-province").html(html);
    })
    .catch((error) => {
        turnOnLoading("orderLoadingDistrict");
        turnOnLoading("orderLoadingWard");
    });

let requestOrder = {};

requestOrder.createOrder = function (order, cart) {
    settingsRequestOrder.data = {
        function: "create_order",
        order: order,
        cart: cart,
        note: order.note,
        name: jQuery(".swp-products-crm-option-cart").data("projectname"),
        link: jQuery(".swp-products-crm-option-cart").data("projectlink"),
    };

    return new Promise((resolve, reject) => {
        jQuery
            .ajax(settingsRequestOrder)
            .done(function (response) {
                jQuery(".order-button-submit-order-now").removeAttr("disabled");
                jQuery("div[class^=swp-content-success-]").addClass("hidden");
                jQuery(".swp-content-success-" + order.payment).removeClass("hidden");
                jQuery(".swp-content-success-" + order.payment + " .swp-mdh").text(response.code);
                resolve(response);
            })
            .fail(function (error) {
                reject(error);
            });
    });
};

function listenToEventsOrder() {
    const customerName = document.querySelector(".order-customer-name");
    if (customerName) {
        customerName.addEventListener("change", (event) => {
            let order = orderInfo.loadOrder();
            order.name = event.target.value;
            orderInfo.saveOrder(order);
        });
    }

    const customerEmail = document.querySelector(".order-customer-email");
    if (customerEmail) {
        customerEmail.addEventListener("change", (event) => {
            let order = orderInfo.loadOrder();
            order.email = event.target.value;
            orderInfo.saveOrder(order);
        });
    }

    const customerPhone = document.querySelector(".order-customer-phone");
    if (customerPhone) {
        customerPhone.addEventListener("change", (event) => {
            let order = orderInfo.loadOrder();
            order.phone = event.target.value;
            orderInfo.saveOrder(order);
        });
    }

    const province = document.querySelector(".order-select-province");
    if (province) {
        province.addEventListener("change", (event) => {
            let order = orderInfo.loadOrder();
            if (event.target.value) {
                order.provinceCode = event.target.value;
                let province = document.querySelector(".order-select-province");
                order.provinceName = province.options[province.selectedIndex].text;
            } else {
                order.provinceCode = null;
                order.provinceName = null;
            }
            order.districtCode = null;
            order.districtName = null;
            orderInfo.saveOrder(order);
            turnOnLoading("orderLoadingDistrict");
            turnOnLoading("orderLoadingWard");
            let lstDistricts = [];
            requestAddress
                .getDistricts(order.provinceCode)
                .then((data) => {
                    lstDistricts = data.results;
                    let html = "";
                    html += '<option value="">Chá»n Quáº­n/Huyá»‡n cá»§a báº¡n</option>';
                    if (typeof lstDistricts === "object" && lstDistricts !== undefined) {
                        for (let district of lstDistricts) {
                            html += '<option value="' + district.code + '">' + district.name + "</option>";
                        }
                    }
                    jQuery(".order-select-district").html(html);
                    turnOffLoading("orderLoadingDistrict");
                    html = "";
                    html += '<option value="">Cáº§n chá»n Quáº­n/Huyá»‡n</option>';
                    jQuery(".order-select-ward").html(html);
                    turnOffLoading("orderLoadingWard");
                })
                .catch((error) => {
                    turnOffLoading("orderLoadingDistrict");
                    turnOffLoading("orderLoadingWard");
                    console.log(error);
                });
        });
    }

    const district = document.querySelector(".order-select-district");
    if (district) {
        district.addEventListener("change", (event) => {
            let order = orderInfo.loadOrder();
            let district = document.querySelector(".order-select-district");
            order.districtCode = event.target.value;
            order.districtName = district.options[district.selectedIndex].text;
            order.wardCode = null;
            order.wardName = null;
            orderInfo.saveOrder(order);

            turnOnLoading("orderLoadingWard");
            let lstWards = [];

            requestAddress
                .getWards(order.provinceCode, order.districtCode)
                .then((data) => {
                    lstWards = data.results;
                    let html = "";
                    html += '<option value="">Chá»n PhÆ°á»ng/XĂ£</option>';
                    if (typeof lstWards === "object" && lstWards !== undefined) {
                        for (let ward of lstWards) {
                            html += '<option value="' + ward.code + '">' + ward.name + "</option>";
                        }
                    }
                    jQuery(".order-select-ward").html(html);
                    turnOffLoading("orderLoadingWard");
                })
                .catch((error) => {
                    turnOffLoading("orderLoadingWard");
                    console.log(error);
                });
        });
    }

    const ward = document.querySelector(".order-select-ward");
    if (ward) {
        ward.addEventListener("change", (event) => {
            let order = orderInfo.loadOrder();
            let ward = document.querySelector(".order-select-ward");
            order.wardCode = event.target.value;
            order.wardName = ward.options[ward.selectedIndex].text;

            orderInfo.saveOrder(order);
        });
    }

    const address = document.querySelector(".order-address");
    if (address) {
        address.addEventListener("change", (event) => {
            let order = orderInfo.loadOrder();
            order.address = event.target.value;
            orderInfo.saveOrder(order);
        });
    }

    const note = document.querySelector(".order-note");
    if (note) {
        note.addEventListener("change", (event) => {
            let order = orderInfo.loadOrder();
            order.note = event.target.value;
            orderInfo.saveOrder(order);
        });
    }
}
//listenToEventsOrder();

let timeout = null;
function createOrder() {
    jQuery(".order-button-submit-order-now").attr("disabled", true);
    let order = orderInfo.loadOrder();
    let carts = shoppingCart.loadCart();

    let cartsOptimal = [];

    for (let cart of carts) {
        cartsOptimal.push({
            productId: Number(cart.productId),
            quantity: Number(cart.count),
        });
    }

    requestOrder
        .createOrder(order, cartsOptimal)
        .then((data) => {
            closePopupOrder();
            openOrderSuccess();
            //timeout = setTimeout(function(){ closeOrderSuccess() }, 2000);
            shoppingCart.clearCart();
            displayCart();
        })
        .catch((error) => {
            if (error.responseText && error.responseText !== "") {
                jQuery(".swp-modal-error-message").text(JSON.parse(error.responseText).messageError);
            }
        });
}
/**
 * End Order ==========================================================
 */

function orderSuccess(nr) {
    jQuery(".swp-model-success-message").toggleClass("swp-model-success-comein");
    jQuery(".swp-model-success-check").toggleClass("swp-model-success-scaledown");
}
function openOrderSuccess() {
    orderSuccess(50);
}
function closeOrderSuccess() {
    clearTimeout(timeout);
    orderSuccess(500);
}

function changePaymentMethod() {
    let order = orderInfo.loadOrder();
    if (order.payment) {
        jQuery("#swp-" + order.payment).prop("checked", true);
        jQuery(".swp-accordion .swp-content").addClass("hidden");
        jQuery("#swp-" + order.payment)
            .closest("li")
            .find(".swp-content")
            .removeClass("hidden");
    } else {
        order.payment = "cod";
        orderInfo.saveOrder(order);
        jQuery("#swp-" + order.payment).prop("checked", true);
        jQuery("#swp-" + order.payment)
            .closest("li")
            .find(".swp-content")
            .removeClass("hidden");
    }
    jQuery(".swp-accordion input:radio[name=payment-method]").change(function () {
        jQuery(".swp-accordion .swp-content").addClass("hidden");
        jQuery(this).closest("li").find(".swp-content").removeClass("hidden");
        order.payment = jQuery(this).val();
        orderInfo.saveOrder(order);
    });
}
changePaymentMethod();
