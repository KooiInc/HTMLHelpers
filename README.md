# HtmlHelpers
Some handy helpers for ES/JS/HTML projects.

**The helper contains**
- [x] A JQuery alike library to manage HTML elements (create, handle, modify, style, remove)
- [x] A small string templating library
- [x] A small library to create multiline regular expressions with comments
- [x] A library to manage ES `Date` (format, locale sensitive/aware, calculation etc.)
- [x] A logger factory to print text/html in a structured way to the browser screen

### [Examples](https://kooiinc.github.io/HTMLHelpers/Examples/)

### Use in Stackblitz front end project
```javascript
import {logFactory /*, ...[see 'exposed as']*/}
  from "https://unpkg.com/htmlhelpers@latest/Bundle/htmlhelpers.min.js";
```
### Install the package
`npm install dynamic-html-helpers`

### Use as standalone script
```html
<script src="https://unpkg.com/htmlhelpers@latest/Bundle/sbhelpers.script.min.js"></script>
<script>
  const {logFactory, $ /*, ...[see 'exposed as']*/} = /*[window.]*/HTMLHelpers;
  // ...
</script>
```
### The library includes the following packets:

- [jqlmodule](https://www.npmjs.com/package/jqlmodule): a JQuery alike DOM manipulation library.
  - Exposed as `$`
- [jsregexhelper](https://www.npmjs.com/package/jsregexphelper): a library to create readable ECMAScript regular expressions (multiline, commenting possible)
  - Exposed as `regexhelper`
- [ticktock-es](https://www.npmjs.com/package/ticktock-es): a library to fiddle extensively with ECMAScript Dates
  - Exposed as `$D`
- [splat-es](https://www.npmjs.com/package/splat-es): a string templating library
  - Exposed as `splat`/`splatClear`

### For printing/logging to screen
- `logFactory`: logfactory logs string(s) to screen within a formatted unordered listing (`<ul>`). It exposes 2 methods
  - `log([string1],[string2] ... [stringX])`

    print the parameter strings.

    <b>Note</b>: inserting `!!` in a parameter string (e.g. `!!<div>some text</div>`) will print it as a header (no list item style).
  - `logTop`: same as `log`, but the string(s) will be prependend (inserted on top op the existing logged lines).

### Automatic style creation
The `SBHelpers` library supplies a default (css-)style for Stackblitz Ecmascript projects.
Style may be edited dynamically using `$.editCssRules` (see examples).
