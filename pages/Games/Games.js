import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import AddGame from './Add-game';
import GeneralStyles from '../../styles/General';
import GameStyles from '../../styles/Games';

const Games = ({ navigation, user }) => {
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

        navigation.addListener('focus', () => { 
            getData();
        });

        navigation.addListener('blur', () => { 
            setAddingGame(false);
            setAllTimeGames([]);
            setAllTimePlayerStats([]);
            setLoading(false);
        });
    }, []);

    const renderGameIcon = result => {
        switch (result) {
            case 1:
                return <ImageBackground resizeMode="contain" style={GameStyles.imageBackground} source={require('../../assets/images/green-right-single.png')} />;
            case 2:
                return <ImageBackground resizeMode="contain" style={GameStyles.imageBackground} source={require('../../assets/images/blue-right-single.png')} />;
            case 3:
                return <ImageBackground resizeMode="contain" style={GameStyles.imageBackground} source={require('../../assets/images/red-right-single.png')} />;
        }
    }

    const renderGames = () => {
        if (allTimeGames.length > 0) {
            const sortedGames = allTimeGames.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
            return <FlatList
                data={sortedGames}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(game, key) => {
                    return (
                        <View key={key} style={GameStyles.gameWrapper}>
                            {renderGameIcon(game.item.result)}
                            <View>
                                <Text style={GeneralStyles.paragraph}>{game.item.goalsScored} - {game.item.goalsConceded}</Text>
                                <Text style={GeneralStyles.paragraph}>Date: {new Date(game.item.dateTime).toLocaleString().toString()}</Text>
                            </View>
                        </View>
                    )
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
        <View style={GeneralStyles.pageContainer}>
            <View style={GeneralStyles.topContainer}>
                <Text style={GeneralStyles.pageTitle}>Games</Text>
                {addingGame ?
                <Button onPress={() => setAddingGame(false)} title="x"/>: 
                <Button onPress={() => setAddingGame(true)} title="Add game"/>}
            </View>
            {addingGame ? 
            <AddGame
            allTimePlayerStats={allTimePlayerStats}
            setAddingGame={setAddingGame}
            allTimeGames={allTimeGames}
            user={user} /> :
            renderGames()}
        </View>
    )
}

export default Games;