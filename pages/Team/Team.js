import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import TeamStats from './Team-stats';

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
        return <p>Team here</p>
    }

    // Return statements
    if (loading) {
        return <p>Loading...</p>
    }

    if (showingStats) {
        return <TeamStats />
    } else {
        return (
            <View>
                {renderTeam()}
            </View>
        )
    }
}

export default Team;