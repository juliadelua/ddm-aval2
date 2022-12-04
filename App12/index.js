import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Pessoal from '../src/pages/Pessoal';
import Formacao from '../src/pages/Formacao';
import Experiencia from '../src/pages/Experiencia';

const Drawer = createDrawerNavigator();

export default function App12(){
	return(
		<NavigationContainer>
			<Drawer.Navigator>
				<Drawer.Screen 
					name="Pessoal" 
					component={Pessoal}
					options={{ title: ''}}
				/>
				<Drawer.Screen 
					name="Formacao" 
					component={Formacao}
					options={{ title: ''}}
				/>
				<Drawer.Screen 
					name="Experiencia" 
					component={Experiencia}
					options={{ title: ''}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	)
}