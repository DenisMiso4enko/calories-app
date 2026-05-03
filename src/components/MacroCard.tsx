import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppColors, useAppTheme } from '@/styles/global';

type MacroCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
};

export default function MacroCard({ label, value, goal, color }: MacroCardProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.goal}>/ {goal}</Text>
    </View>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  card: {
    backgroundColor: colors.header,
    borderRadius: 12,
    padding: 16,
    width: '47%',
    borderLeftWidth: 4,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 4,
  },
  goal: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
