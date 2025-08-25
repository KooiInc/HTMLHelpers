// import relevant items
import {
  $,
  regexhelper as createRE,
  logFactory,
  $D,
  splat,
 } from "../Bundle/htmlhelpers.min.js";

const { log, logTop } = logFactory(); // initialize logging (to screen)
const {DIV, button: $BUTTON} = $;     // html elements can be created with a function
const codeBlocks = await retrieveCodeBlocksFromHTMLTemplatesFile();
const splatMe = Symbol.for("interpolate"); // see splat examples

// set page styling
initStyling();

// wrap logging within a container element
$.div({class: "container"}).append($(`#log2screen`)).render;

// myRE assignment
const myRE = createRE`
    ^[\p{L}]              //=> always start with a letter
    [\p{L}_\.#\-\d+~=!]+  //=> followed by letters including _ . # - 0-9 ~ = or !
    ${[...'gui']}         //=> flags ([g]lobal, case [i]nsensitive, [u]nicode)`;

// ticktock assignment
const later = $D({locale: "nl", timeZone: "Europe/Amsterdam"})
  .addYears(5).add("23 days, 20 hours")
  .toString({template: "WD dd MM yyyy hh:mmi:ss (tz)"});

log(
   // styling
   toHeader(`div`, `Did the custom styling (`, $.code(`$.editCssRules`), `) work?`),
   $.div(`Sure: `, $.code(`Code style`), ` works ...`, $.i($.b({class: "note"}, ` note style too`))),
   
   // regex
   toHeader(`div`, "Is ",
     $.a({href: `https://kooiinc.codeberg.page/RegExHelper/Demo/`, target: `_blank`, text: `regexhelper`}),
     " (exposed as <code>createRE</code>) available?"),
   codeBlocks.createReEx,
   $.div($.span(`Sure: `), $.b( `myRE =&gt;`), ` <code>${myRE}</code>`),
  
  // splat examples
  toHeader(
    $.div, `Can we use `,
      $.a({href: `https://kooiinc.codeberg.page/splatES/Demo/`, target: `_blank`, text: `splat`}),
      ` (splat-es)?`,
    $.div({class: `normal`},
      `<b class="note">Note</b>: <code>splat-es</code> includes a
      symbolic String prototype extension called <code>Symbol.for("interpolate")</code>.`)
  ),
  codeBlocks.splatEx,
  $.div(
    $.div({class: "normal"}, `Sure:`),
    $.div({class: "normal"}, `<b>helloWorld1</b> => ${
      splat("Hello {wrld}", {wrld: "world"}) }`),
    $.div({class: "normal"}, `<b>helloWorld2</b> => ${
      splat("Hello {wrld}", {wrld: "world; "}, {wrld: "<i>universe</i>"}) }`),
    $.div({class: "normal"}, `<b>helloWorld3</b> => ${
      "Hello {wrld}"[splatMe]({wrld: "world"})}`),
    $.div({class: "normal"}, `<b>helloWorld4</b> => ${
      "Hello {wrld}"[splatMe]({wrld: "world; "}, {wrld: "<i>universe</i>"})}`)),

  // ticktock availability
  toHeader($.div, `Is `,
    $.a({href: `https://kooiinc.github.io/ticktock.js/Demo/`, target: `_blank`, text: `ticktock-es`}),
    ` (exposed as <code>$D</code>) available?`),
  codeBlocks.dateFormatEx,
  
  $.div($.span(`Sure: `), $.b( `later =&gt;`), ` <code>${later}</code>`),
  toHeader(DIV, "Can we calculate date differences using <code>$D</code>?"),
  codeBlocks.dateDiffEx,
  $.span({id: "showNwYear"}),
);

// create a timer from factory
const now = $D.now;
const untilNwYearTimer = countDownUntil($(`#showNwYear`), $D([now.year + 1, 0 ,1, 0, 0, 0]));

// start/stop button listener/handler for timer
function bttnClickHandling({me}) {
  const shouldStop = me.getData(`should`).startsWith(`Stop`);
  switch (true) {
    case shouldStop: untilNwYearTimer.stop; break;
    default: untilNwYearTimer.start;
  }
  me.data.set({should: shouldStop ? `Restart countdown` : `Stop countdown`});
  $.Popup.show({
    content: `Next new year countdown ${shouldStop ? `stopped!` : `started!`}`,
    closeAfter: 2,
  });
}

// create a div with button
const bttnDiv = DIV(
  {data: {header: 1}, class: `normal`},  `Sure: &nbsp;&nbsp;`,
  $BUTTON({data: {should: `Start`}}).on(`click`, bttnClickHandling)
);

log(
  $.div(
  {data: {header: 1}}, // signifies this must be printed without a list-style and class .head
  `Can we handle (and trigger) a button using `,
  $.span(
      $.code(`\$("&lt;button ...>").on(...).trigger(...)?`),
      bttnDiv
    )
  ),
  
);

// start countdown
bttnDiv.first$(`button`).trigger("click");

// add links and used code
log(
  toHeader($.h3, `Modules included in the stackblitzhelpers module`),
  codeBlocks.links,
  $.details({data: {header: 1}},
    $.summary($.b(`Code used to create this page`)),
    codeBlocks.pageCode),
  $.div({class: "spacer", data: {header: 1}}),
);

// highlight code
hljs.highlightAll(`javascript`);

