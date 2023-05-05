import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// styles
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// components
import Modal from './components/modal/Modal';
import IconDocument from './assets/svg/iconDocument';
import IconChevronRight from './assets/svg/iconChevronRight';
import IconChevronLeft from './assets/svg/iconChevronLeft';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const tutorials = [
  {
    id: 1,
    icon: <IconDocument />,
    title: "Lorem ipsum dolor sit amet consectetur",
    document: "/documents/tutorials/document-1.pdf"
  },
  {
    id: 2,
    icon: <IconDocument />,
    title: "Sed do eiusmod tempor incididunt ut labore",
    document: "/documents/tutorials/document-2.pdf"
  },
  {
    id: 3,
    icon: <IconDocument />,
    title: "Ut enim ad minim veniam, quis nostrud",
    document: "/documents/tutorials/document-3.pdf"
  },
  {
    id: 4,
    icon: <IconDocument />,
    title: "Exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    document: "/documents/tutorials/document-4.pdf"
  },
  {
    id: 5,
    icon: <IconDocument />,
    title: "Duis aute irure dolor in reprehenderit in voluptate",
    document: "/documents/tutorials/document-5.pdf"
  },
  {
    id: 6,
    icon: <IconDocument />,
    title: "Velit esse cillum dolore eu fugiat nulla pariatur",
    document: "/documents/tutorials/document-1.pdf"
  },
  {
    id: 7,
    icon: <IconDocument />,
    title: "Excepteur sint occaecat cupidatat non proident sunt in",
    document: "/documents/tutorials/document-2.pdf"
  },
  {
    id: 8,
    icon: <IconDocument />,
    title: "Culpa qui officia deserunt mollit anim id est laborum",
    document: "/documents/tutorials/document-3.pdf"
  },
  {
    id: 9,
    icon: <IconDocument />,
    title: "Sapien et ligula ullamcorper malesuada proin libero",
    document: "/documents/tutorials/document-4.pdf"
  },
  {
    id: 10,
    icon: <IconDocument />,
    title: "Malesuada pellentesque elit eget gravida cum sociis",
    document: "/documents/tutorials/document-5.pdf"
  }
]

function App() {
  const [modalTitle, setModalTitle] = useState('');
  const [modalDocument, setModalDocument] = useState('');
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onTutorialLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }
  
  const showTutorial = (title, document) => {
    setModalTitle(title);
    setModalDocument(document);
    setShowTutorialModal(true);
  }

  const hideTutorial = () => {
    setModalTitle('');
    setModalDocument('');
    setShowTutorialModal(false);
    setPageNumber(1);
  }

  function changeTutorialPage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousTutorialPage() {
    changeTutorialPage(-1);
  }

  function nextTutorialPage() {
    changeTutorialPage(1);
  }

  return (
    <div className="app">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="page__title">React PDF Viewer Modal</h1>
          </div>
          <div className="col-12">
            <div className="buttons">
              <div className="buttons__grid">
                {tutorials.map(item => (
                  <button
                    key={item.id}
                    onClick={() => showTutorial(item.title, item.document)}
                    className="modal__trigger"
                  >
                    <span className="modal__trigger-icon">{item.icon}</span>
                    <span>{item.title}</span>
                  </button>
                ))}
                <Modal onClose={hideTutorial} showTutorialModal={showTutorialModal} title={modalTitle}>
                  <Document
                    key={modalTitle}
                    file={modalDocument}
                    onContextMenu={(e) => e.preventDefault()}
                    onLoadSuccess={onTutorialLoadSuccess}
                    className="pdf-container"
                  >
                    <Page key={modalTitle} pageNumber={pageNumber} />
                    { numPages > 1 ?
                      <div className="page-controls">
                        <button
                          type="button"
                          disabled={pageNumber <= 1}
                          onClick={previousTutorialPage}
                          className="page-controls__prev"
                        >
                          <IconChevronLeft />
                          <span className="sr-only">Previous Page</span>
                        </button>
                        <div className="page-controls__nav">
                            <span>{pageNumber || (numPages ? 1 : '--')}</span>
                            <span>of</span>
                            <span>{numPages || '--'}</span>
                        </div>
                        <button
                          type="button"
                          disabled={pageNumber >= numPages}
                          onClick={nextTutorialPage}
                          className="page-controls__next"
                        >
                          <IconChevronRight />
                          <span className="sr-only">Next Page</span>
                        </button>
                      </div>
                      :
                      null
                    }
                  </Document>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>


      
    </div>
  );
}

export default App;
