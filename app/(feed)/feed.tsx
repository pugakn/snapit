import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import FeedImage from '../../components/feedImage';
import { ScrollPagination } from '../../components/scrollPagination';
import { globalStyles } from '../../styles/global';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const feedImages = [
    {
      imageUrl: '',
      avatarUrl: '',
      userName: 'sjanid',
    },
    {
      imageUrl: '',
      avatarUrl: '',
      userName: 'sjanid',
    },
    {
      imageUrl: '',
      avatarUrl: '',
      userName: 'sjanid',
    },
    {
      imageUrl: '',
      avatarUrl: '',
      userName: 'sjanid',
    },
  ];

  return (
    <ScrollPagination fetchMoreData={fetchMoreData} isLoading={isLoading}>
      <View style={globalStyles.mainContainer}>
        <View style={globalStyles.verticalContainer}>
          {feedImages.map((image, index) => (
            <FeedImage
              key={index}
              imageUrl={image.imageUrl}
              avatarUrl={image.avatarUrl}
              userName={image.userName}
            />
          ))}
        </View>
      </View>
    </ScrollPagination>
  );
}
