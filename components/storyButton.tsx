import { LinearGradient } from 'expo-linear-gradient';
import { Image, View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';

interface StoryButtonProps {
  size: number;
}

export default function StoryButton({ size }: StoryButtonProps) {
  const { colors } = useTheme();

  return (
    <View>
      <TouchableRipple
        style={{
          borderRadius: size / 2,
          width: size,
          height: size,
          borderWidth: 0,
        }}
        onPress={() => console.log('Button pressed')}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, colors.tertiary]}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            borderRadius: size / 2,
            width: size,
            height: size,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/favicon.png')}
            style={{ width: size - 8, height: size - 8, borderRadius: size / 2 }}
          />
        </LinearGradient>
      </TouchableRipple>
    </View>
  );
}
