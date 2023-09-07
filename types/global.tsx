import { ImageSourcePropType } from 'react-native';

export interface User {
  id: string;
  name: string;
  username: string;
  isFollowing: boolean;
  avatar: ImageSourcePropType;
}

export type ImageItem = {
  id: number;
  source: ImageSourcePropType;
};

export interface FeedImageType {
  src: ImageSourcePropType;
  user: User;
}

export type UserListType = 'followers' | 'following' | 'search';
