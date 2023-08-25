import React from 'react';
import { FlatList, Image, ImageSourcePropType, View } from 'react-native';
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
];

export default function ImageGrid() {
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: ImageItem }) => (
    <View style={{ flex: 1, margin: 2 }}>
      <Image
        source={item.source}
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: 1,
        }}
        defaultSource={require('../assets/favicon.png')}
      />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      contentContainerStyle={{ backgroundColor: colors.background }}
    />
  );
}
