import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyPdfViewer = () => {
  const pdfURL = 'example.pdf'; // URL del archivo PDF

  return (
    <div>
      <Document file={pdfURL}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default MyPdfViewer;
