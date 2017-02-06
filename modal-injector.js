///<reference path="./typings/jquery/jquery.d.ts"/>
///<reference path="./typings/oxipay.d.ts"/>
"use strict";
var config_1 = require('./config');
require('jquery');
require('remodal');
require('./node_modules/remodal/dist/remodal.css');
require('./node_modules/remodal/dist/remodal-default-theme.css');
require('./css/oxipay-branding.css');
var ModalInjector = (function () {
    function ModalInjector(jQuery) {
        this.jQuery = jQuery;
    }
    ModalInjector.prototype.injectBanner = function (template, targetUrl) {
        if (!this.modalExists(targetUrl)) {
            this.injectModal(targetUrl);
        }
        var currentScript = document.currentScript || (function () {
            var scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1];
        })();
        var scriptId = currentScript.attributes.getNamedItem("id").value;
        var element = this.jQuery('script[id^=' + scriptId + ']');
        element
            .first()
            .after(template);
    };
    ModalInjector.prototype.modalExists = function (url) {
        var modalId = this.getModalId(url);
        return this.jQuery(modalId).length > 0;
    };
    ModalInjector.prototype.injectModal = function (url) {
        var modalId = this.getModalId(url);
        var bodyTag = 'body';
        var modalDiv = "<div id='" + modalId + "' class='remodal' data-remodal-id='" + modalId + "'>\n            <iframe id='oxipay-external' src='" + url + "'></iframe>\n            <button data-remodal-action=\"close\" class=\"remodal-close\"></button>\n        </div>";
        var body = this.jQuery(bodyTag);
        body.append(modalDiv);
    };
    ModalInjector.prototype.getModalId = function (url) {
        var modalId = '';
        if (url.indexOf('signup') > 0)
            modalId = config_1.Config.signupModalId;
        else
            modalId = config_1.Config.infoModalId;
        return modalId;
    };
    return ModalInjector;
}());
exports.ModalInjector = ModalInjector;
