"use strict";
var Config = (function () {
    function Config() {
    }
    return Config;
}());
Config.oxipayModalId = 'oxipay-modal';
Config.signupModalId = 'oxipay-modal-signup';
Config.infoModalId = 'oxipay-modal-info';
Config.priceInfoModalId = 'oxipay-modal-price-info';
Config.scriptId = 'script[id^=oxipay-banner]';
Config.moreInfoUrl = 'http://widgets.oxipay.co.nz/content/html/ExternalModal.html';
Config.registerInterestUrl = 'http://widgets.oxipay.co.nz/content/html/Signup.html';
Config.baseContentUrl = 'http://images.oxipay.com.au';
Config.priceInfoUrl = 'http://widgets.oxipay.co.nz/content/html/PriceInfo.html';
exports.Config = Config;
