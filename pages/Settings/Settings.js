import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Button, Text, Alert } from 'react-native';
import GeneralStyles from '../../styles/General';

const Settings = ({ user }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const removeAllData = async () => {
        try {
            const dataKeys = [
                `user-${user.uid}-all-time-games`,
                `user-${user.uid}-all-time-player-stats`,
                `user-${user.uid}-team`,
                `user-${user.uid}-player-list`
            ];
            await AsyncStorage.multiRemove(dataKeys);
            // Show succes message here
        } catch (e) {
            console.error('Removing club data failed', e);
        }
    }

    const removeData = () => {
        setIsDeleting(true);
        Alert.alert(
            'You are about to delete all local data',
            'Are you sure you want to clear your local club data?',
            [
                {
                    text: "Cancel",
                    onPress: () => { return },
                    style: "cancel"
                  },
                  { text: "Delete", onPress: () => removeAllData() }
            ]
        )
        setIsDeleting(false);
    }

    const setPlayers = () => {
        const team = {
            team: [
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 231747,
                    image: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-22/rating-collective-assets/common/player-small-portraits/231747.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Kylian Mbappé",
                    rating: 91,
                    searchName: "Kylian Mbappe",
                    isActive: true,
                    isStarting: true
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 100330,
                    image: "https://futhead.cursecdn.com/static/img/22/players/330.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Robbie Keane",
                    rating: 86,
                    searchName: "Robbie Keane",
                    isActive: true,
                    isStarting: true
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 183898,
                    image: "https://www.futwiz.com/assets/img/fifa22/faces/50515546.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Ángel Di María",
                    rating: 87,
                    searchName: "Angel Di Maria",
                    isActive: true,
                    isStarting: true
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 202166,
                    image: "https://www.futwiz.com/assets/img/fifa22/faces/50533814.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Julian Draxler",
                    rating: 87,
                    searchName: "Julian Draxler",
                    isActive: true,
                    isStarting: true
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 84102400,
                    image: "https://www.futwiz.com/assets/img/fifa22/faces/84102400.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Seko Fofana",
                    rating: 86,
                    searchName: "Seko Fofana",
                    isActive: true,
                    isStarting: true
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 199556,
                    image: "https://www.futwiz.com/assets/img/fifa22/faces/50531204.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Marco Verratti",
                    rating: 87,
                    searchName: "Marco Verratti",
                    isActive: true,
                    isStarting: true
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 245279,
                    image: "https://www.futwiz.com/assets/img/fifa22/faces/50576927.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Reguilón",
                    rating: 81,
                    searchName: "Reguilon",
                    isActive: true,
                    isStarting: true
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 50551437,
                    image: "https://www.futwiz.com/assets/img/fifa22/faces/50551437.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Hamari Traoré",
                    rating: 84,
                    searchName: "Hamari Traore",
                    isActive: true,
                    isStarting: true
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 235243,
                    image: "https://www.futwiz.com/assets/img/fifa22/faces/50566891.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Matthijs de Ligt",
                    rating: 85,
                    searchName: "Matthijs de Ligt",
                    isActive: true,
                    isStarting: true
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 225850,
                    image: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-22/rating-collective-assets/common/player-small-portraits/225850.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Presnel Kimpembe",
                    rating: 83,
                    searchName: "Presnel Kimpembe",
                    isActive: true,
                    isStarting: true
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 186153,
                    image: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-22/rating-collective-assets/common/player-small-portraits/186153.png",
                    isGoalKeeper: true,
                    motms: 0,
                    name: "Wojciech Szczęsny",
                    rating: 87,
                    searchName: "Wojciech Szczesny",
                    isActive: true,
                    isStarting: true
                },
            ],
            subs: [   
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 50575278,
                    image: "https://www.futwiz.com/assets/img/fifa22/faces/50575278.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Jonathan David",
                    rating: 84,
                    searchName: "Jonathan David",
                    isActive: false,
                    isStarting: false
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 1050575228,
                    image: "https://www.futwiz.com/assets/img/fifa22/faces/50575228.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Lois Openda",
                    rating: 85,
                    searchName: "Lois Openda",
                    isActive: false,
                    isStarting: false
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 225953,
                    image: "https://www.futwiz.com/assets/img/fifa22/faces/50557601.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Steven Bergwijn",
                    rating: 80,
                    searchName: "Steven Bergwijn",
                    isActive: false,
                    isStarting: false
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 192985,
                    image: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-22/rating-collective-assets/common/player-small-portraits/192985.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Kevin De Bruyne",
                    rating: 91,
                    searchName: "Kevin De Bruyne",
                    isActive: false,
                    isStarting: false
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 216393,
                    image: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-22/rating-collective-assets/common/player-small-portraits/216393.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Youri Tielemans",
                    rating: 84,
                    searchName: "Youri Tielemans",
                    isActive: false,
                    isStarting: false
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 234396,
                    image: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-22/rating-collective-assets/common/player-small-portraits/234396.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Alphonso Davies",
                    rating: 82,
                    searchName: "Alphonso Davies",
                    isActive: false,
                    isStarting: false
                },
                {
                    assists: 0,
                    cleanSheets: 0,
                    games: 0,
                    goals: 0,
                    id: 228618,
                    image: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-22/rating-collective-assets/common/player-small-portraits/228618.png",
                    isGoalKeeper: false,
                    motms: 0,
                    name: "Ferland Mendy",
                    rating: 83,
                    searchName: "Ferland Mendy",
                    isActive: false,
                    isStarting: false
                },
            ]
        }

        const saveDataLocal = async () => {
            try {
                const jsonValue = JSON.stringify(team)
                await AsyncStorage.setItem(`user-${user.uid}-team`, jsonValue)
            } catch (e) {
                console.error('Failed to save player stats', e);
            }
        }
        saveDataLocal();
    }
    // Return statements
    if (isDeleting) {
        return <Text style={GeneralStyles.paragraph}>Deleting club data...</Text>;
    }

    return (
        <View style={GeneralStyles.pageContainer}>
            <Button title="Remove club data" onPress={() => removeData()}/>
            <Button title="ad player" onPress={() => setPlayers()}/>
        </View>
    );
}

export default Settings;