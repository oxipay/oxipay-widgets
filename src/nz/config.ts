export class Config {
    public static baseContentUrl = 'https://widgets.oxipay.co.nz';
    // public static baseContentUrl = './dist/nz';       // for local testing

    public static priceInfoModalId = 'oxipay-modal-price-info';
    public static priceInfoUrl = Config.baseContentUrl + '/content/html/PriceInfo.html';

    public static infoModalId = 'oxipay-modal-info';
    public static moreInfoUrl = Config.baseContentUrl + '/content/html/ExternalModal.html';
}
