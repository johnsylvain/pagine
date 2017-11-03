<h3 align="center">
  Pagine
</h3>
<p align="center">
  Client-side markdown website generator
</p>
<p align="center">
  <a href="https://choosealicense.com/licenses/mit/" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  </a>
  <a href="https://npmjs.org/package/pagine">
    <img src="https://img.shields.io/npm/v/pagine.svg" alt="npm version">
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg"
      alt="API stability" />
  </a>
  <a href="https://travis-ci.org/johnsylvain/pagine">
    <img src="https://img.shields.io/travis/johnsylvain/pagine.svg"
      alt="API stability" />
  </a>
</p>

---
Pagine is a light-weight (< 12 KB) system to create multipage, content driven SPAs. Your content is loaded from markdown files and displayed on defined application routes. Pagine is great for documentation, blogs, and other text heavy websites.

## Features
- Page generation from markdown files 
- No server logic - 100% client side
- Template caching 

## Installation
**via npm**
```bash
npm install pagine --save
```
**via yarn**
```bash
yarn add pagine
```
**via [download](https://raw.githubusercontent.com/johnsylvain/pagine/master/lib/pagine.min.js)**
```html
<script src="path/to/pagine.min.js"></script>
```



## Usage

**JavaScript**
```js
import Pagine from 'pagine';

new Pagine({
  view: '#view',
  routes: [
    {
      path: '/home',
      md: './markdown/home.md',
      layout: 'main'
    }
  ]
})
```

**HTML**
```html
<div id="view"></div>
<script type="text/html" id="main">
  <%= content %>
</script>
```

## Contributing
You can request a new feature by submitting an issue. If you would like to implement a new feature feel free to issue a Pull Request.

## License
Pagine is protected under the [MIT License](https://choosealicense.com/licenses/mit/)
