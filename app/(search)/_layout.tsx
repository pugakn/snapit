import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
  search: {
    initialRouteName: 'search',
  },
};

export default function Layout({ segment }: any) {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
