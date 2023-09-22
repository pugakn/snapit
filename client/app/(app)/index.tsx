import { Redirect } from 'expo-router';
import { Text } from 'react-native';

export default function LoadingPage() {
  return <Redirect href="/sign-in" />;

  return <Text>Loading...</Text>;
}
