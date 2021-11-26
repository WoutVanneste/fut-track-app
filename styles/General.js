import { StyleSheet } from 'react-native'; 

const GeneralStyles = StyleSheet.create({
  pageContainer: {
    paddingTop: 20,
    paddingLeft: 12.5,
    paddingRight: 12.5,
    paddingBottom: 90,
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
  }
});

export default GeneralStyles