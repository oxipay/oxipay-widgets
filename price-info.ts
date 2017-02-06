import { ModalInjector } from './modal-injector';
import { Config } from './config';
import * as jq from 'jquery';

(($: JQueryStatic) => {


    var productPrice: number;
    var scriptTag = document.getElementsByTagName('script');
    var scriptIndex  = scriptTag[scriptTag.length - 1];

    var queryProductPrice = scriptIndex.src.replace(/^[^\?]+\??/, '').substring(13);

    productPrice = parseInt(queryProductPrice);

    if (!productPrice) {
        productPrice = 0;
    }

    var dividedProductPriceByFour = productPrice / 4;
    var roundedProductPrice = dividedProductPriceByFour.toFixed(2);

    const template = `<a id="oxipay-tag-02" href="#${Config.infoModalId}">
            <p>or only 4 payments of $${roundedProductPrice} by</p> <img alt="Oxipay" src="${Config.baseContentUrl}/content/images/oxipay.svg" /> <span>More info</span>
        </a>`;

    const widget = new ModalInjector($);
    widget.injectBanner(template, Config.moreInfoUrl);
})(jq);


