import React from 'react';
import styled from 'styled-components';
import DocumentItem from '~shared-components/DocumentItem/DocumentItem';
import { DescriptionIcon, EditDocumentIcon } from '~components/Icons';
import useFetch from '~hooks/useFetch';
import getDocuments from '~api/getDocuments';

const DocumentsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1rem;
  margin: 16px;
`;

const Loader = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.palette.grey[600]};
  margin: 16px;
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
  const documentsToRender = error || !documents ? mockedDocuments : documents;

  if (loading) return <Loader>Loading documents...</Loader>;
  // if (error) return <ErrorMessage>Error: {error.message}</ErrorMessage>;

  return (
    <DocumentsContainer>
      {documentsToRender.map((doc) => (
        <DocumentItem
          key={doc.doc_id}
          name={doc.name}
          navigateTo={`/create/${doc.doc_id}`}
          icon={DescriptionIcon}
          buttonIcon={EditDocumentIcon}
        />
      ))}
    </DocumentsContainer>
  );
}

export default DocumentsList;
