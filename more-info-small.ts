﻿import { ModalInjector } from './modal-injector';
import { Config } from './config';
import * as jq from 'jquery';

(($: JQueryStatic) => {
    const template = `<a id="oxipay-tag-01" href="#${Config.infoModalId}">
            <p>Pay the easier way with <img alt="Oxipay" src="${Config.baseContentUrl}/content/images/oxipay.svg" /> <span>More info</span></p>
        </a>`;

    const widget = new ModalInjector($);
    widget.injectBanner(template, Config.moreInfoUrl);
})(jq);




