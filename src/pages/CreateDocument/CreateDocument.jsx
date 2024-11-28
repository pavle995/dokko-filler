import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import IDCard from '~shared-components/IDCard/IDCard';
import VehicleCardID from '~shared-components/VehicleCardID/VehicleCardID';
import { IdProofLineIcon, CarDocumentIcon } from '~components/Icons';

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
  margin-bottom: 8px; /* Smaller spacing for subheading */
`;

const PlaceholderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 24px;
  width: 100%;
`;

const PlaceholderCard = styled.div`
  width: 400px;
  height: 450px;
  border: 2px dashed ${({ theme }) => theme.palette.grey[400]};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[900]};
    transform: scale(1.05);
  }
`;

const StyledIDIcon = styled(IdProofLineIcon)`
  width: 50px;
  height: 50px;
  fill: ${({ theme }) => theme.palette.grey[400]};
`;

const StyledCarIcon = styled(CarDocumentIcon)`
  width: 50px;
  height: 50px;
  fill: ${({ theme }) => theme.palette.grey[400]};
`;

const PlaceholderText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const mockBuyer = {
  DocumentNumber: '0068',
  DocumentType: 'ID',
  Surname: 'STANKOVIĆ',
  GivenName: 'PETAR',
  Sex: 'M',
  PlaceOfBirth: 'BEOGRAD',
  DateOfBirth: '01.07.1991.',
  Street: 'BULEVAR KRALJA ALEKSANDRA',
  AddressNumber: '320',
  Place: 'BEOGRAD',
  PersonalNumber: '0107',
};

const mockSeller = {
  DocumentNumber: '0099',
  DocumentType: 'ID',
  Surname: 'JOVANOVIĆ',
  GivenName: 'ANA',
  Sex: 'F',
  PlaceOfBirth: 'NOVI SAD',
  DateOfBirth: '15.03.1988.',
  Street: 'MIHAILA PUPINA',
  AddressNumber: '12B',
  Place: 'NOVI SAD',
  PersonalNumber: '0208',
};

const mockVehicle = {
  RegistrationNumber: 'BG1234AB',
  VehicleType: 'Putnički automobil',
  Manufacturer: 'Volkswagen',
  Model: 'Golf 7',
  YearOfManufacture: '2018',
  EngineCapacity: '1.6L',
  Owner: 'Petar Stanković',
  Address: 'Bulevar kralja Aleksandra 320, Beograd',
};

function CreateDocument() {
  const { id } = useParams();
  const [buyerData, setBuyerData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);

  const loadBuyer = () => setBuyerData(mockBuyer);
  const loadSeller = () => setSellerData(mockSeller);
  const loadVehicle = () => setVehicleData(mockVehicle);

  return (
    <CreateContainer>
      <Title>Kreiranje dokumenta {id}</Title>
      <SubTitle>Neophodna dokumenta</SubTitle>
      <PlaceholderContainer>
        {!buyerData ? (
          <PlaceholderCard onClick={loadBuyer}>
            <StyledIDIcon />
            <PlaceholderText>Dodaj kupca</PlaceholderText>
          </PlaceholderCard>
        ) : (
          <IDCard data={buyerData} />
        )}
        {!sellerData ? (
          <PlaceholderCard onClick={loadSeller}>
            <StyledIDIcon />
            <PlaceholderText>Dodaj prodavca</PlaceholderText>
          </PlaceholderCard>
        ) : (
          <IDCard data={sellerData} />
        )}
        {!vehicleData ? (
          <PlaceholderCard onClick={loadVehicle}>
            <StyledCarIcon />
            <PlaceholderText>Dodaj saobraćajnu dozvolu</PlaceholderText>
          </PlaceholderCard>
        ) : (
          <VehicleCardID data={vehicleData} />
        )}
      </PlaceholderContainer>
    </CreateContainer>
  );
}

export default CreateDocument;
