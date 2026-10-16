// assign relevant items from  [window.]HTMLHelpers
// assigned in: <script src="../../Bundle/htmlhelpers.script.js"></script>
const {
  $,
  regexhelper: createRE,
  logFactory,
  $D,
  splatModule,
} = HTMLHelpers;
$.allowTags(`meta`, `template`, `link`);
$.allowAttributes(`target`);
const moduleOrBrowserLink = $.a({
  class: "ExternalLink arrow",
  target: "_top",
  href: "./index.html",
  html: "Examples <i>module</i> version"
});
const usedCodeFile = `./indexBrowser.js`;

// ---
const {interpolate: splat, addSymbolicStringExtensions} = splatModule;
const { log, logTop } = logFactory(); // initialize logging (to screen)
const {DIV, button: $BUTTON} = $;     // html elements can be created with a function
$.fn(`asHead`, me => me.data.set({header: "true"}));

const codeBlocks = await retrieveCodeBlocksFromHTMLTemplatesFile(`./templates.html`);
const [splatMe, splatMe$] = addSymbolicStringExtensions();

// initialize
init();

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
  $.h3(`Did the custom styling (`, $.code(`$.editCssRules`), `) work?`),
  $.div(`Sure: `, $.code(`Code style`), ` works ...`, $.i($.b({class: "note"}, ` note style too`))).asHead(),
  
  // regex
  $.h3("Is ",
    $.a({href: `https://kooiinc.codeberg.page/RegExHelper/Demo/`, target: `_blank`, text: `regexhelper`}),
    " (exposed as <code>createRE</code>) available?"),
  codeBlocks.createReEx,
  $.div($.span(`Sure: `), $.b( `myRE =&gt;`), ` <code>${myRE}</code>`).asHead(),
  
  // splat examples
  $.h3(`Can we use `,
    $.a({href: `https://kooiinc.codeberg.page/splatES/Demo/`, target: `_blank`, text: `splat`}),
    ` (splat-es)?`,
    $.div({class: `normal`},
      `<b class="note">Note</b>: <code>splat-es</code> includes a
      symbolic String prototype extension called <code>Symbol.for("interpolate")</code>.`)
  ),
  codeBlocks.splatEx.asHead(),
  $.div(
    $.div({class: "normal"}, $.b(`Sure`), `:`),
    $.div({class: "normal"}, `<b>helloWorld1</b> => ${
      splat("Hello {wrld} {token ignored}", {wrld: "world"}) }`),
    $.div({class: "normal"}, `<b>helloWorld2</b> => ${
      splat("Hello {wrld}", {wrld: "world; "}, {wrld: "<i>universe</i>"}) }`),
    $.div({class: "normal"}, `<b>helloWorld3</b> => ${
      "Hello {wrld}"[splatMe]({wrld: "world"})}`),
    $.div({class: "normal"}, `<b>helloWorld4</b> => ${
      "Hello {wrld}"[splatMe]({wrld: "world; "}, {wrld: "<i>universe</i>"})}`),
    $.div({class: "normal"}, `<b>helloWorld5</b> => ${
      "Hello {wrld}"[splatMe$]({wrld: `world; `}, {world: "<i>universe</i>"})}`)
  ).asHead(),
  
  // ticktock availability
  $.h3(`Is `,
    $.a({href: `https://kooiinc.github.io/ticktock.js/Demo/`, target: `_blank`, text: `ticktock-es`}),
    ` (exposed as <code>$D</code>) available?`),
  codeBlocks.dateFormatEx.asHead(),
  
  $.div($.span(`Sure: `), $.b( `later =&gt; `), $.i(later)).asHead(),
  
  $.H3("Can we calculate date differences using <code>$D</code>?"),
  codeBlocks.dateDiffEx.asHead(),
  $.span({id: "showNwYear"}).asHead(),
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
  `Sure: `,
  $BUTTON({data: {should: `Start`}}).on(`click`, bttnClickHandling)
);

log(
  $.h3(`Can we handle (and trigger) a button using `,
    $.span(
      $.code(`\$("&lt;button ...>").on(...).trigger(...)?`),
      bttnDiv
    )
  ),
  codeBlocks.onclickEx.asHead(),
);

// start countdown
bttnDiv.first$(`button`).trigger("click");

// add links and used code
log(
  $.h3(`Modules included in the stackblitzhelpers module`),
  codeBlocks.mylinks.asHead(),
  $.details({data: {header: 1}},
    $.summary($.b(`Code used to create this page`)),
    codeBlocks.pageCode),
  $.div({class: "spacer", data: {header: 1}}),
);

// highlight code
hljs.highlightAll(`javascript`);

// add some lines to the page top
logTop(
  $.h2(
    `Let's check if it all works (this log line and the lines above it are `,
    $.i(`prepended`),
    ` (using `,
    $.code(`logTop`),
    `)`
  ).asHead(),
  $.h1({class: "mainHeader"}, `Examples/tests HTMLHelpers`).asHead(),
  $.div(
    {data: {header: 1}, class: "normal"},
    $.a({
      class: "ExternalLink arrow",
      target: "_blank",
      href: "https://kooiinc.codeberg.page/JQx/Resource/Docs/",
      text: "JQx ($) full documentation"
    })
  ),
  $.div(
    {data: {header: 1}, class: "normal"},
    $.a({
      class: "ExternalLink arrow",
      target: "_top",
      href: "https://codeberg.org/KooiInc/HtmlHelpers",
      text: "Codeberg repository"
    }),
    ` | `,
    $.a({
      class: "ExternalLink arrow",
      target: "_top",
      href: "https://github.com/KooiInc/HTMLHelpers",
      text: "(synced) Github repository"
    }),
    ` | `, moduleOrBrowserLink,
  ),
);

setTimeout(() => $.prohibitTag(`meta`, `template`, `link`), 2000);

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

function clearAllTimers() {
  let id = setTimeout(() => {});
  while (id >= 0) { clearTimeout(id--); }
}

// retrieve used code
async function codeElem(codeFile) {
  return await fetch(codeFile)
    .then(response => response.text())
    .then(code => $.pre(
        {class: "codebox", data: {header: 1}},
        $.code(code.replace(/</g, `&lt;`))
      )
    );
}

// retrieve code-/html blocks
async function retrieveCodeBlocksFromHTMLTemplatesFile(templatesFile) {
  const codeBlocks = {};
  const templates = await fetch(templatesFile).then(r => r.text());
  const blocks = $.div(templates.split(`<body>`)[1].split(`</body>`)[0]);
  
  blocks.node.querySelectorAll(`template`)
    .forEach(t => {
      let content = t.content;
      codeBlocks[t.id] =
        t.dataset.isHtml
          ? $.virtual(t.innerHTML)
          : $.pre(
            {data: {header: 1}, class: `codebox`},
            $.code($.escHtml(content.textContent.trim())) );
    });
  codeBlocks.pageCode = await codeElem(usedCodeFile);
  return codeBlocks;
}

function init() {
  const prefix = /codeberg/i.test(location.href) ? `CB` : `GH`;
  $.link({href: `./codebergicon.ico`, rel: `icon`, type: `image/x-icon`}).appendTo($(`head`));
  $.img({src: `https://sdn.nicon.nl/px0_${prefix}-HTMLHelpersDemo.png`});
}
