import { StyleSheet } from 'react-native'; 

const TeamStyles = StyleSheet.create({
    flatList: {
        paddingBottom: 30,
    },
    collapseTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    playerInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    listItem: {
        width: '45%',
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    rightItem: {
        marginLeft: '5%'
    },
    playerItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    icon: {
        fontSize: 18,
        padding: 6,
        width: 32,
        height: 32,
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    iconTrash: {
        backgroundColor: '#8B0617'
    },
    iconRefresh: {
        backgroundColor: '#3652E7'
    },
    iconAdd: {
        backgroundColor: '#C2F655'
    },
    playerName: {
        marginLeft: 5,
        color: '#ffffff',
        fontFamily: 'Rationale_400Regular',
        fontSize: 16,
        marginTop: 5
    },
    searchPlayerInput: {
        backgroundColor: '#fff',
        color: '#242834',
        marginTop: 10,
        marginBottom: 20
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    playerStatsFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerStatsFlexVertical: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 15
    },
    playerStatsWrapper: {
        marginBottom: 25,
        marginLeft: 10
    },
    playerStatsContainer: {
        paddingTop: 25
    },
    playerInfoText: {
        marginTop: 5
    },
    searchWrapper: {
        marginTop: 25
    }
});

export default TeamStyles