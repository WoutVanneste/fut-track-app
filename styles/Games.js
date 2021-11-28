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
        justifyContent: 'space-between'
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
    }
});

export default GameStyles