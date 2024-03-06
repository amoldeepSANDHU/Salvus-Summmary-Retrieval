document.getElementById('pdfFile').addEventListener('change', function (event) {
    const file = event.target.files[0];
  
    if (!file || !file.type.includes('pdf')) {
        alert('Please upload a valid PDF file.');
        return;
    }
  
    const reader = new FileReader();
  
    reader.onload = function () {
        const typedarray = new Uint8Array(reader.result);
        displayPDFText(typedarray);
    };
  
    reader.readAsArrayBuffer(file);
  });
  
  function displayPDFText(typedarray) {
    pdfjsLib.getDocument(typedarray).promise.then(function (pdfDoc) {
        let textContent = '';
  
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            pdfDoc.getPage(pageNum).then(function (page) {
                page.getTextContent().then(function (content) {
                    const pageText = content.items.map(function (item) {
                        return item.str;
                    }).join(' ');
  
                    textContent += pageText + '\n';
  
                    if (pageNum === pdfDoc.numPages) {
                        document.getElementById('textInput').value = textContent;
                    }
                });
            });
        }
    });
  }
  