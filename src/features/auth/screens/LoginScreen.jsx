import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import { useAppTheme } from '../../../theme/useAppTheme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const theme = useAppTheme();

  const styles = createStyles(theme);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please Provide Email and Password');

      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);

      Alert.alert('Success', 'Login Successful');
    } catch (err) {
      console.log('Error Login', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={theme.secondaryText}
      />

      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor={theme.secondaryText}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      backgroundColor: theme.background,
    },

    title: {
      fontSize: 32,
      fontWeight: '700',
      marginBottom: 40,
      color: theme.text,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 16,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.card,
    },

    loginButton: {
      backgroundColor: theme.btnBackground,

      paddingVertical: 16,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 8,
    },

    loginButtonText: {
      color: theme.btnText,
      fontSize: 16,
      fontWeight: '600',
    },

    signupText: {
      textAlign: 'center',
      marginTop: 24,
      fontSize: 14,
      color: theme.secondaryText,
    },
  });
