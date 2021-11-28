import { StyleSheet } from 'react-native'; 

const GameStyles = StyleSheet.create({
    imageBackground: {
        width: 30,
        height: 30,
        marginRight: 20
    },
    gameWrapper: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    parentScoreLineWrapper: {
        justifyContent: 'space-between'
    },
    parentPlayerFlexbox: {
        justifyContent: 'space-between',
        position: 'relative'
    },
    scoreLineWrapper: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerFlexbox: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center'
    },
    motmButton: {
        width: 30,
        height: 30,
        marginLeft: 12.5
    },
    addText: {
        position: 'absolute',
        right: -3.5,
        top: -3.5,
        color: '#ffffff',
        fontSize: 13,
        lineHeight: 13
    },
    addTextWrapper: {
        position: 'relative'
    },
    motmWrapper: {
        borderWidth: 1.5,
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: 7.5,
        position: 'relative'
    },
    motmActive: {
        borderColor: '#FFA000',
    },
    motmNotActive: {
        borderColor: '#242834',
    },
    scoreLineText: {
        margin: 0,
        color: '#ffffff',
        fontFamily: 'Rationale_400Regular',
        fontSize: 16,
        width: 27.5,
        height: 27.5,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 50,
        overflow: 'hidden',
        lineHeight: 27.5,
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    notActiveSub: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        flex: 1,
    }
});

export default GameStyles