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
  goalKeeperLabel: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 3,
    backgroundColor: '#C2F655',
    color: '#242834',
    borderRadius: 5,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    lineHeight: 13
  }
});

export default GeneralStyles