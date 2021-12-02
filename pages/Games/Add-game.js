import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, TouchableOpacity, Alert, ImageBackground, ScrollView } from 'react-native';
import GeneralStyles from '../../styles/General';
import GameStyles from '../../styles/Games';
import { getDocs, collection, getFirestore } from '@firebase/firestore/lite';
import { firebaseApp } from '../../App';

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

    const getTeam = async () => {
        const userCollection = collection(db, 'users');
        const documents = await getDocs(userCollection);
        const allData = documents.docs.map(doc => doc.data())[0];

        try {
            const jsonValue = JSON.stringify(allData.team)
            await AsyncStorage.setItem(`user-${user.uid}-team`, jsonValue)
            setTeam(allData.team.team);
            setInitialTeam(allData.team.team);
            setSubs(allData.team.subs);
            setInitialSubs(allData.team.subs);
        } catch (e) {
            console.error('Failed to get team', e);
        }
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-team`);
                if (jsonValue !== null) {
                    setTeam(JSON.parse(jsonValue).team);
                    setInitialTeam(JSON.parse(jsonValue).team);
                    setSubs(JSON.parse(jsonValue).subs);
                    setInitialSubs(JSON.parse(jsonValue).subs);
                } else {
                    const db = getFirestore(firebaseApp);
                    getTeam(db);
                }
            } catch(e) {
                console.error('Error getting team', e);
            }
            setLoading(false);
        }
        getData();

        // Clear any data when leaving the add page
        return () => {
            setTeam([]);
            setSubs([]);
            setInitialTeam([]);
            setInitialSubs([]);
            setLoading(false);
            setMotm(0);
            setAwayGoals(0);
            setTotalGoals(0);
            setTotalAssists(0);
            setTotalActiveSubs(0);
        };
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
                newSubs[index].isActive = true;
                if (newSubs[index].goals) {
                    newSubs[index].goals += 1;
                } else {
                    newSubs[index].goals = 1;
                }
                const newTotalGoals = totalGoals + 1;
                setTotalGoals(newTotalGoals);
                setTotalActiveSubs(totalActiveSubs + 1);
                setSubs(newSubs);
            } else if (newSubs[index].isActive) {
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
                newSubs[index].isActive = true;
                setTotalActiveSubs(totalActiveSubs + 1);
                if (newSubs[index].assists) {
                    newSubs[index].assists += 1;
                } else {
                    newSubs[index].assists = 1;
                }
                const newTotalAssists = totalAssists + 1;
                setTotalAssists(newTotalAssists);
                setSubs(newSubs);
            } else if (newSubs[index].isActive) {
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
        const newActiveState = !newSubs[index].isActive;
        if (newActiveState) {
            if (totalActiveSubs < 3) {
                newSubs[index].isActive = true;
                setTotalActiveSubs(totalActiveSubs + 1);
            }
        } else {
            newSubs[index].isActive = false;
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
                newSubs[index].isActive = false;
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
                newSubs[index].isActive = true;
                setTotalActiveSubs(totalActiveSubs + 1);
                setMotm(player.id);
                setSubs(newSubs);
            } else if (newSubs[index].isActive){
                setMotm(player.id);
            }
        }
    }

    // Render methods
    const renderPlayers = players => {
        return <View style={GameStyles.listItem}>
            {players.map((item, index) => 
                <View style={[GameStyles.playerFlexbox, GameStyles.parentPlayerFlexbox]} key={index}>
                    <View style={GameStyles.playerFlexbox}>
                        {!item.isStarting ?
                        <TouchableOpacity style={item.id === motm ? [GameStyles.motmWrapper, GameStyles.motmActive] : [GameStyles.motmWrapper, GameStyles.motmNotActive]} onPress={() => setPlayerActive(item)}>
                            <Image source={{ uri: item.image }} style={GeneralStyles.smallPlayerImg} />
                            {!item.isActive && <View style={GameStyles.notActiveSub} />}
                        </TouchableOpacity>:
                        <View style={item.id === motm ? [GameStyles.motmWrapper, GameStyles.motmActive] : [GameStyles.motmWrapper, GameStyles.motmNotActive]}>
                            <Image source={{ uri: item.image }} style={GeneralStyles.smallPlayerImg} />
                            {!item.isActive && <View style={GameStyles.notActiveSub} />}
                        </View>}
                        {!item.isActive ?
                        <Text style={GameStyles.inActiveName}>{item.name.length > 14 ? item.name.substring(0, 14) + "..." : item.name}</Text>:
                        <Text style={GeneralStyles.paragraph}>{item.name.length > 14 ? item.name.substring(0, 14) + "..." : item.name}</Text>}
                    </View>
                    <View style={GameStyles.playerFlexbox}>
                        {item.goals > 0 || item.assists > 0 ? <TouchableOpacity onPress={() => clearGoalsAssists(item)}><Text style={[GeneralStyles.smallButton, GeneralStyles.redButton]}>x</Text></TouchableOpacity> : null}
                        <TouchableOpacity style={[GeneralStyles.leftMargin, GameStyles.addTextWrapper]} onPress={() => addTeamGoal(item)}>
                            <Text style={[GeneralStyles.smallButton, GeneralStyles.blueButton]}>{item.goals > 0 ? item.goals.toString() : "G"}</Text>
                            <Text style={GameStyles.addText}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[GeneralStyles.leftMargin, GameStyles.addTextWrapper]} onPress={() => addTeamAssist(item)}>
                            <Text style={[GeneralStyles.smallButton, GeneralStyles.blueButton]}>{item.assists > 0 ? item.assists.toString() : "A"}</Text>
                            <Text style={GameStyles.addText}>+</Text>
                        </TouchableOpacity>
                        {item.id === motm ? 
                        <TouchableOpacity onPress={() => setMotm(0)}>
                            <ImageBackground style={GameStyles.motmButton} resizeMode="contain" source={require('../../assets/images/motm-gold.png')}></ImageBackground>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => makePlayerMotm(item)} title="MOTM">
                            <ImageBackground style={GameStyles.motmButton} resizeMode="contain" source={require('../../assets/images/motm.png')}></ImageBackground>
                        </TouchableOpacity>}
                    </View>
                </View>
            )}
        </View>
    }

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    if (team.length > 0 && subs.length > 0 && initialTeam.length > 0 && initialSubs.length > 0){
        return <View>
            <View style={[GameStyles.scoreLineWrapper, GameStyles.parentScoreLineWrapper]}>
                <View style={GameStyles.scoreLineWrapper}>
                    <Text style={GeneralStyles.paragraph}>Scoreline:</Text>
                    <Text style={GameStyles.scoreLineText}>{totalGoals}</Text>
                    <Text style={GeneralStyles.paragraph}>-</Text> 
                    <Text style={GameStyles.scoreLineText} onPress={() => {
                        const newAwayGoals = awayGoals + 1;
                        setAwayGoals(newAwayGoals);
                    }}>{awayGoals}</Text>
                    {awayGoals > 0 && 
                    <TouchableOpacity onPress={() => {
                            const newAwayGoals = awayGoals - 1;
                            setAwayGoals(newAwayGoals);
                        }}>
                        <Text style={[GeneralStyles.smallButton, GeneralStyles.redButton]}>-</Text>
                    </TouchableOpacity>}
                </View>
                <TouchableOpacity onPress={submitGame}>
                    <Text style={[GeneralStyles.button, GeneralStyles.greenButton]}>Save game</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={GameStyles.listWrapper}>
                <Text style={[GeneralStyles.paragraph, GameStyles.listTitle]}>Team</Text>
                {renderPlayers(team)}
                <Text style={[GeneralStyles.paragraph, GameStyles.listTitle]}>Subs</Text>
                {renderPlayers(subs)}
            </ScrollView>
        </View>;
    } else {
        return <Text style={GeneralStyles.paragraph}>You don't have any players in your team yet. Create your team and add your first game.</Text>;
    }
}

export default AddGame;