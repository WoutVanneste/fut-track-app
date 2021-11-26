import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import GeneralStyles from '../../styles/General';
import { team as teamData } from '../../data';

const AddGame = ({ allTimePlayerStats, setAllTimePlayerStats }) => {
    const [team, setTeam] = useState([]);
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [motm, setMotm] = useState(0);
    const [awayGoals, setAwayGoals] = useState(0);
    const [totalGoals, setTotalGoals] = useState(0);
    const [totalAssists, setTotalAssists] = useState(0);
    const [totalActiveSubs, setTotalActiveSubs] = useState(0);

    useEffect(() => {
        // const getData = async () => {
        //     setLoading(true);
        //     try {
        //         const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-team`);
        //         setTeam(jsonValue != null ? JSON.parse(jsonValue).team : []);
        //     } catch(e) {
        //         console.error('Error getting all time games', e);
        //     }
        //     try {
        //         const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-team`);
        //         setSubs(jsonValue != null ? JSON.parse(jsonValue).subs : []);
        //     } catch(e) {
        //         console.error('Error getting all time player stats', e);
        //     }
        //     setLoading(false);
        // }
        // getData();
        setTeam(teamData.team);
        setSubs(teamData.subs);
    }, []);

    
    // Action methods
    const submitGame = () => {

    }

    const addTeamGoal = player => {
        // check if sub, check if active, set active if possible

    }
    
    const addTeamAssist = player => {
        // check if sub, check if active, set active if possible
        
    }

    const setPlayerActive = player => {

    }

    const clearGoalsAssists = player => {
        // check if sub, check if active, set active if possible
        
    }
    
    const makePlayerMotm = player => {
        // check if sub, check if active, set active if possible

    }

    // Render methods
    const renderTeam = () => {
        let fullTeam = team.concat(subs);
        return <FlatList 
        data={fullTeam}
        contentContainerStyle={{paddingBottom: 125}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(teamPlayer, index) => (
            <View key={index}>
                <View>
                    {!teamPlayer.item.isStarting ?
                     <TouchableOpacity onPress={() => setPlayerActive(teamPlayer.item)}>
                        <Image source={{ uri: teamPlayer.item.image }} style={{width: 100, height: 100, resizeMode: 'contain'}} />
                    </TouchableOpacity>:
                    <Image source={{ uri: teamPlayer.item.image }} style={{width: 100, height: 100, resizeMode: 'contain'}} />}
                </View>
                <View>
                    <Text style={GeneralStyles.paragraph}>{teamPlayer.item.name.length > 20 ? teamPlayer.item.name.substring(0, 20) + "..." : teamPlayer.item.name}</Text>
                    <Button onPress={() => clearGoalsAssists(teamPlayer.item)} title="x" />
                    <Button onPress={() => addTeamGoal(teamPlayer.item)} title={teamPlayer.item.goals > 0 ? teamPlayer.item.goals : "G"} />
                    <Button onPress={() => addTeamAssist(teamPlayer.item)} title={teamPlayer.item.assists > 0 ? teamPlayer.item.assists : "A"} />
                    {/* Might have to be 2 buttons or so one for active MOTM and one for not active */}
                    <Button onPress={() => makePlayerMotm(teamPlayer.item)} title="MOTM"/>
                </View>
            </View>
        )}
        />;
    }

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    if (team.length > 0 && subs.length > 0){
        return <View>
            <View>
            <View>
                <Text style={GeneralStyles.paragraph}>Scoreline: 
                    <Text style={GeneralStyles.paragraph}>{totalGoals}</Text>- 
                    <Text style={GeneralStyles.paragraph} onPress={() => {
                        const newAwayGoals = awayGoals + 1;
                        setAwayGoals(newAwayGoals);
                    }}>{awayGoals}</Text>
                    {awayGoals > 0 && 
                    <Button
                        onPress={() => {
                            const newAwayGoals = awayGoals - 1;
                            setAwayGoals(newAwayGoals);
                        }}
                        title="-"
                    />}
                </Text>
                <Button onPress={submitGame} title="Save game"/>
            </View>
            <Text style={GeneralStyles.paragraph}>Team</Text>
        </View>
        {renderTeam()}
        </View>;
    } else {
        return <Text style={GeneralStyles.paragraph}>You don't have any players in your team yet. Create your team and add your first game.</Text>;
    }
}

export default AddGame;