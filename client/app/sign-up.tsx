import { Link } from 'expo-router';
import { View } from 'react-native-animatable';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

import { useSignupMutation } from '../graphql';
import { globalStyles } from '../styles/global';

export default function SignUpPage() {
  const { colors } = useTheme();
  const [signup, signupData] = useSignupMutation();

  return (
    <View style={[globalStyles.mainContainer, { width: '100%', flex: 1 }]}>
      <View
        style={[
          globalStyles.verticalContainer,
          {
            width: '100%',
            flex: 3,
            justifyContent: 'flex-end',
          },
        ]}>
        <TextInput mode="outlined" style={{ width: '100%' }}></TextInput>
        <TextInput mode="outlined" style={{ width: '100%' }}></TextInput>
        <TextInput mode="outlined" style={{ width: '100%' }}></TextInput>
        <TextInput mode="outlined" style={{ width: '100%' }}></TextInput>
        <Button mode="contained" style={{ width: '100%' }}>
          Sign in
        </Button>
      </View>
      <View
        style={[
          globalStyles.verticalContainer,
          {
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
          },
        ]}>
        <Text>
          Don't have an account?{'  '}
          <Link href="sing-up" style={{ color: colors.primary }}>
            Sign up
          </Link>
        </Text>
      </View>
    </View>
  );
}
