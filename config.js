"use strict";
var Config = (function () {
    function Config() {
        this.static = 'oxipay-modal-info';
    }
    return Config;
}());
Config.oxipayModalId = 'oxipay-modal';
Config.signupModalId = 'oxipay-modal-signup';
Config.infoModalId = 'oxipay-modal-info';
Config.priceInfoModalId = 'oxipay-modal-price-info';
Config.scriptId = 'script[id^=oxipay-banner]';
Config.moreInfoUrl = 'https://widgets.oxipay.com.au/content/html/ExternalModal.html';
Config.registerInterestUrl = 'https://widgets.oxipay.com.au/content/html/Signup.html';
Config.baseContentUrl = 'https://images.oxipay.com.au';
Config.priceInfoUrl = 'https://widgets.oxipay.com.au/content/html/PriceInfo.html';
exports.Config = Config;
