import { StyleSheet } from 'react-native'; 

const AuthenticationStyles = StyleSheet.create({
    pageWrapper: {

    },
    input: {
        backgroundColor: "#ffffff",
        marginTop: 15,
        color: '#242834',
        height: 30,
        padding: 5
    },
    button: {
        borderRadius: 7.5,
        overflow: 'hidden',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 16,
        marginTop: 25,
        width: '100%',
        textAlign: 'center'
      },
      greenButton: {
        color: '#242834',
        backgroundColor: '#C2F655',
      },
      redButton: {
        color: '#ffffff',
        backgroundColor: '#8B0617'
      },
      blueButton: {
        color: '#ffffff',
        backgroundColor: '#3652E7'
      },
});

export default AuthenticationStyles