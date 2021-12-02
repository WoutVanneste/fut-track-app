import React, { useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';
import Login from './pages/Authentication/Login';
import Navigation from './pages/Navigation';
import { ActivityIndicator, Text, View } from 'react-native';
import GeneralStyles from './styles/General';
import {
  useFonts,
  Rationale_400Regular,
} from '@expo-google-fonts/rationale';

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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  let [fontsLoaded] = useFonts({
    Rationale_400Regular,
  });
  
  onAuthStateChanged(auth, user => {
    if (user !== null) {
        setUser(user);
        setAuthenticated(true);
        setLoading(false);
    }
    if (user === null) {
      setAuthenticated(false);
      setLoading(false);
    }
  });

  if (loading || !fontsLoaded) {
    return <View style={GeneralStyles.pageContainerApp}>
      <ActivityIndicator size="large" color="#C2F655" />
      </View>
  }

  if (!authenticated) {
    return (
      <Login loginUser={signInWithEmailAndPassword} registerUser={createUserWithEmailAndPassword} auth={auth}/>
    );
  };

  return (
    <Navigation user={user}/>
  );
}

export const firebaseApp = initializeApp(firebaseConfig);

export default App;