// add some lines to the page top
logTop(
  toHeader($.h2,
    `Let's check if it all works (this log line and the lines above it are `,
    $.i(`prepended`),
    ` (using `,
    $.code(`logTop`),
    `)`
  ),
  $.h1({data:{header: 1}, class: "mainHeader"}, `Examples/tests HTMLHelpers`),
  $.a({
    data: {header: 1},
    class: "ExternalLink arrow",
    target: "_blank",
    href: "https://kooiinc.codeberg.page/JQx/Resource/Docs/",
    text: "JQx ($) full documentation"
  }),
  $.a({
    data: {header: 1},
    class: "ExternalLink arrow",
    target: "_top",
    href: "https://codeberg.org/KooiInc/HtmlHelpers",
    text: "Codeberg repository"
  }),
);

// count down factory
function countDownUntil(displayElement, until) {
  let to;
  run();
  
  function redo() {
    displayElement
      .clear()
      .html(`<i>${$D.now.differenceTo(until).full}</i>`);
  }

  function run(stop = false) {
    switch (true) {
      case stop: clearAllTimers(); return stop;
      default: redo(); to = setTimeout(run, 1000);
    }
    
    return to = setTimeout(run, 1000);
  }
  
  return { get stop() { return run(true); }, get start() { return run(); } };
}

function toHeader(tag, ...elems){
  return ($.IS(tag, Function) ? tag : $[tag])({data: {header: 1}}, ...elems);
}

function clearAllTimers() {
  let id = setTimeout(() => {});
  while (id >= 0) { clearTimeout(id--); }
}

// retrieve used code
async function codeElem() {
  return await fetch(`./index.js`)
    .then(response => response.text())
    .then(code => $.pre(
        {class: "codebox", data: {header: 1}},
        $.code(code.replace(/</g, `&lt;`))
      )
    );
}

async function retrieveCodeBlocksFromHTMLTemplatesFile() {
  $.allowTag(`template`);
  const codeBlocks = {};
  const templates = await fetch(`./templates.html`)
    .then(r => r.text());
  const blocks = $.div(templates);
  
  blocks.node.querySelectorAll(`template`)
   .forEach(t => {
     let content = t.content;
     codeBlocks[t.id] =
      t.dataset.isHtml
      ? $.virtual(t.innerHTML)
      : $.pre(
         {data: {header: 1}, class: `codebox`},
        $.code(content.textContent.trim()) );
   });
  codeBlocks.pageCode = await codeElem();
  return codeBlocks;
}

// page styling (using $.editCssRules)
function initStyling() {
  // style rules are stored in <head>style#JQxStylesheet
  $.editCssRules(
    `:root {
      --grey-default: rgba(112, 92, 92, 0.9);
      --code-color: #555;
    }`,
    `body {
      margin: 2rem;
      overflow-x: hidden;
    }`,
    `.container {
      width: 100vw;
      height: 100vh;
      margin: 0;
      inset: 0;
      position: absolute;

      ul#log2screen {
        max-width: 40vw;
        margin: 4rem auto;

        @media(width <= 1600px) {
          max-width: 60vw;
        }
      }
    }`,
    `div.spacer {
      height: 2rem;
    }`,
    `p.spacer {
      height: 1rem;
    }`,
    `details {
      summary {
        cursor: pointer;
        font-size: 1.2rem;
      }
    }`,
    `code:not(.codeblock, .hljs) {
      background-color: rgb(227, 230, 232);
      color: var(--code-color);
      padding: 1px 2px;
      display: inline-block;
      margin: 1px 0;
      border-radius: 4px;
      font-style: normal;
      font-weight: normal;
     }`,
    `code.codeblock {
      margin: 0.5rem 0px 0.5rem;
      color: var(--code-color);
      border-radius: 4px;
      box-shadow: 1px 2px 8px #777;
      width: 100%;
     }`,
    `pre.codebox {
      max-height: 40vh;
      overflow-y: auto;
      border-radius: 8px;
      box-shadow: 1px 2px 8px #777;
    }`,
    `.note {color: red; }`,
    `h2 {font-size: 1.1rem; line-height: 1.4rem}`,
    `.mainHeader {
      margin: 1rem 0 1rem 0;
      text-align: center;
      border-bottom: 1px solid var(--grey-default);
      border-top: 1px solid var(--grey-default);
      padding: 0.5rem 0 0.7rem 0;
    }`,
    `li.head {
      color: #777 !important;
      div.normal {
        font-weight: normal;
        margin: 0.3rem 0;
      }
      div.moreSpace {
        margin-bottom: 1em;
      }
      div[data-head] { margin: 0; }
    }`,
    `li.head h2 {
      lineHeight: 1.7rem;
      font-size: 1.1rem;
      code {
        font: revert;
      }
    }`,
    `li.head p {
      margin: 0;
    }`,
    `#log2screen li div.normal li {
      list-style: none;
      margin-left: -3em;
    }`,
    `a {
      background-color: #FFF !important;
      &:hover {
        text-decoration: none;
      }
      &[target]:hover::after {
        content: 'Opens in new tab/window';
        fontSize: 0.7rem;
        position: absolute;
        zIndex: 2;
        display: inline-block;
        padding: 3px 6px;
        border: 1px solid #777;
        box-shadow: 1px 1px 5px #777;
        margin: 1rem 0 0 -1rem;
        background-color: #FFF;
        font-weight: normal;
        color: #444;
      }
      
      &[target="_top"]:hover::after {
        content: 'Opens in this tab';
      }
    }`,
    `#showNwYear i {
      color: #b34b44;
      font-weight: bold;
      margin-top: 1rem;
      display: inline-block;
      padding: 5px;
      background-color: #FFFFAA;
    }`,
    `#showNwYear:before {
      content: 'Sure. Until next new year\\1F389 lasts: ';
      margin-bottom: -1em;
    }`,
    `[data-should] {
      margin-top: 0.3rem;
    }`,
    `[data-should]:before {
      content: attr(data-should);
    }`,
  );
}
