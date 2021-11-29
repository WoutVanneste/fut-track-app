import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import TeamStats from './Team-stats';
import GeneralStyles from '../../styles/General';
import TeamStyles from '../../styles/Team';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import AddPlayer from './Add-player';

const Team = ({ user, navigation }) => {
    const [team, setTeam] = useState([]);
    const [subs, setSubs] = useState([]);
    const [showingStats, setShowingStats] = useState(false);
    const [addingPlayer, setAddingPlayer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [replacingPlayer, setReplacingPlayer] = useState(null);
    const [isNewPlayerSub, setIsNewPlayerSub] = useState(false);
 
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-team`);
                setTeam(jsonValue != null ? JSON.parse(jsonValue).team : []);
                setSubs(jsonValue != null ? JSON.parse(jsonValue).subs : []);
            } catch(e) {
                console.error('Error getting team', e);
            }
            setLoading(false);
        }
        getData();

        navigation.addListener('focus', () => {
            getData();
        });
        
        navigation.addListener('blur', () => {
            setTeam([]);
            setSubs([]);
            setShowingStats(false);
            setAddingPlayer(false);
            setReplacingPlayer(null);
            setLoading(false);
        });
    }, []);

    const replacePlayer = player => {
        setReplacingPlayer(player);
        setAddingPlayer(true);
    }

    const renderPlayers = players => {
        return <View style={TeamStyles.listItem}>
            {players.map((item, index) => 
                <View style={[TeamStyles.playerListItem, index%2===0 ? undefined : TeamStyles.rightItem]} key={index}>
                        {item.isGoalKeeper ?
                        <View style={TeamStyles.playerItem}>
                            <View style={TeamStyles.playerInfo}>
                                <View>
                                    <Image source={{ uri: item.image }} style={GeneralStyles.playerImg} />
                                    <Text style={GeneralStyles.goalKeeperLabel}>GK</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={TeamStyles.iconWrapper}>
                                        <SimpleLineIcon onPress={() => replacePlayer(item)} style={[TeamStyles.icon, TeamStyles.iconRefresh]} name="refresh" color="#fff"/>
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
                                        <SimpleLineIcon onPress={() => replacePlayer(item)} style={[TeamStyles.icon, TeamStyles.iconRefresh]} name="refresh" color="#fff"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={TeamStyles.playerName}>{item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}</Text>
                        </View>}
                    </View>
            )}
        </View>
    }

    const renderTeam = () => {
        if (team.length != 0 || subs.length != 0) {
            return (
                <View>
                    {team.length < 11 || subs.length < 7 ?
                    <ScrollView contentContainerStyle={[TeamStyles.listWrapper, TeamStyles.addPlayerButtonWrapper]}>
                        <TouchableOpacity style={TeamStyles.notCompleteAddButton} onPress={() => {
                            setReplacingPlayer(null);
                            setAddingPlayer(true);
                            setIsNewPlayerSub(team.length < 11 ? false : true);
                        }}>
                            <Text style={[GeneralStyles.button, GeneralStyles.greenButton]}>Add player</Text>
                        </TouchableOpacity>
                        <Text style={[GeneralStyles.paragraph, TeamStyles.listTitle]}>Team</Text>
                        {renderPlayers(team)}
                        <Text style={[GeneralStyles.paragraph, TeamStyles.listTitle]}>Subs</Text>
                        {renderPlayers(subs)}
                    </ScrollView> : 
                    <ScrollView contentContainerStyle={TeamStyles.listWrapper}>
                        <Text style={[GeneralStyles.paragraph, TeamStyles.listTitle]}>Team</Text>
                        {renderPlayers(team)}
                        <Text style={[GeneralStyles.paragraph, TeamStyles.listTitle]}>Subs</Text>
                        {renderPlayers(subs)}
                    </ScrollView>}
                </View>
            )
        } else {
            return <View style={TeamStyles.addPlayerButtonWrapper}>
                <Text style={[GeneralStyles.paragraph, TeamStyles.marginBottom]}>You don't have a full team yet!</Text>
                <TouchableOpacity onPress={() => {
                    setReplacingPlayer(null);
                    setAddingPlayer(true);
                    setIsNewPlayerSub(team.length < 11 ? false : true);
                }}>
                    <Text style={[GeneralStyles.button, GeneralStyles.greenButton]}>Add player</Text>
                </TouchableOpacity>
            </View>
        }
    }

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    return (
        <View style={GeneralStyles.pageContainer}>
            <View style={TeamStyles.topContainer}>
                <Text style={GeneralStyles.pageTitle}>Team</Text>
                {showingStats || addingPlayer ?
                <TouchableOpacity onPress={() => {
                    setShowingStats(false);
                    setAddingPlayer(false);
                }}>
                    <Text style={[GeneralStyles.button, GeneralStyles.redButton]}>x</Text>
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => setShowingStats(true)}>
                    <Text style={[GeneralStyles.button, GeneralStyles.greenButton]}>Team stats</Text>
                </TouchableOpacity>}
            </View>
            {showingStats ?
            <TeamStats 
                user={user}/> :
            addingPlayer ? 
            <AddPlayer 
                user={user}
                player={replacingPlayer}
                setAddingPlayer={setAddingPlayer}
                team={team}
                subs={subs}
                setTeam={setTeam}
                setSubs={setSubs}
                isNewPlayerSub={isNewPlayerSub} /> :
            renderTeam()}
        </View>
    );
}

export default Team;