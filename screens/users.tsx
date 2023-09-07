import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';

import { ScrollPagination } from '../components/scrollPagination';
import UsersList from '../components/usersFollowList';
import { TEST_USERS } from '../testData/global';
import { UserListType } from '../types/global';

export default function Users({ type }: { type: UserListType }) {
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

  return (
    <ScrollPagination fetchMoreData={fetchMoreData} isLoading={isLoading}>
      <UsersList
        type={type}
        users={TEST_USERS}
        onFollow={() => {}}
        onUnfollow={() => {}}
        onPress={(id) => {
          router.push(id);
        }}
      />
    </ScrollPagination>
  );
}
