import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Pessoal from '../src/pages/Pessoal';
import Formacao from '../src/pages/Formacao';
import Experiencia from '../src/pages/Experiencia';

const Tab = createBottomTabNavigator();
 
export default function App13(){
  return(
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={ ({route}) => ({
        tabBarIcon: ({ color, size }) => {
          const { name } = icons[route.name];
          return <Icon name={name} color={color} size={size} />
        }
      }) }
      >
        <Tab.Screen name='Pessoal' component={Pessoal} />
        <Tab.Screen name='Formacao' component={Formacao} />
        <Tab.Screen name='Experiencia' component={Experiencia} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}


const icons = {
  Pessoal:{
    name: 'person',
  },
  Formacao:{
    name: 'book',
  },
  Experiencia:{
    name: 'briefcase',
  }
}