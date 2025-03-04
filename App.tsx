import { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./screens/Home";
import Status from "./screens/Status";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import React from "react";

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
   <AppNavigator />
   
  )
}

export default App;