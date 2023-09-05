import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export type ImageItem = {
  id: number;
  source: ImageSourcePropType;
};

export const GridItem = ({
  item,
  onImageClick,
}: {
  item: ImageItem;
  onImageClick: (image: ImageSourcePropType) => any;
}) => {
  const { colors } = useTheme();

  return (
    <View style={{ padding: 2, width: '33.33%' }}>
      <TouchableOpacity
        onPress={() => onImageClick(item.source)}
        style={{ backgroundColor: colors.tertiary }}>
        <Image
          source={item.source}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: 1,
          }}
          defaultSource={require('../assets/favicon.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
