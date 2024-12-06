import React from 'react';
import styled from 'styled-components';
import { CarDocumentIcon } from '~components/Icons';
import { RecycleBinIcon } from '~components/Icons';
import IconButton from '@mui/material/IconButton';

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

const InfoValue = styled.div`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const VehicleDetailsContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[900]};
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OwnerRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const OwnerInfo = styled.div`
  display: flex;
  gap: 8px;
`;

const OwnerName = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const OwnerDetail = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const OwnerAddress = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.palette.text.primary};
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

function VehicleCardID({ data, onRemove, order }) {
  const getKey = (key) => `${key}_${order}`;

  return (
    <CardContainer>
      <Header>
        <ProfileIcon>
          <CarDocumentIcon />
        </ProfileIcon>
        <DocumentType>Saobraćajna dozvola</DocumentType>
        <StyledIconButton onClick={onRemove} aria-label="Delete">
          <DeleteIcon>
            <RecycleBinIcon />
          </DeleteIcon>
        </StyledIconButton>
      </Header>
      <InfoRow>
        <InfoLabel>Broj registracije:</InfoLabel>
        <InfoValue>
          {data[getKey('RegistrationNumberOfVehicle')] || 'N/A'}
        </InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Tip vozila:</InfoLabel>
        <InfoValue>{data[getKey('VehicleCategory')] || 'N/A'}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Proizvođač:</InfoLabel>
        <InfoValue>{data[getKey('VehicleMake')] || 'N/A'}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Model:</InfoLabel>
        <InfoValue>{data[getKey('CommercialDescription')] || 'N/A'}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Godina proizvodnje:</InfoLabel>
        <InfoValue>{data[getKey('YearOfProduction')] || 'N/A'}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Zapremina motora:</InfoLabel>
        <InfoValue>{data[getKey('EngineCapacity')] || 'N/A'}</InfoValue>
      </InfoRow>
      <VehicleDetailsContainer>
        <OwnerRow>
          <InfoLabel>Vlasnik:</InfoLabel>
          <OwnerInfo>
            <OwnerName>
              {data[getKey('OwnersSurnameOrBusinessName')] || 'N/A'}
            </OwnerName>
            <OwnerDetail>{data[getKey('OwnerName')] || ''}</OwnerDetail>
          </OwnerInfo>
        </OwnerRow>
        <OwnerRow>
          <InfoLabel>Adresa:</InfoLabel>
          <OwnerAddress>{data[getKey('OwnerAddress')] || 'N/A'}</OwnerAddress>
        </OwnerRow>
      </VehicleDetailsContainer>
    </CardContainer>
  );
}

export default VehicleCardID;
