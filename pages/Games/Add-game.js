import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
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

    }
    
    const addTeamAssist = player => {
        
    }

    const addSubGoal = player => {

    }
    
    const addSubAssist = player => {
        
    }

    const makeSubMotm = player => {

    }

    const setPlayerActive = player => {

    }

    const clearGoalsAssists = player => {
        
    }

    const clearGoalsAssistsSub = player => {

    }

    // Render methods
    const renderTeam = () => {
        const teamItems = team.map((teamPlayer, index) => 
            <li key={index}>
                <View>
                    <Image source={{ uri: teamPlayer.image }} style={{width: 100, height: 100, resizeMode: 'contain'}} />
                </View>
                <View>
                    <Text style={GeneralStyles.paragraph}>{teamPlayer.name.length > 20 ? teamPlayer.name.substring(0, 20) + "..." : teamPlayer.name}</Text>
                    <Button onPress={() => clearGoalsAssists(teamPlayer)} title="x" />
                    <Button onPress={() => addTeamGoal(teamPlayer)} title={teamPlayer.goals > 0 ? teamPlayer.goals : "G"} />
                    <Button onPress={() => addTeamAssist(teamPlayer)} title={teamPlayer.assists > 0 ? teamPlayer.assists : "A"} />
                    {/* Might have to be 2 buttons or so one for active MOTM and one for not active */}
                    <Button onPress={() => {
                        setMotm(teamPlayer.id);
                    }} title="MOTM"/>
                </View>
            </li>
        )
        return <View>{teamItems}</View>;
    }

    const renderSubs = () => {
        const subItems = subs.map((subPlayer, index) => 
            // add check on the active field for subs (different styling) 
            <li key={index}>
                <View>
                    <TouchableOpacity onPress={() => setPlayerActive(subPlayer)}>
                        <Image source={{ uri: subPlayer.image }} style={{width: 100, height: 100, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={GeneralStyles.paragraph}>{subPlayer.name.length > 20 ? subPlayer.name.substring(0, 20) + "..." : subPlayer.name}</Text>
                    <Button onPress={() => clearGoalsAssistsSub(subPlayer)} title="x" />
                    <Button onPress={() => addSubGoal(subPlayer)} title={subPlayer.goals > 0 ? subPlayer.goals : "G"} />
                    <Button onPress={() => addSubAssist(subPlayer)} title={subPlayer.assists > 0 ? subPlayer.assists : "A"} />
                    {/* Might have to be 2 buttons or so one for active MOTM and one for not active */}
                    <Button onPress={() => {
                        makeSubMotm(subPlayer);
                    }} title="MOTM"/>
                </View>
            </li>
        )
        return <View>{subItems}</View>;
    }

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    if (team.length > 0 && subs.length > 0){
        return (
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
                {renderTeam()}
                <Text style={GeneralStyles.paragraph}>Subs</Text>
                {renderSubs()}
            </View>
        )
    } else {
        return <Text style={GeneralStyles.paragraph}>You don't have any players in your team yet. Create your team and add your first game.</Text>;
    }
}

export default AddGame;