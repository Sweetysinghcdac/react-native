import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home'
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';

const Stack= createNativeStackNavigator();
const AppNavigator = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name ={'Home'}
        component={Home}
        options={{headerShown:false}}
      />

      <Stack.Screen
        name ={'SignUp'}
        component={SignUp}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name ={'Login'}
        component={Login}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
    
   </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})