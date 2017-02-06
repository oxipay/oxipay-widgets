### How to build

```bash
cd /to/this/directory
npm install
npm run build
```
This will result in a folder entitled 'dist' and the following files will be created.

- register-interest-large.js
- register-interest-large.map.js
- register-interest-small.js
- register-interest-small.map.js

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
<!-- Small -->
<script id="oxipay-banner" src="register-interest-small.js"></script>

<!-- Large -->
<script id="oxipay-banner" src="register-interest-large.js"></script>
```

The script will bring in all of its CSS and dependencies, and register the button click events