import { StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';
import { AppColors, useAppTheme } from '@/styles/global';

export default function HomeHeader() {
  const { colors, globalStyles } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const currentDate = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={globalStyles.header}>
      <Text style={styles.date}>{currentDate}</Text>
    </View>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 30,
  },
});
