import * as jq from 'jquery';
import { ModalInjector } from './modal-injector';
import { Config } from './config';

(($: JQueryStatic) => {
    const template =
        `<a id="oxipay-more-info-1" data-remodal-target="${Config.moreInfoModalId_1}">
            <div class="logo">
                <img alt="Oxipay" src="${Config.baseContentUrl}/content/images/logo-orange.svg" />
            </div>
            <div class="placeholder"></div>
            <div class='title'>
                <div class="full-height"></div>
                <div>Get it now.</div>
                <div>Pay over time.</div>
                <div class="light">No Interest ever.</div>
                <div id="narrow-screen">
                    <span class="more-info-btn">MORE INFO</span>
                </div>
            </div>
            <div class="orange-area" id="wide-screen">
                <span class="more-info-btn">MORE INFO</span>
            </div>
        </a>`;
    const widget = new ModalInjector($);
    widget.injectBanner(template,  Config.moreInfoModalUrl_1);
})(jq);
