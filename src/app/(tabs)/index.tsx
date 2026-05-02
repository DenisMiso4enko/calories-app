import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { colors, globalStyles } from '@/styles/global';
import HomeHeader from '@/components/HomeHeader';
import MacroGrid from '@/components/MacroGrid';
import RecentMeals from '@/components/RecentMeals';
import { getMeals, Meal } from '@/storage/meals';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import ShareButton from '@/components/ShareButton';
import CopyButton from '@/components/CopyButton';
import ReminderToggle from '@/components/ReminderToggle';
import { useAuth, useUser } from '@clerk/clerk-expo';

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };
  const { signOut } = useAuth();
  const { user } = useUser();

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, [])
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>MacroZone</Text>
        <ShareButton meals={meals} />
      </View>
      <View style={styles.userCard}>
        <View style={styles.userInfo}>
          {user?.imageUrl && <Image source={{ uri: user.imageUrl }} style={styles.avatar} />}
          <View style={styles.userText}>
            <Text style={styles.label}>Текущий профиль</Text>
            <Text style={styles.name}>{user?.fullName ?? user?.emailAddresses[0].emailAddress}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => signOut()} style={styles.button}>
          <Text style={styles.buttonText}>Выйти</Text>
        </TouchableOpacity>
      </View>
      <HomeHeader />
      <MacroGrid meals={meals} />
      <CopyButton meals={meals} />
      {Platform.OS !== 'android' && <ReminderToggle />}
      <RecentMeals meals={meals} onDelete={loadMeals} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: colors.header,
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  userText: { flex: 1 },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  button: {
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: { color: colors.primary, fontWeight: '700' },
});
