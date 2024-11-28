import React, { useEffect } from 'react';
import styled from 'styled-components';
import DocumentItem from '~shared-components/DocumentItem/DocumentItem';
import useFetch from '~hooks/useFetch';
import getDocuments from '~api/getDocuments';
import { useNotification } from '~context/NotificationContext';
import Loading from '~shared-components/Loading/Loading';
import ErrorHandler from '~shared-components/ErrorHandler/ErrorHandler';

const DocumentsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 16px;
`;

const StateContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const mockedDocuments = [
  {
    doc_id: 'mock-14343',
    name: 'Mokovani Ugovor 1',
    document_url_pdf: '/mock-url-1.pdf',
  },
  {
    doc_id: 'mock-1322',
    name: 'Mokovani Ugovor 2fsdf',
    document_url_pdf: '/mock-url-2.pdf',
  },
  {
    doc_id: 'mock-12312',
    name: 'Mokovani Ugovor 2dfgdf',
    document_url_pdf: '/mock-url-2.pdf',
  },
  {
    doc_id: 'mock-342',
    name: 'Mokovani Ugovor 2213',
    document_url_pdf: '/mock-url-2.pdf',
  },
  {
    doc_id: 'mock-665',
    name: 'Mokovani Ugovor 231231',
    document_url_pdf: '/mock-url-2.pdf',
  },
];

function DocumentsList() {
  const { data: documents, loading, error } = useFetch(getDocuments);
  const showNotification = useNotification();
  const documentsToRender = error || !documents ? mockedDocuments : documents;

  useEffect(() => {
    if (error) {
      showNotification(
        'Neuspešno učitavanje dokumentata. Molimo vas pokušajte opet.',
        3000,
        'error'
      );
    }
  }, [error]);

  if (documents?.length === 0)
    return (
      <StateContainerWrapper>
        <ErrorHandler message="Lista dokumenata je prazna."></ErrorHandler>
      </StateContainerWrapper>
    );

  if (loading)
    return (
      <StateContainerWrapper>
        <Loading />
      </StateContainerWrapper>
    );

  if (error)
    return (
      <StateContainerWrapper>
        <ErrorHandler message="Neuspešno učitavanje liste."></ErrorHandler>
      </StateContainerWrapper>
    );

  return (
    <DocumentsContainer>
      {documents.map((doc) => (
        <DocumentItem
          key={doc.doc_id}
          name={doc.name}
          navigateTo={`/create/${doc.doc_id}`}
        />
      ))}
    </DocumentsContainer>
  );
}

export default DocumentsList;
