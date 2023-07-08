function addOverlay() {
  const overlay = document.createElement("div");
  overlay.style =
    "position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.8);overflow:auto;";
  document.body.appendChild(overlay);
  overlay.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
  return overlay;
}

function fetchAndRemove(overlay) {
  const previewHtml = overlay.innerHTML;
  document.body.removeChild(overlay);
  return previewHtml;
}

function addPage(divCenter, pageSetting) {
  const page = document.createElement("div");
  page.className = "page";
  page.style = `width:${
    pageSetting.dir === "landscape" ? pageSetting.longer : pageSetting.shorter
  }mm;height:${
    pageSetting.dir === "landscape" ? pageSetting.shorter : pageSetting.longer
  }mm;background-color:white;position:relative;`;

  page.appendChild(addLayout(divCenter, pageSetting));

  const mask = document.createElement("div");
  mask.style = `position:absolute;top:0;right:0;bottom:0;left:0;background-color:transparent;cursor:grab;`;
  page.appendChild(mask);
  return page;
}

function addLayout(divCenter, pageSetting) {
  const layout = document.createElement("table");
  const tBody = document.createElement("tBody");
  const tRow = document.createElement("tr");

  const tdLeft = document.createElement("td");
  tdLeft.style = `width:${pageSetting.left}mm;`;
  tRow.appendChild(tdLeft);

  const tdCenter = document.createElement("td");
  tdCenter.style = `width:${
    (pageSetting.dir === "landscape"
      ? pageSetting.longer
      : pageSetting.shorter) -
    pageSetting.left -
    pageSetting.right
  }mm;`;
  tRow.appendChild(tdCenter);

  const tdRight = document.createElement("td");
  tdRight.style = `width:${pageSetting.right}mm;`;
  tRow.appendChild(tdRight);

  const divTop = document.createElement("div");
  divTop.style = `height:${pageSetting.top}mm;`;
  tdCenter.appendChild(divTop);

  tdCenter.appendChild(divCenter);

  tBody.appendChild(tRow);
  layout.appendChild(tBody);
  return layout;
}

function calcPxRedLine(page, pageSetting, pageCount) {
  const mmPageWidth =
    pageSetting.dir === "landscape" ? pageSetting.longer : pageSetting.shorter;
  const mmPageHeight =
    pageSetting.dir === "landscape" ? pageSetting.shorter : pageSetting.longer;
  return (
    ((pageCount * mmPageHeight + (mmPageHeight - pageSetting.bottom)) *
      page.clientWidth) /
    mmPageWidth
  );
}

function calcPxPageHeight(page, pageSetting) {
  const mmPageWidth =
    pageSetting.dir === "landscape" ? pageSetting.longer : pageSetting.shorter;
  const mmPageHeight =
    pageSetting.dir === "landscape" ? pageSetting.shorter : pageSetting.longer;
  return (
    ((mmPageHeight - pageSetting.bottom - pageSetting.top) * page.clientWidth) /
    mmPageWidth
  );
}

function newPage(html) {
  const divCenter = document.createElement("div");
  divCenter.className = "w-e-text-container";
  if (html) {
    divCenter.innerHTML = html;
  }
  return divCenter;
}

function nextPage(page, pxRedLine, pxPageHeight) {
  console.log("nextPage start");
  function getWrapper(fnInstance) {
    let instance = null;
    return function (raw) {
      if (raw) return instance;
      if (instance != null) return instance;
      return (instance = fnInstance());
    };
  }

  function breakDown(origWrapper, fnNewWrapper) {
    let el = origWrapper.lastElementChild;

    if (el == null && origWrapper.firstChild instanceof Text) {
      const newWrapper = fnNewWrapper();
      let toNew = true,
        len = 0;
      while (true) {
        if (toNew) {
          len = origWrapper.lastChild.length;
          console.log("len", len);
          if (len === 0) break;

          const newText = origWrapper.lastChild.splitText(len / 2);
          newWrapper.insertBefore(newText, newWrapper.firstChild);
        } else {
          len = newWrapper.firstChild.length;
          console.log("len", len);
          if (len <= 1) break;

          newWrapper.firstChild.splitText(len / 2);
          origWrapper.appendChild(newWrapper.firstChild);
        }

        const clientRect = origWrapper.getBoundingClientRect();
        toNew = clientRect.bottom > pxRedLine;
      }

      origWrapper.normalize();
      newWrapper.normalize();
      return newWrapper;
    }

    while (el != null) {
      const clientRect = el.getBoundingClientRect();
      console.log(
        el.tagName,
        JSON.stringify(clientRect),
        pxRedLine,
        pxPageHeight
      );
      // el = el.previousElementSibling;
      if (clientRect.bottom <= pxRedLine) {
        break;
      }

      let mode = "move"; // or 'break'

      if (clientRect.top < pxRedLine) {
        const style = window.getComputedStyle(el);
        if (style.breakInside === "auto" || style.pageBreakInside === "auto") {
          mode = "break";
        }

        if (clientRect.bottom - clientRect.top > pxPageHeight) {
          mode = "break";
        }
      }

      console.log("mode", mode);

      if (mode === "move") {
        const newWrapper = fnNewWrapper();
        newWrapper.insertBefore(el.cloneNode(true), newWrapper.firstChild);

        const tmpEl = el;
        el = el.previousElementSibling;
        origWrapper.removeChild(tmpEl);
      }

      if (mode === "break") {
        const newWrapper = fnNewWrapper();
        const elClone = el.cloneNode();
        newWrapper.insertBefore(
          breakDown(
            el,
            getWrapper(() => elClone)
          ),
          newWrapper.firstChild
        );

        el = el.previousElementSibling;
      }
    }

    return fnNewWrapper(true);
  }

  const getNewPage = getWrapper(newPage);

  const curDivCenter = page.querySelector(".w-e-text-container");

  return breakDown(curDivCenter, getNewPage);
}

export default function printPreview(html, pageSetting) {
  const overlay = addOverlay();

  let page,
    pageCount = 0,
    divCenter = newPage(html);
  while (divCenter != null) {
    overlay.appendChild((page = addPage(divCenter, pageSetting)));
    divCenter = nextPage(
      page,
      calcPxRedLine(page, pageSetting, pageCount++),
      calcPxPageHeight(page, pageSetting)
    );
  }

  return fetchAndRemove(overlay);
}
