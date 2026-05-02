import { colors } from '@/styles/global';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
    >
      <Stack.Screen name='(tabs)' options={{ headerShown: false, headerTitle: 'home' }} />
    </Stack>
  );
}