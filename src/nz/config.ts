export class Config {
    public static baseContentUrl = 'https://widgets.oxipay.co.nz';
    // public static baseContentUrl = 'http://localhost:3000/dist/nz';       // for local testing

    public static oxipayModalId = 'oxipay-modal';
    public static priceInfoModalId = 'oxipay-modal-price-info';
    public static infoModalId = 'oxipay-modal-info';
    public static scriptId = 'script[id^=oxipay-banner]';
    public static priceInfoUrl = Config.baseContentUrl + '/content/html/PriceInfo.html';
    public static moreInfoUrl = Config.baseContentUrl + '/content/html/ExternalModal.html';
}
