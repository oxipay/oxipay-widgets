// when doing local test, set:
//   baseContentUrl = http://localhost:PORT_NUMBER/dist/au' (or 'http://localhost:PORT_NUMBER/dist/nz' for New Zealand)

// When deploying to server:
//   baseContentUrl = 'https://YOUR-URL'

export class Config {
    public static baseContentUrl = 'https://widgets.oxipay.com.au';    // for remote deploy
    // public static baseContentUrl = 'http://localhost:3000/dist/au';       // for local testing
    // public static baseContentUrl = 'http://54.252.245.32/dist/au' // for remote testing

    public static oxipayModalId = 'oxipay-modal';
    public static signupModalId = 'oxipay-modal-signup';
    public static priceInfoModalId = 'oxipay-modal-price-info';
    public static infoModalId = 'oxipay-modal-info';
    public static moreInfoModalId = 'oxipay-modal-more-info';
    public static scriptId = 'script[id^=oxipay-banner]';
    public static registerInterestUrl = Config.baseContentUrl + '/content/html/Signup.html';
    public static priceInfoUrl = Config.baseContentUrl + '/content/html/PriceInfo.html';
    public static moreInfoUrl = Config.baseContentUrl + '/content/html/ExternalModal.html';
    public static moreInfoUrlNew = Config.baseContentUrl + '/content/html/MoreInfo.html';
}
