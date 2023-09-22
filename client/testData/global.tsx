import { ImageItem, User } from '../types/global';

export const TEST_USERS: User[] = [
  {
    isFollowing: true,
    name: 'Aaron',
    username: 'a',
    id: 'kjsahdjkaasdh',
    avatar: require('../assets/favicon.png'),
  },
  {
    isFollowing: true,
    name: 'Aaron',
    username: 'a',
    id: 'kjsaahdjkasdh',
    avatar: require('../assets/favicon.png'),
  },
  {
    isFollowing: true,
    name: 'Aaron',
    username: 'a',
    id: 'kjsahdjkasdha',
    avatar: require('../assets/test.jpg'),
  },
  {
    isFollowing: true,
    name: 'Aaron',
    username: 'a',
    id: 'kajsahdjkasdh',
    avatar: require('../assets/favicon.png'),
  },
];

export const TEST_FEED_IMAGES = [
  {
    src: require('../assets/test.jpg'),
    user: TEST_USERS[0],
  },
  {
    src: require('../assets/test.jpg'),
    user: TEST_USERS[0],
  },
  {
    src: require('../assets/test.jpg'),
    user: TEST_USERS[0],
  },
  {
    src: require('../assets/test.jpg'),
    user: TEST_USERS[0],
  },
];

export const TEST_IMAGE_GRID: ImageItem[] = [
  { id: 1, source: require('../assets/test.jpg') },
  { id: 2, source: require('../assets/test.jpg') },
  { id: 3, source: require('../assets/test.jpg') },
  { id: 4, source: require('../assets/test.jpg') },
  { id: 5, source: require('../assets/test.jpg') },
  { id: 6, source: require('../assets/test.jpg') },
  { id: 7, source: require('../assets/test.jpg') },
  { id: 8, source: require('../assets/test.jpg') },
  { id: 9, source: undefined },
  { id: 10, source: require('../assets/test.jpg') },
  { id: 11, source: require('../assets/test.jpg') },
  { id: 12, source: require('../assets/test.jpg') },
];
