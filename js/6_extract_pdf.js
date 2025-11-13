let chunks = [];
let pdfLoaded = false;
async function extractPdfText() {
  const PDF_URL = '/quran_translation.pdf'; // Change this to your actual PDF URL
  const response = await fetch(PDF_URL);
  const arrayBuffer = await response.arrayBuffer();
  pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js';
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    //console.log("page no: "+page);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    chunks.push(pageText);
   // console.log('PDF pageText:', pageText);
    //fullText += pageText + '\n';
  }

 //console.log('PDF text extracted:', fullText); cons
  // Save fullText for use as context in your LLM
}
