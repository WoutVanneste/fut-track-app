import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Text, View } from 'react-native';
import GeneralStyles from '../../styles/General';
import styled from 'styled-components/native';
import { games, allTimeStats } from '../../data';

const StyledBar = styled.View`
    display: inline-block;
    height: 30px;
    content: "${props => props.width}";
    width: calc(${props => props.width}% - 25px);
    background-color: ${props => props.isGoalsScored ? "#C2F655" : "#8B0617"};
    position: relative;
    display: inline-flex;
    align-items: center;
    ${props => props.isGoalsScored ? 
        `
        left: 0px;
        color: #242834;
        justify-content: flex-start;
        padding-left: 25px;
        &::after {
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 15px 26.0px 15px 0;
            position: absolute;
            left: -26px;
            border-color: transparent #C2F655 transparent transparent;
        };` :
        `
        right: 0px;
        justify-content: flex-end;
        padding-right: 25px;
        &::after {
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 15px 0 15px 26.0px;
            position: absolute;
            right: -26px;
            border-color: transparent transparent transparent #8B0617;
        };`
    }
`;

const Home = ({ user }) => {
    const [allTimeGames, setAllTimeGames] = useState([]);
    const [allTimePlayerStats, setAllTimePlayerStats] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const getData = async () => {
        //     setLoading(true);
        //     try {
        //         const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-games`);
        //         setAllTimeGames(jsonValue != null ? JSON.parse(jsonValue) : []);
        //     } catch(e) {
        //         console.error('Error getting all time games', e);
        //     }
        //     try {
        //         const jsonValue = await AsyncStorage.getItem(`user-${user.uid}-all-time-player-stats`);
        //         setAllTimePlayerStats(jsonValue != null ? JSON.parse(jsonValue) : []);
        //     } catch(e) {
        //         console.error('Error getting all time player stats', e);
        //     }
        //     setLoading(false);
        // }
        // getData();
        setAllTimeGames(games);
        setAllTimePlayerStats(allTimeStats)
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
            return <View>
                <View>
                    <Text style={GeneralStyles.paragraph}>{wins}</Text>
                </View>
                <View>
                    <Text style={GeneralStyles.paragraph}>{draws}</Text>
                </View>
                <View>
                    <Text style={GeneralStyles.paragraph}>{losses}</Text>
                </View>    
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
                return <View>
                    <Text style={GeneralStyles.paragraph}>Goals</Text>
                    <img alt={topPlayer.name} src={topPlayer.image} />
                    <Text style={GeneralStyles.paragraph}>{topPlayer.name.length > 20 ? topPlayer.name.substring(0, 20) + "..." : topPlayer.name}</Text>
                    <Text style={GeneralStyles.paragraph}>{topPlayer.goals} goals</Text>
                    <Text style={GeneralStyles.paragraph}>{goalsPerGame} goals / game</Text>
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
                return <View>
                    <Text style={GeneralStyles.paragraph}>Assists</Text>
                    <img alt={topPlayer.name} src={topPlayer.image} />
                    <Text style={GeneralStyles.paragraph}>{topPlayer.name.length > 20 ? topPlayer.name.substring(0, 20) + "..." : topPlayer.name}</Text>
                    <Text style={GeneralStyles.paragraph}>{topPlayer.assists} assists</Text>
                    <Text style={GeneralStyles.paragraph}>{assistsPerGame} assists / game</Text>
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
                <Text style={GeneralStyles.paragraph}>Total / average goals</Text>
                <View>
                    <Text style={GeneralStyles.paragraph}>{averageGoalsScored} goals / game</Text>
                    <Text style={GeneralStyles.paragraph}>{averageGoalsConceded} goals / game</Text>
                </View>
                <View>
                    <StyledBar isGoalsScored={true} width={totalScored}>
                        {goalsScored}
                    </StyledBar>
                    <StyledBar isGoalsScored={false} width={totalConceded}>
                        {goalsConceded}
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
                        list.push(<View key={index}></View>)
                        break;
                    case 2:
                        list.push(<View key={index}></View>)
                        break;
                    case 3:
                        list.push(<View key={index}></View>)
                        break;
                }
            })

            return <View >
                <Text style={GeneralStyles.paragraph}>Last 5 games</Text>
                <View>
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
            let cleanSheets = 0;
            allTimeGames.forEach(game => {
                if (game.goalsConceded === 0) {
                    cleanSheets++;
                }
                const diff = game.goalsScored - game.goalsConceded;
                if (diff > (biggestWin.goals - biggestWin.awayGoals)) {
                    biggestWin.goals = game.goalsScored;
                    biggestWin.awayGoals = game.goalsConceded;
                }
            })
            const bestResult = <Text style={GeneralStyles.paragraph}>Best result: {biggestWin.goals} - {biggestWin.awayGoals}</Text>
            const cleanSheetsElement = <Text style={GeneralStyles.paragraph}>Cleansheets: {cleanSheets}</Text>
            return <View>
                {bestResult}
                {cleanSheetsElement}
            </View>
        }
    };

    // Return statements
    if (loading) {
        return <Text style={GeneralStyles.paragraph}>Loading...</Text>;
    };

    return (
        <ScrollView style={GeneralStyles.pageContainer}>
            <View style={GeneralStyles.topContainer}>
                <Text style={GeneralStyles.pageTitle}>Overview</Text>
                {renderRecord()}
            </View>
            {allTimeGames.length > 0 && allTimePlayerStats.length > 0 ?
            <View>
                <View>
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