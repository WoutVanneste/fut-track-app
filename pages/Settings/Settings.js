import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import GeneralStyles from '../../styles/General';
import {
    signOut
  } from 'firebase/auth';
  import {
      getDocs,
      collection,
      getFirestore,
      updateDoc,
      doc,
      addDoc,
      getDoc,
      setDoc
     } from '@firebase/firestore/lite';
import { firebaseApp } from '../../App';

const Settings = ({ user, auth }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const removeAllData = async () => {
        try {
            await updateDb()
        } catch (e) {
            console.error('Failed to update db', e);
            Alert.alert(
                "Cannot delete data",
                "We could not update the database with your local data, so deleting the local data will lead to lost data."
            );
            return;
        }
        try {
            const dataKeys = [
                `user-${user.uid}-all-time-games`,
                `user-${user.uid}-all-time-player-stats`,
                `user-${user.uid}-team`,
                `user-${user.uid}-subs`
            ];
            await AsyncStorage.multiRemove(dataKeys);
        } catch (e) {
            console.error('Removing club data failed', e);
        }
    }

    const removeData = () => {
        setIsDeleting(true);
        Alert.alert(
            'You are about to delete all local data',
            'Are you sure you want to clear your local club data?',
            [
                {
                    text: "Cancel",
                    onPress: () => { return },
                    style: "cancel"
                  },
                  { text: "Delete", onPress: () => removeAllData() }
            ]
        )
        setIsDeleting(false);
    }

    const updatePlayers = () => {
        setIsLoading(true);
        async function getGames(db) {
            const playerCollection = collection(db, 'players');
            const documents = await getDocs(playerCollection);
            const docData = documents.docs.map(doc => doc.data());
            try {
                const jsonValue = JSON.stringify(docData)
                await AsyncStorage.setItem(`user-${user.uid}-player-list`, jsonValue)
                setIsLoading(false);
            } catch (e) {
                console.error('Failed to save players', e);
                setIsLoading(false);
            }
        }
        const db = getFirestore(firebaseApp)
        getGames(db);
    }

    const updateDb = async () => {
        let localGames = [];
        let localPlayerStats = [];
        let localTeam = [];
        let localSubs = [];
        try {
            const JSONValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-games`)
            if (JSONValue != null) {
                localGames = JSON.parse(JSONValue);
            }
        } catch (e) {
            console.error('Failed to get games', e);
        }
        try {
            const JSONValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-player-stats`)
            if (JSONValue != null) {
                localPlayerStats = JSON.parse(JSONValue);
            }
        } catch (e) {
            console.error('Failed to get games', e);
        }
        try {
            const JSONValue = await AsyncStorage.getItem(`user-${user.uid}-team`)
            if (JSONValue != null) {
                localTeam = JSON.parse(JSONValue);
            }
        } catch (e) {
            console.error('Failed to get games', e);
        }
        try {
            const JSONValue = await AsyncStorage.getItem(`user-${user.uid}-subs`)
            if (JSONValue != null) {
                localSubs = JSON.parse(JSONValue);
            }
        } catch (e) {
            console.error('Failed to get games', e);
        }
        if (localGames === [] || localPlayerStats === [] || localTeam === [] || localSubs === []) {
            Alert.alert(
                "Something went wrong.",
                "Not enough local storage found."
                );
                return;
            } else {
            const db = getFirestore(firebaseApp)
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const allData = docSnap.data();
            if (allData) {
                await updateDoc(doc(db, 'users', user.uid), {
                    games: localGames,
                    playerStats: localPlayerStats,
                    team: localTeam,
                    subs: localSubs
                })
            } else {
                await setDoc(doc(db, 'users', user.uid), {
                    games: localGames,
                    playerStats: localPlayerStats,
                    team: localTeam,
                    subs: localSubs
                })

            }
        }
    }

    // Return statements
    if (isLoading) {
        return <View style={GeneralStyles.pageContainer}>
            <Text style={GeneralStyles.paragraph}>Updating players...</Text>
        </View>
    }

    if (isDeleting) {
        return <View style={GeneralStyles.pageContainer}>
            <Text style={GeneralStyles.paragraph}>Deleting club data...</Text>
        </View>
    }

    return (
        <View style={[GeneralStyles.pageContainer, GeneralStyles.settingsWrapper]}>
            <View style={GeneralStyles.settingsTopContainer}>
                <Text style={GeneralStyles.paragraph}>Signed in {user.displayName ? 'as ' + user.displayName : 'with ' + user.email}</Text>
                <View style={GeneralStyles.settingsButtonWrapper}>
                    <TouchableOpacity onPress={() => updatePlayers()} >
                        <Text style={[GeneralStyles.button, GeneralStyles.greenButton]}>Update players</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={GeneralStyles.settingsButton} onPress={() => updateDb()} >
                        <Text style={[GeneralStyles.button, GeneralStyles.greenButton]}>Update database</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={GeneralStyles.settingsButton} onPress={() => signOut(auth)} >
                        <Text style={[GeneralStyles.button, GeneralStyles.blueButton]}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => removeData()} >
                <Text style={[GeneralStyles.button, GeneralStyles.redButton]}>Remove all club data</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Settings;