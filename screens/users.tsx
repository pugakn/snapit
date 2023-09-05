import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';

import { ScrollPagination } from '../components/scrollPagination';
import UsersList from '../components/usersList';

export default function Users({ type }: { type: 'followers' | 'following' }) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const router = useRouter();

  const fetchMoreData = async () => {
    setIsLoading(true);
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
    <ScrollPagination fetchMoreData={fetchMoreData} isLoading={isLoading}>
      <UsersList
        type={type}
        users={users}
        onFollow={() => {}}
        onUnfollow={() => {}}
        onPress={(id) => {
          router.push(id);
        }}
      />
    </ScrollPagination>
  );
}
