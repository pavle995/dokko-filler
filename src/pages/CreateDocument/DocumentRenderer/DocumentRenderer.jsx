import React from 'react';
import PlaceholderCard from '../PlaceholderCard/PlaceholderCard';
import IDCard from '~shared-components/IDCard/IDCard';
import VehicleCardID from '~shared-components/VehicleCardID/VehicleCardID';
import { IdProofLineIcon, CarDocumentIcon } from '~components/Icons';

const DocumentRenderer = ({
  type,
  data,
  onClick,
  text,
  onRemove,
  loading,
  dataData,
}) => {
  if (!data) {
    return (
      <PlaceholderCard
        icon={type === 'licna_karta' ? IdProofLineIcon : CarDocumentIcon}
        text={text}
        onClick={() => onClick(type)}
        loading={loading}
      />
    );
  }

  return (
    <div>
      {type === 'saobracajna_dozvola' ? (
        <VehicleCardID data={data} onRemove={onRemove} />
      ) : (
        <IDCard data={data} onRemove={onRemove} />
      )}
    </div>
  );
};

export default DocumentRenderer;
