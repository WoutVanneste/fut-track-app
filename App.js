import React, { useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';
import Login from './pages/Authentication/Login';
import Navigation from './pages/Navigation';
import {
  useFonts,
  Rationale_400Regular,
} from '@expo-google-fonts/rationale';
import { Text } from 'react-native';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId
};

initializeApp(firebaseConfig);

const auth = getAuth();

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  let [fontsLoaded] = useFonts({
    Rationale_400Regular,
  });

  onAuthStateChanged(auth, user => {
    if (user != null) {
      setUser(user);
      setAuthenticated(true)
    }
  });

  if (!fontsLoaded) {
    return <Text>Loading styles...</Text>
  }

  if (!authenticated) {
    return (
      <Login loginUser={signInWithEmailAndPassword} auth={auth}/>
    );
  };

  return (
    <Navigation user={user}/>
  );
}

export default App;