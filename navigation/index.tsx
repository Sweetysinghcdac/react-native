import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../screens/SearchScreen';

const Stack= createNativeStackNavigator();
function RootNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown:false}}
            />
            <Stack.Screen
            name="Not Found"
            component={NotFoundScreen}
            options={{ title:"Oops!"}}
            />

            <Stack.Group
            screenOptions={{presentation:"modal"}}>
                <Stack.Screen 
                    name="Modal"
                    component={ModalScreen} />

            </Stack.Group>
        </Stack.Navigator>
    )
}

function BottomTabNavigator(){
    const colorScheme= useColorScheme();
    return (
        <BottomTabNavigator
        initialRouteName="TabOne"
        screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme].tint,
        }}
        >
            <BottomTab.Screen
            name="search"
            component={SearchScreen}
            options={{ headerShown:false,
                tabBarIcon:({ color}) => <TabBarIcon name= "code" color={color}/>
            }}
            
            />

            </BottomTab.Screen>

        </BottomTabNavigator>
    )
}