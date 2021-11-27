import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, Image, Button } from 'react-native';
import TeamStats from './Team-stats';
import GeneralStyles from '../../styles/General';

const Team = ({ user, navigation }) => {
    const [team, setTeam] = useState([]);
    const [subs, setSubs] = useState([]);
    const [showingStats, setShowingStats] = useState(false);
    const [loading, setLoading] = useState(false);

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
        });
    }, []);

    const removeFromTeam = player => {

    }

    const renderTeam = () => {
        let fullTeam = team.concat(subs);
        return <FlatList
        data={fullTeam}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(teamPlayer, index) => (
            <View key={index}>
                {/* Add different styling when gk (label) */}
                <View>
                    <Image source={{ uri: teamPlayer.item.image }} style={GeneralStyles.playerImg} />
                </View>
                <View>
                    <Text>{teamPlayer.item.name.length > 20 ? teamPlayer.item.name.substring(0, 20) + "..." : teamPlayer.item.name}</Text>
                    <Button title="Remove" onPress={() => removeFromTeam(teamPlayer.item)} />
                </View>
            </View>
        )}
        />;
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