import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { GridItem, ImageItem } from './imageGridItem';

const data: ImageItem[] = [
  { id: 1, source: require('../assets/favicon.png') },
  { id: 2, source: require('../assets/favicon.png') },
  { id: 3, source: require('../assets/favicon.png') },
  { id: 4, source: require('../assets/favicon.png') },
  { id: 5, source: require('../assets/favicon.png') },
  { id: 6, source: require('../assets/favicon.png') },
  { id: 7, source: require('../assets/favicon.png') },
  { id: 8, source: require('../assets/favicon.png') },
  { id: 9, source: undefined },
  { id: 10, source: require('../assets/favicon.png') },
  { id: 11, source: require('../assets/favicon.png') },
  { id: 12, source: require('../assets/favicon.png') },
];

export default function ImageGrid({
  onImageClick,
}: {
  onImageClick: (image: ImageSourcePropType) => any;
}) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' }}>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <GridItem item={item} onImageClick={onImageClick} />
        </React.Fragment>
      ))}
    </View>
  );
}
