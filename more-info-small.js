"use strict";
var modal_injector_1 = require('./modal-injector');
var config_1 = require('./config');
var jq = require('jquery');
(function ($) {
    var template = "<a id=\"oxipay-tag-01\" href=\"#" + config_1.Config.infoModalId + "\">\n            <p>Pay the easier way with <img alt=\"Oxipay\" src=\"" + config_1.Config.baseContentUrl + "/content/images/oxipay.svg\" /> <span>More info</span></p>\n        </a>";
    var widget = new modal_injector_1.ModalInjector($);
    widget.injectBanner(template, config_1.Config.moreInfoUrl);
})(jq);
