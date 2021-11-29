import { StyleSheet } from 'react-native'; 

const TeamStyles = StyleSheet.create({
    collapseTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    playerInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    searchListWrapper: {
        paddingBottom: 115
    },
    listWrapper: {
        paddingBottom: 25
    },
    listItem: {
        width: '100%',
        marginBottom: 20,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    playerListItem: {
        width: '45%',
        marginBottom: 15
    },
    rightItem: {
        marginLeft: '5%'
    },
    listTitle: {
        marginBottom: 10
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
        alignItems: 'flex-start',
        marginBottom: 15
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
    playerInfoText: {
        marginTop: 5
    },
    marginBottom: {
        marginBottom: 10
    },
    addPlayerButtonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    notCompleteAddButton: {
        marginBottom: 10
    },
    containerStyle: {
        width: '100%'
    },
    scrollView: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    }
});

export default TeamStyles