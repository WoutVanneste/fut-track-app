import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Home from './pages/Home/Home';
import Games from './pages/Games/Games';
import Settings from './pages/Settings/Settings';
import Team from './pages/Team/Team';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home"
          component={Home}
          options={{
            title: 'Overview',
            tabBarIcon: () => {
              return <SimpleLineIcon name="trophy" color="#000"/>;
            }
          }} />
        <Tab.Screen 
          name="Games"
          component={Games}
          options={{
            tabBarIcon: () => {
              return <SimpleLineIcon name="game-controller" color="#000"/>;
            }
          }} />
        <Tab.Screen 
          name="Team"
          component={Team}
          options={{
            title: "Team",
            tabBarIcon: () => {
              return <SimpleLineIcon name="people" color="#000"/>;
            }
          }} />
        <Tab.Screen 
          name="Settings"
          component={Settings}
          options={{
            title: "Settings",
            tabBarIcon: () => {
              return <SimpleLineIcon name="settings" color="#000"/>;
            }
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}