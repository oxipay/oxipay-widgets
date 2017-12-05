// when doing local test, set:
//   baseContentUrl = http://localhost:port_number/
//   folder = 'dist/au/'

// When deploying to server:
//   public static baseContentUrl = 'https://YOUR-URL/'
//   folder = ''


export class Config {
    public static folder = "dist/au/";
    public static oxipayModalId = 'oxipay-modal';
    public static signupModalId = 'oxipay-modal-signup';
    public static infoModalId = 'oxipay-modal-info';
    public static moreInfoId = 'oxipay-modal-more-info';
    // public static newMoreInfoId = 'oxipay-modal-new-more-info';
    public static priceInfoModalId = 'oxipay-modal-price-info';
    public static scriptId = 'script[id^=oxipay-banner]';
    public static moreInfoUrl = Config.folder + 'content/html/ExternalModal.html';
    public static moreInfoUrlNew = Config.folder + 'content/html/MoreInfo.html';
    public static registerInterestUrl = Config.folder + 'content/html/Signup.html';
    public static baseContentUrl = 'http://localhost:3000/dist/au';
    public static priceInfoUrl = Config.folder + 'content/html/PriceInfo.html';
}
