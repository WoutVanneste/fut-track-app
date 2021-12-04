import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import AddGame from './Add-game';
import GeneralStyles from '../../styles/General';
import GameStyles from '../../styles/Games';
import { getFirestore, getDoc, doc } from '@firebase/firestore/lite';
import { firebaseApp } from '../../App';

const Games = ({ navigation, user }) => {
    const [addingGame, setAddingGame] = useState(false);
    const [allTimeGames, setAllTimeGames] = useState([]);
    const [allTimePlayerStats, setAllTimePlayerStats] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllTimeGames = async (db) => {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const allData = docSnap.data();
            if (allData) {
                const jsonValue = JSON.stringify(allData.games);
                await AsyncStorage.setItem(`user-${user.uid}-all-time-games`, jsonValue)
                setAllTimeGames(allData.games);
            }
        } catch (e) {
            console.error('Failed to get games', e);
        }
    }

    const getAllTimePlayerStats = async (db) => {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const allData = docSnap.data();
            if (allData) {
                const jsonValue = JSON.stringify(allData.playerStats)
                await AsyncStorage.setItem(`user-${user.uid}-all-time-player-stats`, jsonValue)
                setAllTimePlayerStats(allData.playerStats);
            }
        } catch (e) {
            console.error('Failed to get player stats', e);
        }
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-games`);
                if (jsonValue !== null) {
                    setAllTimeGames(JSON.parse(jsonValue));
                    setLoading(false);
                } else {
                    const db = getFirestore(firebaseApp);
                    await getAllTimeGames(db);
                    setLoading(false);
                }
            } catch(e) {
                console.error('Error getting all time games', e);
                setLoading(false);
            }
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-player-stats`);
                if (jsonValue !== null) {
                    setAllTimePlayerStats(JSON.parse(jsonValue));
                    setLoading(false);
                } else {
                    const db = getFirestore(firebaseApp);
                    await getAllTimePlayerStats(db);
                    setLoading(false);
                }
            } catch(e) {
                console.error('Error getting all time player stats', e);
                setLoading(false);
            }
            
        }

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
            return <ScrollView>
                {sortedGames.map((item, index) => (
                    <View key={index} style={GameStyles.gameWrapper}>
                        {renderGameIcon(item.result)}
                        <View>
                            <Text style={GeneralStyles.paragraph}>{item.goalsScored} - {item.goalsConceded}</Text>
                            <Text style={GeneralStyles.paragraph}>Date: {new Date(item.dateTime).toLocaleString().toString()}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        } else {
            return <Text style={GeneralStyles.paragraph}>No games played so far.</Text>;
        }
    };

    // Return statements
    if (loading) {
        return <View style={GeneralStyles.pageContainer}><Text style={GeneralStyles.paragraph}>Loading...</Text></View>;
    }

    return (
        <View style={GeneralStyles.pageContainer}>
            <View style={GeneralStyles.topContainerSmall}>
                <Text style={GeneralStyles.pageTitle}>Games</Text>
                {addingGame ?
                <TouchableOpacity onPress={() => setAddingGame(false)}><Text style={[GeneralStyles.button, GeneralStyles.redButton]}>x</Text></TouchableOpacity>:
                <TouchableOpacity onPress={() => setAddingGame(true)}><Text style={[GeneralStyles.button, GeneralStyles.greenButton]}>Add game</Text></TouchableOpacity>}
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