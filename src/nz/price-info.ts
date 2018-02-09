import * as jq from 'jquery';
import { ModalInjector } from './modal-injector';
import { Config } from './config';

(($: JQueryStatic) => {

    /**
     * The src attribute from the script we are executing e.g 
     * <script src="http://widgets.oxipay.com.au/scripts/price-info.js?foo"
     */
    let srcString: string;
    let scriptElement: Element;
    
    /* You can pass debug=true to the query string to enable console error messages */
    let debug: boolean;

    /** 
     * The extracted product price from either parsing the content from HTML (via css selector) 
     * or a specifically passed in value
    */
    let productPrice: number;

    jq.fn.exists = function () {
        return this.length !== 0;
    }

    // get current script
    scriptElement = getCurrentScript();
    if (!scriptElement && !scriptElement.getAttribute("src")) {

        // bail if we don't have anything
        
        return false;
    }

    srcString = scriptElement.getAttribute("src");

    productPrice = getPrice(srcString, jq);

    var noLogo = (getParameterByName('noLogo', srcString) !== null);

    const widget = new ModalInjector($);
    const template:string = generateWidget(productPrice, noLogo);

  
    widget.injectBanner(template, Config.priceInfoUrl, jq(scriptElement));

    
})(jq);

function generateWidget(productPrice: number, noLogo: boolean): string {
    let template;
    let templatenologo;
    if (productPrice <= 1500) {
        if (productPrice > 1000) {
            var initialPayment = productPrice - 750;

            template = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                    <p>or 1 initial payment of <b>$${initialPayment.toFixed(2)}</b></p><p>and 3 payments of <b>$250.00</b></p><p>Interest free with <span id="oxipay-img"></span></p>
                </a><br>`;
        
            templatenologo = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                    <p>or 1 initial payment of <b>$${initialPayment.toFixed(2)}</b></p><p>and 3 payments of <b>$250.00</b></p><p>Interest free - <strong>find out how</strong></p>
                </a><br>`;
        } else {
            var productPriceDividedByFour = productPrice / 4;

            // Banking Rounding
            var roundedDownProductPrice = Math.floor( productPriceDividedByFour * Math.pow(10, 2) ) / Math.pow(10, 2) ;
        
            template = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                    <p>or 4 payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p><p>Interest free with <span id="oxipay-img"></span></p>
                </a><br>`;
        
            templatenologo = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                    <p>or 4 payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p><p>Interest free - <strong>find out how</strong></p>
                </a><br>`;
        }
    }
    return (noLogo) ? templatenologo : template;
}

function getCurrentScript(): Element {

    let currentScript = document.currentScript || (function() {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    return currentScript;
    
}

function getPrice(queryString:string, jq: JQueryStatic, debug?: boolean) : number {
    
    let productPrice: string;
 
    // first look for an explicit product price in the query string
    productPrice = getParameterByName('productPrice', queryString);

    if (!productPrice) {
        // we haven't been passed a URL, try to get the css selector for 
        let selector = getParameterByName('price-selector', queryString);

        if (selector) {
            let el = jq(selector, document.body);
            //let el = jq("#oxipay-price-info", document.body);
            
            if (el.exists()) {
                let textValue =  el.text().trim();
                // only supports $ atm.
                if (textValue.indexOf("$") === 0) {
                    textValue = textValue.substring(textValue.length, 1);
                }
                return parseFloat(textValue);
            }
        }
        if (debug === true) {
            console.log("Can't locate an element with selector :  " + selector);
        }

        throw new DOMException();
    }
    return parseFloat(productPrice);
}

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
