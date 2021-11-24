import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';

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
        } catch (e) {
            console.error('Removing club data failed', e);
        }
        setIsDeleting(false);
    }

    // Return statements
    if (isDeleting) {
        return <p>Deleting club data...</p>;
    }

    return (
        <View>
            <Button title="Remove club data" onPress={() => removeData()}/>
        </View>
    );
}

export default Settings;