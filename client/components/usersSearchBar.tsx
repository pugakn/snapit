import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { List, Searchbar, Text, useTheme } from 'react-native-paper';

import { globalTokens } from '../styles/global';
import { TEST_USERS } from '../testData/global';
import UsersListItem from './usersListItem';

export default function UserSearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const router = useRouter();
  const { colors } = useTheme();

  const filteredUsers = TEST_USERS.filter((user) => user.name.includes(searchQuery));

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ margin: globalTokens.gap.lg, marginBottom: 0 }}
      />
      {filteredUsers.length > 0 && searchQuery && (
        <List.Section style={{ width: '100%' }}>
          {filteredUsers.map((user) => (
            <UsersListItem user={user} type="search" />
          ))}
        </List.Section>
      )}
      {filteredUsers.length === 0 && searchQuery && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: globalTokens.gap.lg,
            gap: globalTokens.gap.sm,
          }}>
          <Ionicons name="md-search" size={24} color={colors.error} />
          <Text variant="labelMedium" style={{ color: colors.error }}>
            No users found
          </Text>
        </View>
      )}
    </>
  );
}
