import React, { useState } from 'react';
import styled from 'styled-components';
import Mammoth from 'mammoth';
import DocumentModal from '~components/DocumentModal/DocumentModal';
import { addCustomFields, fillWordDocument } from '~utils/documentUtils';
import { getDocForm, downloadFile } from '~utils/fileDownloader';

import { OverviewIcon } from '~components/Icons';

const GenerateButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

const StyledOverviewIcon = styled(OverviewIcon)`
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.palette.primary.contrastText};
`;

function DocumentGenerator({ templateURL, readFields }) {
  const [docContent, setDocContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [downloadBlob, setDownloadBlob] = useState(null);

  const generateAndDisplayDoc = async () => {
    try {
      const enrichedFields = addCustomFields(readFields);
      const docS3Bytes = await getDocForm(templateURL);
      const filledBytes = await fillWordDocument(docS3Bytes, enrichedFields);
      const filledBlob = new Blob([filledBytes], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      setDownloadBlob(filledBlob);

      const arrayBuffer = await filledBlob.arrayBuffer();
      const result = await Mammoth.convertToHtml({ arrayBuffer });
      setDocContent(result.value);
      setShowModal(true);
    } catch (error) {
      console.error('Error generating document:', error);
    }
  };

  const handleDownload = () => {
    if (downloadBlob) {
      const fileName = `filled-document.docx`;
      downloadFile(downloadBlob, fileName);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <GenerateButton onClick={generateAndDisplayDoc}>
        <StyledOverviewIcon />
        Pregledaj dokument
      </GenerateButton>

      {showModal && (
        <DocumentModal
          docContent={docContent}
          handleDownload={handleDownload}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default DocumentGenerator;
