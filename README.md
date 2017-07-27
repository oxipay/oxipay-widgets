### How to build

```bash
cd /to/this/directory
npm install
npm run build
```
This will result in a folder entitled 'widgets' and the following files will be created.

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
Note: All of the views for widgets are located at main Oxipay Website
