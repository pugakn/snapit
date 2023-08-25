import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { ActivityIndicator, Searchbar, Text, useTheme } from 'react-native-paper';

import ImageGrid from '../components/imageGrid';
import StoryButton from '../components/storyButton';
import { globalStyles, globalTokens } from '../styles/global';

export default function Page() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const totalPhotosTaken = 100; // replace with actual count
  const dayStreakCount = 5; // replace with actual count

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const offset = 50;
    const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - offset;
    if (isEndReached) {
      setIsLoading(true);
      fetchMoreData();
    }
  };

  const fetchMoreData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer} onScroll={handleScroll}>
      <View style={globalStyles.mainContainer}>
        <View style={globalStyles.horizontalContainer}>
          <StoryButton size={globalTokens.storybuttonSize} />
          <StoryButton size={globalTokens.storybuttonSize} />
          <StoryButton size={globalTokens.storybuttonSize} />
        </View>
        <View style={{ ...globalStyles.horizontalContainer, justifyContent: 'flex-start' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              flex: 1,
            }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Text variant="titleMedium">{totalPhotosTaken} photos taken</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text variant="titleMedium" style={{ marginRight: 5 }}>
                {dayStreakCount}
              </Text>
              <Ionicons icon="bonfire" size={50} color={colors.primary} />
            </View>
          </View>
        </View>
        <View style={globalStyles.horizontalContainer}>
          <Searchbar
            placeholder="Search"
            value={''}
            style={{ height: 40, width: '100%' }}
            inputStyle={{ fontSize: 16, position: 'relative', top: -8, left: 0, width: '100%' }}
          />
        </View>
      </View>

      <ImageGrid />
      {isLoading && (
        <ActivityIndicator size="large" style={{ marginVertical: globalTokens.gap.md }} />
      )}
    </ScrollView>
  );
}
