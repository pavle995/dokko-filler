import React from 'react';
import styled from 'styled-components';
import { YoungBusinessmanIcon } from '~components/Icons';
import { BusinessWomanWithTieIcon } from '~components/Icons';

const CardContainer = styled.div`
  width: 400px;
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

function IDCard({ data }) {
  const isMale = data.Sex === 'M';

  return (
    <CardContainer>
      <Header>
        <ProfileIcon>
          {isMale ? <YoungBusinessmanIcon /> : <BusinessWomanWithTieIcon />}
        </ProfileIcon>
        <DocumentType>{data.DocumentType}</DocumentType>
      </Header>
      <InfoRow>
        <InfoLabel>Broj licne karte:</InfoLabel>
        <div>{data.DocumentNumber}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Ime i prezime:</InfoLabel>
        <div>
          {data.GivenName} {data.Surname}
        </div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Datum rođenja:</InfoLabel>
        <div>{data.DateOfBirth}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Mesto rođenja:</InfoLabel>
        <div>{data.PlaceOfBirth}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>JMBG:</InfoLabel>
        <div>{data.PersonalNumber}</div>
      </InfoRow>
      <AddressContainer>
        <InfoLabel>Adresa prebivališta:</InfoLabel>
        <div>
          {data.Street} {data.AddressNumber}, {data.Place}
        </div>
      </AddressContainer>
    </CardContainer>
  );
}

export default IDCard;
