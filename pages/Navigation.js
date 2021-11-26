import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Home from './Home/Home';
import Games from './Games/Games';
import Settings from './Settings/Settings';
import Team from './Team/Team';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const Navigation = ({ user }) => {
    console.log('navigation comp - user:', user);
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              elevation: 0,
              backgroundColor: '#3652E7',
              height: 60,
              borderWidth: 0,
              borderTopWidth: 0
            },
            tabBarActiveBackgroundColor: '#2b41b9'
          }}
        >
          <Tab.Screen 
            name="Home"
            options={{
              title: 'Overview',
              tabBarIcon: () => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <SimpleLineIcon style={{fontSize: 18, marginBottom: 5}} name="trophy" color="#fff"/>
                  <Text style={{fontSize: 12.5, color: '#fff'}}>Overview</Text>
                </View>
              )
            }}>
              {props => <Home {...props} user={user} />}
          </Tab.Screen>
          <Tab.Screen 
            name="Games"
            options={{
              tabBarIcon: () => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <SimpleLineIcon style={{fontSize: 18, marginBottom: 5}} name="game-controller" color="#fff"/>
                  <Text style={{fontSize: 12.5, color: '#fff'}}>Games</Text>
                </View>
              )
            }}>
              {props => <Games {...props} user={user}/>}
          </Tab.Screen>
          <Tab.Screen 
            name="Team"
            options={{
              title: "Team",
              tabBarIcon: () => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <SimpleLineIcon style={{fontSize: 18, marginBottom: 5}} name="people" color="#fff"/>
                  <Text style={{fontSize: 12.5, color: '#fff'}}>Team</Text>
                </View>
              )
            }}>
              {props => <Team {...props} user={user}/>}
          </Tab.Screen>
          <Tab.Screen 
            name="Settings"
            options={{
              title: "Settings",
              tabBarIcon: () => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <SimpleLineIcon style={{fontSize: 18, marginBottom: 5}} name="settings" color="#fff"/>
                <Text style={{fontSize: 12.5, color: '#fff'}}>Settings</Text>
              </View>
              )
            }}>
              {props => <Settings {...props} user={user}/>}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    );
}

export default Navigation;