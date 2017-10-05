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
</p>

---
Pagine is a system to create multipage, text heavy single page applications. Your content is loaded from markdown files and displayed on defined application routes. Pagine is great for documentation, blogs, and other text heavy websites.

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

## Usage
```js
import Pagine from 'pagine';

new Pagine({
  routes: [
    {
      path: '/',
      md: './home.md',
      layout: 'main'
    }
  ],
  layouts: {
    main: document.querySelector('#main').innerHTML
  }
})
```

## Contributing
You can request a new feature by submitting an issue. If you would like to implement a new feature feel free to issue a Pull Request.

## License
Pagine is protected under the [MIT License](https://choosealicense.com/licenses/mit/)
