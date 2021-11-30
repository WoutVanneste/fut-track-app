import { StyleSheet } from 'react-native'; 

const HomeStyles = StyleSheet.create({
    imageBackground: {
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    imageBackgroundLast : {
        marginLeft: 10
    },
    drawsText: {
        marginBottom: 10,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        color: '#ffffff',
        fontFamily: 'Rationale_400Regular',
        fontSize: 16
    },
    lossesText: {
        marginRight: 10,
        marginTop: 0,
        marginLeft: 0,
        marginBottom: 0,
        color: '#ffffff',
        fontFamily: 'Rationale_400Regular',
        fontSize: 16
    },
    winsText: {
        marginTop: 10,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        color: '#242834',
        fontFamily: 'Rationale_400Regular',
        fontSize: 16
    },
    recordWrapper: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    topGoalsAssistsWrapper : {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 25
    },
    topGoalsAssists: {
        display: "flex",
        flexDirection: "column"
    },
    topGoals: {
        alignItems: "flex-start"
    },
    topAssists: {
        alignItems: "flex-end"
    },
    goalsBannerWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        position: 'relative',
        marginBottom: 25,
        marginTop: 10
    },
    goalsBannerHomeText: {
        color: '#242834',
        position: 'absolute',
        top: -10,
        left: 30,
        zIndex: 99999,
        width: 'auto',
        height: 'auto',
    },
    goalsBannerAwayText: {
        color: '#ffffff',
        position: 'absolute',
        top: -10,
        right: 30,
        zIndex: 99999,
        width: 'auto',
        height: 'auto',

    },
    goalsBannerTextTop: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 7.5,
        marginLeft: '7.5%',
        marginRight: '7.5%'
    },
    subTitle: {
        margin: 0,
        color: '#ffffff',
        fontFamily: 'Rationale_400Regular',
        fontSize: 24
    },
    subTitleGoalAssist: {
        margin: 0,
        color: '#ffffff',
        fontFamily: 'Rationale_400Regular',
        fontSize: 20,
        marginBottom: 7.5
    },
    playerImg: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 50,
        overflow: 'hidden'
    },
    homeText: {
        color: '#ffffff',
        fontFamily: 'Rationale_400Regular',
        fontSize: 16,
        marginTop: 5
    }
});

export default HomeStyles