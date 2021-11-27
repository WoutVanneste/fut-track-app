import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Button, Text, Alert } from 'react-native';
import GeneralStyles from '../../styles/General';

const Settings = ({ user }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const removeAllData = async () => {
        try {
            const dataKeys = [
                `user-${user.uid}-all-time-games`,
                `user-${user.uid}-all-time-player-stats`,
                `user-${user.uid}-team`,
                `user-${user.uid}-subs`,
                `user-${user.uid}-player-list`
            ];
            await AsyncStorage.multiRemove(dataKeys);
            // Show succes message here
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

    // Return statements
    if (isDeleting) {
        return <Text style={GeneralStyles.paragraph}>Deleting club data...</Text>;
    }

    return (
        <View style={GeneralStyles.pageContainer}>
            <Button title="Remove club data" onPress={() => removeData()}/>
        </View>
    );
}

export default Settings;