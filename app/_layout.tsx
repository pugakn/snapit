import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/tabs';
import { Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};

export default function RootLayout() {
  const AppBarC = () => (
    <Appbar.Header>
      <Appbar.Content title="Snapit" />
    </Appbar.Header>
  );

  return (
    <PaperProvider theme={customTheme}>
      <Tabs
        initialRouteName="/profile/camera"
        backBehavior="history"
        screenOptions={{
          header: AppBarC,
          tabBarActiveTintColor: customTheme.colors.primary,
        }}>
        <Tabs.Screen
          name="(profile)"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
            href: {
              pathname: '/[user]',
              params: {
                user: 'pugakn',
              },
            },
            headerTitle: 'Profile',
          }}
        />
        <Tabs.Screen
          name="(search)"
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
            href: '(search)',
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
            href: 'settings',
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
