import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Text>Pageasdasd</Text>
      <Button onPress={() => router.push('(search)/hola')}>Holsssssa23</Button>
      <TextInput></TextInput>
    </>
  );
}
