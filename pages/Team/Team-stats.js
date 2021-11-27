import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, Image, SafeAreaView } from 'react-native';
import GeneralStyles from '../../styles/General';
import TeamStyles from '../../styles/Team';

const TeamStats = ({user}) => {
    const [allTimePlayerStats, setAllTimePlayerStats] = useState([]);
    const [loading, setLoading] = useState(false);
 
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-player-stats`);
                setAllTimePlayerStats(jsonValue != null ? JSON.parse(jsonValue) : []);
            } catch(e) {
                console.error('Error getting all time stats', e);
            }
            setLoading(false);
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
            <SafeAreaView style={TeamStyles.playerStatsContainer}>
                <FlatList
                    data={sortedTeam}
                    contentContainerStyle={{paddingBottom: 10}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <View style={TeamStyles.playerStatsWrapper}>
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
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.asssists} assists</Text>
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
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.asssists} assists</Text>
                                        </View>
                                        <View style={TeamStyles.playerStatsFlex}>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.motms} MOTMS -</Text>
                                            <Text style={[GeneralStyles.paragraph, TeamStyles.playerInfoText]}>{item.cleanSheets} cleansheets</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>}
                        </View>
                    )}
                    />
            </SafeAreaView>
        )
    }

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    return renderStats();
}

export default TeamStats;