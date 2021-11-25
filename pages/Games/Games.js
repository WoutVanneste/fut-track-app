import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import AddGame from './Add-game';
import GeneralStyles from '../../styles/General';

const Games = ({ user }) => {
    const [addingGame, setAddingGame] = useState(false);
    const [allTimeGames, setAllTimeGames] = useState([]);
    const [allTimePlayerStats, setAllTimePlayerStats] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-games`);
                setAllTimeGames(jsonValue != null ? JSON.parse(jsonValue) : []);
            } catch(e) {
                console.error('Error getting all time games', e);
            }
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-player-stats`);
                setAllTimePlayerStats(jsonValue != null ? JSON.parse(jsonValue) : []);
            } catch(e) {
                console.error('Error getting all time player stats', e);
            }
            setLoading(false);
        }
        getData();
    }, []);

    const renderGames = () => {
        if (allTimeGames.length > 0) {
            return <Text style={GeneralStyles.paragraph}>game data here</Text>;
        } else {
            return <Text style={GeneralStyles.paragraph}>No games played so far.</Text>;
        }
    };

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

  
    return (
        <View style={GeneralStyles.pageContainer}>
            {addingGame ? 
            <AddGame allTimePlayerStats={allTimePlayerStats} setAllTimePlayerStats={setAllTimePlayerStats} /> : 
            renderGames()}
        </View>
    );
}

export default Games;