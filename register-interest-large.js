"use strict";
var modal_injector_1 = require("./modal-injector");
var config_1 = require("./config");
var jq = require("jquery");
(function ($) {
    var template = "<a id=\"oxipay-banner-01\" href=\"#" + config_1.Config.signupModalId + "\">\n            <div class=\"logo\">\n                <img alt=\"Oxipay\" src=\"" + config_1.Config.baseContentUrl + "/content/images/logo-orange.svg\" />\n            </div>\n            <div class=\"text\">\n                <h3>Pay the easier way.</h3>\n                <p>Choose Oxipay at the checkout and pay for your purchase in 4 easy no interest payments</p>\n            </div>\n            <div class=\"button\">\n                <p class=\"info\">More info</p>\n            </div>\n        </a>";
    var widget = new modal_injector_1.ModalInjector($);
    widget.injectBanner(template, config_1.Config.registerInterestUrl);
})(jq);
