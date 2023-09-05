import React from 'react';
import { Image, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

interface FeedImageProps {
  imageUrl: string;
  avatarUrl: string;
  userName: string;
}

const FeedImage: React.FC<FeedImageProps> = ({ imageUrl, avatarUrl, userName }) => {
  return (
    <View>
      <Image source={{ uri: imageUrl }} style={{ width: '100%', height: 'auto', aspectRatio: 1 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Avatar.Image size={24} source={{ uri: avatarUrl }} />
        <Text style={{ marginLeft: 10 }}>{userName}</Text>
      </View>
    </View>
  );
};

export default FeedImage;
