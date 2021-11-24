import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

const Home = ({ user }) => {
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

    const renderOverview = () => {
        if (allTimeGames.length > 0) {
            return <p>games here</p>;
        } else {
            return <p>No data found for your club. Add a team and your first game to see the stats!</p>;
        }
    };

    const renderMostGoals = () => {
        if (allTimePlayerStats.length > 0) {
            return <p>most goals here</p>;
        }
    };

    const renderMostAssists = () => {
        if (allTimePlayerStats.length > 0) {
            return <p>most assists here</p>;
        }
    };
    
    const renderGameGoals = () => {
        if (allTimeGames.length > 0) {
            return <p>game-goal ratio</p>
        }
    };

    const renderLast5Games = () => {
        if (allTimeGames.length > 0) {
            return <p>last 5 games here</p>;
        }
    };

    const renderGeneralStats = () => {
        if (allTimeGames.length > 0) {
            return <p>general stats here</p>;
        }
    };

    // Return statements
    if (loading) {
        return <p>Loading...</p>;
    };

    return (
        <View>
            {renderOverview()}
            <View>
                {renderMostGoals()}
                {renderMostAssists()}
            </View>
            {renderGameGoals()}
            <View>
                {renderLast5Games()}
                {renderGeneralStats()}
            </View>
        </View>
    );
}

export default Home;