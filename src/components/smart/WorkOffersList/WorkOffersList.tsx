import React, { memo, useState } from 'react';
import { WorkOffer } from '../../../models/WorkOffer';
import { FlashList } from '@shopify/flash-list';

import WorkOfferListItem from './WorkOfferItem';
import { View } from 'react-native';

type WorkOffersListProps = {
  isFetching: boolean;
  workOffers: WorkOffer[];
  onPressWorkOffer?: (workOffer: WorkOffer) => void;
  onRefresh?: () => void;
};

const WorkOffersList: React.FC<WorkOffersListProps> = ({
  isFetching = false,
  workOffers,
  onPressWorkOffer,
  onRefresh,
}) => {
  return (
    <View className="h-full w-full">
      <FlashList
        renderItem={({ item }) => {
          return <WorkOfferListItem workOffer={item} />;
        }}
        estimatedItemSize={100}
        data={workOffers}
        onRefresh={onRefresh}
        refreshing={isFetching}
      />
    </View>
  );
};

export default WorkOffersList;
