import React from 'react';
import { ImageSourcePropType, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

import { TEST_IMAGE_GRID } from '../testData/global';
import { GridItem } from './imageGridItem';

export default function ImageGrid({
  onImageClick,
  style,
}: {
  onImageClick: (image: ImageSourcePropType) => any;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();

  return (
    <View style={[{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' }, style]}>
      {TEST_IMAGE_GRID.map((item) => (
        <React.Fragment key={item.id}>
          <GridItem item={item} onImageClick={onImageClick} />
        </React.Fragment>
      ))}
    </View>
  );
}
