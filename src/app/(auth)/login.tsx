import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import { Href, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { colors } from '@/styles/global';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startGithubFlow } = useOAuth({ strategy: 'oauth_github' });

  const handleEmailLogin = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError('');
    try {
      const result = await signIn.create({ identifier: email, password });
      await setActive({ session: result.createdSessionId });
    } catch (e: any) {
      setError(e.errors?.[0]?.message ?? 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (startFlow: () => Promise<any>) => {
    try {
      const { createdSessionId, setActive: setActiveOAuth } = await startFlow();
      if (createdSessionId) {
        await setActiveOAuth!({ session: createdSessionId });
      }
    } catch (e) {
      console.error('OAuth error', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Войти</Text>
        <Text style={styles.subtitle}>Продолжи отслеживать питание в MacroZone</Text>

        <TextInput
          style={styles.input}
          placeholder="Эл. почта"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View style={styles.passwordInputWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Пароль"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword((current) => !current)}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleEmailLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={styles.buttonText}>Войти</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>или</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.socialButton]}
          onPress={() => handleOAuth(startGoogleFlow)}
        >
          <Text style={styles.socialButtonText}>Войти через Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.socialButton]}
          onPress={() => handleOAuth(startGithubFlow)}
        >
          <Text style={styles.socialButtonText}>Войти через GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/signup' as Href)}>
          <Text style={styles.link}>Нет аккаунта? Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.header,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: colors.text,
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surface,
    borderRadius: 10,
    color: colors.text,
    padding: 16,
    marginBottom: 12,
    fontSize: 16,
  },
  passwordInputWrapper: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surface,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    color: colors.text,
    padding: 16,
    fontSize: 16,
  },
  passwordToggle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  socialButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: { color: colors.background, fontWeight: '700', fontSize: 16 },
  socialButtonText: { color: colors.text, fontWeight: '600', fontSize: 16 },
  error: { color: colors.alert, marginBottom: 12, textAlign: 'center' },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.surface,
  },
  dividerText: { color: colors.textSecondary },
  link: { textAlign: 'center', color: colors.primary, marginTop: 12, fontWeight: '600' },
});
