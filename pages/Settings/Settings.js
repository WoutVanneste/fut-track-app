import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Button, Text } from 'react-native';
import GeneralStyles from '../../styles/General';

const Settings = ({ user }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const removeData = async () => {
        setIsDeleting(true);
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