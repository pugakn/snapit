import { useRouter } from 'expo-router';
import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import UsersList from '../components/usersList';
import { globalStyles, globalTokens } from '../styles/global';

export default function Users({ type }: { type: 'followers' | 'following' }) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const router = useRouter();

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

  const users = [
    {
      isFollowing: true,
      name: 'Aaron',
      id: 'kjsahdjkaasdh',
      avatar: require('../assets/favicon.png'),
    },
    {
      isFollowing: true,
      name: 'Aaron',
      id: 'kjsaahdjkasdh',
      avatar: require('../assets/favicon.png'),
    },
    {
      isFollowing: true,
      name: 'Aaron',
      id: 'kjsahdjkasdha',
      avatar: require('../assets/favicon.png'),
    },
    {
      isFollowing: true,
      name: 'Aaron',
      id: 'kajsahdjkasdh',
      avatar: require('../assets/favicon.png'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer} onScroll={handleScroll}>
      <UsersList
        type={type}
        users={users}
        onFollow={() => {}}
        onUnfollow={() => {}}
        onPress={(id) => {
          router.push(id);
        }}
      />

      {isLoading && (
        <ActivityIndicator size="large" style={{ marginVertical: globalTokens.gap.md }} />
      )}
    </ScrollView>
  );
}
