import * as jq from 'jquery';
import { ModalInjector } from './modal-injector';
import { Config } from './config';

let widget;

(($: JQueryStatic) => {


    /**
     * The src attribute from the script we are executing e.g
     * <script src="http://widgets.oxipay.com.au/scripts/price-info.js?foo"
     */
    let srcString: string;
    let scriptElement: any;
    
    widget = new ModalInjector($);

    /* Choose if we want to render the Oxipay Logo or not */
    let noLogo: boolean;


    /* You can pass debug=true to the query string to enable console error messages */
    let debug: boolean;

    /*
     * The extracted product price from either parsing the content from HTML (via css selector)
     * or a specifically passed in value
     **/
    let productPrice: number;

    jq.fn.exists = function () {
        return this.length !== 0;
    };

    // get current script
    scriptElement = getCurrentScript();
    if (!scriptElement && !scriptElement.getAttribute('src')) {
        // bail if we don't have anything
        return false;
    }

    srcString = scriptElement.getAttribute('src');
    noLogo    = getParameterByName('noLogo', srcString)? true:false;
    debug     = scriptElement.getAttribute('debug')? true:false;
    
    let priceStr = getParameterByName('productPrice', srcString);

    if (priceStr) {
        productPrice = parseFloat(priceStr);

        // just render the widget
        // because we have been provided the price we can't bind to events on 
        // the element containing the price. We just inject the template
        const template: string = generateWidget(productPrice, noLogo);
        widget.injectBanner(template, Config.priceInfoUrl, jq(scriptElement));

    } else {
        
        // we haven't been passed a URL, try to get the css selector for
        let selector = getParameterByName('price-selector', srcString);
        if (!selector) {
            logDebug("Can't locate an element with selector :  " + selector);
            return false;
        }
        
        let el = jq(selector, document.body);
        
        if (el.exists()) {
            productPrice = extractPrice(el);

            if (productPrice) {
                widget.injectBanner(generateWidget(productPrice, noLogo), Config.priceInfoUrl, jq(scriptElement));
            }

            // register event handler to update the price
            el.on("DOMSubtreeModified", function(e) {
                updatePrice(e, jq);
            });
        }            
    }

    function logDebug(msg: string) {
        if (debug === true) {
            console.log(msg);
        }
    }
})(jq);


function extractPrice(el: any) {
    let textValue =  el.text().trim();
    textValue = textValue.replace(/^\D+/, "")

    return parseFloat(textValue);
}

function generateWidget(productPrice: number, noLogo: boolean): string {
    let template;
    let templatenologo;

    if (productPrice > 1000) {
        let initialPayment = productPrice - 750;

        // tslint:disable-next-line:max-line-length
        template = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                        <p>or 1 initial payment of <b>$${initialPayment.toFixed(2)}</b></p>
                        <p>and 3 payments of <b>$250.00</b></p>
                        <p>Interest free with <span id="oxipay-img"></span></p>
                    </a><br>`;

        // tslint:disable-next-line:max-line-length
        templatenologo = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                <p>or 1 initial payment of <b>$${initialPayment.toFixed(2)}</b></p>
                <p>and 3 payments of <b>$250.00</b></p>
                <p>Interest free - <strong>find out how</strong></p>
            </a><br>`;
    } else {
        let productPriceDividedByFour = productPrice / 4;

        // Banking Rounding
        let roundedDownProductPrice = Math.floor( productPriceDividedByFour * Math.pow(10, 2) ) / Math.pow(10, 2);
        template = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                <p>or 4 payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p><p>Interest free with <span id="oxipay-img"></span></p>
            </a><br>`;

        templatenologo = `<a id="oxipay-tag-02" href="#${Config.priceInfoModalId}">
                <p>or 4 payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p><p>Interest free - <strong>find out how</strong></p>
            </a><br>`;
    }
    return (noLogo) ? templatenologo : template;
}

function getCurrentScript(): any {

    let currentScript = document.currentScript || (function() {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    return currentScript;
}

function updatePrice(e: any, jq: JQueryStatic) {
    let productPrice = extractPrice(jq(e.target));
    let template = generateWidget(productPrice, false);
    let parent =  jq(getCurrentScript()).parent();
    widget.injectBanner(template, Config.priceInfoUrl, parent);
}

function getParameterByName(name: string, url: string): string {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);

    if (!results) {
        return '';
    }
    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}