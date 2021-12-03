import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, ScrollView } from 'react-native';
import GeneralStyles from '../../styles/General';
import TeamStyles from '../../styles/Team';
import { getDocs, collection, getFirestore } from '@firebase/firestore/lite';
import { firebaseApp } from '../../App';

const TeamStats = ({user}) => {
    const [allTimePlayerStats, setAllTimePlayerStats] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllTimePlayerStats = async () => {
        try {
            const userCollection = collection(db, 'users');
            const documents = await getDocs(userCollection);
            const allData = documents.docs.map(doc => doc.data())[0];
            const jsonValue = JSON.stringify(allData.playerStats)
            await AsyncStorage.setItem(`user-${user.uid}-all-time-player-stats`, jsonValue)
            setAllTimePlayerStats(allData.playerStats);
        } catch (e) {
            console.error('Failed to get player stats', e);
        }
    }
 
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
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
                console.error('Error getting all time stats', e);
                setLoading(false);
            }
        }
        getData();

         // Clear any data when leaving the add page
         return () => {}
    }, []);

    const renderStats = () => {
        const sortedTeam = allTimePlayerStats.sort((a, b) => {
            if (a.games === b.games) {
                if (a.goals === b.goals) {
                    if (a.assists === b.assists) {
                        if (a.motms === b.motms) {
                            return a.cleanSheets < b.cleanSheets ? 1 : -1;
                        }
                        return a.motms < b.motms ? 1 : -1;
                    }
                    return a.assists < b.assists ? 1 : -1;
                }
                return a.goals < b.goals ? 1 : -1
             }
             return a.games < b.games ? 1 : -1;
        });
        return (
            <ScrollView>
                {sortedTeam.map((item, index) => (
                    <View key={index} style={TeamStyles.playerStatsWrapper}>
                        {item.isGoalKeeper ?
                            <View style={TeamStyles.playerItem}>
                                <View style={TeamStyles.playerStatsFlex}>
                                    <View style={TeamStyles.playerStatsFlex}>
                                        <Image source={{ uri: item.image }} style={GeneralStyles.playerImg} />
                                        <Text style={GeneralStyles.goalKeeperLabel}>GK</Text>
                                    </View>
                                    <View style={TeamStyles.playerStatsFlexVertical}>
                                        <Text style={GeneralStyles.paragraph}>{item.name}</Text>
                                        <View style={TeamStyles.playerStatsFlex}>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.games} games -</Text>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.goals} goals -</Text>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.assists} assists</Text>
                                        </View>
                                        <View style={TeamStyles.playerStatsFlex}>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.motms} MOTMS -</Text>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.cleanSheets} cleansheets</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            : 
                            <View style={TeamStyles.playerItem}>
                                <View style={TeamStyles.playerStatsFlex}>
                                    <View style={TeamStyles.playerStatsFlex}>
                                        <Image source={{ uri: item.image }} style={GeneralStyles.playerImg} />
                                    </View>
                                    <View style={TeamStyles.playerStatsFlexVertical}>
                                        <Text style={GeneralStyles.paragraph}>{item.name}</Text>
                                        <View style={TeamStyles.playerStatsFlex}>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.games} games -</Text>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.goals} goals -</Text>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.assists} assists</Text>
                                        </View>
                                        <View style={TeamStyles.playerStatsFlex}>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.motms} MOTMS -</Text>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.cleanSheets} cleansheets</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>}
                    </View>))}
            </ScrollView>
        )
    }

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    return renderStats();
}

export default TeamStats;