import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { Avatar, Button, List } from 'react-native-paper';

import { globalTokens } from '../styles/global';

export interface User {
  id: string;
  name: string;
  isFollowing: boolean;
  avatar: ImageSourcePropType;
}

interface UsersListProps {
  users: User[];
  type: 'followers' | 'following';
  onPress: (id: string) => void;
  onFollow: (id: string) => void;
  onUnfollow: (id: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, type, onFollow, onUnfollow, onPress }) => {
  return (
    <List.Section style={{ width: '100%', padding: globalTokens.gap.lg }}>
      <List.Subheader>{type === 'followers' ? 'Followers' : 'Following'}</List.Subheader>
      {users.map((user) => (
        <List.Item
          onPress={() => onPress(user.id)}
          key={user.id}
          title={user.name}
          left={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 24 }}>
              <Avatar.Image size={32} source={user.avatar} />
            </View>
          )}
          right={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {user.isFollowing ? (
                <Button mode="contained" onPress={() => onUnfollow(user.id)}>
                  Unfollow
                </Button>
              ) : (
                <Button mode="contained" onPress={() => onFollow(user.id)}>
                  Follow
                </Button>
              )}
            </View>
          )}
        />
      ))}
    </List.Section>
  );
};

export default UsersList;
