import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function PdfIntegrationComponent() {

    function exportToPdf() {
        screenShot()
    }

    function screenShot() {
        const input = document.getElementById('pdfIntegrationComponent')
        html2canvas(input, {logging:true, letterRendering:1, useCORS:true})
        .then (canvas => {
            const imgWidth = 200;
            const imgHeight =  canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('thegames.pdf')
        })
    }


    return(
        <>
            <main id='pdfIntegrationComponent'>
                <h1>PdfIntegrationComponent</h1>
                <button onClick={exportToPdf}>Export to PDF</button>
            </main>
        </>
    )
}