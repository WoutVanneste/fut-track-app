import { StyleSheet } from 'react-native'; 

const GeneralStyles = StyleSheet.create({
  pageContainer: {
    paddingTop: 35,
    paddingLeft: 12.5,
    paddingRight: 12.5,
    paddingBottom: 80,
    backgroundColor: '#242834',
    color: '#ffffff',
    height: '100%',
    fontFamily: 'Rationale_400Regular'
  },
  pageTitle: {
    fontSize: 30,
    color: '#ffffff',
    fontFamily: 'Rationale_400Regular'
  },
  paragraph: {
    margin: 0,
    color: '#ffffff',
    fontFamily: 'Rationale_400Regular',
    fontSize: 16
  },
  topContainer: {
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  playerImg: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 50,
    overflow: "hidden"
  },
  smallPlayerImg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 50,
    overflow: "hidden"
  },
  goalKeeperLabel: {
    position: 'absolute',
    left: 0,
    bottom: -2,
    padding: 3,
    backgroundColor: '#C2F655',
    color: '#242834',
    borderRadius: 5,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 10,
    lineHeight: 10
  },
  button: {
    borderRadius: 7.5,
    overflow: 'hidden',
    paddingLeft: 12.5,
    paddingRight: 12.5,
    paddingTop: 7.5,
    paddingBottom: 7.5,
    fontSize: 14
  },
  smallButton: {
      borderRadius: 7.5,
      overflow: 'hidden',
      fontSize: 14,
      lineHeight: 27.5,
      textAlign: 'center',
      width: 27.5,
      height: 27.5
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
  leftMargin: {
    marginLeft: 12.5
  },
  settingsTopContainer: {
    width: '100%'
  },
  settingsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  settingsButtonWrapper: {
    marginTop: 25,
    alignItems: 'flex-start'
  },
  settingsButton: {
    marginTop: 15
  }
});

export default GeneralStyles