"use strict";
var Config = (function () {
    function Config() {
    }
    return Config;
}());
Config.oxipayModalId = 'oxipay-modal';
Config.signupModalId = 'oxipay-modal-signup';
Config.infoModalId = 'oxipay-modal-info';
Config.scriptId = 'script[id^=oxipay-banner]';
Config.moreInfoUrl = 'https://oxipay.com.au/externalmodal';
Config.registerInterestUrl = 'http://oxipay.com.au/signup';
Config.baseContentUrl = 'https://images.oxipay.com.au';
Config.priceInfoUrl = 'https://oxipay.com.au/priceinfo';
exports.Config = Config;
