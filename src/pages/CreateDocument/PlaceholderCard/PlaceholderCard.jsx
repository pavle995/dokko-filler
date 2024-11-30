import React from 'react';
import styled from 'styled-components';
import Loading from '~shared-components/Loading/Loading';

const CardContainer = styled.div`
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

const IconContainer = styled.div`

  width: 50px;
  height: 50px;

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.palette.grey[400]};
  }
`;

const PlaceholderText = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const PlaceholderCard = ({ icon: Icon, text, onClick, loading }) => {
  return (
    <CardContainer onClick={onClick}>
      {loading ? (
        <Loading />
      ) : (
        <IconContainer>
          <Icon />
          <PlaceholderText>{text}</PlaceholderText>
        </IconContainer>
      )}
    </CardContainer>
  );
};

export default PlaceholderCard;
