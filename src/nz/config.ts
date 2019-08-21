export class Config {
    public static baseContentUrl = 'https://widgets.oxipay.co.nz';
    // public static baseContentUrl = './dist/nz';       // for local testing

    public static priceInfoModalId = 'oxipay-modal-price-info';
    public static priceInfoUrl = Config.baseContentUrl + '/content/html/PriceInfo.html';

    public static moreInfoModalId = 'oxipay-modal-info';
    public static moreInfoUrl = Config.baseContentUrl + '/content/html/MoreInfoModal.html';

    public static moreInfoModalWeeklyId = 'oxipay-modal-info-weekly';
    public static moreInfoWeeklyUrl = Config.baseContentUrl + '/content/html/MoreInfoModal-weekly.html';

    // top-banner modal
    public static oxipayBannerTopModalId = 'oxipay-modal-more-info_1';
    public static oxipayBannerTopModalUrl = Config.baseContentUrl + '/content/html/MoreInfo-modal-new.html';
}
