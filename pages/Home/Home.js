import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Text, View, Image, ImageBackground } from 'react-native';
import GeneralStyles from '../../styles/General';
import HomeStyles from '../../styles/Home';
import styled from 'styled-components/native';
import { getFirestore, getDoc, doc } from '@firebase/firestore/lite';
import { firebaseApp } from '../../App';

const StyledBar = styled.View`
    height: 30px;
    width: ${props => props.width}%;
    backgroundColor: ${props => props.isGoalsScored ? "#C2F655" : "#8B0617"};
    position: relative;
    display: flex;
    alignItems: center;
    ${props => props.isGoalsScored ? 
        `
        left: 0;
        color: #242834;
        justifyContent: flex-start;
        paddingLeft: 25px;` :
        `
        right: 0;
        justifyContent: flex-end;
        paddingRight: 25px;`
    }
`;

const StyledBarScored = styled.View`
    width: 0;
    height: 0;
    borderStyle: solid;
    borderTopWidth: 15px;
    borderRightWidth: 26px;
    borderBottomWidth: 15px;
    borderLeftWidth: 0px;
    position: absolute;
    left: -26px;
    borderTopColor: transparent;
    borderRightColor: #C2F655;
    borderBottomColor: transparent;
    borderLeftColor: transparent;
`;

const StyledBarConceded = styled.View`
    width: 0;
    height: 0;
    borderStyle: solid;
    borderTopWidth: 15px;
    borderRightWidth: 0px;
    borderBottomWidth: 15px;
    borderLeftWidth: 26px;
    position: absolute;
    right: -26px;
    borderTopColor: transparent;
    borderRightColor: transparent;
    borderBottomColor: transparent;
    borderLeftColor: #8B0617;
`;

