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

    /* Choose if we want to monitor price change ever half second */
    let monitor: boolean;

    /* You can pass debug=true to the query string to enable console error messages */
    let debug: boolean;

    // You can pass in min="" and max="" in the script tag.
    let min: number;
    let max: number;

    /**
     * The extracted product price from either parsing the content from HTML (via css selector)
     * or a specifically passed in value
     */
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
    noLogo    = (getParameterByName('noLogo', srcString) !== null);
    monitor   = (getParameterByName('monitor', srcString) !== null);
    debug     = scriptElement.getAttribute('debug')? true:false;
    min       = scriptElement.dataset.min || 40;
    max       = scriptElement.dataset.max || 999999;

    let priceStr = getParameterByName('productPrice', srcString);

    if (priceStr) {
        priceStr = priceStr.replace(/^\D+/, '');
        productPrice = parseFloat(priceStr.replace(',', ''));

        // just render the widget
        // because we have been provided the price we can't bind to events on 
        // the element containing the price. We just inject the template
        const template: string = generateWidget(productPrice, noLogo, min, max);
        widget.injectBanner(template, Config.priceInfoUrl, Config.priceInfoModalId, jq(scriptElement));

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
                widget.injectBanner(generateWidget(productPrice, noLogo, min, max), Config.priceInfoUrl, Config.priceInfoModalId, jq(scriptElement));
            }

            // register event handler to update the price
            if (monitor){
                setInterval(function(){
                    let el = jq(selector, document.body);
                    updatePrice(el, jq, noLogo, min, max);
                },1000);
            } else {
                el.on("DOMSubtreeModified", function(e) {
                    updatePrice(jq(e.target), jq, noLogo, min, max);
                });
            }
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
    textValue = textValue.replace(/^\D+/, "");
    textValue = textValue.replace(/,/, "");
    return parseFloat(textValue);
}

function generateWidget(productPrice: number, noLogo: boolean, min: number, max: number): string {
    let template;
    let templatenologo;
    if (productPrice < min){
        return '<a id="oxipay-tag-02"></a>'
    }
    else if (productPrice <= 1500 && productPrice <= max) {
        if (productPrice > 1000) {
            let initialPayment = productPrice - 750;

            // tslint:disable-next-line:max-line-length
            template = `<a id="oxipay-tag-02" data-remodal-target="${Config.priceInfoModalId}">
                            <p>or 1 initial payment of <b>$${initialPayment.toFixed(2)}</b></p>
                            <p>and 7 weekly payments of <b>$107.14</b></p>
                            <p>Interest free with <span id="oxipay-img"></span><span class="more-info">more info</span></p>
                        </a>`;

            // tslint:disable-next-line:max-line-length
            templatenologo = `<a id="oxipay-tag-02" data-remodal-target="${Config.priceInfoModalId}">
                                <p>or 1 initial payment of <b>$${initialPayment.toFixed(2)}</b></p>
                                <p>and 7 weekly payments of <b>$107.14</b></p>
                                <p>Interest free - <strong>find out how</strong></p>
                            </a>`;
        } else {
            //let productPriceDividedByEight = productPrice / 8;
            let initialDeposit = Math.floor((productPrice / 4) * Math.pow(10, 2)) / Math.pow(10, 2);
            let remainingPaymentsDividedBySeven = (productPrice - initialDeposit) / 7;


            // Banking Rounding
            // let roundedDownProductPrice = Math.floor( productPriceDividedByEight * Math.pow(10, 2) ) / Math.pow(10, 2);
            let roundedDownProductPrice = Math.floor( remainingPaymentsDividedBySeven * Math.pow(10, 2) ) / Math.pow(10, 2);
            template = `<a id="oxipay-tag-02" data-remodal-target="${Config.priceInfoModalId}">
                            <p>or 1 initial payment of <b>$${initialDeposit.toFixed(2)}</b></p>
                            <p>and 7 weekly payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p>
                            <p>Interest free with <span id="oxipay-img"></span><span class="more-info">more info</span></p>
                        </a>`;

            templatenologo = `<a id="oxipay-tag-02" data-remodal-target="${Config.priceInfoModalId}">
                                <p>or 1 initial payment of <b>$${initialDeposit.toFixed(2)}</b></p>
                                <p>and 7 weekly payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p>
                                <p>Interest free - <strong>find out how</strong></p>
                            </a>`;
        }
    } else {
        return '<a id="oxipay-tag-02"></a>'
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

function updatePrice(el: JQuery, jq: JQueryStatic, noLogo: boolean, min: number, max: number) {
    let productPrice = extractPrice(el);
    let template = generateWidget(productPrice, noLogo, min, max);
    let parent =  jq(getCurrentScript()).parent();
    widget.injectBanner(template, Config.priceInfoUrl, Config.priceInfoModalId, parent);
}

function getParameterByName(name: string, url: string): string {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}