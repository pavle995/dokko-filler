import React from 'react';
import styled from 'styled-components';
import { CarDocumentIcon } from '~components/Icons';

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

const VehicleDetailsContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[900]};
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
`;

function VehicleCardID({ data }) {
  return (
    <CardContainer>
      <Header>
        <ProfileIcon>
          <CarDocumentIcon />
        </ProfileIcon>
        <DocumentType>Saobraćajna dozvola</DocumentType>
      </Header>
      <InfoRow>
        <InfoLabel>Broj registracije:</InfoLabel>
        <div>{data.RegistrationNumber}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Tip vozila:</InfoLabel>
        <div>{data.VehicleType}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Proizvođač:</InfoLabel>
        <div>{data.Manufacturer}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Model:</InfoLabel>
        <div>{data.Model}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Godina proizvodnje:</InfoLabel>
        <div>{data.YearOfManufacture}</div>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Zapremina motora:</InfoLabel>
        <div>{data.EngineCapacity}</div>
      </InfoRow>
      <VehicleDetailsContainer>
        <InfoLabel>Vlasnik:</InfoLabel>
        <div>{data.Owner}</div>
        <InfoLabel>Adresa:</InfoLabel>
        <div>{data.Address}</div>
      </VehicleDetailsContainer>
    </CardContainer>
  );
}

export default VehicleCardID;
