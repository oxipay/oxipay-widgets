"use strict";
var modal_injector_1 = require("./modal-injector");
var config_1 = require("./config");
var jq = require("jquery");
(function ($) {
    var productPrice;
    var value;
    var currentElement = document.getElementById('oxipay-price-info');
    if (currentElement) {
        value = currentElement.attributes.getNamedItem("src").value;
    }
    else {
        var currentScript = document.currentScript || (function () {
            var scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1];
        })();
        value = currentScript.attributes.getNamedItem("src").value;
    }
    var queryProductPrice = value.replace(/^[^\?]+\??/, '').substring(13);
    productPrice = parseFloat(queryProductPrice);
    if (!productPrice) {
        productPrice = 0;
    }
    var productPriceDividedByFour = productPrice / 4;
    //Banking Rounding
    var roundedDownProductPrice = Math.floor(productPriceDividedByFour * Math.pow(10, 2)) / Math.pow(10, 2);
    var template = "<a id=\"oxipay-tag-02\" href=\"#" + config_1.Config.priceInfoModalId + "\">\n            <p>or 4 payments of <b>$" + roundedDownProductPrice.toFixed(2) + "</b></p><p>Interest & fee free with <span id=\"oxipay-img\"></span></p>\n        </a><br>";
    var widget = new modal_injector_1.ModalInjector($);
    widget.injectBanner(template, config_1.Config.priceInfoUrl);
})(jq);
