import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface ScrollPaginationProps {
  children: React.ReactNode;
  fetchMoreData?: () => Promise<void>;
  isLoading?: boolean;
}

export const ScrollPagination: React.FC<ScrollPaginationProps> = ({
  children,
  fetchMoreData,
  isLoading,
}) => {
  const [isEndReached, setIsEndReached] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const offset = 50;
    const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - offset;
    if (isEndReached && !isLoading) {
      setIsEndReached(true);
      fetchMoreData?.();
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} onScroll={handleScroll}>
      {children}
      {isLoading && <ActivityIndicator size="large" style={{ marginVertical: 30 }} />}
    </ScrollView>
  );
};
