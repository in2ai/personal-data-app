import React, { memo, useState } from 'react';
import { WorkOffer } from '../../../models/workOffer';
import { FlashList } from '@shopify/flash-list';

import WorkOfferListItem from './WorkOfferItem';
import { Text, View } from 'react-native';

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
      {workOffers.length === 0 ? (
        <View className="flex h-full items-center justify-center">
          <Text className="text-brandColor">No existe aún ninguna oferta publicada...</Text>
        </View>
      ) : (
        <FlashList
          renderItem={({ item }) => {
            return <WorkOfferListItem workOffer={item} onPress={onPressWorkOffer} />;
          }}
          estimatedItemSize={100}
          data={workOffers}
          onRefresh={onRefresh}
          refreshing={isFetching}
        />
      )}
    </View>
  );
};

export default WorkOffersList;
