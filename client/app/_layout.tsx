import { createClient } from '@supabase/supabase-js';
import { Slot } from 'expo-router';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};

export const Supabase = createClient(
  'https://xpvvgrxgmlynmruiyjzf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwdnZncnhnbWx5bm1ydWl5anpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5OTQ4NTAsImV4cCI6MjAwODU3MDg1MH0.EzpkASo9buJPphbt01uSguJ9ZYHpoiSbo1f3XMzsqNM',
);

export default function RootLayout() {
  return (
    <PaperProvider theme={customTheme}>
      <Slot />
    </PaperProvider>
  );
}