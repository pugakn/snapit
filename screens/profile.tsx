import { Ionicons } from '@expo/vector-icons';
import { Link, useGlobalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { Portal, Searchbar, Text, useTheme } from 'react-native-paper';

import ImageGrid from '../components/imageGrid';
import ImageModal from '../components/imageModal';
import { ScrollPagination } from '../components/scrollPagination';
import StoryButton from '../components/storyButton';
import { globalStyles, globalTokens } from '../styles/global';

export default function Profile() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | undefined>(undefined);
  const handleImageClick = (image: ImageSourcePropType) => {
    setSelectedImage(image);
  };

  const router = useRouter();
  const { user: userName } = useGlobalSearchParams();

  const totalPhotosTaken = 100; // replace with actual count
  const dayStreakCount = 5; // replace with actual count

  const fetchMoreData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <ScrollPagination fetchMoreData={fetchMoreData} isLoading={isLoading}>
      <View style={globalStyles.mainContainer}>
        <View style={globalStyles.verticalContainer}>
          <View style={{ ...globalStyles.verticalContainer, gap: globalTokens.gap.sm }}>
            <StoryButton
              size={globalTokens.profileImageSize}
              onPress={() => router.push('profile/camera')}
            />
            <Text variant="titleMedium">{totalPhotosTaken} photos taken</Text>
          </View>
          <View style={{ ...globalStyles.horizontalContainer, gap: globalTokens.gap.lg }}>
            <Link href={`${userName}/followers`}>
              <Text variant="labelLarge" style={{ color: colors.primary }}>
                300 Followers
              </Text>
            </Link>
            <Link href={`${userName}/following`}>
              <Text variant="labelLarge" style={{ color: colors.primary }}>
                300 Following
              </Text>
            </Link>
          </View>
          <View style={globalStyles.horizontalContainer}>
            <StoryButton
              size={globalTokens.storybuttonSize}
              onPress={() => router.push('profile/camera')}
            />
            <StoryButton size={globalTokens.storybuttonSize} />
            <StoryButton size={globalTokens.storybuttonSize} />
          </View>
          <View style={{ ...globalStyles.horizontalContainer, justifyContent: 'flex-start' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Text variant="labelLarge">{totalPhotosTaken} photos taken</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginVertical: globalTokens.gap.lg,
                }}>
                <Ionicons name="bonfire" size={24} color={colors.tertiary} />
                <Text variant="titleMedium" style={{ marginRight: 5 }}>
                  {dayStreakCount}
                </Text>
              </View>
            </View>
          </View>
          <View style={globalStyles.horizontalContainer}>
            <Searchbar
              placeholder="Search"
              value={''}
              style={{ height: 40, width: '100%' }}
              inputStyle={{ fontSize: 16, position: 'relative', top: -8, left: 0, width: '100%' }}
            />
          </View>
        </View>
      </View>

      <ImageGrid onImageClick={handleImageClick} />
      <Portal>
        <ImageModal selectedImage={selectedImage} onExit={() => setSelectedImage(undefined)} />
      </Portal>
    </ScrollPagination>
  );
}
