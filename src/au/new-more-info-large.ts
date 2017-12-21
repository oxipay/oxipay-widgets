import * as jq from 'jquery';
import { ModalInjector } from './modal-injector';
import { Config } from './config';

(($: JQueryStatic) => {
    const template =
        `<a id="oxipay-more-info-large" href="#${Config.moreInfoModalId}">
            <p>4 easy payments. No Interest.</p>
            <div class="orange-area">
                <div class="logo">
                    <img alt="Oxipay" src="${Config.baseContentUrl}/content/images/logo-orange.svg" />
                </div>
                <span class="more-info-btn">MORE INFO</span>
            </div>
        </a>`;
    const widget = new ModalInjector($);
    widget.injectBanner(template,  Config.moreInfoUrlNew);
})(jq);
