# Webpack - The Good Parts

* [Slides](https://presentations.survivejs.com/webpack-the-good-parts/)
* [Book](https://survivejs.com/webpack/)

## Goals

* Basics of webpack, complete view on its capabilities
* How to scale webpack configuration
* How to make a plugin
* Issue - why webpack is slow and how to improve performance
* How to learn to use webpack effectively
* How webpack works under the hood - https://www.youtube.com/watch?v=CA-upQKYjYc&list=PLRDU4UY3L4pZ_XiQCFTv5Lz1ZDAPPikWl

## Examples

### Loader

```javascript
const loader = input => input + input;
```

### Plugin

```javascript
module.exports = class DemoPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    console.log(compiler);
  }
};
```

### Resolve

```javascript
import "foo"; // foo.jsx
```

```javascript
const config = {
  resolve: {
    alias: {
      foo: path.join(__dirname, "foo.js")
    },
    extensions: [
      /*...*/
      ".jsx"
    ],
    modules: [
      /*...*/
      "my_modules",
      "node_modules"
    ],
  },
};
```
