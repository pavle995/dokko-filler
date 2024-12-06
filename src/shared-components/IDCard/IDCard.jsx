import React from 'react';
import styled from 'styled-components';
import { YoungBusinessmanIcon } from '~components/Icons';
import { BusinessWomanWithTieIcon } from '~components/Icons';
import { RecycleBinIcon } from '~components/Icons';
import IconButton from '@mui/material/IconButton';

const CardContainer = styled.div`
  width: 400px;
  // max-height: 450px;
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.lightGrey[700]};
  border: 1px solid ${({ theme }) => theme.palette.grey[700]};
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.palette.grey[500]};
  padding-bottom: 16px;
`;

const ProfileIcon = styled.div`
  width: 80px;
  height: 80px;

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.palette.grey[400]};
  }
`;

const DocumentType = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const InfoLabel = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const AddressContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[900]};
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const DeleteIcon = styled.div`
  cursor: pointer;

  & > svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.palette.error.main};

    &:hover {
      fill: ${({ theme }) => theme.palette.error.dark};
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  position: relative;
  top: -32px;
  right: -16px;
  color: ${({ theme }) => theme.palette.error.main};
  &:hover {
    color: ${({ theme }) => theme.palette.error.dark};
  }
`;

function IDCard({ data, onRemove, order }) {
  if (!data) return null; // Bezbednosna provera ako podaci nisu prosleđeni

  // Dinamično dohvatamo podatke koristeći sufiks `order`
  const getKey = (key) => `${key}_${order}`;

  const isMale = data[getKey('Sex')] === 'M';

  return (
    <CardContainer>
      <Header>
        <ProfileIcon>
          {isMale ? <YoungBusinessmanIcon /> : <BusinessWomanWithTieIcon />}
        </ProfileIcon>
        <DocumentType>
          {data[getKey('DocumentType')] || 'Lična karta'}
        </DocumentType>
        <StyledIconButton onClick={onRemove} aria-label="Delete">
          <DeleteIcon>
            <RecycleBinIcon />
          </DeleteIcon>
        </StyledIconButton>
      </Header>
      <InfoRow>
        <InfoLabel>Broj lične karte:</InfoLabel>
        <div>{data[getKey('DocumentNumber')]}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Ime i prezime:</InfoLabel>
        <div>
          {data[getKey('GivenName')]} {data[getKey('Surname')]}
        </div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Datum rođenja:</InfoLabel>
        <div>{data[getKey('DateOfBirth')]}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Mesto rođenja:</InfoLabel>
        <div>{data[getKey('PlaceOfBirth')]}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>JMBG:</InfoLabel>
        <div>{data[getKey('PersonalNumber')]}</div>
      </InfoRow>
      <AddressContainer>
        <InfoLabel>Adresa prebivališta:</InfoLabel>
        <div>
          {data[getKey('Street')]} {data[getKey('AddressNumber')]}{' '}
          {data[getKey('Place')]}
        </div>
      </AddressContainer>
    </CardContainer>
  );
}

export default IDCard;
