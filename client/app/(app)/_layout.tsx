import { Ionicons } from '@expo/vector-icons';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import { useEffect, useState } from 'react';
import { Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Supabase } from '../_layout';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const subs = Supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        console.log(`Supabase auth event: ${event}`, session);
        setIsAuthenticated(session !== null);
      },
    );

    return () => {
      subs.data.subscription.unsubscribe();
    };
  }, []);

  if (!isAuthenticated) return <Redirect href="/sign-up" />;

  const AppBarC = () => (
    <Appbar.Header>
      <Appbar.Content title="Snapit" />
    </Appbar.Header>
  );

  return (
    <PaperProvider theme={customTheme}>
      <Tabs
        backBehavior="history"
        screenOptions={{
          header: AppBarC,
          tabBarActiveTintColor: customTheme.colors.primary,
        }}>
        <Tabs.Screen
          name="(feed)"
          options={{
            headerShown: false,
            tabBarLabel: 'Feed',
            tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
            href: '(feed)/feed',
          }}
        />
        <Tabs.Screen
          name="(search)"
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
            href: '(search)/search',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
            href: {
              pathname: '/[user]',
              params: {
                user: 'pugakn',
              },
            },
            headerTitle: 'Profile',
            headerShown: false,
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
        <Tabs.Screen
          name="camera/index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
