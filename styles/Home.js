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
    }
});

export default HomeStyles