import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, Image, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import GeneralStyles from '../../styles/General';
import { team as teamData } from '../../data';

const AddGame = ({ allTimePlayerStats, allTimeGames, setAddingGame, user }) => {
    const [team, setTeam] = useState([]);
    const [subs, setSubs] = useState([]);
    const [initialTeam, setInitialTeam] = useState([]);
    const [initialSubs, setInitialSubs] = useState([]);
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
        setInitialTeam(teamData.team);
        setInitialSubs(teamData.subs);
    }, []);

    
    // Action methods
    const submitGame = () => {
        if (totalAssists > totalGoals) {
            Alert.alert(
                "Cannot save match",
                "You cannot have more assists than goals."
            );
            return;
        }

        if (motm === 0) {
            Alert.alert(
                "Sure about adding this game?",
                "Are you sure you want to add this game without a MOTM?",
                [
                    {
                        text: "Cancel",
                        onPress: () => { return },
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => submitGameData() }
                ]
            );
            return;
        }

        
        submitGameData();
    }

    const submitGameData = () => {
        // Set result
        let result = null;
        if (totalGoals > awayGoals) {
            result = 1;
        }
        if (totalGoals === awayGoals) {
            result = 2;
        }
        if (totalGoals < awayGoals) {
            result = 3;
        }

        // Create empty game object
        const newGame = {
            goalsScored: totalGoals,
            goalsConceded: awayGoals,
            result,
            dateTime: new Date().getTime()
        }

        // Get all time games
        let newAllTimeGames = allTimeGames;
        newAllTimeGames.push(newGame);
        
        // Get all time player stats
        let newAllTimePlayerStats = allTimePlayerStats;
        if (allTimePlayerStats.length > 0) {
            allTimePlayerStats.forEach((player, index) => {
                team.forEach(teamPlayer => {
                    if (teamPlayer.id === player.id) {
                        teamPlayer.games ++;
                        if (awayGoals === 0) {
                            teamPlayer.cleanSheets ++;
                        }
                        if (motm === teamPlayer.id) {
                            teamPlayer.motms ++;
                        }
                        player.games = player.games + 1;
                        player.goals = player.goals + teamPlayer.goals;
                        player.assists = player.assists + teamPlayer.assists;
                        player.motms = player.motms + teamPlayer.motms;
                        player.cleanSheets = player.cleanSheets + teamPlayer.cleanSheets;
                        player.image = teamPlayer.image;
                        player.rating = teamPlayer.rating;
                        newAllTimePlayerStats[index] = player;
                    } else {
                        const playerExists = id => {
                            return allTimePlayerStats.some(player => {
                                return player.id === id;
                            });
                        }
                        if (!playerExists(teamPlayer.id)) {
                            teamPlayer.games ++;
                            if (awayGoals === 0) {
                                teamPlayer.cleanSheets ++;
                            }
                            if (motm === teamPlayer.id) {
                                teamPlayer.motms ++;
                            }
                            newAllTimePlayerStats.push(teamPlayer);
                        }
                    }
                });
                subs.forEach(subPlayer => {
                    if (subPlayer.isActive) {
                        if (subPlayer.id === player.id) {
                            subPlayer.games ++;
                            if (awayGoals === 0) {
                                subPlayer.cleanSheets ++;
                            }
                            if (motm === subPlayer.id) {
                                subPlayer.motms ++;
                            }
                            player.games = player.games + 1;
                            player.goals = player.goals + subPlayer.goals;
                            player.assists = player.assists + subPlayer.assists;
                            player.motms = player.motms + subPlayer.motms;
                            player.cleanSheets = player.cleanSheets + subPlayer.cleanSheets;
                            player.image = subPlayer.image;
                            player.rating = subPlayer.rating;
                            newAllTimePlayerStats[index] = player;
                        } else {
                            const playerExists = id => {
                                return allTimePlayerStats.some(player => {
                                    return player.id === id;
                                });
                            }
                            if (!playerExists(subPlayer.id)) {
                                subPlayer.games ++;
                                if (awayGoals === 0) {
                                    subPlayer.cleanSheets ++;
                                }
                                if (motm === subPlayer.id) {
                                    subPlayer.motms ++;
                                }
                                newAllTimePlayerStats.push(subPlayer);
                            }
                        }
                    }
                });                
            });
        } else {
            team.forEach(teamPlayer => {
                teamPlayer.games ++;
                if (awayGoals === 0) {
                    teamPlayer.cleanSheets ++;
                }
                if (motm === teamPlayer.id) {
                    teamPlayer.motms ++;
                }
                newAllTimePlayerStats.push(teamPlayer);
            });
            subs.forEach(subPlayer => {
                if (subPlayer.isActive) {
                    subPlayer.games ++;
                    if (awayGoals === 0) {
                        subPlayer.cleanSheets ++;
                    }
                    if (motm === subPlayer.id) {
                        subPlayer.motms ++;
                    }
                    newAllTimePlayerStats.push(subPlayer);
                }
            })
        }

        const saveDataLocal = async () => {
            try {
                const jsonValue = JSON.stringify(newAllTimePlayerStats)
                await AsyncStorage.setItem(`user-${user.uid}-all-time-player-stats`, jsonValue)
            } catch (e) {
                console.error('Failed to save player stats', e);
            }
            
            try {
                const jsonValue = JSON.stringify(newAllTimeGames)
                await AsyncStorage.setItem(`user-${user.uid}-all-time-games`, jsonValue)
            } catch (e) {
                console.error('Failed to save game', e);
            }
        }

        saveDataLocal();

        // Reset team and subs to empty
        setTeam(initialTeam);
        setSubs(initialSubs);

        setAddingGame(false);
    }

    const addTeamGoal = player => {
        if (player.isStarting) {
            const newTeam = [...team];
            const index = newTeam.findIndex((teamPlayer) => teamPlayer.id === player.id);
            if (newTeam[index].goals) {
                newTeam[index].goals += 1;
            } else {
                newTeam[index].goals = 1;
            }
            setTeam(newTeam);
            const newTotalGoals = totalGoals + 1;
            setTotalGoals(newTotalGoals);
        } else {
            const newSubs = [...subs];
            const index = newSubs.findIndex((teamPlayer) => teamPlayer.id === player.id);
            if (totalActiveSubs < 3) {
                newSubs[index].active = true;
                if (newSubs[index].goals) {
                    newSubs[index].goals += 1;
                } else {
                    newSubs[index].goals = 1;
                }
                setTotalActiveSubs(totalActiveSubs + 1);
                setSubs(newSubs);
            } else if (newSubs[index].active) {
                if (newSubs[index].goals) {
                    newSubs[index].goals += 1;
                } else {
                    newSubs[index].goals = 1;
                }
                const newTotalGoals = totalGoals + 1;
                setTotalGoals(newTotalGoals);
                setSubs(newSubs);
            }
        }
    }
    
    const addTeamAssist = player => {
        if (player.isStarting) {
            const newTeam = [...team];
            const index = newTeam.findIndex((teamPlayer) => teamPlayer.id === player.id);
            if (newTeam[index].assists) {
                newTeam[index].assists += 1;
            } else {
                newTeam[index].assists = 1;
            }
            setTeam(newTeam);
            const newTotalAssists = totalAssists + 1;
            setTotalAssists(newTotalAssists);
        } else {
            const newSubs = [...subs];
            const index = newSubs.findIndex((teamPlayer) => teamPlayer.id === player.id);
            if (totalActiveSubs < 3) {
                newSubs[index].active = true;
                setTotalActiveSubs(totalActiveSubs + 1);
                if (newSubs[index].assists) {
                    newSubs[index].assists += 1;
                } else {
                    newSubs[index].assists = 1;
                }
                const newTotalAssists = totalAssists + 1;
                setTotalAssists(newTotalAssists);
                setSubs(newSubs);
            } else if (newSubs[index].active) {
                if (newSubs[index].assists) {
                    newSubs[index].assists += 1;
                } else {
                    newSubs[index].assists = 1;
                }
                const newTotalAssists = totalAssists + 1;
                setTotalAssists(newTotalAssists);
                setSubs(newSubs);
            }
        }
    }

    const setPlayerActive = player => {
        const newSubs = [...subs];
        const index = newSubs.findIndex((teamPlayer) => teamPlayer.id === player.id);
        const newActiveState = !newSubs[index].active;
        if (newActiveState) {
            if (totalActiveSubs < 3) {
                newSubs[index].active = true;
                setTotalActiveSubs(totalActiveSubs + 1);
            }
        } else {
            newSubs[index].active = false;
            setTotalActiveSubs(totalActiveSubs - 1);
        }
        setSubs(newSubs);
    }

    const clearGoalsAssists = player => {
        if (player.isStarting) {
            const newTeam = [...team];
            const index = newTeam.findIndex((teamPlayer) => teamPlayer.id === player.id);
            const newTotalGoals = totalGoals - newTeam[index].goals;
            setTotalGoals(newTotalGoals < 0 ? 0 : newTotalGoals);
            const newTotalAssists = totalGoals - newTeam[index].assists;
            setTotalAssists(newTotalAssists < 0 ? 0 : newTotalAssists);
            newTeam[index].assists = 0;
            newTeam[index].goals = 0;
            setTeam(newTeam);
        } else {
            const newSubs = [...subs];
            const index = newSubs.findIndex((teamPlayer) => teamPlayer.id === player.id);
            const newTotalGoals = totalGoals - newSubs[index].goals;
            setTotalGoals(newTotalGoals < 0 ? 0 : newTotalGoals);
            const newTotalAssists = totalAssists - newSubs[index].assists;
            setTotalAssists(newTotalAssists < 0 ? 0 : newTotalAssists);
            newSubs[index].assists = 0;
            newSubs[index].goals = 0;
            if (motm !== player.id) {
                newSubs[index].active = false;
                setTotalActiveSubs(totalActiveSubs - 1);
            }
            setSubs(newSubs);
        }
    }
    
    const makePlayerMotm = player => {
        if (player.isStarting) {
            setMotm(player.id);
        } else {
            const newSubs = [...subs];
            const index = newSubs.findIndex((teamPlayer) => teamPlayer.id === player.id);
            if (totalActiveSubs < 3) {
                newSubs[index].active = true;
                setTotalActiveSubs(totalActiveSubs + 1);
                setMotm(player.id);
                setSubs(newSubs);
            } else if (newSubs[index].active){
                setMotm(player.id);
            }
        }
    }

    // Render methods
    const renderTeam = () => {
        let fullTeam = initialTeam.concat(initialSubs);
        return <FlatList 
        data={fullTeam}
        contentContainerStyle={{paddingBottom: 125}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(teamPlayer, index) => (
            <View key={index}>
                <View>
                    {!teamPlayer.item.isStarting ?
                     <TouchableOpacity onPress={() => setPlayerActive(teamPlayer.item)}>
                        <Image source={{ uri: teamPlayer.item.image }} style={GeneralStyles.playerImg} />
                    </TouchableOpacity>:
                    <Image source={{ uri: teamPlayer.item.image }} style={GeneralStyles.playerImg} />}
                </View>
                <View>
                    <Text style={GeneralStyles.paragraph}>{teamPlayer.item.name.length > 20 ? teamPlayer.item.name.substring(0, 20) + "..." : teamPlayer.item.name}</Text>
                    <Button onPress={() => clearGoalsAssists(teamPlayer.item)} title="x" />
                    <Button onPress={() => addTeamGoal(teamPlayer.item)} title={teamPlayer.item.goals > 0 ? teamPlayer.item.goals.toString() : "G"} />
                    <Button onPress={() => addTeamAssist(teamPlayer.item)} title={teamPlayer.item.assists > 0 ? teamPlayer.item.assists.toString() : "A"} />
                    {teamPlayer.item.id === motm ? 
                    // Add same styling to view as for the button but with active color
                    <View><Text>Is MOTM</Text></View> :
                    <Button onPress={() => makePlayerMotm(teamPlayer.item)} title="MOTM"/>}
                </View>
            </View>
        )}
        />;
    }

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    if (team.length > 0 && subs.length > 0 && initialTeam.length > 0 && initialSubs.length > 0){
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