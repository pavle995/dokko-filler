import React, { useEffect, useState } from 'react';
import { useNotification } from '~context/NotificationContext';
import useLazyFetch from '~hooks/useLazyFetch';
import DocumentRenderer from '../DocumentRenderer/DocumentRenderer';
import read from '~api/read';

const FilteredCardList = ({ filteredCards }) => {
  const [currentCardName, setCurrentCardName] = useState(null);
  const showNotification = useNotification();
  const removeSpaces = (str) => str.replace(/\s+/g, '');

  const [
    runFetchCard,
    {
      data: cardData,
      error: cardError,
      loading: fetchCardLoading,
      resetData: resetCardData,
    },
  ] = useLazyFetch(read);

  const [cardsData, setCardsData] = useState(
    Object.fromEntries(
      (document?.body.needed_cards || [])?.map((card) => [
        removeSpaces(card.name),
        null,
      ])
    )
  );

  useEffect(() => {
    if (cardError && currentCardName) {
      showNotification(
        `Neuspešno učitavanje dokumenta. Molimo vas pokušajte opet.`,
        5000,
        'error'
      );
    }

    if (cardData && currentCardName) {
      setCardsData((prev) => ({
        ...prev,
        [currentCardName]: cardData,
      }));
      setCurrentCardName(null);
    }
  }, [cardData, currentCardName, cardError]);

  const handleClick = (cardName) => {
    setCurrentCardName(removeSpaces(cardName));
    resetCardData();
    runFetchCard();
  };

  const handleRemove = (cardName) => {
    setCardsData((prev) => ({
      ...prev,
      [removeSpaces(cardName)]: null,
    }));
  };

  return (
    <>
      {filteredCards?.map((card, index) => (
        <DocumentRenderer
          key={index}
          type={card.type}
          data={cardsData[removeSpaces(card.name)]}
          onClick={() => handleClick(card.name)}
          onRemove={() => handleRemove(card.name)}
          text={card.text}
          loading={fetchCardLoading}
          dataData={cardsData}
        />
      ))}
    </>
  );
};

export default FilteredCardList;
