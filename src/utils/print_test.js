export default function print(html, pageSetting) {
  var w,
    doc,
    iframe = document.getElementById("myIframe"),
    f;
  if (iframe) {
    document.body.removeChild(iframe);
  }
  iframe = document.createElement("iframe");
  iframe.id = "myIframe";
  //iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";
  iframe.setAttribute(
    "style",
    "position:absolute;width:0;height:0;top:-10px;left:-10px;"
  );
  f = document.body.appendChild(iframe);
  w = f.contentWindow || f.contentDocument;
  doc = f.contentDocument || f.contentWindow.document;
  doc.open();
  doc.write(
    `<style>@page{margin: 0;size: ${pageSetting.type} ${pageSetting.dir};}
    :root,
    :host {
      --w-e-textarea-bg-color: #fff;
      --w-e-textarea-color: #333;
      --w-e-textarea-border-color: #ccc;
      --w-e-textarea-slight-border-color: #e8e8e8;
      --w-e-textarea-slight-color: #d4d4d4;
      --w-e-textarea-slight-bg-color: #f5f2f0;
      --w-e-textarea-selected-border-color: #b4d5ff;
      --w-e-textarea-handler-bg-color: #4290f7;
      --w-e-toolbar-color: #595959;
      --w-e-toolbar-bg-color: #fff;
      --w-e-toolbar-active-color: #333;
      --w-e-toolbar-active-bg-color: #f1f1f1;
      --w-e-toolbar-disabled-color: #999;
      --w-e-toolbar-border-color: #e8e8e8;
      --w-e-modal-button-bg-color: #fafafa;
      --w-e-modal-button-border-color: #d9d9d9;
    }
    
    .w-e-text-container *,
    .w-e-toolbar * {
      box-sizing: border-box;
      margin: 0;
      outline: none;
      padding: 0;
    }
    .w-e-text-container blockquote,
    .w-e-text-container li,
    .w-e-text-container p,
    .w-e-text-container td,
    .w-e-text-container th,
    .w-e-toolbar * {
      line-height: 1.5;
    }
    .w-e-text-container {
      background-color: var(--w-e-textarea-bg-color);
      color: var(--w-e-textarea-color);
      height: 100%;
      position: relative;
    }
    .w-e-text-container .w-e-scroll {
      -webkit-overflow-scrolling: touch;
      height: 100%;
    }
    .w-e-text-container [data-slate-editor] {
      word-wrap: break-word;
      border-top: 1px solid transparent;
      min-height: 100%;
      outline: 0;
      padding: 0 10px;
      white-space: pre-wrap;
    }
    .w-e-text-container p {
      margin: 15px 0;
    }
    .w-e-text-container h1,
    .w-e-text-container h2,
    .w-e-text-container h3,
    .w-e-text-container h4,
    .w-e-text-container h5 {
      margin: 20px 0;
    }
    .w-e-text-container img {
      cursor: default;
      display: inline !important;
      max-width: 100%;
      min-height: 20px;
      min-width: 20px;
    }
    .w-e-text-container [data-selected="true"] {
      box-shadow: 0 0 0 2px var(--w-e-textarea-selected-border-color);
    }
    .w-e-text-placeholder {
      font-style: italic;
      left: 10px;
      top: 17px;
      width: 90%;
    }
    .w-e-max-length-info,
    .w-e-text-placeholder {
      color: var(--w-e-textarea-slight-color);
      pointer-events: none;
      position: absolute;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }
    .w-e-max-length-info {
      bottom: 0.5em;
      right: 1em;
    }
    .w-e-bar {
      background-color: var(--w-e-toolbar-bg-color);
      color: var(--w-e-toolbar-color);
      font-size: 14px;
      padding: 0 5px;
    }
    .w-e-bar svg {
      fill: var(--w-e-toolbar-color);
      height: 14px;
      width: 14px;
    }
    .w-e-bar-show {
      display: flex;
    }
    .w-e-bar-hidden {
      display: none;
    }
    .w-e-hover-bar {
      border: 1px solid var(--w-e-toolbar-border-color);
      border-radius: 3px;
      box-shadow: 0 2px 5px #0000001f;
      position: absolute;
    }
    .w-e-toolbar {
      flex-wrap: wrap;
      position: relative;
    }
    .w-e-bar-divider {
      background-color: var(--w-e-toolbar-border-color);
      display: inline-flex;
      height: 40px;
      margin: 0 5px;
      width: 1px;
    }
    .w-e-bar-item {
      display: flex;
      height: 40px;
      padding: 4px;
      position: relative;
      text-align: center;
    }
    .w-e-bar-item,
    .w-e-bar-item button {
      align-items: center;
      justify-content: center;
    }
    .w-e-bar-item button {
      background: transparent;
      border: none;
      color: var(--w-e-toolbar-color);
      cursor: pointer;
      display: inline-flex;
      height: 32px;
      overflow: hidden;
      padding: 0 8px;
      white-space: nowrap;
    }
    .w-e-bar-item button:hover {
      background-color: var(--w-e-toolbar-active-bg-color);
      color: var(--w-e-toolbar-active-color);
    }
    .w-e-bar-item button .title {
      margin-left: 5px;
    }
    .w-e-bar-item .active {
      background-color: var(--w-e-toolbar-active-bg-color);
      color: var(--w-e-toolbar-active-color);
    }
    .w-e-bar-item .disabled {
      color: var(--w-e-toolbar-disabled-color);
      cursor: not-allowed;
    }
    .w-e-bar-item .disabled svg {
      fill: var(--w-e-toolbar-disabled-color);
    }
    .w-e-bar-item .disabled:hover {
      background-color: var(--w-e-toolbar-bg-color);
      color: var(--w-e-toolbar-disabled-color);
    }
    .w-e-bar-item .disabled:hover svg {
      fill: var(--w-e-toolbar-disabled-color);
    }
    .w-e-menu-tooltip-v5:before {
      background-color: var(--w-e-toolbar-active-color);
      border-radius: 5px;
      color: var(--w-e-toolbar-bg-color);
      content: attr(data-tooltip);
      font-size: 0.75em;
      opacity: 0;
      padding: 5px 10px;
      position: absolute;
      text-align: center;
      top: 40px;
      transition: opacity 0.6s;
      visibility: hidden;
      white-space: pre;
      z-index: 1;
    }
    .w-e-menu-tooltip-v5:after {
      border: 5px solid transparent;
      border-bottom: 5px solid var(--w-e-toolbar-active-color);
      content: "";
      opacity: 0;
      position: absolute;
      top: 30px;
      transition: opacity 0.6s;
      visibility: hidden;
    }
    .w-e-menu-tooltip-v5:hover:after,
    .w-e-menu-tooltip-v5:hover:before {
      opacity: 1;
      visibility: visible;
    }
    .w-e-menu-tooltip-v5.tooltip-right:before {
      left: 100%;
      top: 10px;
    }
    .w-e-menu-tooltip-v5.tooltip-right:after {
      border-bottom-color: transparent;
      border-left-color: transparent;
      border-right-color: var(--w-e-toolbar-active-color);
      border-top-color: transparent;
      left: 100%;
      margin-left: -10px;
      top: 16px;
    }
    .w-e-bar-item-group .w-e-bar-item-menus-container {
      background-color: var(--w-e-toolbar-bg-color);
      border: 1px solid var(--w-e-toolbar-border-color);
      border-radius: 3px;
      box-shadow: 0 2px 10px #0000001f;
      display: none;
      left: 0;
      margin-top: 40px;
      position: absolute;
      top: 0;
      z-index: 1;
    }
    .w-e-bar-item-group:hover .w-e-bar-item-menus-container {
      display: block;
    }
    .w-e-select-list {
      background-color: var(--w-e-toolbar-bg-color);
      border: 1px solid var(--w-e-toolbar-border-color);
      border-radius: 3px;
      box-shadow: 0 2px 10px #0000001f;
      left: 0;
      margin-top: 40px;
      max-height: 350px;
      min-width: 100px;
      overflow-y: auto;
      position: absolute;
      top: 0;
      z-index: 1;
    }
    .w-e-select-list ul {
      line-height: 1;
      list-style: none;
    }
    .w-e-select-list ul .selected {
      background-color: var(--w-e-toolbar-active-bg-color);
    }
    .w-e-select-list ul li {
      cursor: pointer;
      padding: 7px 0 7px 25px;
      position: relative;
      text-align: left;
      white-space: nowrap;
    }
    .w-e-select-list ul li:hover {
      background-color: var(--w-e-toolbar-active-bg-color);
    }
    .w-e-select-list ul li svg {
      left: 0;
      margin-left: 5px;
      margin-top: -7px;
      position: absolute;
      top: 50%;
    }
    .w-e-bar-bottom .w-e-select-list {
      bottom: 0;
      margin-bottom: 40px;
      margin-top: 0;
      top: inherit;
    }
    .w-e-drop-panel {
      background-color: var(--w-e-toolbar-bg-color);
      border: 1px solid var(--w-e-toolbar-border-color);
      border-radius: 3px;
      box-shadow: 0 2px 10px #0000001f;
      margin-top: 40px;
      min-width: 200px;
      padding: 10px;
      position: absolute;
      top: 0;
      z-index: 1;
    }
    .w-e-bar-bottom .w-e-drop-panel {
      bottom: 0;
      margin-bottom: 40px;
      margin-top: 0;
      top: inherit;
    }
    .w-e-modal {
      background-color: var(--w-e-toolbar-bg-color);
      border: 1px solid var(--w-e-toolbar-border-color);
      border-radius: 3px;
      box-shadow: 0 2px 10px #0000001f;
      color: var(--w-e-toolbar-color);
      font-size: 14px;
      min-height: 40px;
      min-width: 100px;
      padding: 20px 15px 0;
      position: absolute;
      text-align: left;
      z-index: 1;
    }
    .w-e-modal .btn-close {
      cursor: pointer;
      line-height: 1;
      padding: 5px;
      position: absolute;
      right: 8px;
      top: 7px;
    }
    .w-e-modal .btn-close svg {
      fill: var(--w-e-toolbar-color);
      height: 10px;
      width: 10px;
    }
    .w-e-modal .babel-container {
      display: block;
      margin-bottom: 15px;
    }
    .w-e-modal .babel-container span {
      display: block;
      margin-bottom: 10px;
    }
    .w-e-modal .button-container {
      margin-bottom: 15px;
    }
    .w-e-modal button {
      background-color: var(--w-e-modal-button-bg-color);
      border: 1px solid var(--w-e-modal-button-border-color);
      border-radius: 4px;
      color: var(--w-e-toolbar-color);
      cursor: pointer;
      font-weight: 400;
      height: 32px;
      padding: 4.5px 15px;
      text-align: center;
      touch-action: manipulation;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      white-space: nowrap;
    }
    .w-e-modal input[type="number"],
    .w-e-modal input[type="text"],
    .w-e-modal textarea {
      font-feature-settings: "tnum";
      background-color: var(--w-e-toolbar-bg-color);
      border: 1px solid var(--w-e-modal-button-border-color);
      border-radius: 4px;
      color: var(--w-e-toolbar-color);
      font-variant: tabular-nums;
      padding: 4.5px 11px;
      transition: all 0.3s;
      width: 100%;
    }
    .w-e-modal textarea {
      min-height: 60px;
    }
    body .w-e-modal,
    body .w-e-modal * {
      box-sizing: border-box;
    }
    .w-e-progress-bar {
      background-color: var(--w-e-textarea-handler-bg-color);
      height: 1px;
      position: absolute;
      transition: width 0.3s;
      width: 0;
    }
    .w-e-full-screen-container {
      bottom: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      height: 100% !important;
      left: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      position: fixed;
      right: 0 !important;
      top: 0 !important;
      width: 100% !important;
    }
    .w-e-full-screen-container [data-w-e-textarea="true"] {
      flex: 1 !important;
    }
    .w-e-text-container code {
      background-color: var(--w-e-textarea-slight-bg-color);
      border-radius: 3px;
      font-family: monospace;
      padding: 3px;
    }
    .w-e-panel-content-color {
      list-style: none;
      text-align: left;
      width: 230px;
    }
    .w-e-panel-content-color li {
      border: 1px solid var(--w-e-toolbar-bg-color);
      border-radius: 3px 3px;
      cursor: pointer;
      display: inline-block;
      padding: 2px;
    }
    .w-e-panel-content-color li:hover {
      border-color: var(--w-e-toolbar-color);
    }
    .w-e-panel-content-color li .color-block {
      border: 1px solid var(--w-e-toolbar-border-color);
      border-radius: 3px 3px;
      height: 17px;
      width: 17px;
    }
    .w-e-panel-content-color .active {
      border-color: var(--w-e-toolbar-color);
    }
    .w-e-panel-content-color .clear {
      line-height: 1.5;
      margin-bottom: 5px;
      width: 100%;
    }
    .w-e-panel-content-color .clear svg {
      height: 16px;
      margin-bottom: -4px;
      width: 16px;
    }
    .w-e-text-container blockquote {
      background-color: var(--w-e-textarea-slight-bg-color);
      border-left: 8px solid var(--w-e-textarea-selected-border-color);
      display: block;
      font-size: 100%;
      line-height: 1.5;
      margin: 10px 0;
      padding: 10px;
    }
    .w-e-panel-content-emotion {
      font-size: 20px;
      list-style: none;
      text-align: left;
      width: 300px;
    }
    .w-e-panel-content-emotion li {
      border-radius: 3px 3px;
      cursor: pointer;
      display: inline-block;
      padding: 0 5px;
    }
    .w-e-panel-content-emotion li:hover {
      background-color: var(--w-e-textarea-slight-bg-color);
    }
    .w-e-textarea-divider {
      border-radius: 3px;
      margin: 20px auto;
      padding: 20px;
    }
    .w-e-textarea-divider hr {
      background-color: var(--w-e-textarea-border-color);
      border: 0;
      display: block;
      height: 1px;
    }
    .w-e-text-container pre > code {
      background-color: var(--w-e-textarea-slight-bg-color);
      border: 1px solid var(--w-e-textarea-slight-border-color);
      border-radius: 4px 4px;
      display: block;
      font-size: 14px;
      padding: 10px;
      text-indent: 0;
    }
    .w-e-text-container .w-e-image-container {
      display: inline-block;
      margin: 0 10px;
    }
    .w-e-text-container .w-e-image-container:hover {
      box-shadow: 0 0 0 2px var(--w-e-textarea-selected-border-color);
    }
    .w-e-text-container .w-e-selected-image-container {
      overflow: hidden;
      position: relative;
    }
    .w-e-text-container .w-e-selected-image-container .w-e-image-dragger {
      background-color: var(--w-e-textarea-handler-bg-color);
      height: 7px;
      position: absolute;
      width: 7px;
    }
    .w-e-text-container .w-e-selected-image-container .left-top {
      cursor: nwse-resize;
      left: 0;
      top: 0;
    }
    .w-e-text-container .w-e-selected-image-container .right-top {
      cursor: nesw-resize;
      right: 0;
      top: 0;
    }
    .w-e-text-container .w-e-selected-image-container .left-bottom {
      bottom: 0;
      cursor: nesw-resize;
      left: 0;
    }
    .w-e-text-container .w-e-selected-image-container .right-bottom {
      bottom: 0;
      cursor: nwse-resize;
      right: 0;
    }
    .w-e-text-container .w-e-selected-image-container:hover {
      box-shadow: none;
    }
    .w-e-text-container [contenteditable="false"] .w-e-image-container:hover {
      box-shadow: none;
    }
    .w-e-text-container ol,
    .w-e-text-container ul {
      padding-left: 20px;
    }
    .w-e-text-container li {
      line-height: inherit;
      margin: 10px 0;
    }
    .w-e-text-container table {
      border-collapse: collapse;
    }
    .w-e-text-container table td,
    .w-e-text-container table th {
      border: 1px solid var(--w-e-textarea-border-color);
      line-height: 1.5;
      min-width: 50px;
      padding: 3px 5px;
      text-align: left;
    }
    .w-e-text-container table th {
      background-color: var(--w-e-textarea-slight-bg-color);
      font-weight: 700;
      text-align: center;
    }
    .w-e-text-container table.full-width {
      width: 100%;
    }
    .w-e-text-container table.full-width td.th {
      min-width: 0;
    }
    .w-e-panel-content-table {
      background-color: var(--w-e-toolbar-bg-color);
    }
    .w-e-panel-content-table table {
      border-collapse: collapse;
    }
    .w-e-panel-content-table td {
      border: 1px solid var(--w-e-toolbar-border-color);
      cursor: pointer;
      height: 15px;
      padding: 3px 5px;
      width: 20px;
    }
    .w-e-panel-content-table td.active {
      background-color: var(--w-e-toolbar-active-bg-color);
    }
    .w-e-textarea-video-container {
      border: 1px solid var(--w-e-textarea-border-color);
      margin: 0 auto;
      padding: 10px 0;
      text-align: center;
      width: 480px;
    }
    .w-e-textarea-video-container iframe {
      height: 245px;
      width: 450px;
    }
    .w-e-textarea-video-container video {
      width: 450px;
    }
    
    .w-e-text-container pre > code {
      word-wrap: normal;
      font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
      -webkit-hyphens: none;
      hyphens: none;
      line-height: 1.5;
      margin: 0.5em 0;
      overflow: auto;
      padding: 1em;
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      text-align: left;
      text-shadow: 0 1px #fff;
      white-space: pre;
      word-break: normal;
      word-spacing: normal;
    }
    .w-e-text-container pre > code .token.cdata,
    .w-e-text-container pre > code .token.comment,
    .w-e-text-container pre > code .token.doctype,
    .w-e-text-container pre > code .token.prolog {
      color: #708090;
    }
    .w-e-text-container pre > code .token.punctuation {
      color: #999;
    }
    .w-e-text-container pre > code .token.namespace {
      opacity: 0.7;
    }
    .w-e-text-container pre > code .token.boolean,
    .w-e-text-container pre > code .token.constant,
    .w-e-text-container pre > code .token.deleted,
    .w-e-text-container pre > code .token.number,
    .w-e-text-container pre > code .token.property,
    .w-e-text-container pre > code .token.symbol,
    .w-e-text-container pre > code .token.tag {
      color: #905;
    }
    .w-e-text-container pre > code .token.attr-name,
    .w-e-text-container pre > code .token.builtin,
    .w-e-text-container pre > code .token.char,
    .w-e-text-container pre > code .token.inserted,
    .w-e-text-container pre > code .token.selector,
    .w-e-text-container pre > code .token.string {
      color: #690;
    }
    .w-e-text-container pre > code .language-css .token.string,
    .w-e-text-container pre > code .style .token.string,
    .w-e-text-container pre > code .token.entity,
    .w-e-text-container pre > code .token.operator,
    .w-e-text-container pre > code .token.url {
      color: #9a6e3a;
    }
    .w-e-text-container pre > code .token.atrule,
    .w-e-text-container pre > code .token.attr-value,
    .w-e-text-container pre > code .token.keyword {
      color: #07a;
    }
    .w-e-text-container pre > code .token.class-name,
    .w-e-text-container pre > code .token.function {
      color: #dd4a68;
    }
    .w-e-text-container pre > code .token.important,
    .w-e-text-container pre > code .token.regex,
    .w-e-text-container pre > code .token.variable {
      color: #e90;
    }
    .w-e-text-container pre > code .token.bold,
    .w-e-text-container pre > code .token.important {
      font-weight: 700;
    }
    .w-e-text-container pre > code .token.italic {
      font-style: italic;
    }
    .w-e-text-container pre > code .token.entity {
      cursor: help;
    }    
    </style>` + html
  );
  doc.close();
  iframe.onload = function () {
    try {
      setTimeout(function () {
        w.focus();
        try {
          if (!w.document.execCommand("print", false, null)) {
            w.print();
          }
        } catch (e) {
          w.print();
        }
        w.close();
      }, 10);
    } catch (err) {
      console.log("err", err);
    }
    // setTimeout(function () {
    //   document.body.removeChild(iframe);
    // }, 100);
  };
}
