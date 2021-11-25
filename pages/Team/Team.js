import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import TeamStats from './Team-stats';
import GeneralStyles from '../../styles/General';

const Team = ({ user }) => {
    const [team, setTeam] = useState([]);
    const [subs, setSubs] = useState([]);
    const [showingStats, setShowingStats] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-team`);
                setTeam(jsonValue != null ? JSON.parse(jsonValue) : []);
            } catch(e) {
                console.error('Error getting team', e);
            }
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-subs`);
                setSubs(jsonValue != null ? JSON.parse(jsonValue) : []);
            } catch(e) {
                console.error('Error getting subs', e);
            }
            setLoading(false);
        }
        getData();
    }, []);

    const renderTeam = () => {
        return <Text style={GeneralStyles.paragraph}>Team here</Text>;
    }

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    return (
        <View style={GeneralStyles.pageContainer}>
            {showingStats ?
            <TeamStats /> :
            renderTeam()}
        </View>
    );
}

export default Team;