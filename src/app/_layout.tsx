import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';
import { Href, Slot, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@/styles/global';

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = (segments[0] as string) === '(auth)';

    if (isSignedIn && inAuthGroup) {
      router.replace('/(tabs)');
    } else if (!isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/login' as Href);
    }
  }, [isSignedIn, isLoaded, router, segments]);

  return <Slot />;
}

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const CONTENT_TOP_OFFSET = 8;

function AppContent() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();
  const canUseGlass = isGlassEffectAPIAvailable();

  const statusOverlayStyle = [
    styles.statusGlass,
    {
      height: insets.top,
      backgroundColor: colors.statusOverlay,
      borderBottomColor: colors.statusOverlayBorder,
    },
  ];

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={[styles.content, { paddingTop: CONTENT_TOP_OFFSET }]}>
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <ClerkLoaded>
            <InitialLayout />
          </ClerkLoaded>
        </ClerkProvider>
      </View>
      {canUseGlass ? (
        <GlassView
          pointerEvents="none"
          glassEffectStyle="regular"
          colorScheme={isDark ? 'dark' : 'light'}
          tintColor={colors.statusOverlay}
          style={statusOverlayStyle}
        />
      ) : (
        <View pointerEvents="none" style={statusOverlayStyle} />
      )}
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  statusGlass: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
