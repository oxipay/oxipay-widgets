import * as jq from 'jquery';
import { ModalInjector } from './modal-injector';
import { Config } from './config';

(($: JQueryStatic) => {
    const template = 
        `<a id="oxipay-more-info-small" href="#${Config.moreInfoModalId}">
            <img alt="Oxipay" src="${Config.baseContentUrl}/content/images/logo-orange.svg" />
            <span class="more-info-btn">MORE INFO</span>
            <p>Shop now. Pay over time</p>
        </a>`;

    const widget = new ModalInjector($);
    widget.injectBanner(template, Config.moreInfoUrlNew);
})(jq);
