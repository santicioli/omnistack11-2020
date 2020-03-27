import React from 'react';
// Módulo sempre fica em volta das rotas
import {NavigationContainer} from '@react-navigation/native'
// Navegação por botão simples
import {createStackNavigator} from '@react-navigation/stack'
//importar páginas
import Incidents from './pages/Incidents'
import Detail from './pages/Detail'

const AppStack = createStackNavigator()

export default function Routes(){
  return(
    <NavigationContainer >
      {/* screenOptions={{headerShown: false}} - Retirar título principal  */}
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>

    </NavigationContainer>
  )
}
