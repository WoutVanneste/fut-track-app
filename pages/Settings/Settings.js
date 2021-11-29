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
      getFirestore
     } from '@firebase/firestore/lite';
import { firebaseApp } from '../../App';

const Settings = ({ user }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const removeAllData = async () => {
        try {
            const dataKeys = [
                `user-${user.uid}-all-time-games`,
                `user-${user.uid}-all-time-player-stats`,
                `user-${user.uid}-team`
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
            const docData = documents.docs.map(doc => doc.data());;
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
    // Return statements
    if (isLoading) {
        return <Text style={GeneralStyles.paragraph}>Loading players...</Text>;
    }

    if (isDeleting) {
        return <Text style={GeneralStyles.paragraph}>Deleting club data...</Text>;
    }

    return (
        <View style={[GeneralStyles.pageContainer, GeneralStyles.settingsWrapper]}>
            <View style={GeneralStyles.settingsTopContainer}>
                <Text style={GeneralStyles.paragraph}>Signed in {user.displayName ? 'as ' + user.displayName : 'with ' + user.email}</Text>
                <View style={GeneralStyles.settingsButtonWrapper}>
                    <TouchableOpacity onPress={() => updatePlayers()} >
                        <Text style={[GeneralStyles.button, GeneralStyles.greenButton]}>Update players</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={GeneralStyles.settingsButton} onPress={() => signOut()} >
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