import { ModalInjector } from './modal-injector';
import { Config } from './config';
import * as jq from 'jquery';

(($: JQueryStatic) => {

    var productPrice: number;
    var currentScript = document.currentScript || (function() {
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();
    
    var value = currentScript.attributes.getNamedItem("src").value;

    var queryProductPrice = value.replace(/^[^\?]+\??/, '').substring(13);

    productPrice = parseFloat(queryProductPrice);

    if (!productPrice) {
        productPrice = 0;
    }

    var productPriceDividedByFour = productPrice / 4;
    //Banking Rounding
    var roundedDownProductPrice = Math.floor( productPriceDividedByFour * Math.pow(10, 2) ) / Math.pow(10, 2) ;

    const template = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
            <p>or 4 payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p><p>Interest & fee free with <span id="oxipay-img"></span></p>
        </a><br>`;

    const widget = new ModalInjector($);
    widget.injectBanner(template, Config.priceInfoUrl);



})(jq);
