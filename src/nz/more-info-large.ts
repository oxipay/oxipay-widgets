import * as jq from 'jquery';
import { ModalInjector } from './modal-injector';
import { Config } from './config';

(($: JQueryStatic) => {
    let srcString: string;
    let scriptElement: any;
    let weekly: boolean;

    // get current script
    scriptElement = getCurrentScript();
    if (!scriptElement && !scriptElement.getAttribute('src')) {
        // bail if we don't have anything
        return false;
    }

    srcString = scriptElement.getAttribute('src');
    weekly    = (getParameterByName('weekly', srcString) !== null);

    let modalUrl = weekly? Config.moreInfoWeeklyUrl :  Config.moreInfoUrl;
    let modalId = weekly? Config.moreInfoModalWeeklyId : Config.moreInfoModalId;

    const template =
        `<a id="oxipay-banner-01" data-remodal-target="${modalId}">
            <div class="logo">
                <img alt="Oxipay" src="${Config.baseContentUrl}/content/images/logo-orange.svg" />
            </div>
            <div class="text">
                <h3>Pay the easier way.</h3>
                <p>Choose Oxipay at the checkout and pay for your purchase in ${weekly? 8 : 4} easy no interest payments</p>
            </div>
            <div class="button">
                <p class="info">More info</p>
            </div>
        </a>`;
    const widget = new ModalInjector($);
    widget.injectBanner(template, modalUrl, modalId);
})(jq);

function getCurrentScript(): any {

    let currentScript = document.currentScript || (function() {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    return currentScript;
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