import React from 'react';
import { List } from 'react-native-paper';

import { User } from '../types/global';
import UsersListItem from './usersListItem';

interface UsersListProps {
  users: User[];
  type: 'followers' | 'following';
  onPress: (id: string) => void;
  onFollow: (id: string) => void;
  onUnfollow: (id: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, type, onFollow, onUnfollow, onPress }) => {
  return (
    <List.Section style={{ width: '100%' }}>
      <List.Subheader>{type === 'followers' ? 'Followers' : 'Following'}</List.Subheader>
      {users.map((user) => (
        <UsersListItem
          user={user}
          type={type}
          onPress={onPress}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
        />
      ))}
    </List.Section>
  );
};

export default UsersList;
