import { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./screens/Home";
import Status from "./screens/Status";
import { NavigationContainer } from "@react-navigation/native";

const { View, Text, TouchableOpacity } = require("react-native");



const Tab = createBottomTabNavigator()

// function App(){
  // return(
  //   <View>
  //       <Text>Text xontainer</Text>
  //       <Text>Text xontainer</Text>

  //   </View>
  // )
// }



const App = () =>{
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'red'
            },
            tabBarStyle:{
              backgroundColor:'powderblue'
            }
          }}
      >

        <Tab.Screen name="Home" component={Home}></Tab.Screen>
        <Tab.Screen name="Status" component={Status}></Tab.Screen>


      </Tab.Navigator>
    </NavigationContainer>
   
  )
}

export default App;