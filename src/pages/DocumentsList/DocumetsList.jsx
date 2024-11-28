import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import DocumentItem from '~shared-components/DocumentItem/DocumentItem';
import useFetch from '~hooks/useFetch';
import getDocuments from '~api/getDocuments';
import { useNotification } from '~context/NotificationContext';
import Loading from '~shared-components/Loading/Loading';
import ErrorHandler from '~shared-components/ErrorHandler/ErrorHandler';

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.9);
  }
 
  100% {
    transform: scale(1);
  }
`;

const DocumentsContainer = styled.div`
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 16px;
  // animation: ${pulseAnimation} 0.5s linear;
  margin-top: 16px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
  text-align: left;
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[900]};
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
        5000,
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

  // if (error)
  //   return (
  //     <StateContainerWrapper>
  //       <ErrorHandler message="Neuspešno učitavanje ugovora."></ErrorHandler>
  //     </StateContainerWrapper>
  //   );

  return (
    <DocumentsContainer>
      <Title>Ugovori</Title>
      <Wrapper>
        {documentsToRender.map((doc) => (
          <DocumentItem
            key={doc.doc_id}
            name={doc.name}
            navigateTo={`create/${doc.doc_id}`}
          />
        ))}
      </Wrapper>
    </DocumentsContainer>
  );
}

export default DocumentsList;
