import { useMemo } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

export const themeColors = {
  light: {
    background: '#f7f9fc',
    header: '#ffffff',
    surface: '#e8eef6',
    primary: '#0284c7',
    text: '#111827',
    textSecondary: '#64748b',
    alert: '#dc2626',
    onPrimary: '#ffffff',
    onAlert: '#ffffff',
    statusOverlay: 'rgba(247, 249, 252, 0.86)',
    statusOverlayBorder: 'rgba(15, 23, 42, 0.12)',
  },
  dark: {
    background: '#1a1a2e',
    header: '#242444',
    surface: '#2a2a4a',
    primary: '#4fc3f7',
    text: '#ffffff',
    textSecondary: '#a0a0b0',
    alert: '#ff5252',
    onPrimary: '#1a1a2e',
    onAlert: '#ffffff',
    statusOverlay: 'rgba(26, 26, 46, 0.86)',
    statusOverlayBorder: 'rgba(255, 255, 255, 0.12)',
  },
} as const;

export type AppColorScheme = keyof typeof themeColors;
export type AppColors = (typeof themeColors)[AppColorScheme];

export const createGlobalStyles = (colors: AppColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export function useAppTheme() {
  const colorScheme = useColorScheme();
  const scheme: AppColorScheme = colorScheme === 'light' ? 'light' : 'dark';
  const colors = themeColors[scheme];
  const globalStyles = useMemo(() => createGlobalStyles(colors), [colors]);

  return {
    colors,
    globalStyles,
    scheme,
    isDark: scheme === 'dark',
  };
}