import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import ImageGrid from '../components/imageGrid';
import StoryButton from '../components/storyButton';
import { globalStyles } from '../styles/global';

export default function Page() {
  return (
    <View style={globalStyles.mainContainer}>
      <View style={{ ...globalStyles.horizontalContainer, justifyContent: 'flex-start' }}>
        <Text variant="titleMedium">Today snaps</Text>
      </View>
      <View style={globalStyles.horizontalContainer}>
        <StoryButton size={80} />
        <StoryButton size={80} />
        <StoryButton size={80} />
      </View>
      <Button>Holsa</Button>
      <TextInput></TextInput>
      <View style={globalStyles.horizontalContainer}>
        <ImageGrid />
      </View>
    </View>
  );
}
