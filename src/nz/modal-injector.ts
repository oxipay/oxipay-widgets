///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/oxipay.d.ts"/>
require('jquery');
require('remodal');
require('../../node_modules/remodal/dist/remodal.css');
require('../../node_modules/remodal/dist/remodal-default-theme.css');
require('../../css/oxipay-branding.css');
import { Config } from './config';

export class ModalInjector {
    constructor(private jQuery: JQueryStatic) { }

    public injectBanner(template: string, targetUrl: string) {
        if (!this.modalExists(targetUrl)) {
            this.injectModal(targetUrl);
        }

        var currentScript = document.currentScript || (function() {
          var scripts = document.getElementsByTagName('script');
          return scripts[scripts.length - 1];
        })();

        var scriptId = currentScript.attributes.getNamedItem("id").value;

        const element = this.jQuery('script[id^=' + scriptId + ']');
        element
            .first()
            .after(template);
    }

    private modalExists(url: string): boolean {
        let modalId = this.getModalId(url);
        return this.jQuery(modalId).length > 0;
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
