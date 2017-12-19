// when doing local test, set:
//   baseContentUrl = http://localhost:port_number/
//   folder = 'dist/au/'

// When deploying to server:
//   public static baseContentUrl = 'https://YOUR-URL/'
//   folder = ''


export class Config {
    // public static folder = "dist/"; //for remote deploy
    public static folder = "dist/au/"; //for local testing

    // public static baseContentUrl = 'http://widgets.oxipay.co.nz/dist';    // for remote deploy
    public static baseContentUrl = 'http://localhost:3000/dist/au';       // for local testing

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