const Home = ({ user, navigation }) => {
    const [allTimeGames, setAllTimeGames] = useState([]);
    const [allTimePlayerStats, setAllTimePlayerStats] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllTimeGames = async (db) => {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const allData = docSnap.data();
            if (allData) {
                setAllTimeGames(allData.games);
                const jsonValue = JSON.stringify(allData.games)
                await AsyncStorage.setItem(`user-${user.uid}-all-time-games`, jsonValue);
            }
        } catch (e) {
            console.error('Failed to get games', e);
        }
    }

    const getAllTimePlayerStats = async (db) => {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const allData = docSnap.data();
            if (allData) {
                setAllTimePlayerStats(allData.playerStats);
                const jsonValue = JSON.stringify(allData.playerStats)
                await AsyncStorage.setItem(`user-${user.uid}-all-time-player-stats`, jsonValue);
            }
        } catch (e) {
            console.error('Failed to get player stats', e);
        }
    }

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-games`);
                if (jsonValue !== null) {
                    setAllTimeGames(JSON.parse(jsonValue));
                    setLoading(false);
                } else {
                    const db = getFirestore(firebaseApp);
                    await getAllTimeGames(db);
                    setLoading(false);
                }
            } catch(e) {
                console.error('Error getting all time games', e);
                setLoading(false);
            }
            try {
                const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-player-stats`);
                if (jsonValue !== null) {
                    setAllTimePlayerStats(JSON.parse(jsonValue));
                    setLoading(false);
                } else {
                    const db = getFirestore(firebaseApp);
                    await getAllTimePlayerStats(db);
                    setLoading(false);
                }
            } catch(e) {
                console.error('Error getting all time player stats', e);
                setLoading(false);
            }
            
        }
        
        getData();
    }, []);

    const renderRecord = () => {
        if (allTimeGames.length > 0) {
            let wins = 0;
            let draws = 0;
            let losses = 0;
            allTimeGames.forEach(game => {
                switch(game.result) {
                    case 1: wins ++;
                    break;
                    case 2: draws++;
                    break;
                    case 3: losses++;
                    break;
                }
            });
            return <View style={HomeStyles.recordWrapper}>
                <ImageBackground resizeMode="contain" style={HomeStyles.imageBackground} source={require('../../assets/images/green-up-single.png')}>
                    <Text style={HomeStyles.winsText}>{wins}</Text>
                </ImageBackground>
                <ImageBackground resizeMode="contain" style={HomeStyles.imageBackground} source={require('../../assets/images/blue-down-single.png')}>
                    <Text style={HomeStyles.drawsText}>{draws}</Text>
                </ImageBackground>
                <ImageBackground resizeMode="contain" style={[HomeStyles.imageBackground, HomeStyles.imageBackgroundLast]} source={require('../../assets/images/red-right-single.png')}>
                    <Text style={HomeStyles.lossesText}>{losses}</Text>
                </ImageBackground>
            </View>
        }
    };

    const renderMostGoals = () => {
        if (allTimePlayerStats.length > 0) {
            const sortedPlayers = allTimePlayerStats.sort((a, b) => {
                if (a.goals === b.goals) {
                    if (a.assists === b.assists) {
                        return a.games < b.games ? 1 : -1
                    }
                    return a.assists < b.assists ? 1 : -1
                 }
                 return a.goals < b.goals ? 1 : -1;
            });
            let topPlayer = sortedPlayers[0];
            if (topPlayer) {
                const goalsPerGame = Math.round(topPlayer.goals/topPlayer.games * 10) / 10;
                return <View style={[HomeStyles.topGoalsAssists, HomeStyles.topGoals]}>
                    <Text style={HomeStyles.subTitleGoalAssist}>Goals</Text>
                    <Image  source={{uri: topPlayer.image}} style={HomeStyles.playerImg} />
                    <Text style={HomeStyles.homeText}>{topPlayer.name.length > 20 ? topPlayer.name.substring(0, 20) + "..." : topPlayer.name}</Text>
                    <Text style={HomeStyles.homeText}>{topPlayer.goals} goals</Text>
                    <Text style={HomeStyles.homeText}>{goalsPerGame} goals / game</Text>
                </View>
            }
        }
    };

    const renderMostAssists = () => {
        if (allTimePlayerStats.length > 0) {
            const sortedPlayers = allTimePlayerStats.sort((a, b) => {
                if (a.assists === b.assists) {
                    if (a.goals === b.goals) {
                        return a.games < b.games ? 1 : -1
                    }
                    return a.goals < b.goals ? 1 : -1
                 }
                 return a.assists < b.assists ? 1 : -1;
            });
            let topPlayer = sortedPlayers[0];
            if (topPlayer) {
                const assistsPerGame = Math.round(topPlayer.assists/topPlayer.games * 10) / 10;
                return <View style={[HomeStyles.topGoalsAssists, HomeStyles.topAssists]}>
                    <Text style={HomeStyles.subTitleGoalAssist}>Assists</Text>
                    <Image source={{uri: topPlayer.image}} style={HomeStyles.playerImg} />
                    <Text style={HomeStyles.homeText}>{topPlayer.name.length > 20 ? topPlayer.name.substring(0, 20) + "..." : topPlayer.name}</Text>
                    <Text style={HomeStyles.homeText}>{topPlayer.assists} assists</Text>
                    <Text style={HomeStyles.homeText}>{assistsPerGame} assists / game</Text>
                </View>
            }
        }
    };
    
    const renderGameGoals = () => {
        if (allTimeGames.length > 0) {
            let goalsScored = 0;
            let goalsConceded = 0;
            allTimeGames.forEach(game => {
                goalsScored += game.goalsScored;
                goalsConceded += game.goalsConceded;
            })
            const averageGoalsScored = Math.round(goalsScored / allTimeGames.length * 10) / 10;
            const averageGoalsConceded = Math.round(goalsConceded / allTimeGames.length * 10) / 10;
            let totalScored = Math.round(goalsScored / (goalsScored + goalsConceded) * 100);
            let totalConceded = Math.round(goalsConceded / (goalsScored + goalsConceded) * 100);
            if (totalScored + totalConceded > 100) {
                totalConceded --;
            }
            totalScored = totalScored < 15 ? 15 : totalScored;
            totalScored = totalScored > 85 ? 85 : totalScored;
            totalConceded = totalConceded < 15 ? 15 : totalConceded;
            totalConceded = totalConceded > 85 ? 85 : totalConceded;
            return <View>
                <Text style={HomeStyles.subTitle}>Total / average goals</Text>
                <View style={HomeStyles.goalsBannerTextTop}>
                    <Text style={GeneralStyles.paragraph}>{averageGoalsScored} goals / game</Text>
                    <Text style={GeneralStyles.paragraph}>{averageGoalsConceded} goals / game</Text>
                </View>
                <View style={HomeStyles.goalsBannerWrapper}>
                    <StyledBar isGoalsScored={true} width={totalScored}>
                        <StyledBarScored>
                            <Text style={HomeStyles.goalsBannerHomeText}>{goalsScored}</Text>
                        </StyledBarScored>
                    </StyledBar>
                    <StyledBar isGoalsScored={false} width={totalConceded}>
                        <StyledBarConceded>
                            <Text style={HomeStyles.goalsBannerAwayText}>{goalsConceded}</Text>
                        </StyledBarConceded>
                    </StyledBar>
                </View>
            </View>
        }
    };

    const renderLast5Games = () => {
        if (allTimeGames.length > 0) {
            let lastGames = allTimeGames;
            lastGames.sort((a,b) => new Date((a.dateTime) < new Date(b.dateTime) ? 1 : -1));
            lastGames = lastGames.slice(0,5);
            let list = [];
            lastGames.forEach((game, index) => {
                switch (game.result) {
                    case 1:
                        if (index %2===0) {
                            list.push(<ImageBackground key={index} resizeMode="contain" style={HomeStyles.last5GamesImg} source={require('../../assets/images/green-up-single.png')} />)
                        } else {
                            list.push(<ImageBackground key={index} resizeMode="contain" style={HomeStyles.last5GamesImg} source={require('../../assets/images/green-down-single.png')} />)
                        }
                        break;
                    case 2:
                        if (index %2===0) {
                            list.push(<ImageBackground key={index} resizeMode="contain" style={HomeStyles.last5GamesImg} source={require('../../assets/images/blue-up-single.png')} />)
                        } else {
                            list.push(<ImageBackground key={index} resizeMode="contain" style={HomeStyles.last5GamesImg} source={require('../../assets/images/blue-down-single.png')} />)
                        }
                        break;
                    case 3:
                        if (index %2===0) {
                            list.push(<ImageBackground key={index} resizeMode="contain" style={HomeStyles.last5GamesImg} source={require('../../assets/images/red-up-single.png')} />)
                        } else {
                            list.push(<ImageBackground key={index} resizeMode="contain" style={HomeStyles.last5GamesImg} source={require('../../assets/images/red-down-single.png')} />)
                        }
                        break;
                }
            })

            return <View style={HomeStyles.last5Wrapper}>
                <Text style={HomeStyles.subTitle}>Last 5 games</Text>
                <View style={HomeStyles.last5GamesWrapper}>
                    {list.map(item => item)}
                </View>
            </View>
        }
    };

    const renderGeneralStats = () => {
        if (allTimeGames.length > 0) {
            let biggestWin = {
                goals: 0,
                awayGoals: 1000
            };
            let biggestLoss = {
                goals: 1000,
                awayGoals: 0
            }
            let cleanSheets = 0;
            let averageGoalsScored = 0;
            let averageGoalsConceded = 0;
            allTimeGames.forEach(game => {
                if (game.goalsConceded === 0) {
                    cleanSheets++;
                }
                const winDiff = game.goalsScored - game.goalsConceded;
                if (winDiff > (biggestWin.goals - biggestWin.awayGoals)) {
                    biggestWin.goals = game.goalsScored;
                    biggestWin.awayGoals = game.goalsConceded;
                }
                const lossDiff = game.goalsConceded - game.goalsScored;
                if (lossDiff > (biggestLoss.awayGoals - biggestLoss.goals)) {
                    biggestLoss.goals = game.goalsScored;
                    biggestLoss.awayGoals = game.goalsConceded;
                }
                averageGoalsScored += game.goalsScored;
                averageGoalsConceded += game.goalsConceded;
            })
            averageGoalsScored = Math.round(averageGoalsScored / allTimeGames.length);
            averageGoalsConceded = Math.round(averageGoalsConceded / allTimeGames.length);
            const bestResult = <Text style={HomeStyles.homeText}>Best result: {biggestWin.goals} - {biggestWin.awayGoals}</Text>
            const worstResult = <Text style={HomeStyles.homeText}>Worst result: {biggestLoss.goals} - {biggestLoss.awayGoals}</Text>
            const averageResult = <Text style={HomeStyles.homeText}>Average result: {averageGoalsScored} - {averageGoalsConceded}</Text>
            const cleanSheetsElement = <Text style={HomeStyles.homeText}>Cleansheets: {cleanSheets}</Text>
            return <View>
                {bestResult}
                {worstResult}
                {averageResult}
                {cleanSheetsElement}
            </View>
        }
    };

    // Return statements
    if (loading) {
        return <View style={GeneralStyles.pageContainer}><Text style={GeneralStyles.paragraph}>Loading...</Text></View>;
    };

    return (
        <ScrollView style={GeneralStyles.pageContainer}>
            <View style={GeneralStyles.topContainer}>
                <Text style={GeneralStyles.pageTitle}>Overview</Text>
                {renderRecord()}
            </View>
            {allTimeGames.length > 0 && allTimePlayerStats.length > 0 ?
            <View>
                <View style={HomeStyles.topGoalsAssistsWrapper}>
                    {renderMostGoals()}
                    {renderMostAssists()}
                </View>
                {renderGameGoals()}
                <View>
                    {renderLast5Games()}
                    {renderGeneralStats()}
                </View>
            </View> : 
            <Text style={GeneralStyles.paragraph}>No data found for your club. Add a team and your first game to see the stats!</Text>}
        </ScrollView>
    );
}

export default Home;