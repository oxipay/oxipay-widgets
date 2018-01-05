﻿### How to build

```bash
cd /to/this/directory
npm install
npm run build
```
This will result in a folder structure as build output like following :

.
 
* [au](./dir2)
    * [Content](./dir2)
        * [fonts](./dir2)
        * [html](./dir2)
        * [js](./dir2)
        * [scripts](./dir2)
        * [styles](./dir2)
* [nz](./dir2)
    * [Content](./dir2)
        * [fonts](./dir2)
        * [html](./dir2)
        * [js](./dir2)
        * [scripts](./dir2)
        * [styles](./dir2)

scripts folder will contains following files:
- register-interest-large.js
- register-interest-large.map.js
- register-interest-small.js
- register-interest-small.map.js
- more-info-small.js
- more-info-small.map.js
- more-info-large.js
- more-info-large.map.js
- price-info.js
- price-info.map.js

### Dependencies
This widget builder uses the following key technologies:
- nodejs
- npm
- webpack
- typescript
- jquery
- jquery-modal

### Usage

In the location you require the banner, use the following markup:

```HTML

<!-- Price Info -->
<script id="oxipay-price-info" src="price-info.js?productPrice=0"></script>

 <!-- More Info Large-->
 <script id='oxipay-banner' src="more-info-large.js"></script>

 <!-- More Info Small-->
 <script id='oxipay-banner' src="more-info-small.js"></script>
```
The script will bring in all of its CSS and dependencies, and register the button click events
Guide: Installation guide is located at [http://docs.oxipay.com.au/](http://docs.oxipay.com.au/)
[http://docs.oxipay.co.nz/](http://docs.oxipay.co.nz/)
Note: All of the views for widgets are located at main Oxipay Website

### Local Test:
To switch between local testing and online deployment, you will make changes in the following 2 places:
1. in /src/au/config.ts (/src/nz/config.ts for New Zealand):

    change "baseContentUrl"

2. in /css/oxipay-branding.css:

    change font-face url (in all 3 font-faces)
    change #oxipay-img background-image url

All .scss files in /src/au/styles and /src/nz/styles have to be compile into .min.css files.
To do so, go to project root folder and use command:
```
sass -t compressed src/au/styles/MoreInfo.scss:src/au/styles/MoreInfo.min.css src/au/styles/ExternalModal.scss:src/au/styles/ExternalModal.min.css src/au/styles/priceInfo.scss:src/au/styles/priceInfo.min.css src/nz/styles/ExternalModal.scss:src/nz/styles/ExternalModal.min.css src/nz/styles/priceInfo.scss:src/nz/styles/priceInfo.min.css
```