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
        `<a id="oxipay-tag-01" data-remodal-target="${modalId}">
            <p>Pay the easier way with</p>
            <img alt="Oxipay" src="${Config.baseContentUrl}/content/images/logo-orange.svg" />
            <span>More info</span>
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