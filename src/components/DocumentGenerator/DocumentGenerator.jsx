import React, { useState } from 'react';
import styled from 'styled-components';
import Mammoth from 'mammoth';
import { formatOnlyFirstUpper } from '~utils/util';
import { getDocForm, downloadFile } from '~utils/fileDownloader';
import { PatchType, TextRun, patchDocument } from 'docx';
import { fieldsForFormating } from './consts';
import {
  InfoCircleLineIcon,
  DownloadToStorageIcon,
  OverviewIcon,
} from '~components/Icons';

// Styled Components sa bojama iz teme
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 900px;
  max-height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.palette.red.main};
  color: ${({ theme }) => theme.palette.red.contrastText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.secondary.dark};
  }
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.palette.businessBlue.main};
  color: ${({ theme }) => theme.palette.businessBlue.contrastText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.businessBlue.dark};
  }
`;

const StyledDownloadToStorageIcon = styled(DownloadToStorageIcon)`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.palette.businessBlue.contrastText};
`;

const ScrollContainer = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
`;

const A4Paper = styled.div`
  width: 595px;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.white};
  border: 1px solid ${({ theme }) => theme.palette.grey[400]};
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;
const WordStyledContent = styled.div`
  font-family: 'Times New Roman', Times, serif;
  font-size: 9pt;
  line-height: 1.5;
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: center;
  width: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;

  p {
    margin: 0 0 1em;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  ul {
    padding-left: 20px;
    margin: 0 0 1em;

    li {
      margin-bottom: 0.5em;
    }
  }
`;

const InfoMessage = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.warn.contrastText};
  background-color: ${({ theme }) => theme.palette.warn.main};
  padding: 12px 16px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const StyledInfoCircleIcon = styled(InfoCircleLineIcon)`
  width: 28px;
  height: 28px;
  fill: ${({ theme }) => theme.palette.warn.contrastText};
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

  function formatField(key, value) {
    const fieldName = key.split('_')[0];
    return fieldsForFormating.includes(fieldName)
      ? formatOnlyFirstUpper(value)
      : value;
  }

  async function fillWordDocument(wordBin, readFields) {
    const patches = {};
    Object.keys(readFields).forEach((key) => {
      const val = formatField(key, readFields[key]);
      patches[key] = {
        type: PatchType.PARAGRAPH,
        children: [new TextRun({ text: val, underline: { type: 'single' } })],
      };
    });

    const res = await patchDocument(wordBin, { patches });
    return res;
  }

  const generateAndDisplayDoc = async () => {
    try {
      const docS3Bytes = await getDocForm(templateURL);
      const filledBytes = await fillWordDocument(docS3Bytes, readFields);
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
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ButtonRow>
              <CloseButton onClick={closeModal}>Zatvori</CloseButton>
              <SaveButton onClick={handleDownload}>
                <StyledDownloadToStorageIcon />
                Sačuvaj dokument
              </SaveButton>
            </ButtonRow>
            <InfoMessage>
              <StyledInfoCircleIcon />
              Ovaj pregled dokumenta ne prikazuje konačan izgled. Preuzeti
              dokument će biti ispravno formatiran i stilizovan.
            </InfoMessage>
            <ScrollContainer>
              <A4Paper>
                <WordStyledContent
                  dangerouslySetInnerHTML={{ __html: docContent }}
                />
              </A4Paper>
            </ScrollContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default DocumentGenerator;
