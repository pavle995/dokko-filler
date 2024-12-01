import React, { useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import getDocumentById from '~api/getDocumentById';
import { useNotification } from '~context/NotificationContext';
import useFetch from '~hooks/useFetch';
import ErrorHandler from '~shared-components/ErrorHandler/ErrorHandler';
import Loading from '~shared-components/Loading/Loading';
import cardsConfig from './config/cardsConfig';
import FilteredCardList from './FilteredCardLIst/FilteredCardList';

const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  text-align: center;
  gap: 16px;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
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

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: left;
  width: 100%;
  margin-bottom: 8px;
`;

const PlaceholderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 24px;
  width: 100%;
`;

const StateContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function CreateDocument() {
  const { id } = useParams();
  const { name } = useParams();
  const showNotification = useNotification();
  const fetchDocument = useCallback(() => getDocumentById(id), [id]);

  const {
    data: document,
    loading: documentLoading,
    error: fetchDocumentError,
  } = useFetch(fetchDocument);

  const filteredCards = useMemo(() => {
    return document?.body.needed_cards
      .map((requiredCard) =>
        cardsConfig?.find((card) => card.name === requiredCard.name)
      )
      .filter(Boolean);
  }, [document, cardsConfig]);

  useEffect(() => {
    if (fetchDocumentError) {
      showNotification(
        'Neuspešno učitavanje ugovora. Molimo vas pokušajte opet.',
        5000,
        'error'
      );
    }
  }, [fetchDocumentError]);

  if (fetchDocumentError)
    return (
      <StateContainerWrapper>
        <ErrorHandler message={'Neuspešno učitavanje ugovora.'}></ErrorHandler>
      </StateContainerWrapper>
    );

  if (documentLoading)
    return (
      <StateContainerWrapper>
        <Loading />
      </StateContainerWrapper>
    );

  return (
    <CreateContainer>
      <Header>
        <Title>{name}</Title>
      </Header>
      <SubTitle>Učitaj neophodna dokumenta</SubTitle>
      <PlaceholderContainer>
        <FilteredCardList filteredCards={filteredCards} />
      </PlaceholderContainer>
    </CreateContainer>
  );
}

export default CreateDocument;
