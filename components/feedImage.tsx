import { Link } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { Avatar, Surface, Text } from 'react-native-paper';

import { globalTokens } from '../styles/global';
import { FeedImageType } from '../types/global';

const FeedImage: React.FC<FeedImageType> = ({ src, user }) => {
  return (
    <Surface elevation={1}>
      <Image source={src} style={{ width: '100%', height: 'auto', aspectRatio: 1 }} />
      <Link
        href={`${user.name}`}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: globalTokens.gap.lg,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar.Image size={24} source={user.avatar} />
          <Text style={{ marginLeft: 10 }}>{user.name}</Text>
        </View>
      </Link>
    </Surface>
  );
};

export default FeedImage;
