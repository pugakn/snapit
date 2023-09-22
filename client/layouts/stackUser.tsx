import { Stack, useGlobalSearchParams, useSegments } from 'expo-router';

export default function Layout({ segment }: any) {
  const { user: userName } = useGlobalSearchParams();
  const segments = useSegments();

  const title = segments.includes('followers')
    ? 'Followers'
    : segments.includes('following')
    ? 'Following'
    : '@' + (userName as string);

  return (
    <Stack
      screenOptions={{
        headerTitle: title,
        headerShown: true,
      }}
    />
  );
}
