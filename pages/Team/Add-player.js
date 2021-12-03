import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import GeneralStyles from '../../styles/General';
import TeamStyles from '../../styles/Team';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { getDocs, collection, getFirestore } from '@firebase/firestore/lite';
import { firebaseApp } from '../../App';

const AddPlayer = ({user, player, setAddingPlayer, team, subs, setTeam, setSubs, isNewPlayerSub, teamHasGoalKeeper, setTeamHasGoalKeeper }) => {
    const [playerList, setPlayerList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playerSearch, setPlayerSearch] = useState("");

    const getPlayers = async (db) => {
        const playerCollection = collection(db, 'players');
        const documents = await getDocs(playerCollection);
        const docData = documents.docs.map(doc => doc.data());
        try {
            const jsonValue = JSON.stringify(docData)
            await AsyncStorage.setItem(`user-${user.uid}-player-list`, jsonValue)
            setPlayerList(docData)
        } catch (e) {
            console.error('Failed to get players', e);
        }
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-player-list`);
                if (jsonValue !== null) {
                    setPlayerList(JSON.parse(jsonValue));
                    setLoading(false);
                } else {
                    const db = getFirestore(firebaseApp);
                    await getPlayers(db);
                    setLoading(false);
                }
            } catch(e) {
                console.error('Error getting team', e);
                setLoading(false);
            }
        }
        getData();

        // Clear any data when leaving the add page
        return () => {
            setAddingPlayer(false);
            setPlayerSearch("");
            setLoading(false);
        };
    }, []);

    const replacePlayer = newPlayer => {
        if (!player) {
            // Add position of old player or length of player list
            const newPlayerObject = {
                assists: 0,
                cleanSheets: 0,
                games: 0,
                goals: 0,
                id: newPlayer.id,
                image: newPlayer.image,
                isActive: isNewPlayerSub ? false : true,
                isGoalKeeper: newPlayer.isGoalKeeper,
                isStarting: isNewPlayerSub ? false : true,
                motms: 0,
                name: newPlayer.name,
                rating: newPlayer.rating,
                searchName: newPlayer.searchName,
                position: team.length
            }
            if (isNewPlayerSub) {
                let newSubs = subs;
                if (newPlayerObject.isGoalKeeper) {
                    setTeamHasGoalKeeper(true);
                }
                newSubs.push(newPlayerObject);
                const saveLocalData = async () => {
                    try {
                        const jsonValue = JSON.stringify(team)
                        await AsyncStorage.setItem(`user-${user.uid}-team`, jsonValue)
                    } catch (e) {
                        console.error('Failed to save team', e);
                    }
                    try {
                        const jsonValue = JSON.stringify(subs)
                        await AsyncStorage.setItem(`user-${user.uid}-subs`, jsonValue)
                    } catch (e) {
                        console.error('Failed to save subs', e);
                    }
                }
                saveLocalData();
                setSubs(newSubs);
            } else {
                let newTeam = team;
                if (newPlayerObject.isGoalKeeper) {
                    setTeamHasGoalKeeper(true);
                }
                newTeam.push(newPlayerObject);
                const saveLocalData = async () => {
                    try {
                        const jsonValue = JSON.stringify(team)
                        await AsyncStorage.setItem(`user-${user.uid}-team`, jsonValue)
                    } catch (e) {
                        console.error('Failed to save team', e);
                    }
                    try {
                        const jsonValue = JSON.stringify(subs)
                        await AsyncStorage.setItem(`user-${user.uid}-subs`, jsonValue)
                    } catch (e) {
                        console.error('Failed to save subs', e);
                    }
                }
                saveLocalData();
                setTeam(newTeam);
            }
            setAddingPlayer(false);
            return;
        } else {
            // Add position of old player or length of player list
            const newPlayerObject = {
                assists: 0,
                cleanSheets: 0,
                games: 0,
                goals: 0,
                id: newPlayer.id,
                image: newPlayer.image,
                isActive: player.isActive,
                isGoalKeeper: newPlayer.isGoalKeeper,
                isStarting: player.isStarting,
                motms: 0,
                name: newPlayer.name,
                rating: newPlayer.rating,
                searchName: newPlayer.searchName,
                position: player.position
            }
            if (containsObject(player, team)) {
                let newTeam = team;
                const index = team.findIndex(teamPlayer => teamPlayer.id === player.id);
                if (newPlayerObject.isGoalKeeper) {
                    setTeamHasGoalKeeper(true);
                }
                newTeam[index] = newPlayerObject;
                const saveLocalData = async () => {
                    try {
                        const jsonValue = JSON.stringify(team)
                        await AsyncStorage.setItem(`user-${user.uid}-team`, jsonValue)
                    } catch (e) {
                        console.error('Failed to save team', e);
                    }
                    try {
                        const jsonValue = JSON.stringify(subs)
                        await AsyncStorage.setItem(`user-${user.uid}-subs`, jsonValue)
                    } catch (e) {
                        console.error('Failed to save subs', e);
                    }
                }
                saveLocalData();
                setTeam(newTeam);
                setAddingPlayer(false);
                return;
            }
            if (containsObject(player, subs)) {
                let newSubs = subs;
                const index = subs.findIndex(subsPlayer => subsPlayer.id === player.id);
                if (newPlayerObject.isGoalKeeper) {
                    setTeamHasGoalKeeper(true);
                }
                newSubs[index] = newPlayerObject;
                const saveLocalData = async () => {
                    try {
                        const jsonValue = JSON.stringify(team)
                        await AsyncStorage.setItem(`user-${user.uid}-team`, jsonValue)
                    } catch (e) {
                        console.error('Failed to save team', e);
                    }
                    try {
                        const jsonValue = JSON.stringify(subs)
                        await AsyncStorage.setItem(`user-${user.uid}-subs`, jsonValue)
                    } catch (e) {
                        console.error('Failed to save subs', e);
                    }
                }
    
                saveLocalData();
                setSubs(newSubs);
                setAddingPlayer(false);
                return;
            }
        }
    }

    const containsObject = (obj, list) => {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
    }

    const getPlayerData = () => {
        let filteredPlayers = filteredPlayers = playerList.filter(player => player.searchName.toLowerCase().includes(playerSearch.toLowerCase()) || player.name.toLowerCase().includes(playerSearch.toLowerCase())).sort((a, b) => a.rating < b.rating ? 1 : -1);
        const teamExcludedPlayers = filteredPlayers.filter(player1 => !team.some(player2 => player1.id === player2.id));
        const subsExcludedPlayers = teamExcludedPlayers.filter(player1 => !subs.some(player2 => player1.id === player2.id));
        let goalKeeperFiltered = subsExcludedPlayers;
        if (teamHasGoalKeeper && team.length < 11) {
            goalKeeperFiltered = subsExcludedPlayers.filter(player => !player.isGoalKeeper)
        }
        let onlyGoalKeepers = goalKeeperFiltered;
        if ((team.length === 10 || team.length === 11) && !teamHasGoalKeeper) {
            onlyGoalKeepers = goalKeeperFiltered.filter(player => player.isGoalKeeper);
        }
        let toReturnPlayers = onlyGoalKeepers;
        if (playerSearch.length === 0) {
            toReturnPlayers = onlyGoalKeepers.slice(0, 50)
        }
        return toReturnPlayers;
    }

    const renderPlayerInput = () => {
        return (
            <View>
                <Text style={GeneralStyles.paragraph}>Search for a player here</Text>
                {(team.length === 10 || team.length === 11) && !teamHasGoalKeeper && <Text style={GeneralStyles.paragraph}>Please select a goalkeeper for your team</Text>}
                <TextInput style={TeamStyles.searchPlayerInput} onChangeText={setPlayerSearch} value={playerSearch} />
                {getPlayerData().length > 0 ? 
                <ScrollView contentContainerStyle={[TeamStyles.searchListWrapper, TeamStyles.listItem]}>
                    {getPlayerData().map((item, index) => <View style={[TeamStyles.playerListItem, index%2===0 ? TeamStyles.leftItem : TeamStyles.rightItem]} key={index}>
                        {item.isGoalKeeper ?
                        <View style={TeamStyles.playerItem}>
                            <View style={TeamStyles.playerInfo}>
                                <View>
                                    <Image source={{ uri: item.image }} style={GeneralStyles.playerImg} />
                                    <Text style={GeneralStyles.goalKeeperLabel}>GK</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={TeamStyles.iconWrapper}>
                                        <SimpleLineIcon onPress={() => replacePlayer(item)} style={[TeamStyles.icon, TeamStyles.iconAdd]} name="plus" color="#242834"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={TeamStyles.playerName}>{item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}</Text>
                        </View>
                        : 
                        <View style={TeamStyles.playerItem}>
                            <View style={TeamStyles.playerInfo}>
                                <View>
                                    <Image source={{ uri: item.image }} style={GeneralStyles.playerImg} />
                                </View>
                                <View>
                                    <TouchableOpacity style={TeamStyles.iconWrapper}>
                                        <SimpleLineIcon onPress={() => replacePlayer(item)} style={[TeamStyles.icon, TeamStyles.iconAdd]} name="plus" color="#242834"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={TeamStyles.playerName}>{item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}</Text>
                        </View>}
                    </View>)}
                </ScrollView> :
                <Text style={GeneralStyles.paragraph}>No players found, please refine your search.</Text>}
            </View>
        )
    }
    
    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    return renderPlayerInput();
}

export default AddPlayer;