import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function RootNavigator() {
  // TEMPORARY
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return subscriber;
  }, []);

  if (loading) return null;

  return user ? <AppStack /> : <AuthStack />;
}
