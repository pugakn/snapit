import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import FeedImage from '../../components/feedImage';
import { ScrollPagination } from '../../components/scrollPagination';
import { globalStyles } from '../../styles/global';
import { TEST_FEED_IMAGES } from '../../testData/global';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <ScrollPagination fetchMoreData={fetchMoreData} isLoading={isLoading}>
      <View style={globalStyles.mainContainer}>
        <View style={globalStyles.verticalContainer}>
          {TEST_FEED_IMAGES.map((image, index) => (
            <FeedImage key={index} src={image.src} user={image.user} />
          ))}
        </View>
      </View>
    </ScrollPagination>
  );
}
