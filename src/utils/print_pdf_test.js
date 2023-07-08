import html2pdf from "html2pdf.js";

export default async function printPdf(html) {
  const options = {
    margin: 0,

    filename: `exported.pdf`,

    image: {
      type: "jpeg",
      quality: 0.98
    },

    enableLinks: false,

    html2canvas: {
      scale: 2,
      useCORS: true
    },

    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait"
    }
  };
  const pdfContent = document.createElement("div");
  pdfContent.innerHTML = html;
  const html2PdfSetup = html2pdf().set(options).from(pdfContent);
  const pdfBlobUrl = await html2PdfSetup.output("bloburl");
  // const pdfBlob = await pdfBlobUrl.text();
  // console.log(pdfBlob);
  // window.open("test://" + pdfBlob, "_blank");
  let iframe = document.getElementById("myIframe");
  iframe = iframe || document.createElement("iframe");
  const f = document.body.appendChild(iframe);
  const w = f.contentWindow || f.contentDocument;
  iframe.id = "myIframe";
  iframe.src = pdfBlobUrl;
  iframe.setAttribute(
    "style",
    "position:absolute;width:80vw;height:60vh;top:20vh;left:10vw;visibility:hidden;"
  );

  function closePrint() {
    console.log("aha");
    // document.body.removeChild(iframe);
  }

  function setPrint() {
    // w.onbeforeunload = setTimeout(closePrint, 10);
    w.onafterprint = setTimeout(closePrint, 10);
    w.focus(); // Required for IE
    w.print();
  }

  iframe.onload = setPrint;
}
