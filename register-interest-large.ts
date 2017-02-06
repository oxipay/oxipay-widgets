import { ModalInjector } from './modal-injector';
import {Config } from './config';
import * as jq from 'jquery';

(($: JQueryStatic) => {
        let template =
            `<a id="oxipay-banner-01" href="#${Config.signupModalId}">
            <div class="logo">
                <img alt="Oxipay" src="${Config.baseContentUrl}/content/images/oxipay.svg" />
            </div>
            <div class="text">
                <h3>Pay the easier way.</h3>
                <p>Choose Oxipay at the checkout and pay for your purchase in 4 easy no interest payments</p>
            </div>
            <div class="button">
                <p class="info">More info</p>
            </div>  
        </a>`;

        const widget = new ModalInjector($);
        widget.injectBanner(template, Config.registerInterestUrl);
})(jq);