import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type ImageItem = {
  id: number;
  source: ImageSourcePropType;
};

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

export default function ImageGrid() {
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: ImageItem }) => (
    <View style={{ padding: 2, width: '33.33%' }}>
      <TouchableOpacity onPress={() => {}} style={{ backgroundColor: colors.tertiary }}>
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

  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' }}>
      {data.map((item) => (
        <React.Fragment key={item.id}>{renderItem({ item })}</React.Fragment>
      ))}
    </View>
  );
}
