"use strict";
var Config = (function () {
    function Config() {
    }
    Config.oxipayModalId = 'oxipay-modal';
    Config.signupModalId = 'oxipay-modal-signup';
    Config.infoModalId = 'oxipay-modal-info';
    Config.scriptId = 'script[id^=oxipay-banner]';
    Config.moreInfoUrl = 'https://oxipay.com.au/externalmodal';
    Config.registerInterestUrl = 'http://oxipay.com.au/signup';
    Config.baseContentUrl = 'https://images.oxipay.com.au';
    return Config;
}());
exports.Config = Config;
