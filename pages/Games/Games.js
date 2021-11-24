import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import AddGame from './Add-game';

const Games = ({ user }) => {
    const [addingGame, setAddingGame] = useState(false);
    const [allTimeGames, setAllTimeGames] = useState([]);
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
            return <p>game data here</p>
        } else {
            return <p>No games played so far.</p>
        }
    }

    // Return statements
    if (loading) {
        return <p>Loading...</p>
    }

    if (addingGame) {
        return <AddGame />
    } else {
        return (
            <View>
                {renderGames()}
            </View>
        );
    }
}

export default Games;