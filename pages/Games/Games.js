import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Text, Button, FlatList, SafeAreaView } from 'react-native';
import AddGame from './Add-game';
import GeneralStyles from '../../styles/General';
import { games, allTimeStats } from '../../data';

const Games = ({ user }) => {
    const [addingGame, setAddingGame] = useState(false);
    const [allTimeGames, setAllTimeGames] = useState([]);
    const [allTimePlayerStats, setAllTimePlayerStats] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const getData = async () => {
        //     setLoading(true);
        //     try {
        //         const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-games`);
        //         setAllTimeGames(jsonValue != null ? JSON.parse(jsonValue) : []);
        //     } catch(e) {
        //         console.error('Error getting all time games', e);
        //     }
        //     try {
        //         const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-player-stats`);
        //         setAllTimePlayerStats(jsonValue != null ? JSON.parse(jsonValue) : []);
        //     } catch(e) {
        //         console.error('Error getting all time player stats', e);
        //     }
        //     setLoading(false);
        // }
        // getData();
        setAllTimeGames(games);
        setAllTimePlayerStats(allTimeStats)
    }, []);

    const renderGames = () => {
        if (allTimeGames.length > 0) {
            const sortedGames = allTimeGames.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
            return <FlatList
                data={sortedGames}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(game, key) => {
                    return <View key={key}>
                        <Text style={GeneralStyles.paragraph}>{game.item.goalsScored} - {game.item.goalsConceded}</Text>
                        <Text style={GeneralStyles.paragraph}>Date: {new Date(game.item.dateTime).toLocaleString().toString()}</Text>
                    </View>
                }} />
        } else {
            return <Text style={GeneralStyles.paragraph}>No games played so far.</Text>;
        }
    };

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    return (
        <SafeAreaView style={GeneralStyles.pageContainer}>
            <View style={GeneralStyles.topContainer}>
                <Text style={GeneralStyles.pageTitle}>Games</Text>
                {addingGame ?
                <Button onPress={() => setAddingGame(false)} title="x"/>: 
                <Button onPress={() => setAddingGame(true)} title="Add game"/>}
            </View>
            {addingGame ? 
            <AddGame allTimePlayerStats={allTimePlayerStats} setAllTimePlayerStats={setAllTimePlayerStats}/> :
            renderGames()}
        </SafeAreaView>
    )
}

export default Games;