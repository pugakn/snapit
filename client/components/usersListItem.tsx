import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, List, useTheme } from 'react-native-paper';

import { User, UserListType } from '../types/global';

interface UsersListItemProps {
  user: User;
  type: UserListType;
  onPress?: (id: string) => void;
  onFollow?: (id: string) => void;
  onUnfollow?: (id: string) => void;
}

const UsersListItem: React.FC<UsersListItemProps> = ({
  user,
  type,
  onFollow,
  onUnfollow,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <List.Item
      style={{ width: '100%', backgroundColor: colors.surface }}
      onPress={() => onPress?.(user.id)}
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
            <Button mode="contained" onPress={() => onUnfollow?.(user.id)}>
              Unfollow
            </Button>
          ) : (
            <Button mode="contained" onPress={() => onFollow?.(user.id)}>
              Follow
            </Button>
          )}
        </View>
      )}
    />
  );
};

export default UsersListItem;
