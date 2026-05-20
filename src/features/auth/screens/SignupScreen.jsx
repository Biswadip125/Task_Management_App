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

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useAppTheme();

  const styles = createStyles(theme);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please Provide Email and password');
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Account Created');
      setEmail('');
      setPassword('');
      navigation.navigate('Login');
    } catch (err) {
      console.log('Error Sign up:', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

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

      <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
        <Text style={styles.signupButtonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = theme => {
  return StyleSheet.create({
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

    signupButton: {
      backgroundColor: theme.btnBackground,
      paddingVertical: 16,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 8,
    },

    signupButtonText: {
      color: theme.btnText,
      fontSize: 16,
      fontWeight: '600',
    },

    loginText: {
      textAlign: 'center',
      marginTop: 24,
      fontSize: 14,
      color: theme.secondaryText,
    },
  });
};
