# HtmlHelpers
Some handy helpers for ES/JS/HTML projects.

**The helper contains**
- [x] A logger factory to print text/html in a structured way to the browser screen
- [x] A JQuery alike library to manage HTML elements (create, handle, modify, style, remove)
- [x] A small library to create multiline regular expressions with comments
- [x] A library to manage ES `Date` (format, locale sensitive, calculation etc.)

> [!IMPORTANT]
> This repository was originally developed for (my) [Stackblitz](https://stackblitz.com/@KooiInc) projects (npm package name stackblitzhelpers)
>
> The repository is moved to [Codeberg.org](https://codeberg.org/KooiInc/HtmlHelpers) and renamed to ***HtmlHelpers***.
> For the time being, the npm package will keep the name 'stackblitzhelpers'.
>
> For now it is kept in sync with the original repository @[Github](https://github.com/KooiInc/SBHelpers).
>
> Depending on future USA/Microsoft/Github policies the Github version may be discontinued later.

### [Examples](https://kooiinc.codeberg.page/HtmlHelpers/Examples/)

### Use in Stackblitz front end project
```javascript
import {logFactory /*, ...[see 'exposed as']*/}
  from "https://unpkg.com/stackblitzhelpers@latest/Bundle/htmlhelpers.min.js";
```
> [!NOTE]
> `index.browser.bundled.js` and `index.browser.js` in the repository root are there for legacy.

### Install the package
`npm install stackblitzhelpers`

### Use as standalone script
```html
<script src="https://unpkg.com/stackblitzhelpers@latest/Bundle/sbhelpers.script.min.js"></script>
<script>
  const {logFactory, $ /*, ...[see 'exposed as']*/} = SBHelpers;
  // ...
</script>
```

### Use in Stackblitz plain ecmascript project ('javascript blank project')
![image](https://github.com/KooiInc/SBHelpers/assets/836043/f1e33a6a-48d4-4d58-acb3-7150cd77806e)

Type 'stackblitzhelpers' in the DEPENDENCIES input field and press `<ENTER>`.

Next use
```javascript
import {logFactory /*, ...[see 'exposed as'] */} from "stackblitzhelpers"
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
Style may be edited using `$.editCssRules`.

## Notes
- Stackblitz seems to rewrite links with `target="_top"` (to `target="_blank"`).
  Version >= 0.3.6 of this library catches and fixes this. For links to `_top`,
  use `target="_top"` OR `class="internalLink"` OR the data-attribute `data-top`.
