import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home'
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import MainScreen from '../screens/MainScreen';
import Chat from '../screens/Chat';



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
       <Stack.Screen
        name ={'Main'}
        component={MainScreen}
        options={{headerShown:false}}
      />
        <Stack.Screen
        name ={'Chat'}
        component={Chat}
        options={{headerShown:true}}
      />
    </Stack.Navigator>
    
   </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})