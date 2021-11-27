import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, Image, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import TeamStats from './Team-stats';
import GeneralStyles from '../../styles/General';
import TeamStyles from '../../styles/Team';
import Accordion from 'react-native-collapsible/Accordion';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const Team = ({ user, navigation }) => {
    const [team, setTeam] = useState([]);
    const [subs, setSubs] = useState([]);
    const [showingStats, setShowingStats] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeSections, setActiveSections] = useState([0]);

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

        navigation.addListener('beforeRemove', () => { 
            setTeam([]);
            setSubs([]);
            setShowingStats(false);
            setLoading(false);
            setActiveSections([0])
        });
    }, []);

    const removeFromTeam = player => {

    }

    const replacePlayer = player => {

    }

    const sections = [
        {
            title: 'Team',
            id: 0,
            content: <FlatList
            contentContainerStyle={TeamStyles.flatList}
            horizontal={false}
            numColumns={2}
            data={team}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
                return (
                    <View style={[TeamStyles.listItem, index%2===0 ? undefined : TeamStyles.rightItem]} key={index}>
                        {item.isGoalKeeper ?
                        <View style={TeamStyles.playerItem}>
                            <View style={TeamStyles.playerInfo}>
                                <View>
                                    <Image source={{ uri: item.image }} style={GeneralStyles.playerImg} />
                                    <Text style={GeneralStyles.goalKeeperLabel}>GK</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={TeamStyles.iconWrapper}>
                                        <SimpleLineIcon onPress={() => removeFromTeam(item)} style={[TeamStyles.icon, TeamStyles.iconTrash]} name="trash" color="#fff"/>
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
                                        <SimpleLineIcon onPress={() => removeFromTeam(item)} style={[TeamStyles.icon, TeamStyles.iconTrash]} name="trash" color="#fff"/>
                                        <SimpleLineIcon onPress={() => replacePlayer(item)} style={[TeamStyles.icon, TeamStyles.iconRefresh]} name="refresh" color="#fff"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={TeamStyles.playerName}>{item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}</Text>
                        </View>}
                       
                    </View>
                )}
            }
            />
        },
        {
            title: 'Subs',
            id: 1,
            content: <FlatList
            contentContainerStyle={TeamStyles.flatList}
            horizontal={false}
            numColumns={2}
            data={subs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
                <View style={[TeamStyles.listItem, index%2===0 ? TeamStyles.leftItem : TeamStyles.rightItem]} key={index}>
                    {item.isGoalKeeper ?
                        <View style={TeamStyles.playerItem}>
                            <View style={TeamStyles.playerInfo}>
                                <View>
                                    <Image source={{ uri: item.image }} style={GeneralStyles.playerImg} />
                                    <Text style={GeneralStyles.goalKeeperLabel}>GK</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={TeamStyles.iconWrapper}>
                                        <SimpleLineIcon onPress={() => removeFromTeam(item)} style={[TeamStyles.icon, TeamStyles.iconTrash]} name="trash" color="#fff"/>
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
                                        <SimpleLineIcon onPress={() => removeFromTeam(item)} style={[TeamStyles.icon, TeamStyles.iconTrash]} name="trash" color="#fff"/>
                                        <SimpleLineIcon onPress={() => replacePlayer(item)} style={[TeamStyles.icon, TeamStyles.iconRefresh]} name="refresh" color="#fff"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={TeamStyles.playerName}>{item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}</Text>
                        </View>}
                </View>
            )}
            />
        }
    ]

    const renderContent = (section) => {
        return <SafeAreaView style={TeamStyles.container}>
            {section.content}
        </SafeAreaView> ;
    };

    const renderHeader = (section) => {
        if (activeSections.length > 0 && section.id === activeSections[0]) {
        return (
            <View style={TeamStyles.collapseTitle}>
                <SimpleLineIcon style={{fontSize: 18, marginRight: 15, marginLeft: 5}} name="arrow-up-circle" color="#fff"/>
                <Text style={GeneralStyles.paragraph}>{section.title}</Text>
            </View>
            );
        } else {
            return (
            <View style={TeamStyles.collapseTitle}>
                <SimpleLineIcon style={{fontSize: 18, marginRight: 15, marginLeft: 5}} name="arrow-down-circle" color="#fff"/>
                <Text style={GeneralStyles.paragraph}>{section.title}</Text>
            </View>
            );
        }
    };

    const renderTeam = () => {
        return <Accordion
        sections={sections}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={(activeSection) => setActiveSections(activeSection)}
      />
    }

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    }

    return (
        <View style={GeneralStyles.pageContainer}>
            {showingStats ?
            <TeamStats /> :
            renderTeam()}
        </View>
    );
}

export default Team;