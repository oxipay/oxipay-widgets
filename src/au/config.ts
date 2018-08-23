// when doing local test, set:
//   baseContentUrl = "./dist/au' (or './dist/nz' for New Zealand)

// When deploying to server:
//   baseContentUrl = 'https://YOUR-URL'

export class Config {
    public static baseContentUrl = 'https://widgets.oxipay.com.au';    // for remote deploy
    // public static baseContentUrl = './dist/au';       // for local testing

    // register interest modal
    public static signupModalId = 'oxipay-modal-signup';
    public static registerInterestUrl = Config.baseContentUrl + '/content/html/Signup.html';

    // price-info modal
    public static priceInfoModalId = 'oxipay-modal-more-info';
    public static priceInfoUrl = Config.baseContentUrl + '/content/html/MoreInfo.html';

    // more-info modal (current)
    public static moreInfoModalId = 'oxipay-modal-more-info';
    public static moreInfoUrlNew = Config.baseContentUrl + '/content/html/MoreInfo.html';

    // more-info modal (future)
    public static moreInfoModalId_1 = 'oxipay-modal-more-info_1';
    public static moreInfoModalUrl_1 = Config.baseContentUrl + '/content/html/MoreInfo-modal.html';
}
