import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Home from './Home/Home';
import Games from './Games/Games';
import Settings from './Settings/Settings';
import Team from './Team/Team';

const Tab = createBottomTabNavigator();

const Navigation = ({ user }) => {
    console.log('navigation comp - user:', user);
    return  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen 
        name="Home"
        component={() => <Home user={user} />}
        options={{
          title: 'Overview',
          tabBarIcon: () => {
            return <SimpleLineIcon name="trophy" color="#000"/>;
          }
        }} />
      <Tab.Screen 
        name="Games"
        component={() => <Games user={user} />}
        options={{
          tabBarIcon: () => {
            return <SimpleLineIcon name="game-controller" color="#000"/>;
          }
        }} />
      <Tab.Screen 
        name="Team"
        component={() => <Team user={user} />}
        options={{
          title: "Team",
          tabBarIcon: () => {
            return <SimpleLineIcon name="people" color="#000"/>;
          }
        }} />
      <Tab.Screen 
        name="Settings"
        component={() => <Settings user={user} />}
        options={{
          title: "Settings",
          tabBarIcon: () => {
            return <SimpleLineIcon name="settings" color="#000"/>;
          }
        }}/>
    </Tab.Navigator>
  </NavigationContainer>;
}

export default Navigation;