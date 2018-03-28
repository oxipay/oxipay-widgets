///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/oxipay.d.ts"/>
// tslint:disable-next-line:no-var-requires
require('jquery');
// tslint:disable-next-line:no-var-requires
require('remodal');
// tslint:disable-next-line:no-var-requires
require('../../node_modules/remodal/dist/remodal.css');
// tslint:disable-next-line:no-var-requires
require('../../node_modules/remodal/dist/remodal-default-theme.css');
// tslint:disable-next-line:no-var-requires
require('../../css/oxipay-branding.css');
import { Config } from './config';

export class ModalInjector {
    constructor(private jQuery: JQueryStatic) { }

    public injectBanner(template: string, targetUrl: string, element?: any) {
        if (!this.modalExists(targetUrl)) {
            this.injectModal(targetUrl);
        }

        let currentScript = document.currentScript || (function() {
          let scripts = document.getElementsByTagName('script');
          return scripts[scripts.length - 1];
        })();

        // if the element isn't passed in already then try and get it via the ID
        // in the same way that we previously did
        if (!element) {
            let scriptId = currentScript.attributes.getNamedItem("id").value;

            element = this.jQuery('script[id^=' + scriptId + ']');
        }

        let modalId = this.getModalId(targetUrl);

        // look for the id , if it exists then we replace the element
        // this could cause issues with multiple entries.. @todo make element id dynamic
        if (this.jQuery('#oxipay-tag-02', element).length > 0) {
            this.jQuery('#oxipay-tag-02', element).replaceWith(template);
        } else {
            element.first().after(template);
        }
    }

    private modalExists(url: string): boolean {
        let modalId = this.getModalId(url); //Element selector
        return this.jQuery("#"+modalId) ? this.jQuery("#"+modalId).length > 0 : false;
    }

    private injectModal(url: string): void {
        let modalId = this.getModalId(url);

        const bodyTag = 'body';
        const modalDiv =
            `<div id='${modalId}' class='remodal' data-remodal-id='${modalId}'>
                <iframe id='oxipay-external' src='${url}'></iframe>
                <button data-remodal-action="close" class="remodal-close"></button>
            </div>`;
        const body = this.jQuery(bodyTag);

        body.append(modalDiv);
    }

    private getModalId(url: string): string {
        let modalId = '';
        if (url.indexOf('PriceInfo') > 0) {
            modalId = Config.priceInfoModalId;
        }
        else {
            modalId = Config.infoModalId;
        }
        return modalId;
    }
}
