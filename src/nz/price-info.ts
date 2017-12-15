﻿import * as jq from 'jquery';
import { ModalInjector } from './modal-injector';
import { Config } from './config';


(($: JQueryStatic) => {

    var productPrice: number;
    var value: string;
    var currentElement = document.getElementById('oxipay-price-info');
    if(currentElement)
    {
      value = currentElement.attributes.getNamedItem("src").value;
    }
    else{
      var currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
      })();

     value = currentScript.attributes.getNamedItem("src").value;
    }


    var queryProductPrice = getParameterByName('productPrice',value);
    var nologo = (getParameterByName('noLogo',value) !== null);

    productPrice = parseFloat(queryProductPrice);

    if (!productPrice) {
        productPrice = 0;
    }

    if (productPrice <= 1500) {
        if (productPrice >= 1000) {
            var initialPayment = productPrice - 750;

            const template = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                    <p>or 1 initial payment of <b>$${initialPayment.toFixed(2)}</b></p><p>and 3 payments of <b>$250.00</b></p><p>Interest free with <span id="oxipay-img"></span></p>
                </a><br>`;
        
            const templatenologo = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                    <p>or 1 initial payment of <b>$${initialPayment.toFixed(2)}</b></p><p>and 3 payments of <b>$250.00</b></p><p>Interest free - <strong>find out how</strong></p>
                </a><br>`;

            const widget = new ModalInjector($);
            widget.injectBanner((nologo) ? templatenologo : template, Config.priceInfoUrl);
        
        } else {
            var productPriceDividedByFour = productPrice / 4;

            //Banking Rounding
            var roundedDownProductPrice = Math.floor( productPriceDividedByFour * Math.pow(10, 2) ) / Math.pow(10, 2) ;
        
            const template = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                    <p>or 4 payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p><p>Interest free with <span id="oxipay-img"></span></p>
                </a><br>`;
        
            const templatenologo = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                    <p>or 4 payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p><p>Interest free - <strong>find out how</strong></p>
                </a><br>`;
            
            const widget = new ModalInjector($);
            widget.injectBanner((nologo) ? templatenologo : template, Config.priceInfoUrl);
        
        }
    }

})(jq);

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
