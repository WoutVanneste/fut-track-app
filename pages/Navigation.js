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
        options={{
          title: 'Overview',
          tabBarIcon: () => {
            return <SimpleLineIcon name="trophy" color="#000"/>;
          }
        }}>
          {props => <Home {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Games"
        options={{
          tabBarIcon: () => {
            return <SimpleLineIcon name="game-controller" color="#000"/>;
          }
        }}>
          {props => <Games {...props} user={user}/>}
      </Tab.Screen>
      <Tab.Screen 
        name="Team"
        options={{
          title: "Team",
          tabBarIcon: () => {
            return <SimpleLineIcon name="people" color="#000"/>;
          }
        }}>
          {props => <Team {...props} user={user}/>}
      </Tab.Screen>
      <Tab.Screen 
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: () => {
            return <SimpleLineIcon name="settings" color="#000"/>;
          }
        }}>
          {props => <Settings {...props} user={user}/>}
      </Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>;
}

export default Navigation;