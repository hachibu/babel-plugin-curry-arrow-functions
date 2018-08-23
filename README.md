# Babel Plugin Curry Arrow Functions

A Babel plugin to curry arrow functions.

## Example

### Input
```js
var add = (a, b) => a + b;
```

### Output
```js
var add = function (a) {
  return function (b) {
    return a + b;
  };
};
```
