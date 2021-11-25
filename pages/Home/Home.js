import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import GeneralStyles from '../../styles/General';

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
            return <Text style={GeneralStyles.paragraph}>games here</Text>;
        } else {
            return <Text style={GeneralStyles.paragraph}>No data found for your club. Add a team and your first game to see the stats!</Text>;
        }
    };

    const renderMostGoals = () => {
        if (allTimePlayerStats.length > 0) {
            return <Text style={GeneralStyles.paragraph}>most goals here</Text>;
        }
    };

    const renderMostAssists = () => {
        if (allTimePlayerStats.length > 0) {
            return <Text style={GeneralStyles.paragraph}>most assists here</Text>;
        }
    };
    
    const renderGameGoals = () => {
        if (allTimeGames.length > 0) {
            return <Text style={GeneralStyles.paragraph}>game-goal ratio</Text>
        }
    };

    const renderLast5Games = () => {
        if (allTimeGames.length > 0) {
            return <Text style={GeneralStyles.paragraph}>last 5 games here</Text>;
        }
    };

    const renderGeneralStats = () => {
        if (allTimeGames.length > 0) {
            return <Text style={GeneralStyles.paragraph}>general stats here</Text>;
        }
    };

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    };

    return (
        <View style={GeneralStyles.pageContainer}>
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