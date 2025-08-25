<div align="center">
  <a target="_blank" href="https://www.npmjs.com/package/dynamic-html-helpers"
    ><img src="https://img.shields.io/npm/v/dynamic-html-helpers.svg?labelColor=cb3837&logo=npm&color=dcfdd9"></a>
</div>

# HtmlHelpers
Some handy helpers to create/maintain HTML pages.

**The helper contains**
- [x] A JQuery alike library to manage HTML elements (create, handle, modify, style, remove)
- [x] A small string templating library
- [x] A small library to create multiline regular expressions with comments
- [x] A library to manage ES `Date` (format, locale sensitive/aware, calculation etc.)
- [x] A logger factory to print text/html in a structured way to the browser screen

### [Examples](https://kooiinc.github.io/HTMLHelpers/Resource/Examples/)

### Use in Stackblitz front end project
```javascript
import {logFactory /*, ...[see 'exposed as']*/}
  from "https://unpkg.com/htmlhelpers@latest/Bundle/htmlhelpers.min.js";
```
### Install the package
`npm install dynamic-html-helpers`

### Install the bundled code to a custom folder
This will install the bundled code files to a folder of choice.

**pre-requisites**

- [x] [nodejs](https://nodejs.org/en) must be installed.
- [x] [path to install to] must exist.

`npm run installBundleTo "[path to install to]"`

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

> [!NOTE]
> The repository is maintained @[codeberg.org](https://codeberg.org/KooiInc/HTMLHelpers).
> 
> The code base @codeberg.org is therefore *authorative*.
>
> The codeberg code is kept in sync with the [Github HTMLHelpers](https://github.com/KooiInc/HTMLHelpers) repository.
