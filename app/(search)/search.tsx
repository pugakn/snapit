import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Portal } from 'react-native-paper';

import ImageGrid from '../../components/imageGrid';
import ImageModal from '../../components/imageModal';
import { ScrollPagination } from '../../components/scrollPagination';
import UserSearchBar from '../../components/usersSearchBar';
import { globalTokens } from '../../styles/global';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | undefined>(undefined);
  const handleImageClick = (image: ImageSourcePropType) => {
    setSelectedImage(image);
  };

  const fetchMoreData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <ScrollPagination fetchMoreData={fetchMoreData} isLoading={isLoading}>
      <UserSearchBar />
      <ImageGrid onImageClick={handleImageClick} style={{ marginTop: globalTokens.gap.lg }} />
      <Portal>
        <ImageModal selectedImage={selectedImage} onExit={() => setSelectedImage(undefined)} />
      </Portal>
    </ScrollPagination>
  );
}
