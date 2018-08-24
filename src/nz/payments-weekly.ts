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
    if (!scriptElement && !scriptElement.getAttribute('src')) {
        // bail if we don't have anything
        return false;
    }

    srcString = scriptElement.getAttribute('src');
    noLogo    = (getParameterByName('noLogo', srcString) !== null);
    monitor   = (getParameterByName('monitor', srcString) !== null);
    debug     = scriptElement.getAttribute('debug')? true:false;
    
    let priceStr = getParameterByName('productPrice', srcString);

    if (priceStr) {
        priceStr = priceStr.replace(/^\D+/, '');
        productPrice = parseFloat(priceStr.replace(',', ''));

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
            if (monitor){
                setInterval(function(){
                    let el = jq(selector, document.body);
                    updatePrice(el, jq, noLogo);
                },1000);
            } else {
                el.on("DOMSubtreeModified", function(e) {
                    updatePrice(jq(e.target), jq, noLogo);
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
    textValue = textValue.replace(/^\D+/, "")
    textValue = textValue.replace(/,/, "")
    return parseFloat(textValue);
}

function generateWidget(productPrice: number, noLogo: boolean): string {
    let template;
    let templatenologo;
    if (productPrice <= 1500) {
        if (productPrice > 1000) {
            let initialPayment = productPrice - 875;

            // tslint:disable-next-line:max-line-length
            template = `<a id="oxipay-tag-02" data-remodal-target="${Config.priceInfoModalId}">
                            <p>or 1 initial payment of <b>$${initialPayment.toFixed(2)}</b></p>
                            <p>and 7 weekly payments of <b>$125.00</b></p>
                            <p>Interest free with <span id="oxipay-img"></span><span class="more-info">more info</span></p>
                            <br>
                        </a>`;

            // tslint:disable-next-line:max-line-length
            templatenologo = `<a id="oxipay-tag-02" data-remodal-target="${Config.priceInfoModalId}">
                                <p>or 1 initial payment of <b>$${initialPayment.toFixed(2)}</b></p>
                                <p>and 7 weekly payments of <b>$125.00</b></p>
                                <p>Interest free - <strong>find out how</strong></p>
                                <br>
                            </a>`;
        } else {
            let productPriceDividedByEight = productPrice / 8;

            // Banking Rounding
            let roundedDownProductPrice = Math.floor( productPriceDividedByEight * Math.pow(10, 2) ) / Math.pow(10, 2);
            template = `<a id="oxipay-tag-02" data-remodal-target="${Config.priceInfoModalId}">
                            <p>or 8 weekly payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p><p>Interest free with <span id="oxipay-img"></span><span class="more-info">more info</span></p>
                            <br>
                        </a>`;

            templatenologo = `<a id="oxipay-tag-02" data-remodal-target="${Config.priceInfoModalId}">
                                <p>or 8 weekly payments of <b>$${roundedDownProductPrice.toFixed(2)}</b></p><p>Interest free - <strong>find out how</strong></p>
                                <br>
                            </a>`;
        }
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

function updatePrice(el: JQuery, jq: JQueryStatic, noLogo: boolean) {
    let productPrice = extractPrice(el);
    let template = generateWidget(productPrice, noLogo);
    let parent =  jq(getCurrentScript()).parent();
    widget.injectBanner(template, Config.priceInfoUrl, parent);
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